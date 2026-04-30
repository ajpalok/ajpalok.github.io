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
      <div className="w-full min-h-screen flex items-center justify-center">Project not found</div>
    );
  }

  return (
    <article className="w-full min-h-screen bg-[#050505] text-white py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-gray-500">Project</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">{project.name}</h1>
          {project.subHeading ? <p className="text-gray-400 mt-2">{project.subHeading}</p> : null}
        </div>

        <div className="relative w-full h-80 mb-8 bg-[#111] rounded-sm overflow-hidden">
          <Image src={project.image} alt={project.name} fill className="object-contain" loading="eager" />
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

        <div className="mt-8 flex gap-4">
          {project.live_url ? (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white text-black rounded">
              View Live
            </a>
          ) : null}

          {project.code_link ? (
            <a href={project.code_link} target="_blank" rel="noreferrer" className="px-4 py-2 border border-white rounded">
              View Code
            </a>
          ) : null}
        </div>

        <div className="mt-8">
          <Link href="/projects" className="text-sm text-gray-400">← Back to projects</Link>
        </div>
      </div>
    </article>
  );
}
