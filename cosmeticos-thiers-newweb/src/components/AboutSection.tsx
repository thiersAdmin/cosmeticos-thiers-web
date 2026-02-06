"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function AboutSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section id="nosotros" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#FFF7FE]" ref={sectionRef}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className={`relative group overflow-hidden rounded-lg scroll-rotate-in ${isVisible ? 'visible' : ''}`}>
          <img
            src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=800&auto=format&fit=crop"
            alt="Productos de cosmética natural"
            className="w-full h-64 sm:h-80 md:h-auto object-cover rounded-lg shadow-lg transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#E91E63]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
        </div>

        <div className={`scroll-fade-right ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#E91E63] font-light tracking-wider mb-4 sm:mb-6 uppercase text-center md:text-left">
            Sobre Nosotros
          </h2>

          <p className="text-sm sm:text-base text-[#5A5A5A] leading-relaxed mb-4 text-center md:text-left">
            La creación de productos cosméticos que combinen el conocimiento científico, la innovación y los altos estándares de calidad, son la prioridad de <span className="font-semibold text-[#C2185B]">Cosméticos Thiers</span>. Nuestro equipo especializado selecciona cuidadosamente activos y materias primas de alto grado cosmético para desarrollar fórmulas seguras, estables y efectivas que respondan a las necesidades reales del cuidado personal.
          </p>

          <p className="text-sm sm:text-base text-[#5A5A5A] leading-relaxed mb-6 text-center md:text-left">
            Mantenemos un compromiso permanente con la mejora continua, incorporando tecnologías, tendencias y activos de última generación. Trabajamos bajo estrictos controles de calidad y en apego a las Normas Oficiales Mexicanas, garantizando procesos confiables y resultados que inspiran confianza en quienes eligen nuestra marca.
          </p>

          <div className="flex justify-center md:justify-start">
            <Link
              href="#"
              className="group inline-flex items-center gap-2 bg-[#E91E63] hover:bg-[#C2185B] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-500 shadow-md hover:shadow-xl hover:scale-105 btn-shine text-sm sm:text-base"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-300 group-hover:rotate-45"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
              Conoce más
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
