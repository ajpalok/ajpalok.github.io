'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen((v) => !v);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "https://docs.google.com/document/d/1__6xncJIf7r54OtQyr2iMIp_feQ2gEZyfQzXjXKNCMY/edit?usp=portfolio", label: "Resume" },
    { href: "/projects", label: "Projects" },
    { href: "/articles", label: "Articles" },
    { href: "/achievements", label: "Achievements" },
  ];

  return (
    <nav
      className={`w-full h-16 fixed top-0 left-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-paper/85 backdrop-blur-sm border-b border-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="group inline-flex items-center gap-2 text-xl sm:text-2xl font-extrabold tracking-tight text-ink">
          <span className="h-2.5 w-2.5 bg-accent group-hover:rotate-45 transition-transform duration-300" />
          ABRAR
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-7 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-mono tracking-widest uppercase text-ink-2 hover:text-accent transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 relative z-50"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <div className="flex flex-col justify-center items-center h-6 w-6 space-y-1.5">
            <span className={`block h-0.5 w-full bg-ink transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-ink transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-ink transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 h-screen bg-paper bg-blueprint flex flex-col justify-center items-center z-40 animate-in fade-in duration-300">
          <div className="flex flex-col space-y-7 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-4xl font-extrabold tracking-tight text-ink hover:text-accent transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
