import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), 'content', 'projects');

function readProjectFiles() {
  try {
    return fs
      .readdirSync(projectsDirectory)
      .filter((f) => !f.startsWith('_') && /\.mdx?$|\.md$/i.test(f));
  } catch (e) {
    return [];
  }
}

function parseProjectFile(fileName) {
  const fullPath = path.join(projectsDirectory, fileName);
  let fileContents;
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (err) {
    console.error(`Unable to read project file: ${fileName} — ${err.message}`);
    return null;
  }

  let data = {};
  let content = '';
  try {
    const parsed = matter(fileContents);
    data = parsed.data || {};
    content = parsed.content || '';
  } catch (err) {
    // Malformed frontmatter — skip this file
    console.error(`Skipping project file due to frontmatter parse error: ${fileName} — ${err.message}`);
    return null;
  }

  const slug = data && data.slug ? String(data.slug).trim() : fileName.replace(/\.mdx?$|\.md$/i, '').trim();

  const tags = (() => {
    if (!data || !data.tags) return [];
    if (Array.isArray(data.tags)) return data.tags.map((t) => String(t).trim());
    if (typeof data.tags === 'string') return data.tags.split(',').map((t) => t.trim()).filter(Boolean);
    return [];
  })();

  const featured = data && (data.featured === true || String(data.featured) === 'true');
  const image = data && data.image ? String(data.image) : '/assets/images/placeholder.svg';

  let time = 0;
  if (data && data.date) {
    const parsed = Date.parse(String(data.date));
    if (!Number.isNaN(parsed)) time = parsed;
  }

  return {
    slug,
    date: (data && data.date) || null,
    time,
    name: (data && (data.name || data.title)) || slug,
    subHeading: (data && data.subHeading) || '',
    description: (data && data.description) || '',
    tags,
    code_link: (data && (data.code_link || data.codeLink || data.code)) || '',
    live_url: (data && (data.live_url || data.liveUrl || data.live || data.web_url || data.webUrl)) || '',
    image,
    featured: !!featured,
    content,
  };
}

export function getAllProjects() {
  const files = readProjectFiles();
  const projects = files
    .map(parseProjectFile)
    .filter(Boolean)
    .sort((a, b) => {
      const ta = a.time || 0;
      const tb = b.time || 0;
      return tb - ta;
    });
  return projects;
}

export function getFeaturedProjects() {
  const all = getAllProjects();
  const featured = all.filter((p) => p.featured);
  if (featured.length > 0) return featured.slice(0, 10);
  // fallback to most recent up to 5 projects
  return all.slice(0, 5);
}

export function getProjectSlugs() {
  return getAllProjects().map((p) => p.slug);
}

export function getProjectBySlug(slug) {
  const projects = getAllProjects();
  return projects.find((p) => p.slug === slug) || null;
}
