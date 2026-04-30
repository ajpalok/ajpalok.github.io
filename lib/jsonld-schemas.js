/**
 * JSON-LD Schema builders for structured data
 * Covers Person, Portfolio, Article, Project, Achievement, BreadcrumbList, etc.
 */

export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abrar Jahin',
    url: 'https://ajpalok.github.io',
    email: 'contact@abrarjahin.com',
    jobTitle: 'Full-stack Developer',
    image: 'https://ajpalok.github.io/assets/images/me/avatar.png',
    sameAs: [
      'https://github.com/ajpalok',
      'https://linkedin.com/in/abrar-jahin',
    ],
    knowsAbout: [
      'Web Development',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'Full-stack Development',
      'UI/UX Design',
    ],
  };
}

export function getPortfolioSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "Abrar Jahin's Portfolio",
    description: 'A full-stack developer portfolio showcasing projects, articles, and achievements.',
    url: 'https://ajpalok.github.io',
    creator: getPersonSchema(),
    mainEntity: getPersonSchema(),
  };
}

export function getArticleSchema({
  slug,
  title,
  description,
  date,
  image,
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description || title,
    datePublished: date || new Date().toISOString().split('T')[0],
    dateModified: date || new Date().toISOString().split('T')[0],
    author: getPersonSchema(),
    image: image || 'https://ajpalok.github.io/assets/images/placeholder.svg',
    url: `https://ajpalok.github.io/articles/${slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ajpalok.github.io/articles/${slug}`,
    },
  };
}

export function getProjectSchema({
  slug,
  name,
  description,
  image,
  tags,
  featured,
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: name,
    description: description || name,
    url: `https://ajpalok.github.io/projects/${slug}`,
    image: image || 'https://ajpalok.github.io/assets/images/placeholder.svg',
    creator: getPersonSchema(),
    keywords: Array.isArray(tags) ? tags.join(', ') : tags || '',
    featured: featured || false,
  };
}

export function getAchievementSchema({
  slug,
  title,
  issuer,
  issuer_url,
  date_start,
  date_end,
  category,
  credential_url,
  image,
}) {
  const schemaType = category === 'Certification' ? 'EducationalOccupationalCredential' : 'Event';

  return {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: title,
    ...(issuer && { provider: { '@type': 'Organization', name: issuer, ...(issuer_url && { url: issuer_url }) } }),
    ...(date_start && { startDate: date_start }),
    ...(date_end && { endDate: date_end }),
    ...(credential_url && { url: credential_url }),
    ...(image && { image }),
  };
}

export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Abrar Jahin Portfolio',
    url: 'https://ajpalok.github.io',
    logo: 'https://ajpalok.github.io/assets/images/me/avatar.png',
    sameAs: [
      'https://github.com/ajpalok',
      'https://linkedin.com/in/abrar-jahin',
    ],
  };
}
