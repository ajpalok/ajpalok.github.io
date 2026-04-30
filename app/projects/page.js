import { getAllProjects } from '@/lib/projects';
import ProjectsListClient from './ProjectsListClient';

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <section className="w-full min-h-screen bg-[#050505] text-white py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-12">
          <p className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-gray-500">Projects</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">All Projects</h1>
        </div>

        <ProjectsListClient projects={projects} />
      </div>
    </section>
  );
}
