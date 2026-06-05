export const metadata = {
  title: 'Privacy Policy | Abrar Jahin',
  description: 'Learn what information is collected on this portfolio site and how it is used.',
};

export default function PrivacyPolicyPage() {
  return (
    <section className="w-full bg-paper text-ink pt-28 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-2">
            <span className="h-px w-8 bg-accent" />
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">Privacy Policy<span className="text-accent">.</span></h1>
          <p className="text-ink-2 text-sm sm:text-base leading-7 max-w-2xl">
            This page explains how information is handled on this portfolio website. It is intentionally simple because the site only collects limited data and does not run an account system.
          </p>
        </header>

        <div className="space-y-8 text-sm sm:text-base leading-7 text-ink-2">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-ink">Information collected</h2>
            <p>
              The site may collect the information you choose to share through email or external links, such as your name, email address, and message content. Basic, non-identifying technical information may also be collected automatically by the hosting provider, such as browser type, device type, and page requests.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-ink">How information is used</h2>
            <p>
              Any contact details you send are used only to respond to your inquiry, continue a conversation, or review collaboration opportunities. Technical usage data may be used to monitor performance, improve content, and keep the site reliable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-ink">Cookies and analytics</h2>
            <p>
              This portfolio may use advertising, affiliate, or analytics technologies that rely on cookies or similar tracking methods to measure traffic, attribute referrals, or support monetized content. Those tools are governed by their own privacy practices.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-ink">Ads and affiliate links</h2>
            <p>
              Some pages may include advertisements or affiliate links. If you click an affiliate link or interact with an ad, the third-party provider may receive information about that visit, and I may earn a commission or other compensation at no extra cost to you.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-ink">Third-party services</h2>
            <p>
              Links to external services such as GitHub, LinkedIn, Google Docs, or email providers are provided for convenience. When you leave this site, their separate policies and terms apply.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-ink">Data retention</h2>
            <p>
              Messages and contact details are kept only as long as needed to respond or maintain relevant records. If you want something removed, you can request deletion by contacting the email listed on the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-ink">Changes to this policy</h2>
            <p>
              This policy may be updated from time to time. The latest version will always be posted on this page.
            </p>
          </section>

          <section className="space-y-3 border-t border-line pt-8">
            <h2 className="text-2xl font-semibold text-ink">Contact</h2>
            <p>
              For questions about this policy, use the email address shown in the footer of the site.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}