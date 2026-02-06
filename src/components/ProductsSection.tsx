"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const productCards = [
  {
    id: "faciales",
    title: "Productos Faciales",
    desc: "Desarrollamos productos faciales enfocados en la limpieza, hidratación y equilibrio de la piel, utilizando activos de alto grado cosmético y extractos naturales que favorecen una apariencia saludable y luminosa.",
    symbol: "$",
    count: 4,
  },
  {
    id: "corporales",
    title: "Productos Corporales",
    desc: "Nuestra línea corporal está diseñada para nutrir, proteger y revitalizar la piel del cuerpo mediante formulaciones especializadas que combinan bienestar sensorial con cuidado dermatológico integral.",
    symbol: "£",
    count: 5,
  },
  {
    id: "capilares",
    title: "Productos Capilares",
    desc: "Creamos soluciones capilares orientadas al fortalecimiento, hidratación y vitalidad del cabello, integrando ingredientes seleccionados que promueven brillo, suavidad y salud desde la raíz.",
    symbol: "€",
    count: 3,
  },
];

export default function ProductsSection() {
  const [selectedCard, setSelectedCard] = useState<string>("faciales");
  const { ref: topRef, isVisible: topVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: iconsRef, isVisible: iconsVisible } = useScrollAnimation<HTMLDivElement>();

  const selectedProduct = productCards.find((p) => p.id === selectedCard) || productCards[0];

  return (
    <section id="productos" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#FCE4EC]/50 to-[#FFF7FE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={topRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          <div className={`flex justify-center group scroll-fade-left ${topVisible ? 'visible' : ''}`}>
            <img
              src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=400&auto=format&fit=crop"
              alt="Productos naturales"
              className="h-48 sm:h-56 md:h-64 w-auto rounded-lg shadow-md transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105"
            />
          </div>

          <div className={`bg-[#FCE4EC]/60 p-6 sm:p-8 rounded-lg transition-all duration-500 hover:bg-[#FCE4EC] hover:shadow-lg scroll-fade-right ${topVisible ? 'visible' : ''}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#E91E63] font-light tracking-wider mb-4 sm:mb-6 uppercase text-center md:text-left">
              Nuestros Productos
            </h2>
            <p className="text-sm sm:text-base text-[#5A5A5A] leading-relaxed text-center md:text-left">
              Nuestra propuesta se centra en el desarrollo de productos faciales, corporales y capilares que integran conocimiento cosmético, cuidado especializado y una selección rigurosa de activos. Cada formulación se crea con esmero, incorporando aceites esenciales importados, extractos naturales y componentes de alto grado cosmético para brindar equilibrio, bienestar y confianza en el cuidado personal.
            </p>
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 md:mb-16">
          {productCards.map((product, index) => (
            <button
              type="button"
              key={product.id}
              onClick={() => setSelectedCard(product.id)}
              className={`p-6 sm:p-8 rounded-lg text-center card-hover cursor-pointer scroll-flip-up stagger-long-${index + 1} ${cardsVisible ? 'visible' : ''} transition-all duration-300 ${
                selectedCard === product.id
                  ? "bg-[#FCE4EC] shadow-md ring-2 ring-[#E91E63]/50"
                  : "bg-white/50 border border-[#F48FB1]/50 hover:bg-[#FCE4EC]/50"
              }`}
            >
              <div className="flex justify-center mb-4 text-[#E91E63]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 sm:w-12 sm:h-12 transition-all duration-500 hover:scale-125 hover:rotate-12 hover:text-[#C2185B]">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <h3 className="text-[#E91E63] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 sm:mb-4 transition-colors duration-300 hover:text-[#C2185B]">{product.title}</h3>
              <p className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed">{product.desc}</p>
            </button>
          ))}
        </div>

        <div ref={iconsRef} className="max-w-4xl mx-auto">
          <div
            key={selectedCard}
            className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-${Math.min(selectedProduct.count, 5)} gap-6 sm:gap-8 justify-items-center`}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1.5rem',
            }}
          >
            {Array.from({ length: selectedProduct.count }).map((_, index) => (
              <div
                key={`${selectedCard}-${index}`}
                className={`text-center group cursor-pointer scroll-scale stagger-long-${(index % 6) + 1} ${iconsVisible ? 'visible' : ''}`}
                style={{
                  animation: `fadeSlideIn 0.4s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="flex justify-center mb-2 sm:mb-3 text-[#E91E63]">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FCE4EC] flex items-center justify-center transition-all duration-400 group-hover:scale-110 group-hover:bg-[#F48FB1] group-hover:text-white">
                    <span className="text-xl sm:text-2xl font-semibold transition-all duration-300 group-hover:scale-110">
                      {selectedProduct.symbol}
                    </span>
                  </div>
                </div>
                <h4 className="text-[#E91E63] text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 group-hover:text-[#C2185B] group-hover:tracking-widest">
                  Elemento {index + 1}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
