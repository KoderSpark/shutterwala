import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    // flip Y for standard UV coordinates
    v_uv.y = 1.0 - v_uv.y;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  varying vec2 v_uv;
  
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_progress;

  // 1D Hash
  float hash(float n) { return fract(sin(n) * 1e4); }
  
  // 2D Hash
  float hash21(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  // Smooth Value Noise
  float noise(vec2 x) {
    vec2 i = floor(x);
    vec2 f = fract(x);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // Fractal Brownian Motion
  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 4; ++i) {
      v += a * noise(x);
      x = rot * x * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 st = vec2(uv.x * aspect, uv.y);

    // Opening animation - Realistic Roll UP
    // The bottom of the shutter lifts up.
    float shutterBottom = 0.0;
    float rollRadius = 0.15; // The radius of the drum it rolls onto at the top
    float drumY = 1.0 - rollRadius; // Center of the drum

    if (u_progress > 1.0) {
      float t = (u_progress - 1.0); 
      // Accelerate the lift
      shutterBottom = t * t * 1.5; 
    }

    // If we are below the bottom of the shutter, discard (show background)
    if (uv.y < shutterBottom) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      return;
    }

    // Now calculate the physical position of this pixel on the shutter
    // If it's on the flat part, its position is just uv.y - shutterBottom
    // But we need to map uv coordinates to the *surface* of the rolled shutter
    
    float yPos = uv.y;
    vec3 surfaceNormal = vec3(0.0, 0.0, 1.0);
    float lightOcclusion = 1.0;

    // Simulate the drum at the top
    if (uv.y > drumY) {
       // We are on the rounded drum part
       float dy = uv.y - drumY;
       // Calculate z on the cylinder
       float z = sqrt(max(0.0, rollRadius*rollRadius - dy*dy));
       surfaceNormal = normalize(vec3(0.0, dy, z));
       
       // Calculate arc length to find which slat we are looking at
       float angle = asin(dy / rollRadius);
       yPos = drumY + (angle * rollRadius) - shutterBottom;
       
       // Darken slightly as it goes over the top
       lightOcclusion = 0.3 + 0.7 * (z / rollRadius);
    } else {
       // Flat part hanging down
       yPos = uv.y - shutterBottom;
    }

    float slats = 15.0; // Fewer, thicker slats
    
    float localY = fract(yPos * slats);
    float slatId = floor(yPos * slats);
    
    // Map localY to [-1, 1] for the individual slat curve
    float cy = localY * 2.0 - 1.0;
    
    // Realistic slat profile (interlocking design)
    float ridgeEdgeTop = 0.85;
    float ridgeEdgeBot = -0.85;
    
    vec3 localNormal;
    if (cy > ridgeEdgeTop) {
      localNormal = normalize(vec3(0.0, 0.8, 0.5));
    } else if (cy < ridgeEdgeBot) {
      localNormal = normalize(vec3(0.0, -0.8, 0.5));
    } else {
      float scaledCy = cy * 0.5;
      float z = sqrt(max(0.0, 1.0 - scaledCy * scaledCy));
      localNormal = normalize(vec3(0.0, scaledCy, z));
    }

    // Combine the surface normal (flat or cylinder) with the local slat normal
    // We rotate the local normal around the X axis based on where we are on the drum
    vec3 normal = localNormal;
    if (uv.y > drumY) {
       float angle = asin((uv.y - drumY) / rollRadius);
       float s = sin(angle);
       float c = cos(angle);
       // Rotate local normal
       normal = vec3(localNormal.x, 
                     localNormal.y * c - localNormal.z * s, 
                     localNormal.y * s + localNormal.z * c);
    }

    // Light setup (Bright, harsh industrial lighting)
    vec3 lightDir1 = normalize(vec3(0.2, 0.6, 0.8)); // Main fill
    vec3 lightDir2 = normalize(vec3(-0.5, -0.2, 0.5)); // Low rim light
    vec3 viewDir = vec3(0.0, 0.0, 1.0);

    // Stretched noise for brushed metal texture
    vec2 texCoord = vec2(st.x * 120.0, slatId * 2.13); 
    float brushedPattern = fbm(texCoord);
    
    // Micro-irregularities
    float grit = noise(st * 400.0) * 0.1;
    
    // Combine surface bump
    float surfaceBump = (brushedPattern * 0.15) + grit;

    // Perturb normal to catch specular highlights unevenly
    vec3 bumpedNormal = normalize(normal + vec3(0.0, surfaceBump * 0.3, surfaceBump * 0.05));

    // Realistic steel base color
    vec3 baseColor = vec3(0.55, 0.57, 0.60);
    // Add variations per slat and horizontally
    baseColor *= 0.85 + 0.3 * brushedPattern;
    // Add slightly darkened edges per slat for dirt accumulation
    baseColor *= smoothstep(1.0, 0.8, abs(cy)) * 0.2 + 0.8;

    // Ambient
    vec3 ambient = baseColor * 0.2;

    // Diffuse 1
    float diff1 = max(dot(bumpedNormal, lightDir1), 0.0);
    // Diffuse 2 (rim)
    float diff2 = max(dot(bumpedNormal, lightDir2), 0.0) * 0.3;
    
    vec3 diffuse = (diff1 + diff2) * baseColor;

    // Specular (Highly metallic)
    vec3 half1 = normalize(lightDir1 + viewDir);
    float spec1 = pow(max(dot(bumpedNormal, half1), 0.0), 64.0);
    
    vec3 half2 = normalize(lightDir2 + viewDir);
    float spec2 = pow(max(dot(bumpedNormal, half2), 0.0), 32.0) * 0.5;
    
    // Fresnel effect
    float fresnel = pow(1.0 - max(dot(bumpedNormal, viewDir), 0.0), 3.0);
    
    vec3 specularColor = vec3(0.95, 0.98, 1.0);
    vec3 specular = specularColor * (spec1 + spec2) * (0.5 + fresnel * 0.5);

    vec3 color = ambient + diffuse + specular;

    // Deepen the shadows in the interlocking ridges
    if (cy > ridgeEdgeTop || cy < ridgeEdgeBot) {
      color *= 0.3; // Ambient occlusion
    }

    // Apply the drum shading occlusion
    color *= lightOcclusion;

    // Add a very subtle "environment map" reflection using the normal's Y component
    // Simulates reflecting a bright floor and dark ceiling
    vec3 envReflect = mix(vec3(0.2, 0.25, 0.3), vec3(0.8, 0.85, 0.9), bumpedNormal.y * 0.5 + 0.5);
    color += envReflect * fresnel * baseColor * 2.0;

    // Vignette
    float dist = distance(uv, vec2(0.5));
    color *= smoothstep(1.1, 0.3, dist);

    // Color grading (slight cold cinematic tint)
    color.b += 0.02 * color.b;
    color.r -= 0.01 * color.r;

    // Output
    gl_FragColor = vec4(color, 1.0);
  }
