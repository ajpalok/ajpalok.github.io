'use client';

import Link from 'next/link';
import SocialMediaLinks from './SocialMediaLinks';
import { details } from './contact';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] text-white border-t border-white/10 bg-linear-to-b from-transparent to-black/20 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">About</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Full-stack developer passionate about building beautiful and functional web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/projects" className="text-sm text-gray-400 hover:text-white transition-colors">
                Projects
              </Link>
              <Link href="/achievements" className="text-sm text-gray-400 hover:text-white transition-colors">
                Achievements
              </Link>
              <Link href="/articles" className="text-sm text-gray-400 hover:text-white transition-colors">
                Articles
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/achievements" className="text-sm text-gray-400 hover:text-white transition-colors">
                Achievements
              </Link>
              <Link href="https://docs.google.com/document/d/1__6xncJIf7r54OtQyr2iMIp_feQ2gEZyfQzXjXKNCMY/edit?usp=portfolio" className="text-sm text-gray-400 hover:text-white transition-colors">
                Resume
              </Link>
              <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms and Conditions
              </Link>
            </nav>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            <div className="flex flex-col gap-4">
              <div className="flex gap-1 flex-wrap">
                <SocialMediaLinks />
              </div>
              <div>
                <a
                  href={`mailto:${details.email}`}
                  className="text-sm text-white hover:text-gray-400 transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M2 6.5C2 4.57 3.57 3 5.5 3h13C20.43 3 22 4.57 22 6.5v11c0 1.93-1.57 3.5-3.5 3.5h-13C3.57 21 2 19.43 2 17.5v-11zM5 6v.01L12 11l7-4.99V6H5zm0 2.24V17.5c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5V8.24l-7.49 5.01a1 1 0 01-1.02 0L5 8.24z" />
                  </svg>
                  <span>{details.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {currentYear} Abrar Jahin. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-gray-300 transition-colors">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
