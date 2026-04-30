
import Image from 'next/image';
import Link from 'next/link';
import { SocialMediaLinksJSON } from '@/components/SocialMediaLinks';
import { SVGSymbols, SocialIcon } from '@/components/SVGS';

export default function HeroSection() {
    const socialIcons = ['github', 'linkedin', 'stackoverflow', 'medium', 'twitter', 'instagram', 'facebook', 'youtube', 'telegram'];

    return (
        <section className='w-full min-h-screen flex flex-col md:flex-row items-center justify-center relative overflow-hidden bg-[#050505] text-white selection:bg-white selection:text-black'>
            
            {/* SVG Symbols Sprite Sheet */}
            <SVGSymbols icons={socialIcons} />
            
            {/* SVG Pattern Background with Gradient Blobs */}
            <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
                {/* SVG Pattern Background */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <pattern id="patternRepeat" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path
                                d='M0 0h10v20H0zM30 0v10H10V0zM10 10h10v20H10zM40 10v10H20V10zM20 20h10v20H20zM50 20v10H30V20zM30 30h10v20H30zM20 30v10H0V30zM10 20v10h-20V20zM30-10h10v20H30z'
                                strokeWidth="0.5"
                                stroke="rgb(85, 85, 85)"
                                opacity="0.12"
                                fill="none"
                            />
                        </pattern>
                    </defs>
                    
                    {/* Base Pattern Fill */}
                    <rect width="100%" height="100%" fill="url(#patternRepeat)" />
                </svg>

                {/* Gradient Blobs using Tailwind */}
                <span className="hidden md:block absolute top-0 left-1/4 w-96 h-96 bg-linear-to-br from-gray-600 to-gray-800 rounded-full filter blur-3xl opacity-20 mix-blend-multiply"></span>
                <span className="hidden md:block absolute bottom-1/4 right-2/3 w-80 h-80 bg-linear-to-tl from-gray-700 to-gray-500 rounded-full filter blur-3xl opacity-15 mix-blend-screen"></span>
                <span className="hidden md:block absolute top-1/3 right-1/4 w-72 h-72 bg-linear-to-b from-gray-500 via-gray-700 to-gray-900 rounded-full filter blur-2xl opacity-10 mix-blend-multiply"></span>

                {/* Subtle Radial Gradient Vignette */}
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(0,0,0,0.2) 100%)'
                }}></div>
            </div>

            {/* Foreground Content */}
            <div className="z-10 flex flex-col items-center md:items-start justify-start md:justify-end w-full max-w-7xl mx-auto px-6 md:px-12 pt-6 md:pt-[20vh] pb-12 sm:pb-24 pointer-events-none mix-blend-difference order-2 md:order-0">
                <div className="max-w-2xl space-y-6 md:space-y-8 pointer-events-auto">
                    <p className="font-mono text-xs sm:text-sm text-center md:text-left tracking-[0.3em] uppercase text-gray-400">
                        Portfolio &copy; {new Date().getFullYear()}
                    </p>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center md:text-left font-light tracking-tighter leading-[1.05]">
                        Hello, I'm <br/>
                        <span className="text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-600 italic font-bold">
                            Abrar Jahin
                        </span>
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg lg:text-xl text-center md:text-left font-light max-w-md md:max-w-lg leading-relaxed">
                        Crafting Human Centered Designs with scalable architectures. Experienced in <span className="text-white">Ruby on Rails</span>, <span className="text-white">Laravel</span> and <span className="text-white">Next.js</span>.
                    </p>

                    <div className="pt-8 space-y-6">
                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4">
                            <Link href="/#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300">
                                Get in Touch
                            </Link>
                            <Link href="/projects" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300">
                                View Projects
                            </Link>
                        </div>

                        {/* Social Media Links */}
                        <div className="flex justify-center md:justify-start items-center gap-4 pt-4">
                            <div className="flex gap-3">
                                {/* GitHub */}
                                <a href="https://github.com/ajpalok" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center">
                                    <SocialIcon iconName="github" className="w-9 h-9 fill-gray-400 group-hover:fill-white transition-colors duration-300" />
                                </a>

                                {/* LinkedIn */}
                                <a href="https://linkedin.com/in/ajpalok" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center">
                                    <SocialIcon iconName="linkedin" className="w-9 h-9 fill-gray-400 group-hover:fill-white transition-colors duration-300" />
                                </a>

                                {/* Stack Overflow */}
                                <a href="https://stackoverflow.com/users/14387700" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center">
                                    <SocialIcon iconName="stackoverflow" className="w-9 h-9 fill-gray-400 group-hover:fill-white transition-colors duration-300" />
                                </a>

                                {/* Medium */}
                                {/* <a href="https://medium.com/@ajpalok" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center">
                                    <SocialIcon iconName="medium" className="w-9 h-9 fill-gray-400 group-hover:fill-white transition-colors duration-300" />
                                </a> */}

                                {/* Twitter */}
                                {/* <a href="https://twitter.com/ajpalok" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center">
                                    <SocialIcon iconName="twitter" className="w-9 h-9 fill-gray-400 group-hover:fill-white transition-colors duration-300" />
                                </a> */}

                                {/* Instagram */}
                                {/* <a href="https://instagram.com/ajpalok_insta" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center">
                                    <SocialIcon iconName="instagram" className="w-9 h-9 fill-gray-400 group-hover:fill-white transition-colors duration-300" />
                                </a> */}

                                {/* Facebook */}
                                {/* <a href="https://facebook.com/ajpalok.fb" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center">
                                    <SocialIcon iconName="facebook" className="w-9 h-9 fill-gray-400 group-hover:fill-white transition-colors duration-300" />
                                </a> */}

                                {/* YouTube */}
                                {/* <a href="https://youtube.com/@ajpalok" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center">
                                    <SocialIcon iconName="youtube" className="w-9 h-9 fill-gray-400 group-hover:fill-white transition-colors duration-300" />
                                </a> */}

                                {/* Telegram */}
                                {/* <a href="https://t.me/ajpalok" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center">
                                    <SocialIcon iconName="telegram" className="w-9 h-9 fill-gray-400 group-hover:fill-white transition-colors duration-300" />
                                </a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Image */}
            <div className="w-full flex justify-center order-1 md:absolute md:bottom-0 md:right-0 md:w-auto md:justify-end xl:right-32 pointer-events-none z-0 h-[60vh] md:h-auto">
                <Image 
                  src="/assets/images/me/abrar_1.png" 
                  alt="Abrar Jahin" 
                  width={960} 
                  height={1280}
                  priority
                  className="h-full w-auto object-contain object-bottom max-h-[60vh] md:max-h-[80vh] lg:max-h-[90vh] xl:max-h-[95vh] max-w-[90vw] md:max-w-[50vw] xl:max-w-[40vw] grayscale contrast-125 brightness-90 drop-shadow-2xl"
                />
                
                {/* Seamless Fade Gradient at the bottom to blend with the dark background */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-[#050505] via-[#050505]/50 to-transparent mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-[#050505]/10 mix-blend-overlay"></div>
            </div>
            
        </section>
    )
}