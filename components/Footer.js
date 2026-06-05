'use client';

import Link from 'next/link';
import SocialMediaLinks from './SocialMediaLinks';
import { contactDetails } from '@/lib/contactDetails';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-paper-2 text-ink border-t border-line mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-14 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* About */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight text-ink">
              <span className="h-2.5 w-2.5 bg-accent" />
              ABRAR
            </Link>
            <p className="text-sm text-ink-2 leading-relaxed max-w-xs">
              Software engineer building human centered products on scalable architectures.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-[11px] uppercase tracking-[0.25em] font-mono text-ink-3">Navigation</h3>
            <nav className="flex flex-col space-y-2.5">
              {[['Home', '/'], ['Projects', '/projects'], ['Articles', '/articles'], ['Achievements', '/achievements']].map(([label, href]) => (
                <Link key={href} href={href} className="text-sm text-ink-2 hover:text-accent transition-colors w-fit">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-[11px] uppercase tracking-[0.25em] font-mono text-ink-3">Resources</h3>
            <nav className="flex flex-col space-y-2.5">
              <Link href="https://docs.google.com/document/d/1__6xncJIf7r54OtQyr2iMIp_feQ2gEZyfQzXjXKNCMY/edit?usp=portfolio" className="text-sm text-ink-2 hover:text-accent transition-colors w-fit">
                Resume
              </Link>
              <Link href="/privacy-policy" className="text-sm text-ink-2 hover:text-accent transition-colors w-fit">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="text-sm text-ink-2 hover:text-accent transition-colors w-fit">
                Terms and Conditions
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-[11px] uppercase tracking-[0.25em] font-mono text-ink-3">Connect</h3>
            <div className="flex flex-col gap-4">
              <div className="flex gap-1 flex-wrap">
                <SocialMediaLinks />
              </div>
              <a
                href={`mailto:${contactDetails.email}`}
                className="text-sm text-ink hover:text-accent transition-colors inline-flex items-center gap-2 w-fit"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2 6.5C2 4.57 3.57 3 5.5 3h13C20.43 3 22 4.57 22 6.5v11c0 1.93-1.57 3.5-3.5 3.5h-13C3.57 21 2 19.43 2 17.5v-11zM5 6v.01L12 11l7-4.99V6H5zm0 2.24V17.5c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5V8.24l-7.49 5.01a1 1 0 01-1.02 0L5 8.24z" />
                </svg>
                <span>{contactDetails.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-line my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-ink-3 gap-4 font-mono">
          <p>&copy; {currentYear} Abrar Jahin. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:text-accent transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
