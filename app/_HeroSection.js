import Image from 'next/image';
import Link from 'next/link';
import { SVGSymbols, SocialIcon } from '@/components/SVGS';

export default function HeroSection() {
    const socialIcons = ['github', 'linkedin', 'stackoverflow'];
    const year = new Date().getFullYear();

    return (
        <section className="relative w-full min-h-screen overflow-hidden bg-paper text-ink selection:bg-accent selection:text-paper">

            <SVGSymbols icons={socialIcons} />

            {/* Blueprint grid + decorative brand marks (echo the cover art) */}
            <div className="absolute inset-0 bg-blueprint pointer-events-none select-none" />
            <div
                className="absolute inset-0 pointer-events-none select-none"
                style={{ background: 'radial-gradient(120% 90% at 70% 10%, transparent 55%, color-mix(in oklab, var(--color-ink) 9%, transparent) 100%)' }}
            />
            {/* Orange disc, top-left, bleeding off-edge */}
            <span className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-accent opacity-95 pointer-events-none" />
            <span className="absolute top-8 left-52 w-5 h-5 rounded-full border-2 border-accent pointer-events-none hidden sm:block" />
            {/* Diagonal hatch marks, bottom-left */}
            <div className="absolute bottom-16 left-8 hidden md:flex flex-col gap-2 pointer-events-none">
                {[0, 1, 2].map((i) => (
                    <span key={i} className="block h-px w-16 bg-ink/40 -rotate-[35deg] origin-left" />
                ))}
            </div>
            {/* Corner registration ticks */}
            <CornerTicks />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 min-h-screen grid grid-cols-1 md:grid-cols-12 items-center gap-x-8 gap-y-10 pt-28 pb-16 md:py-24">

                {/* Text column */}
                <div className="md:col-span-7 order-2 md:order-1 flex flex-col items-start">
                    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-ink-3 mb-7">
                        <span className="h-2 w-2 bg-accent" />
                        Portfolio
                        <span className="text-line">/</span>
                        Est. {year}
                    </div>

                    <h1 className="font-extrabold tracking-tight leading-[0.9] text-ink text-[clamp(3.25rem,11vw,7.5rem)]">
                        Abrar<br />Jahin<span className="text-accent">.</span>
                    </h1>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <span className="inline-block bg-accent text-paper font-extrabold uppercase tracking-[0.1em] text-sm md:text-base px-3.5 py-1.5 -rotate-[1.5deg] shadow-[3px_3px_0_0_var(--color-ink)]">
                            Software Engineer
                        </span>
                        <span className="font-mono text-xs text-ink-3 tracking-wider">Dhaka, BD</span>
                    </div>

                    <p className="mt-8 text-ink-2 text-base md:text-lg max-w-xl leading-relaxed">
                        I craft human centered products on scalable architectures, working
                        deep in{' '}
                        <span className="text-accent-2 font-semibold">Ruby on Rails</span>,{' '}
                        <span className="text-accent-2 font-semibold">Laravel</span> and{' '}
                        <span className="text-accent-2 font-semibold">Next.js</span>.
                    </p>

                    {/* CTAs */}
                    <div className="mt-9 flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/#contact"
                            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-ink text-paper font-semibold rounded-md transition-colors duration-300 hover:bg-accent"
                        >
                            Get in Touch
                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </Link>
                        <Link
                            href="/projects"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-ink/25 text-ink font-semibold rounded-md transition-colors duration-300 hover:border-ink hover:bg-ink/[0.04]"
                        >
                            View Projects
                        </Link>
                    </div>

                    {/* Socials + site url */}
                    <div className="mt-10 flex flex-wrap items-center gap-5">
                        <div className="flex gap-3">
                            <a href="https://github.com/ajpalok" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group">
                                <SocialIcon iconName="github" className="w-8 h-8 fill-ink-3 group-hover:fill-accent transition-colors duration-300" />
                            </a>
                            <a href="https://linkedin.com/in/ajpalok" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group">
                                <SocialIcon iconName="linkedin" className="w-8 h-8 fill-ink-3 group-hover:fill-accent transition-colors duration-300" />
                            </a>
                            <a href="https://stackoverflow.com/users/14387700" target="_blank" rel="noopener noreferrer" aria-label="Stack Overflow" className="group">
                                <SocialIcon iconName="stackoverflow" className="w-8 h-8 fill-ink-3 group-hover:fill-accent transition-colors duration-300" />
                            </a>
                        </div>
                        <span className="h-5 w-px bg-line" />
                        <span className="font-mono text-xs tracking-[0.18em] text-ink-2 uppercase">abrar.com.bd</span>
                    </div>
                </div>

                {/* Portrait column — ink line-art on paper */}
                <div className="md:col-span-5 order-1 md:order-2 relative flex justify-center md:justify-end self-end md:self-center">
                    <div className="relative w-[78%] sm:w-[60%] md:w-full max-w-100">
                        <div className="absolute -inset-3 bg-halftone opacity-50 pointer-events-none [mask-image:radial-gradient(closest-side,black,transparent)]" />
                        <Image
                            src="/assets/images/me/abrar_sketch_black.png"
                            alt="Hand-drawn ink portrait of Abrar Jahin, arms crossed, in a BIGBOY tee"
                            width={672}
                            height={1040}
                            priority
                            className="relative w-full h-auto ink-on-paper"
                        />
                        {/* spec caption under the plate */}
                        <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-ink-3">
                            <span>Fig.01</span>
                            <span className="text-accent-2">— ink on paper</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-ink-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
                <span className="h-8 w-px bg-ink/30" />
            </div>
        </section>
    );
}

function CornerTicks() {
    const base = 'absolute w-4 h-4 border-accent pointer-events-none';
    return (
        <>
            <span className={`${base} top-20 left-5 border-t-2 border-l-2`} />
            <span className={`${base} top-20 right-5 border-t-2 border-r-2`} />
            <span className={`${base} bottom-5 left-5 border-b-2 border-l-2`} />
            <span className={`${base} bottom-5 right-5 border-b-2 border-r-2`} />
        </>
    );
}
