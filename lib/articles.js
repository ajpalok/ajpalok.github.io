import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

/**
 * @typedef {Object} ArticleFrontmatter
 * @property {string} [slug]
 * @property {string} title
 * @property {string} [description]
 * @property {string} [date] - "YYYY-MM-DD" format
 * @property {string} [image] - featured image URL
 * @property {string} [tags] - comma-separated tags
 * @property {string} [author]
 */

/**
 * @typedef {Object} Article
 * @property {string} slug
 * @property {ArticleFrontmatter} frontmatter
 * @property {string} htmlContent
 * @property {Date} dateObj - parsed date for sorting
 * @property {string} displayDate - formatted for UI
 */

const articlesDirectory = path.join(process.cwd(), 'content', 'articles');

/**
 * Parse a date string in "YYYY-MM-DD" format
 */
function parseDate(dateStr) {
  if (!dateStr) return null;
  // If gray-matter or the frontmatter already provided a Date object, accept it.
  if (dateStr instanceof Date) {
    return Number.isNaN(dateStr.getTime()) ? null : dateStr;
  }
  // Normalize and validate date strings. Accepts YYYY-MM-DD or full ISO.
  const s = String(dateStr);
  const iso = s.includes('T') ? s : `${s}T00:00:00Z`;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

/**
 * Format date for display
 */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = dateStr instanceof Date ? dateStr : parseDate(dateStr);
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Resolve slug from frontmatter or filename
 */
function resolveSlug(filename, fm) {
  if (fm.slug && typeof fm.slug === 'string') {
    return fm.slug.trim();
  }
  return filename.replace(/\.md$/, '').trim();
}

/**
 * Parse a single article markdown file
 */
async function parseArticleFile(filename) {
  const fullPath = path.join(articlesDirectory, filename);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);

    const slug = resolveSlug(filename, frontmatter);
    // frontmatter.date may be a string or a Date object (gray-matter can parse dates).
    const dateObj = parseDate(frontmatter.date);
    const displayDate = formatDate(frontmatter.date);
    // Normalize frontmatter.date to a YYYY-MM-DD string for consistent serialization
    const normalizedDate = frontmatter.date
      ? frontmatter.date instanceof Date
        ? frontmatter.date.toISOString().slice(0, 10)
        : String(frontmatter.date)
      : '';

    // Process markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(content);

    const htmlContent = String(processedContent);

    return {
      slug,
      frontmatter: {
        title: frontmatter.title || 'Untitled',
        description: frontmatter.description || '',
        date: normalizedDate,
        image: frontmatter.image || '',
        tags: frontmatter.tags || '',
        author: frontmatter.author || '',
      },
      htmlContent,
      dateObj: dateObj || new Date(0), // fallback for sorting
      displayDate,
    };
  } catch (err) {
    console.error(`Error parsing article ${filename}:`, err.message);
    return null;
  }
}

/**
 * Get all articles sorted by date (newest first)
 */
export async function getAllArticles() {
  try {
    const files = fs
      .readdirSync(articlesDirectory)
      .filter((f) => !f.startsWith('_') && f.endsWith('.md'));

    const articles = [];
    for (const file of files) {
      const article = await parseArticleFile(file);
      if (article) {
        articles.push(article);
      }
    }

    // Sort by date descending (newest first)
    return articles.sort((a, b) => b.dateObj - a.dateObj);
  } catch (err) {
    console.error('Error reading articles directory:', err.message);
    return [];
  }
}

/**
 * Get article by slug
 */
export async function getArticleBySlug(slug) {
  try {
    const files = fs
      .readdirSync(articlesDirectory)
      .filter((f) => !f.startsWith('_') && f.endsWith('.md'));

    for (const file of files) {
      const article = await parseArticleFile(file);
      if (article && article.slug === slug) {
        return article;
      }
    }

    return null;
  } catch (err) {
    console.error(`Error getting article by slug ${slug}:`, err.message);
    return null;
  }
}

/**
 * Get all article slugs for static generation
 */
export async function getArticleSlugs() {
  const articles = await getAllArticles();
  return articles.map((a) => a.slug);
}
