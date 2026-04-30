import Script from 'next/script';

export function JsonLdScript({ schema }) {
  if (!schema) return null;

  return (
    <Script
      id="json-ld-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
      strategy="afterInteractive"
    />
  );
}

export function MultiJsonLdScript({ schemas }) {
  if (!schemas || schemas.length === 0) return null;

  return (
    <>
      {schemas.map((schema, idx) => (
        <Script
          key={`json-ld-${idx}`}
          id={`json-ld-schema-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
          strategy="afterInteractive"
        />
      ))}
    </>
  );
}
