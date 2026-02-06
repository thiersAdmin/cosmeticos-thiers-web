"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Footer() {
  const { ref: footerRef, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <footer className="bg-[#C2185B] py-12" ref={footerRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`flex justify-center gap-6 mb-8 scroll-zoom-in ${isVisible ? 'visible' : ''}`}>
          {[
            <svg key="fb" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
            <svg key="ig" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>,
            <svg key="x" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>,
          ].map((icon, i) => (
            <Link
              key={i}
              href="#"
              className={`w-10 h-10 flex items-center justify-center text-white hover:text-[#F48FB1] transition-all duration-300 hover:scale-125 hover:rotate-12 hover:bg-white/10 rounded-full scroll-rotate-in stagger-${i + 1} ${isVisible ? 'visible' : ''}`}
            >
              {icon}
            </Link>
          ))}
        </div>

        <div className={`text-center text-white/80 text-sm scroll-blur-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
          <p className="mb-4">© 2026 <span className="font-semibold hover:text-[#F48FB1] transition-colors duration-300 cursor-pointer">Cosméticos Thiers</span>. Todos los derechos reservados.</p>
          <Link href="#" className="text-white/70 hover:text-[#F48FB1] transition-all duration-300 hover:underline underline-offset-4">Política de privacidad</Link>
        </div>
      </div>

      {/* WhatsApp Button */}
      <Link
        href="https://api.whatsapp.com/send?phone=525513069525"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-125 hover:rotate-12 transition-all duration-300 z-50 group animate-pulse-soft"
        aria-label="WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="transition-transform duration-300 group-hover:scale-110">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF6B00] rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF6B00] rounded-full" />
      </Link>
    </footer>
  );
}
