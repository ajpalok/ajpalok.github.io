import Image from 'next/image';
import Link from 'next/link';
import { getProjectBySlug, getProjectSlugs } from '@/lib/projects';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import hljs from 'highlight.js';

// Configure marked to use highlight.js for code blocks
marked.setOptions({
  highlight: function (code, lang) {
    try {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    } catch (e) {
      return code;
    }
  },
});

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-paper text-ink">Project not found</div>
    );
  }

  return (
    <article className="w-full min-h-screen bg-paper text-ink pt-28 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-2 mb-3">
            <span className="h-px w-8 bg-accent" />
            Project
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">{project.name}</h1>
          {project.subHeading ? <p className="text-ink-2 mt-2">{project.subHeading}</p> : null}
        </div>

        <div className="relative w-full h-80 mb-8 bg-panel border border-line rounded-md overflow-hidden">
          <Image src={project.image} alt={project.name} fill className="object-contain p-2" loading="eager" />
        </div>

        <div className="project-content prose prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(marked.parse(project.content || ''), {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img','h1','h2','h3','pre','code']),
            allowedAttributes: {
              ...sanitizeHtml.defaults.allowedAttributes,
              a: ['href', 'name', 'target', 'rel'],
              img: ['src', 'alt', 'title', 'width', 'height'],
              '*': ['class', 'id']
            },
            allowedSchemesByTag: {
              img: ['http', 'https', 'data']
            }
          }) }} />
        </div>

        <div className="mt-10 flex gap-4">
          {project.live_url ? (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-ink text-paper font-semibold rounded-md hover:bg-accent transition-colors">
              View Live
            </a>
          ) : null}

          {project.code_link ? (
            <a href={project.code_link} target="_blank" rel="noreferrer" className="px-5 py-2.5 border border-ink/30 text-ink font-semibold rounded-md hover:border-ink hover:bg-ink/[0.04] transition-colors">
              View Code
            </a>
          ) : null}
        </div>

        <div className="mt-10">
          <Link href="/projects" className="text-sm text-ink-2 hover:text-accent transition-colors">← Back to projects</Link>
        </div>
      </div>
    </article>
  );
}
