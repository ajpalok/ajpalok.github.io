/**
 * Shared utility functions safe for both server and client
 */

export function parseTags(tags) {
  if (!tags) return []
  return tags.split(',').map(t => t.trim()).filter(Boolean)
}
