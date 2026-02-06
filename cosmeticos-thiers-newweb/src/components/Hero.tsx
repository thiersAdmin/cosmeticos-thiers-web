"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";

export default function Hero() {
  const { ref: contentRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxOffset = scrollY * 0.5;
  const contentOffset = scrollY * 0.15;
  const heroOpacity = Math.max(0, 1 - scrollY / 700);

  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden px-4">
      {/* Parallax Background Layer */}
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1887&auto=format&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${parallaxOffset}px) scale(1.1)`,
          willChange: "transform",
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#FFF7FE]/50 via-[#FFF7FE]/60 to-[#FFF7FE]/80"
        style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
      />

      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-[#E91E63]/10 blur-2xl" style={{ transform: `translateY(${scrollY * 0.3}px) translateX(${scrollY * 0.1}px)` }} />
      <div className="absolute bottom-32 right-16 w-32 h-32 rounded-full bg-[#F48FB1]/20 blur-3xl" style={{ transform: `translateY(${scrollY * -0.2}px) translateX(${scrollY * -0.05}px)` }} />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-[#FCE4EC]/40 blur-xl" style={{ transform: `translateY(${scrollY * 0.4}px)` }} />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto"
        style={{ transform: `translateY(${contentOffset}px)`, opacity: heroOpacity }}
      >
        <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 flex items-center justify-center animate-float scroll-zoom-in ${isVisible ? 'visible' : ''}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#E91E63] transition-transform duration-500 hover:rotate-12">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M50 15 C30 35, 30 65, 50 85 C70 65, 70 35, 50 15" fill="none" stroke="currentColor" strokeWidth="2" />
            <text x="50" y="58" textAnchor="middle" fontSize="24" fill="currentColor" fontFamily="serif">T</text>
          </svg>
        </div>

        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#C2185B] leading-tight tracking-wide mb-4 sm:mb-6 scroll-blur-in stagger-long-1 ${isVisible ? 'visible' : ''}`}>
          Belleza creada con <span className="block">ciencia y</span><span className="block">elegancia</span>
        </h1>

        <p className={`text-xs sm:text-sm md:text-base text-[#5A5A5A] max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2 scroll-slide-up stagger-long-2 ${isVisible ? 'visible' : ''}`}>
          <span className="font-semibold text-[#E91E63]">COSMÉTICOS THIERS</span> es una empresa mexicana especializada en el desarrollo de productos cosméticos de alta calidad, respaldados por la experiencia de un equipo profesional altamente capacitado. Creamos conceptos únicos en belleza y bienestar a través de fórmulas propias y exclusivas que reflejan innovación, confianza y excelencia.
        </p>

        <Link
          href="#servicios"
          className={`group inline-flex items-center gap-2 bg-white hover:bg-[#E91E63] text-[#E91E63] hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-500 shadow-md hover:shadow-xl hover:scale-105 btn-shine text-sm sm:text-base scroll-flip-up stagger-long-3 ${isVisible ? 'visible' : ''}`}
        >
          Servicios
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </Link>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FFF7FE] to-transparent pointer-events-none" />
    </section>
  );
}
