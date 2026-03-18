// api/share.js — Vercel serverless function
// WhatsApp's crawler does NOT execute JavaScript.
// This function server-renders a static HTML page with og:image tags so WhatsApp can generate a link preview.

export default function handler(req, res) {
  const {
    i = "", // Cloudinary public_id (short param)
    title = "ShutterWala - New Inspection Request",
  } = req.query;

  const cloudName = "dgtz3xmgi"; // Cloudinary cloud name (public, safe to use here)
  const publicId = decodeURIComponent(i);

  // Reconstruct the optimized Cloudinary URL from the public_id
  const safeImg = publicId
    ? `https://res.cloudinary.com/${cloudName}/image/upload/w_600,c_limit,q_auto,f_jpg/${publicId}.jpg`
    : "";

  const safeTitle = decodeURIComponent(title).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safeDesc = "New shutter inspection request — view the uploaded photo.";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle}</title>

  <!-- OpenGraph tags — WhatsApp reads these statically (no JS) -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${safeDesc}" />
  <meta property="og:image" content="${safeImg}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:url" content="${req.headers["x-forwarded-proto"] || "https"}://${req.headers["host"]}${req.url}" />
  <!-- summary_large_image forces WhatsApp to show a BIG banner preview instead of a small thumbnail -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${safeImg}" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeDesc}" />

  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #0a0a0a;
      color: #fff;
      font-family: system-ui, -apple-system, sans-serif;
      padding: 2rem;
      text-align: center;
    }
    img {
      max-width: min(640px, 100%);
      max-height: 70vh;
      border-radius: 16px;
      object-fit: contain;
      border: 1px solid rgba(255,255,255,0.12);
      box-shadow: 0 24px 64px rgba(0,0,0,0.6);
    }
    h1 { margin-top: 1.5rem; font-size: 1.25rem; color: #f97316; }
    p { margin-top: 0.75rem; font-size: 0.875rem; color: rgba(255,255,255,0.5); }
    a { color: #f97316; text-decoration: none; }
  </style>
</head>
<body>
  <img src="${safeImg}" alt="${safeTitle}" />
  <h1>${safeTitle}</h1>
  <p>${safeDesc}</p>
  <p style="margin-top: 1rem;">From <a href="/">ShutterWala</a></p>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.status(200).send(html);
}
