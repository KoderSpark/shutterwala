import { Helmet } from 'react-helmet-async';

const SEO = () => {
  const schemaLocalBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": "https://www.myshutterwala.in/#business",
    "name": "ShutterWala™",
    "alternateName": ["ShutterWala", "GVKS ShutterWala Services", "Sri Sai Ram Rolling Shutters"],
    "description": "India's first subscription-based rolling shutter maintenance and repair company. Professional services for rolling shutters, motorized shutters, grill shutters and aluminium shutters including AMC, emergency repair, greasing, spring adjustment, roller replacement, and new installation.",
    "url": "https://www.myshutterwala.in",
    "logo": "https://www.myshutterwala.in/logo.png",
    "image": "https://www.myshutterwala.in/og-image.png",
    "telephone": ["+91-9336431234", "+91-7208338298", "1800-599-1233"],
    "email": "info@shutterwala.com",
    "foundingDate": "1989",
    "priceRange": "₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, UPI, Bank Transfer",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Gowliguda",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500012",
        "addressCountry": "IN",
        "name": "ShutterWala Hyderabad HQ"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Rosa Bella 1, Ghodbunder Road, Thane West",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400607",
        "addressCountry": "IN",
        "name": "ShutterWala Mumbai Regional Office"
      }
    ],
    "geo": { "@type": "GeoCoordinates", "latitude": 17.3850, "longitude": 78.4867 },
    "hasMap": "https://maps.google.com/?q=Gowliguda,Hyderabad",
    "areaServed": [
      { "@type": "City", "name": "Hyderabad" },
      { "@type": "City", "name": "Mumbai" },
      { "@type": "State", "name": "Telangana" },
      { "@type": "State", "name": "Maharashtra" },
      { "@type": "Country", "name": "India" }
    ],
    "serviceType": [
      "Rolling Shutter Maintenance", "Rolling Shutter Repair", "Motorized Shutter Service",
      "Shutter AMC", "Emergency Shutter Repair 24/7", "Rolling Shutter Installation",
      "Shutter Greasing & Lubrication", "Shutter Spring Adjustment", "Roller Replacement",
      "Commercial Shutter Service", "Industrial Rolling Shutter Repair"
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://twitter.com/ShutterWala",
      "https://www.facebook.com/ShutterWala",
      "https://www.instagram.com/ShutterWala",
      "https://www.linkedin.com/company/shutterwala"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Rolling Shutter Service Plans",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "G-650 General Plan — Manual Rolling Shutter AMC" }, "price": "650", "priceCurrency": "INR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AD-1250 General Plan — Manual Shutter Advanced AMC" }, "price": "1250", "priceCurrency": "INR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "G-850 Manual Gear Shutter Plan" }, "price": "850", "priceCurrency": "INR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "G-1850 Motorised Rolling Shutter Plan" }, "price": "1850", "priceCurrency": "INR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AD-1650 Motorised Shutter Advanced Plan" }, "price": "1650", "priceCurrency": "INR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AD-3650 Motorised Shutter Premium Plan" }, "price": "3650", "priceCurrency": "INR" }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "846",
      "bestRating": "5"
    }
  };

  const schemaOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.myshutterwala.in/#organization",
    "name": "ShutterWala™",
    "url": "https://www.myshutterwala.in",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.myshutterwala.in/logo.png",
      "width": 512, "height": 512
    },
    "founder": { "@type": "Person", "name": "G.V.K. Srinivas" },
    "foundingDate": "1989",
    "slogan": "We Maintain. You Operate.",
    "knowsAbout": [
      "Rolling Shutter Maintenance", "Motorized Shutter Repair", "Industrial Shutter Service",
      "Shutter Annual Maintenance Contract", "Commercial Shutter Installation",
      "Automated Shutter Systems", "Shutter Spring and Gear Repair"
    ]
  };

  const schemaWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.myshutterwala.in/#website",
    "url": "https://www.myshutterwala.in",
    "name": "ShutterWala™",
    "description": "India's first subscription-based rolling shutter maintenance and repair service",
    "inLanguage": "en-IN",
    "publisher": { "@id": "https://www.myshutterwala.in/#organization" },
    "potentialAction": {
      "@type": "SearchAction",
      "target": { "@type": "EntryPoint", "urlTemplate": "https://www.myshutterwala.in/?q={search_term_string}" },
      "query-input": "required name=search_term_string"
    }
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is rolling shutter maintenance?",
        "acceptedAnswer": { "@type": "Answer", "text": "Rolling shutter maintenance involves regular servicing including greasing, lubrication, spring tension adjustment, gear checks, lock inspection, and safety audits to ensure your shutter operates smoothly without breakdowns." }
      },
      {
        "@type": "Question",
        "name": "How often should a rolling shutter be serviced?",
        "acceptedAnswer": { "@type": "Answer", "text": "Rolling shutters should be serviced at least 3 times per year. ShutterWala's AMC plans include 3 scheduled services annually plus emergency repair coverage." }
      },
      {
        "@type": "Question",
        "name": "Do you offer motorized shutter repair services?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, ShutterWala offers specialized motorized shutter repair and maintenance services including motor repair, remote control replacement, gear maintenance, and emergency 24/7 service." }
      },
      {
        "@type": "Question",
        "name": "What is the cost of a rolling shutter AMC plan?",
        "acceptedAnswer": { "@type": "Answer", "text": "ShutterWala's rolling shutter AMC plans start from just ₹650/year + GST for manual shutters and ₹1,650/year + GST for motorized shutters. Plans cover up to 3 services per year with emergency repair included." }
      },
      {
        "@type": "Question",
        "name": "Do you provide 24/7 emergency shutter repair?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, ShutterWala provides round-the-clock emergency rolling shutter repair with a guaranteed 2-hour response time in Hyderabad and Mumbai." }
      },
      {
        "@type": "Question",
        "name": "Which cities does ShutterWala serve?",
        "acceptedAnswer": { "@type": "Answer", "text": "ShutterWala currently operates in Hyderabad (headquarters) and Mumbai (regional office), with plans for pan-India expansion. Contact us at 1800-599-1233 to check availability in your city." }
      },
      {
        "@type": "Question",
        "name": "What types of shutters do you service?",
        "acceptedAnswer": { "@type": "Answer", "text": "ShutterWala services all types including rolling shutters, motorized/automatic shutters, grill shutters, sliding shutters, aluminium shutters, and industrial rolling shutters for shops, warehouses, factories, and commercial establishments." }
      }
    ]
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.myshutterwala.in/" },
      { "@type": "ListItem", "position": 2, "name": "Our Services", "item": "https://www.myshutterwala.in/#services" },
      { "@type": "ListItem", "position": 3, "name": "Pricing Plans", "item": "https://www.myshutterwala.in/#plans" },
      { "@type": "ListItem", "position": 4, "name": "About ShutterWala", "item": "https://www.myshutterwala.in/#about" },
      { "@type": "ListItem", "position": 5, "name": "Book Inspection", "item": "https://www.myshutterwala.in/#book" },
      { "@type": "ListItem", "position": 6, "name": "Contact Us", "item": "https://www.myshutterwala.in/#contact" }
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>ShutterWala™ — India's #1 Rolling Shutter Maintenance & Repair Service</title>
      <meta name="description" content="ShutterWala™ is India's first subscription-based rolling shutter maintenance company. Professional repair, greasing, spring adjustment & 24/7 emergency service for manual & motorized shutters in Hyderabad, Mumbai & across India. 35+ years of trust, 46,000+ shutters serviced." />
      <meta name="keywords" content="rolling shutter repair, rolling shutter maintenance, rolling shutter service, automatic shutter repair, motorized shutter service, shutter AMC, annual maintenance contract shutter, rolling shutter installation, commercial shutter service, industrial shutter repair, garage shutter repair, shop shutter repair, shutter greasing, spring adjustment shutter, shutter breakdown repair, shutter emergency repair 24/7, ShutterWala, myshutterwala, rolling shutter Hyderabad, rolling shutter Mumbai, shutter subscription India, best rolling shutter service India, rolling shutter company India, shutter service near me, professional shutter maintenance, shutter repair company Hyderabad, rolling shutter AMC Hyderabad, rolling shutter service Mumbai, shutter installation Hyderabad, motorised shutter repair India, industrial rolling shutter service, commercial rolling shutter repair, grill shutter repair, aluminium shutter service, shutter spring repair, shutter motor repair, shutter roller replacement, shutter lock repair, zero downtime shutter service, preventive shutter maintenance" />
      <meta name="author" content="ShutterWala — GVKS ShutterWala Services" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#f97316" />
      <link rel="canonical" href="https://www.myshutterwala.in" />

      {/* Geo / Local SEO */}
      <meta name="geo.region" content="IN-TG" />
      <meta name="geo.placename" content="Hyderabad, Telangana, India" />
      <meta name="geo.position" content="17.3850;78.4867" />
      <meta name="ICBM" content="17.3850, 78.4867" />

      {/* Open Graph */}
      <meta property="og:site_name" content="ShutterWala™" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content="ShutterWala™ — India's #1 Rolling Shutter Maintenance & Repair Service" />
      <meta property="og:description" content="India's first subscription-based rolling shutter service. Professional maintenance, emergency repair & installation for manual & motorized shutters. Serving Hyderabad, Mumbai & all India." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.myshutterwala.in" />
      <meta property="og:image" content="https://www.myshutterwala.in/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="ShutterWala™ — Professional Rolling Shutter Service India" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ShutterWala" />
      <meta name="twitter:creator" content="@ShutterWala" />
      <meta name="twitter:title" content="ShutterWala™ — India's #1 Rolling Shutter Service" />
      <meta name="twitter:description" content="India's first subscription-based rolling shutter maintenance. 24/7 emergency repair. Serving Hyderabad, Mumbai & all India." />
      <meta name="twitter:image" content="https://www.myshutterwala.in/og-image.png" />
      <meta name="twitter:image:alt" content="ShutterWala™ rolling shutter repair service" />

      {/* JSON-LD Schemas */}
      <script type="application/ld+json">{JSON.stringify(schemaLocalBusiness)}</script>
      <script type="application/ld+json">{JSON.stringify(schemaOrganization)}</script>
      <script type="application/ld+json">{JSON.stringify(schemaWebSite)}</script>
      <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
      <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
    </Helmet>
  );
};

export default SEO;
