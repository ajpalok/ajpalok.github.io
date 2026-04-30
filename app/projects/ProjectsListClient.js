"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function ProjectsListClient({ projects }) {
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    if (!projects) return [];
    if (filter === 'featured') return projects.filter((p) => p.featured);
    return projects;
  }, [projects, filter]);

  return (
    <div>
      <div className="flex items-center gap-6 mb-8">
        <div className="flex items-center gap-3">
          <input
            id="filter-all"
            type="radio"
            name="project-filter"
            value="all"
            checked={filter === 'all'}
            onChange={() => setFilter('all')}
            className="h-5 w-5 accent-gray-300 cursor-pointer"
          />
          <label htmlFor="filter-all" className="text-sm text-gray-300 cursor-pointer">All Projects</label>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="filter-featured"
            type="radio"
            name="project-filter"
            value="featured"
            checked={filter === 'featured'}
            onChange={() => setFilter('featured')}
            className="h-5 w-5 accent-gray-300 cursor-pointer"
          />
          <label htmlFor="filter-featured" className="text-sm text-gray-300 cursor-pointer">Featured</label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-24">
        {filtered.length === 0 && (
          <p className="text-gray-400">No projects to show.</p>
        )}

        {filtered.map((project, index) => (
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
  );
}
