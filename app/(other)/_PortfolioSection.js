import Image from 'next/image';
import Link from 'next/link';

const projects = [
    {
        id: 1,
        title: "E-Commerce Architecture",
        category: "Full Stack Development",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800&h=600",
        description: "A modern, high-performance headless e-commerce solution built with Next.js and specialized APIs.",
        link: "#"
    },
    {
        id: 2,
        title: "Fintech Dashboard",
        category: "UI/UX & Frontend",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600",
        description: "Real-time analytics and data visualization dashboard for financial institutions.",
        link: "#"
    },
    {
        id: 3,
        title: "AI Productivity Tool",
        category: "SaaS Application",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=600",
        description: "Automated workflow management powered by machine learning algorithms.",
        link: "#"
    },
    {
        id: 4,
        title: "Creative Agency Site",
        category: "Web Design",
        image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=800&h=600",
        description: "Award-winning portfolio website with complex WebGL interactions and smooth scrolling.",
        link: "#"
    },
];

export default function PortfolioSection() {
    return (
        <section id="work" className="w-full min-h-screen bg-[#050505] text-white py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
                    <div className="space-y-4 max-w-2xl">
                        <p className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-gray-500">
                            Selected Works
                        </p>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
                            Featured <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-600 italic font-light">Projects.</span>
                        </h2>
                    </div>
                    
                    <Link href="/projects" className="inline-flex items-center gap-4 group">
                        <span className="text-xs md:text-sm font-mono uppercase tracking-widest border-b border-white/20 pb-1 group-hover:border-white transition-colors duration-500">
                            View All Projects
                        </span>
                        <div className="w-8 h-[1px] bg-white/20 group-hover:bg-white group-hover:w-16 transition-all duration-500"></div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-24">
                    {projects.map((project, index) => (
                        <div key={project.id} className={`group flex flex-col gap-6 cursor-pointer ${index % 2 !== 0 ? 'md:mt-24' : ''}`}>
                            <div className="relative overflow-hidden bg-[#111] aspect-[4/3] rounded-sm">
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                
                                {/* Hover View Button */}
                                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    <span className="bg-white text-black px-6 py-3 rounded-full text-sm font-semibold tracking-wide uppercase">
                                        View Project
                                    </span>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                    <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-gray-300 transition-colors">
                                        {project.title}
                                    </h3>
                                    <span className="font-mono text-xs tracking-widest text-gray-500 uppercase">
                                        0{project.id}
                                    </span>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                                    <p className="text-gray-400 text-sm font-light max-w-sm">
                                        {project.description}
                                    </p>
                                    <span className="text-xs uppercase tracking-widest text-gray-500 font-mono">
                                        {project.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}