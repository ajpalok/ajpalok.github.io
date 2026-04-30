import { getAllAchievements } from '@/lib/achievements'
import { Metadata } from 'next'
import AchievementsTimeline from '@/components/AchievementsTimeline'

export const metadata = {
  title: 'Achievements',
  description: 'Awards, certifications, and milestones.',
}

export default async function AchievementsPage() {
  const achievements = await getAllAchievements()
  return <AchievementsTimeline achievements={achievements} />
}