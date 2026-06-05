export const metadata = {
  title: 'Terms and Conditions | Abrar Jahin',
  description: 'Read the terms for using this portfolio website and its content.',
};

export default function TermsAndConditionsPage() {
  return (
    <section className="w-full bg-paper text-ink pt-28 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-2">
            <span className="h-px w-8 bg-accent" />
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">Terms and Conditions<span className="text-accent">.</span></h1>
          <p className="text-ink-2 text-sm sm:text-base leading-7 max-w-2xl">
            These terms explain the basic rules for using this portfolio website, its content, and its external links.
          </p>
        </header>

        <div className="space-y-8 text-sm sm:text-base leading-7 text-ink-2">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-ink">Use of the site</h2>
            <p>
              You may browse the site for personal, informational, and professional purposes. You agree not to use it in a way that disrupts the experience for others, attempts unauthorized access, or interferes with the operation of the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-ink">Content ownership</h2>
            <p>
              Unless otherwise stated, the text, visuals, and code presented on this site are the property of Abrar Jahin or are used with permission. You may reference the content for personal viewing, but you should not copy, reproduce, or redistribute it without consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-ink">External links</h2>
            <p>
              This site may include links to third-party websites and tools. Those services are outside this site’s control, so your use of them is subject to their own terms and policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-ink">Affiliate links and ads</h2>
            <p>
              Some pages may display advertisements or contain affiliate links. If you click those links or engage with ads, the relevant third party may track the visit and I may receive compensation. Any product or service mention is provided for convenience and does not guarantee endorsement or suitability for your needs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-ink">No warranties</h2>
            <p>
              The content is provided as is for general information. While reasonable care is taken to keep the site accurate and functional, no guarantee is made that every part of the site will always be current, error-free, or uninterrupted.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-ink">Limitation of liability</h2>
            <p>
              To the extent permitted by applicable law, Abrar Jahin is not liable for indirect, incidental, or consequential damages arising from the use of this website or reliance on its content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-ink">Changes to these terms</h2>
            <p>
              These terms may be revised at any time without prior notice. Continued use of the site after changes are posted means you accept the updated terms.
            </p>
          </section>

          <section className="space-y-3 border-t border-line pt-8">
            <h2 className="text-2xl font-semibold text-ink">Contact</h2>
            <p>
              If you have questions about these terms, please use the contact email shown in the footer.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}