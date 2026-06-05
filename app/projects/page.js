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
      <section className="w-full min-h-screen bg-paper text-ink pt-28 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 md:mb-14">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-2 mb-4">
              <span className="h-px w-8 bg-accent" />
              Projects
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.95]">All Projects<span className="text-accent">.</span></h1>
          </div>

          <ProjectsListClient projects={projects} />
        </div>
      </section>
    </>
  );
}
