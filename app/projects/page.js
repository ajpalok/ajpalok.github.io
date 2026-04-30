import Image from 'next/image';
import Link from 'next/link';
import { getAllProjects } from '../../lib/projects';

export default function ProjectsPage() {
  const projects = getAllProjects();
  const others = projects.filter((p) => !p.featured);

  return (
    <section className="w-full min-h-screen bg-[#050505] text-white py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-gray-500">Projects</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">All Projects</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-24">
          {others.map((project, index) => (
            <Link href={`/projects/${project.slug}`} key={project.slug || index} className="group flex flex-col gap-6">
              <div className="relative overflow-hidden bg-[#111] aspect-4/3 rounded-sm">
                <Image src={project.image} alt={project.name} fill className="object-cover" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-gray-300 transition-colors">
                    {project.name}
                  </h3>
                  <span className="font-mono text-xs tracking-widest text-gray-500 uppercase">0{index + 1}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="text-gray-400 text-sm font-light max-w-sm">{project.description}</p>
                  <span className="text-xs uppercase tracking-widest text-gray-500 font-mono">{project.tags?.join(', ')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