`;

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // WebGL animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn("WebGL not supported, falling back to basic background");
      return;
    }

    // Initial resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Compile shaders
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Link Program
    const program = gl.createProgram();
    if (!program || !vertShader || !fragShader) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Setup full screen quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const progressLocation = gl.getUniformLocation(program, "u_progress");

    let startTime = performance.now();
    let animationFrameId: number;

    // Track internal progress for shader (0 to 1 then up to 2 for opening)
    let shaderProgress = 0.0;
    let localIsOpening = false;

    const render = (time: number) => {
      const elapsedTime = (time - startTime) / 1000.0;
      
      // Update Uniforms
      gl.uniform1f(timeLocation, elapsedTime);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      
      // Calculate shader progress independently for smoother animation
      if (!localIsOpening) {
        // Loading phase: ease to 1.0
        shaderProgress = Math.min(1.0, shaderProgress + 0.015);
        setProgress(Math.floor(shaderProgress * 100));
        
        if (shaderProgress >= 1.0) {
           localIsOpening = true;
           setIsOpening(true);
        }
      } else {
        // Opening phase: animate from 1.0 upwards to trigger slide up in shader
        shaderProgress += 0.006; // Adjust speed of rollup here (slower for realistic weight)
      }
      
      gl.uniform1f(progressLocation, shaderProgress);

      // Draw
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Stop rendering when shutter is completely rolled up and off screen
      if (shaderProgress < 2.5) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        onComplete();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
    };
  }, [onComplete]);


  return (
    <AnimatePresence>
      <motion.div
        key="loading-container"
        className="fixed inset-0 z-[200] bg-black"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* WebGL Canvas Background */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full"
        />

        {/* Cinematic atmospheric overlays over the 3D metal */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

        {/* Content - Fades out when opening begins */}
        <AnimatePresence>
          {!isOpening && (
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center z-10"
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display text-6xl md:text-8xl font-black tracking-tighter text-black drop-shadow-[0_0_25px_rgba(255,255,255,1)]"
              >
                ShutterWala<span className="text-3xl md:text-5xl align-super text-black">™</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg md:text-2xl tracking-[0.3em] uppercase font-bold text-black mt-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]"
              >
                Initializing Engine
              </motion.p>

              {/* High-tech Progress bar */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "320px" }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="h-[4px] rounded-full overflow-hidden mt-6 bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)]"
              >
                <div
                  className="h-full rounded-full bg-black shadow-[0_0_10px_rgba(0,0,0,0.8)]"
                  style={{
                    width: `${progress}%`,
                    transition: "width 0.1s linear",
                  }}
                />
              </motion.div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.8 }}
                className="text-sm md:text-lg font-bold text-black mt-4 tabular-nums drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]"
              >
                {progress}%
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
