import Script from 'next/script';
import { getAllProjects } from '@/lib/projects';
import ProjectsListClient from './ProjectsListClient';
import { getProjectSchema, getBreadcrumbSchema } from '@/lib/jsonld-schemas';
import { buildUrl } from '@/lib/config';

export default function ProjectsPage() {
  const projects = getAllProjects();

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: buildUrl() },
    { name: 'Projects', url: buildUrl('/projects') },
  ]);

  const projectSchemas = projects.map((p) =>
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
          key={`projects-jsonld-${idx}`}
          id={`projects-jsonld-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
          strategy="afterInteractive"
        />
      ))}
      <section className="w-full min-h-screen bg-[#050505] text-white py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-12">
            <p className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-gray-500">Projects</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">All Projects</h1>
          </div>

          <ProjectsListClient projects={projects} />
        </div>
      </section>
    </>
  );
}
