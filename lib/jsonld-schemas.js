/**
 * JSON-LD Schema builders for structured data
 * Covers Person, Portfolio, Article, Project, Achievement, BreadcrumbList, etc.
 */

import { SITE_CONFIG, buildUrl, getArticleUrl, getProjectUrl, getAbsoluteImageUrl } from './config';
import { getSocialSameAsUrls } from './social-links';

export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.author.name,
    url: SITE_CONFIG.baseUrl,
    email: SITE_CONFIG.author.email,
    jobTitle: SITE_CONFIG.author.jobTitle,
    image: buildUrl(SITE_CONFIG.images.avatar),
    sameAs: getSocialSameAsUrls(),
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
    name: SITE_CONFIG.siteName,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.baseUrl,
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
    image: getAbsoluteImageUrl(image || SITE_CONFIG.images.placeholder),
    url: getArticleUrl(slug),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getArticleUrl(slug),
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
    url: getProjectUrl(slug),
    image: getAbsoluteImageUrl(image || SITE_CONFIG.images.placeholder),
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
    name: SITE_CONFIG.siteName,
    url: SITE_CONFIG.baseUrl,
    logo: buildUrl(SITE_CONFIG.images.avatar),
    sameAs: getSocialSameAsUrls(),
  };
}
