import Script from 'next/script';
import { getAllProjects } from '@/lib/projects';
import { getProjectSchema, getBreadcrumbSchema } from '@/lib/jsonld-schemas';
import { buildUrl } from '@/lib/config';

export async function HomeJsonLD() {
  const projects = getAllProjects();
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: buildUrl() },
  ]);

  // Build schemas for featured/sample items
  const projectSchemas = projects.slice(0, 5).map((p) =>
    getProjectSchema({
      slug: p.slug,
      name: p.name,
      description: p.description,
      image: p.image,
      tags: p.tags,
      featured: p.featured,
    })
  );

  const schemas = [breadcrumbs, ...projectSchemas];

  return (
    <>
      {schemas.map((schema, idx) => (
        <Script
          key={`home-json-ld-${idx}`}
          id={`home-json-ld-${idx}`}
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
