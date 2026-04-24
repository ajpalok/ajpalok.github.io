'use client';

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="w-full h-16 fixed top-0 left-0 z-40 pointer-events-none mix-blend-difference text-white glassDisplacementFilter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between pointer-events-auto">
        
        {/* Logo/Brand */}
        <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tighter hover:opacity-75 transition-opacity duration-300">
          ABRAR
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-center gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs sm:text-sm font-mono tracking-widest uppercase hover:opacity-60 transition-opacity duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button - Custom animated icon */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 transition-transform duration-300"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <div className="flex flex-col justify-center items-center h-6 w-6 space-y-1.5 relative z-50">
            <span className={`block h-[1px] w-full bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
            <span className={`block h-[1px] w-full bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-[1px] w-full bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 h-screen bg-[#050505] flex flex-col justify-center items-center pointer-events-auto animate-in fade-in zoom-in duration-300 z-40">
          <div className="flex flex-col space-y-8 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-4xl font-bold tracking-tighter hover:text-gray-400 transition-colors duration-300"
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