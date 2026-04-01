import { useEffect } from 'react';

const SEO = () => {
  useEffect(() => {
    // Remove existing schema if any
    const existingScript = document.getElementById('shutterwala-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "ShutterWala",
      "image": "https://www.myshutterwala.in/og-image.png",
      "@id": "https://www.myshutterwala.in",
      "url": "https://www.myshutterwala.in",
      "telephone": "+91-9347442350",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sai Baba Temple Lane, Film Nagar",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500033",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 17.4123,
        "longitude": 78.4123
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "sameAs": [
        "https://twitter.com/ShutterWala"
      ]
    };

    const script = document.createElement('script');
    script.id = 'shutterwala-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('shutterwala-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
};

export default SEO;
