import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProjects } from '../lib/projects';

export default function ProjectsSection() {
    const projects = getFeaturedProjects();

    return (
        <section id="work" className="w-full bg-[#050505] text-white py-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
                    <div className="space-y-3 max-w-2xl">
                        <p className="font-mono text-xs tracking-[0.3em] uppercase text-gray-500">
                            Selected Works
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
                            Featured <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-600 italic">Projects.</span>
                        </h2>
                    </div>
                    
                    <Link href="/projects" className="inline-flex items-center gap-3 group">
                        <span className="text-xs font-mono uppercase tracking-widest border-b border-white/20 pb-0.5 group-hover:border-white transition-colors duration-500">
                            View All
                        </span>
                        <div className="w-6 h-px bg-white/20 group-hover:bg-white group-hover:w-12 transition-all duration-500"></div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-16">
                    {projects.map((project, index) => (
                        <Link href={`/projects/${project.slug}`} key={project.slug || index} className={`group flex flex-col gap-4 ${index % 2 !== 0 ? 'sm:mt-12' : ''}`}>
                            <div className="relative overflow-hidden bg-[#111] aspect-4/3 rounded-sm">
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <Image
                                    src={project.image}
                                    alt={project.name}
                                    fill
                                    className="object-contain transform transition-all duration-700 ease-in-out group-hover:scale-105 filter grayscale group-hover:grayscale-0 saturate-50 group-hover:saturate-100"
                                />
                                
                                {/* Hover View Button */}
                                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                    <span className="bg-white text-black px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase">
                                        View
                                    </span>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                    <h3 className="text-lg md:text-xl font-bold tracking-tight group-hover:text-gray-300 transition-colors">
                                        {project.name}
                                    </h3>
                                    <span className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">
                                        0{index + 1}
                                    </span>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                                    <p className="text-gray-400 text-xs font-light max-w-sm line-clamp-2">
                                        {project.description}
                                    </p>
                                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono whitespace-nowrap">
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