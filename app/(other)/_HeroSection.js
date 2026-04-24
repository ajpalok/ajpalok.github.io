
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className='w-full min-h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden bg-[#050505] text-white selection:bg-white selection:text-black'>
            
            {/* Monumental Background Typography */}
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-[0.06] pointer-events-none select-none z-0 overflow-hidden">
                <span className="text-[20vw] md:text-[18vw] font-black leading-[0.85] tracking-tighter uppercase whitespace-nowrap">
                    SOFTWARE
                </span>
                <span className="text-[20vw] md:text-[18vw] font-black leading-[0.85] tracking-tighter uppercase whitespace-nowrap">
                    ENGINEER
                </span>
            </div>

            {/* Foreground Content */}
            <div className="z-10 flex flex-col justify-center md:justify-end w-full max-w-7xl mx-auto px-6 md:px-12 pt-[20vh] h-full pb-12 sm:pb-24 pointer-events-none mix-blend-difference">
                <div className="max-w-2xl space-y-6 md:space-y-8 pointer-events-auto -translate-y-44 sm:-translate-y-32 md:translate-y-0">
                    <p className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-gray-400">
                        Portfolio &copy; {new Date().getFullYear()}
                    </p>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05]">
                        Crafting pure <br/>
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-600 italic font-light">
                            digital experiences.
                        </span>
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg lg:text-xl font-light max-w-md md:max-w-lg leading-relaxed">
                        Specializing in modern web applications, interactive design, and elegant minimal architectures.
                    </p>
                    
                    <div className="pt-8">
                        <Link href="#work" className="inline-flex items-center gap-4 group">
                            <span className="text-xs md:text-sm font-mono uppercase tracking-widest border-b border-white/20 pb-1 group-hover:border-white transition-colors duration-500">
                                Explore Work
                            </span>
                            <div className="w-8 h-px bg-white/20 group-hover:bg-white group-hover:w-16 transition-all duration-500"></div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hero Image - Responsive and Elegant */}
            <div className="absolute bottom-0 right-0 w-full sm:w-auto flex justify-center sm:justify-end sm:right-10 md:right-20 lg:right-32 pointer-events-none z-0">
                <Image 
                  src="/assets/images/me/abrar_1.png" 
                  alt="Abrar Jahin" 
                  width={960} 
                  height={1280}
                  priority
                  className="w-auto h-auto max-h-[70vh] sm:max-h-[85vh] md:max-h-[80vh] lg:max-h-[90vh] xl:max-h-[95vh] max-w-[95vw] sm:max-w-[70vw] md:max-w-[50vw] xl:max-w-[40vw] grayscale contrast-125 brightness-90 object-contain object-bottom drop-shadow-2xl"
                />
                
                {/* Seamless Fade Gradient at the bottom to blend with the dark background */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-[#050505] via-[#050505]/50 to-transparent mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-[#050505]/10 mix-blend-overlay"></div>
            </div>
            
        </section>
    )
}