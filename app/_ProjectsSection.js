import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProjects } from '../lib/projects';

export default function ProjectsSection() {
    const projects = getFeaturedProjects();

    return (
        <section id="work" className="w-full bg-paper text-ink py-20 md:py-28 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 md:mb-16 gap-6">
                    <div>
                        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-2 mb-4">
                            <span className="h-px w-8 bg-accent" />
                            Selected Works
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[0.95]">
                            Featured Projects<span className="text-accent">.</span>
                        </h2>
                    </div>

                    <Link href="/projects" className="inline-flex items-center gap-3 group w-fit">
                        <span className="text-xs font-mono uppercase tracking-widest text-ink-2 border-b-2 border-accent/40 pb-0.5 group-hover:border-accent transition-colors duration-300">
                            View All
                        </span>
                        <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-16">
                    {projects.map((project, index) => (
                        <Link href={`/projects/${project.slug}`} key={project.slug || index} className={`group flex flex-col gap-4 ${index % 2 !== 0 ? 'sm:mt-12' : ''}`}>
                            <div className="relative overflow-hidden bg-panel border border-line aspect-4/3 rounded-md">
                                <Image
                                    src={project.image}
                                    alt={project.name}
                                    fill
                                    className="object-contain p-2 transform transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                />
                                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                                    <span className="bg-accent text-paper px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-[3px_3px_0_0_var(--color-ink)]">
                                        View Project
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center border-b border-line pb-3">
                                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-ink group-hover:text-accent-2 transition-colors">
                                        {project.name}
                                    </h3>
                                    <span className="font-mono text-xs tracking-widest text-accent">
                                        0{index + 1}
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                                    <p className="text-ink-2 text-sm font-light max-w-sm line-clamp-2">
                                        {project.description}
                                    </p>
                                    <span className="text-[10px] uppercase tracking-widest text-ink-3 font-mono whitespace-nowrap">
                                        {project.category}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
