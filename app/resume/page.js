import ResumeRedirect from './ResumeRedirect';

const RESUME_URL =
  'https://docs.google.com/document/d/1__6xncJIf7r54OtQyr2iMIp_feQ2gEZyfQzXjXKNCMY/edit?usp=portfolio';

export const metadata = {
  title: 'Resume | Abrar Jahin',
  description: "Opening Abrar Jahin's resume.",
  openGraph: {
    title: 'Resume | Abrar Jahin',
    description: "Opening Abrar Jahin's resume.",
    type: 'website',
  },
};

export default function ResumePage() {
  return (
    <section className="w-full bg-paper text-ink min-h-[calc(100vh-4rem)] pt-28 pb-24 px-6 md:px-12 lg:px-24">
      <noscript>
        <meta httpEquiv="refresh" content={`3;url=${RESUME_URL}`} />
        <div className="max-w-xl mx-auto space-y-6 text-sm leading-7 text-ink-2">
          Your browser does not run scripts.{' '}
          <a
            href={RESUME_URL}
            className="text-accent hover:text-accent-2 underline underline-offset-2 font-semibold"
          >
            Open your resume
          </a>
          .
        </div>
      </noscript>

      <div className="max-w-xl mx-auto space-y-10">
        <header className="space-y-2">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-2">
            <span className="h-px w-8 bg-accent" />
            Resume
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ink">
            Opening your CV<span className="text-accent">.</span>
          </h1>
          <p className="text-ink-2 text-sm sm:text-base leading-7 max-w-2xl">
            Your resume is hosted on Google Docs. You will be redirected there in a few seconds.
          </p>
        </header>

        <ResumeRedirect />

        <p className="text-ink-2 text-sm leading-7 max-w-2xl">
          Nothing happened?{' '}
          <a
            href={RESUME_URL}
            className="text-accent hover:text-accent-2 underline underline-offset-2 font-semibold"
          >
            Open your resume
          </a>
          .
        </p>
      </div>
    </section>
  );
}
