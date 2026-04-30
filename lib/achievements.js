import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

/**
 * @typedef {Object} AchievementFrontmatter
 * @property {string} [slug]
 * @property {string} title
 * @property {string} issuer
 * @property {string} [issuer_url]
 * @property {string} [date_start] - "YYYY", "YYYY-MM", or "YYYY-MM-DD"
 * @property {string} [date_end] - same formats; empty = ongoing or point-in-time
 * @property {string} [category]
 * @property {string} [tags]
 * @property {string} [credential_url]
 * @property {string} [image]
 * @property {string} [description]
 */

/**
 * @typedef {Object} Achievement
 * @property {string} slug
 * @property {AchievementFrontmatter} frontmatter
 * @property {string} htmlContent
 * @property {number} sortKey - unix ms for chronological ordering
 * @property {string} displayDate - formatted for UI
 */

// ── Date formatting ───────────────────────────────────────────────────────────
// Accepts "YYYY", "YYYY-MM", or "YYYY-MM-DD"
function parseFlexDate(raw) {
  if (!raw) return null
  const parts = raw.trim().split('-')
  const y = parseInt(parts[0], 10)
  const m = parts[1] ? parseInt(parts[1], 10) - 1 : 0
  const d = parts[2] ? parseInt(parts[2], 10) : 1
  return new Date(y, m, d)
}

function formatFlexDate(raw) {
  if (!raw) return ''
  const parts = raw.trim().split('-')
  if (parts.length === 1) return parts[0]                                   // "2022"
  if (parts.length === 2) {
    const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, 1)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) // "Nov 2025"
  }
  const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatDateRange(start, end) {
  const s = formatFlexDate(start)
  const e = formatFlexDate(end)
  if (!s && !e) return ''
  if (!s) return e
  if (!e) return s
  if (s === e) return s
  return `${s} – ${e}`
}

// ── Slug ──────────────────────────────────────────────────────────────────────
function resolveSlug(filename, fm) {
  if (fm?.trim()) return fm.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, '')
  return filename.replace(/\.md$/, '')
}

// ── Loader ────────────────────────────────────────────────────────────────────
export async function getAllAchievements() {
  const dir = path.join(process.cwd(), 'content', 'achievements')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))

  const items = await Promise.all(
    files.map(async (filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const { data, content } = matter(raw)
      const fm = data
      const slug = resolveSlug(filename, fm.slug)

      const proc = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content)
      const htmlContent = proc.toString()

      const startDate = parseFlexDate(fm.date_start)
      const sortKey = startDate ? startDate.getTime() : 0
      const displayDate = formatDateRange(fm.date_start, fm.date_end)

      return { slug, frontmatter: fm, htmlContent, sortKey, displayDate }
    })
  )

  // Newest first
  return items.sort((a, b) => b.sortKey - a.sortKey)
}

export async function getAchievementBySlug(slug) {
  const all = await getAllAchievements()
  return all.find(a => a.slug === slug) ?? null
}

export async function getAchievementSlugs() {
  const all = await getAllAchievements()
  return all.map(a => a.slug)
}

