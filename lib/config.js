/**
 * Site configuration
 * Single source of truth for URLs and paths
 */

import { contactDetails } from "@/lib/contactDetails";

export const SITE_CONFIG = {
  baseUrl: 'https://abrar.com.bd',
  siteName: "Abrar Jahin's Portfolio",
  title: "Abrar Jahin's Portfolio",
  description:
    "Welcome to my portfolio website! I'm Abrar Jahin, a passionate software developer specializing in web development and design. Here, you'll find a showcase of my projects, skills, and experience. Feel free to explore and get in touch if you'd like to collaborate or learn more about my work.",
  author: {
    name: 'Abrar Jahin',
    jobTitle: 'Full-stack Developer',
    email: contactDetails.email,
    phone: contactDetails.phone,
    location: contactDetails.location,
  },
  images: {
    avatar: '/assets/images/me/abrar_1.png',
    placeholder: '/assets/images/placeholder.svg',
    ogImage: '/assets/images/me/Abrar_OpenGraph_Image.png',
  }
};

/**
 * Build absolute URL from relative path
 */
export function buildUrl(path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.baseUrl}${cleanPath}`;
}

/**
 * Build article URL
 */
export function getArticleUrl(slug) {
  return buildUrl(`/articles/${slug}`);
}

/**
 * Build project URL
 */
export function getProjectUrl(slug) {
  return buildUrl(`/projects/${slug}`);
}

/**
 * Build achievement URL
 */
export function getAchievementUrl(slug) {
  return buildUrl(`/achievements/${slug}`);
}

/**
 * Build image URL
 */
export function getImageUrl(imagePath) {
  if (!imagePath) return buildUrl(SITE_CONFIG.images.placeholder);
  if (imagePath.startsWith('http')) return imagePath;
  return buildUrl(imagePath);
}

/**
 * Get absolute image URL
 */
export function getAbsoluteImageUrl(imagePath) {
  return imagePath.startsWith('http')
    ? imagePath
    : `${SITE_CONFIG.baseUrl}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
}
