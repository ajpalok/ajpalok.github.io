import Link from 'next/link';

export default function NotFound() {
    return (
        <section className="w-full min-h-screen flex items-center justify-center relative overflow-hidden bg-paper text-ink selection:bg-accent selection:text-paper">

            <div className="absolute inset-0 bg-blueprint pointer-events-none select-none" />

            {/* Monumental background numeral */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none z-0 overflow-hidden">
                <span className="text-[42vw] md:text-[34vw] font-extrabold leading-[0.75] tracking-tight text-accent/10">
                    404
                </span>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center w-full max-w-3xl mx-auto px-6">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-2 mb-6">
                    <span className="h-2 w-2 bg-accent" />
                    Error 404
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.95]">
                    Lost in the<br />nothingness<span className="text-accent">.</span>
                </h1>
                <p className="text-ink-2 text-base md:text-lg max-w-md mt-6 leading-relaxed">
                    The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
                </p>

                <Link
                    href="/"
                    className="group mt-9 inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper font-semibold rounded-md hover:bg-accent transition-colors duration-300"
                >
                    Return Home
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
            </div>
        </section>
    );
}
