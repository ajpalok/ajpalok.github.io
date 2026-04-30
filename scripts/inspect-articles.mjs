import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDir = path.join(process.cwd(), 'content', 'articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md') && !f.startsWith('_'));

function parseDate(dateStr) {
  if (!dateStr) return null;
  if (dateStr instanceof Date) {
    return Number.isNaN(dateStr.getTime()) ? null : dateStr;
  }
  const iso = String(dateStr).includes('T') ? String(dateStr) : `${String(dateStr)}T00:00:00Z`;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = parseDate(dateStr);
  if (!d) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

for (const f of files) {
  const full = path.join(articlesDir, f);
  const txt = fs.readFileSync(full, 'utf8');
  try {
    const { data } = matter(txt);
    const raw = data.date;
    console.log('---');
    console.log('file:', f);
    console.log('frontmatter.date:', raw);
    console.log('parsed:', parseDate(raw));
    console.log('formatted:', formatDate(raw));
  } catch (err) {
    console.error('ERROR parsing', f, err.message);
  }
}
