"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#", label: "Inicio", external: false },
  { href: "#nosotros", label: "Nosotros", external: false },
  { href: "#productos", label: "Productos", external: false },
  { href: "#blog", label: "Blog", external: false },
  { href: "https://cosmeticosthiers.myshopify.com/", label: "Tienda", external: true },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Announcement Bar */}
      <div className="text-center py-2 px-4 bg-[#E91E63] overflow-hidden relative z-50">
        <p className="text-sm tracking-[0.2em] uppercase text-white animate-pulse">
          <span className="font-bold">THIERS BEAUTY IN ACTION</span>
        </p>
      </div>

      {/* Header */}
      <header className="fixed top-[36px] left-0 right-0 z-40 py-4 px-6 flex items-center justify-between bg-transparent pointer-events-none">
        <Link href="/" className="flex items-center group pointer-events-auto" style={{ filter: 'drop-shadow(0 2px 4px rgba(255,255,255,0.8)) drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}>
          <svg viewBox="0 0 100 100" className="h-12 w-12 text-[#E91E63] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-all duration-300 group-hover:stroke-[#C2185B]" />
            <path d="M50 15 C30 35, 30 65, 50 85 C70 65, 70 35, 50 15" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-all duration-300 group-hover:stroke-[#C2185B]" />
            <text x="50" y="58" textAnchor="middle" fontSize="24" fill="currentColor" fontFamily="serif">T</text>
          </svg>
        </Link>

        {/* Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col gap-1.5 p-3 hover:opacity-80 transition-all duration-300 group relative bg-[#FFF7FE] rounded-lg shadow-sm hover:shadow-md pointer-events-auto"
          aria-label="Menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`w-6 h-0.5 bg-[#E91E63] transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-2' : 'group-hover:w-8'}`} />
          <span className={`w-6 h-0.5 bg-[#E91E63] transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : 'group-hover:w-4'}`} />
          <span className={`w-6 h-0.5 bg-[#E91E63] transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-2' : 'group-hover:w-6'}`} />
        </button>
      </header>

      {/* Overlay Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#C2185B] z-50 transform transition-transform duration-500 ease-out shadow-2xl ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-[#E91E63]/30">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 100 100" className="h-10 w-10 text-[#F48FB1]">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M50 15 C30 35, 30 65, 50 85 C70 65, 70 35, 50 15" fill="none" stroke="currentColor" strokeWidth="2" />
              <text x="50" y="58" textAnchor="middle" fontSize="24" fill="currentColor" fontFamily="serif">T</text>
            </svg>
            <span className="text-[#F48FB1] font-semibold tracking-wider text-sm">COSMÉTICOS THIERS</span>
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-white hover:text-[#F48FB1] hover:bg-white/10 rounded-full transition-all duration-300"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col p-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              className={`group flex items-center justify-between py-4 text-white hover:text-[#F48FB1] transition-all duration-300 border-b border-[#E91E63]/20 last:border-b-0 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
              style={{ transitionDelay: isMenuOpen ? `${index * 75 + 150}ms` : '0ms' }}
              onClick={() => setIsMenuOpen(false)}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="text-lg font-light tracking-wide group-hover:tracking-wider transition-all duration-300">{link.label}</span>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                {link.label === "Tienda" && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                )}

                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </nav>

        <div className={`absolute bottom-0 left-0 right-0 p-6 border-t border-[#E91E63]/30 transform transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }}>
          <div className="flex justify-center gap-4 mb-4">
            {[
              <svg key="fb" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
              <svg key="ig" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>,
              <svg key="x" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>,
            ].map((icon, i) => (
              <Link key={i} href="#" className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-[#F48FB1] hover:bg-white/10 rounded-full transition-all duration-300">
                {icon}
              </Link>
            ))}
          </div>
          <Link
            href="https://cosmeticosthiers.myshopify.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#F48FB1] hover:bg-white text-[#C2185B] py-3 px-6 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Ir a la Tienda
          </Link>
        </div>
      </div>
    </>
  );
}
