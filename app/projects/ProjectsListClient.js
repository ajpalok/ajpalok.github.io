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
      <div className="flex items-center gap-3 mb-10">
        {[['all', 'All Projects'], ['featured', 'Featured']].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${
              filter === value
                ? 'bg-ink text-paper border-ink'
                : 'bg-paper text-ink-2 border-line hover:border-accent/60'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-24">
        {filtered.length === 0 && (
          <p className="text-ink-2">No projects to show.</p>
        )}

        {filtered.map((project, index) => (
          <Link href={`/projects/${project.slug}`} key={project.slug || index} className="group flex flex-col gap-6">
            <div className="relative overflow-hidden bg-panel border border-line aspect-4/3 rounded-md">
              <Image src={project.image} alt={project.name} fill className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-line pb-4">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-ink group-hover:text-accent-2 transition-colors">
                  {project.name}
                </h3>
                <span className="font-mono text-xs tracking-widest text-accent uppercase">0{index + 1}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <p className="text-ink-2 text-sm font-light max-w-sm">{project.description}</p>
                <span className="text-xs uppercase tracking-widest text-ink-3 font-mono">{project.tags?.join(', ')}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
