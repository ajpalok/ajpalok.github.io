import Link from 'next/link';

export default function NotFound() {
    return (
        <section className='w-full min-h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden bg-[#050505] text-white selection:bg-white selection:text-black'>
            
            {/* Monumental Background Typography */}
            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-[0.03] pointer-events-none select-none z-0 overflow-hidden">
                <span className="text-[35vw] md:text-[30vw] font-black leading-[0.75] tracking-tighter uppercase whitespace-nowrap">
                    404
                </span>
            </div>

            {/* Foreground Content */}
            <div className="z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto px-6 md:px-12 pointer-events-none mix-blend-difference">
                <div className="space-y-6 md:space-y-8 pointer-events-auto flex flex-col items-center">
                    <p className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-gray-500">
                        Error 404
                    </p>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05]">
                        Lost in the <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600 italic font-light">
                            nothingness.
                        </span>
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg lg:text-xl font-light max-w-md md:max-w-lg leading-relaxed">
                        The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
                    </p>
                    
                    <div className="pt-8 flex justify-center">
                        <Link href="/" className="inline-flex items-center gap-4 group">
                            <span className="text-xs md:text-sm font-mono uppercase tracking-widest border-b border-white/20 pb-1 group-hover:border-white transition-colors duration-500">
                                Return Home
                            </span>
                            <div className="w-8 h-[1px] bg-white/20 group-hover:bg-white group-hover:w-16 transition-all duration-500"></div>
                        </Link>
                    </div>
                </div>
            </div>
            
        </section>
    )
}
