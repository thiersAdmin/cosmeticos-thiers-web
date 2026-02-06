"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  { number: "1.", title: "Formulación Personalizada", desc: "Nuestro equipo crea formulaciones personalizadas con ingredientes naturales." },
  { number: "2.", title: "Desarrollo de Productos", desc: "Transformamos ideas en productos de alta calidad." },
  { number: "3.", title: "Producción a Escala", desc: "Nuestras instalaciones utilizan tecnología avanzada." },
  { number: "4.", title: "Envasado y Etiquetado", desc: "Ofrecemos soluciones de envasado innovadoras y ecológicas." },
  { number: "5.", title: "Control de Calidad", desc: "Cada lote cumple con todas las normativas de calidad." },
  { number: "6.", title: "Logística y Distribución", desc: "Gestionamos la logística para entregas a tiempo." },
];

export default function ServicesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: diagramRef, isVisible: diagramVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <>
      <section id="servicios" className="py-20 bg-[#C2185B]">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={headerRef} className={`scroll-blur-in ${headerVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl text-[#F48FB1] font-light tracking-wider text-center mb-4 uppercase">
              Nuestros Servicios
            </h2>
            <p className="text-sm text-[#F48FB1] tracking-wider text-center mb-4 uppercase">
              Maquila de cosméticos naturales México
            </p>
            <p className="text-center text-white/80 max-w-3xl mx-auto mb-12">
              Procesos certificados bajo las Buenas Prácticas de Manufactura (GMP), garantizamos la eficiencia
              y la calidad en la producción de tus productos.
            </p>
          </div>

          <div ref={cardsRef} className="grid md:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`bg-[#AD1457]/60 backdrop-blur-sm p-6 rounded-lg border border-[#E91E63]/30 card-hover cursor-pointer group scroll-slide-up stagger-long-${index + 1} ${cardsVisible ? 'visible' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white transition-all duration-500 group-hover:bg-[#F48FB1] group-hover:text-[#C2185B] group-hover:scale-110 group-hover:rotate-12">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                      <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#F48FB1] text-sm font-semibold tracking-wide uppercase mb-2 transition-colors duration-300 group-hover:text-white">
                      {service.number} {service.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed transition-colors duration-300 group-hover:text-white/90">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FFF7FE]">
        <div className="max-w-4xl mx-auto px-6">
          <div ref={diagramRef} className={`scroll-blur-in ${diagramVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl text-[#E91E63] font-light tracking-wider text-center mb-4 uppercase">
              Nuestros Servicios
            </h2>
            <p className="text-center text-[#5A5A5A] max-w-3xl mx-auto mb-12">
              Procesos certificados bajo las Buenas Prácticas de Manufactura (GMP), garantizamos la eficiencia y la calidad.
            </p>
          </div>

          <div className={`relative w-full max-w-lg mx-auto aspect-square scroll-scale ${diagramVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-[#E91E63] flex items-center justify-center bg-white transition-all duration-500 hover:scale-110 hover:shadow-xl hover:border-[#C2185B] cursor-pointer group">
              <div className="text-center">
                <p className="text-[#E91E63] text-lg font-bold transition-transform duration-300 group-hover:scale-105">NUESTROS</p>
                <p className="text-[#E91E63] text-xl font-bold transition-transform duration-300 group-hover:scale-105">SERVICIOS</p>
              </div>
            </div>

            {["Envasado", "Asesoramiento Legal", "Control de Calidad", "Logística", "Desarrollo", "Formulación"].map((label, i) => (
              <div
                key={label}
                className={`absolute transition-all duration-500 hover:scale-110 hover:z-10 cursor-pointer ${
                  i === 0 ? "top-0 left-1/2 -translate-x-1/2" :
                  i === 1 ? "top-[20%] right-0" :
                  i === 2 ? "top-[45%] right-0" :
                  i === 3 ? "bottom-[20%] right-[15%]" :
                  i === 4 ? "bottom-[20%] left-[15%]" :
                  "top-[45%] left-0"
                }`}
              >
                <div className={`${i % 2 === 0 ? "bg-[#E91E63] hover:bg-[#C2185B]" : "bg-[#F48FB1] hover:bg-[#E91E63]"} text-white px-3 py-2 rounded text-xs font-semibold tracking-wider uppercase text-center transition-all duration-300 hover:shadow-lg`}>
                  {label}
                </div>
              </div>
            ))}

            <svg className="absolute inset-0 w-full h-full" style={{ animation: 'spin 30s linear infinite' }} viewBox="0 0 400 400">
              <ellipse cx="200" cy="200" rx="150" ry="150" fill="none" stroke="#E91E63" strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
