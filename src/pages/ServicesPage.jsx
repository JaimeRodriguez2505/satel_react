import React, { useState } from "react";
import { LazyMotion, domAnimation, m, MotionConfig } from "framer-motion";
import { useInView } from "react-intersection-observer";
import '../styles/ServicesPage.css';
import { categories, serviceProcess } from '../data/servicesPageData';

/* ------------------ Animación reutilizable ------------------ */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

// Componente de Tarjeta de Servicio
const ServiceCard = ({ service }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <m.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -10 }}
      className="service-card bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden"
    >
      <div className="relative h-48 sm:h-56 w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          decoding="async"
          className="service-image w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
        />
      </div>

      <div className="p-4 sm:p-8 flex flex-col flex-1">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{service.title}</h3>
        <span className="block text-green-600 font-semibold mb-2 sm:mb-4 text-sm sm:text-base">{service.tagline}</span>
        <p className="text-gray-600 whitespace-pre-line flex-1 text-sm sm:text-base">{service.description}</p>
        <div className="mt-4 sm:mt-6">
          <m.a
            href={`https://wa.me/51951828282?text=Hola, me interesa el servicio de ${service.title}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-[#128C7E] transition-colors duration-300 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            Consultar por WhatsApp
          </m.a>
        </div>
      </div>
    </m.div>
  );
};

// Componente de Paso del Proceso
const ProcessStep = ({ step }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const IconComponent = step.icon;

  return (
    <m.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="process-step bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
    >
      <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6 mx-auto">
        <IconComponent />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
      <p className="text-gray-600">{step.description}</p>
    </m.div>
  );
};

// Componente de Botones Flotantes
const FloatingButtons = () => {
  const phoneNumber = "51951828282";
  const whatsappNumber = "51951828282";

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 flex flex-col gap-3 sm:gap-4 z-50">
      <m.a
        href={`tel:${phoneNumber}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 sm:w-14 sm:h-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors duration-300"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </m.a>
      <m.a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:bg-[#128C7E] transition-colors duration-300"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </m.a>
    </div>
  );
};

// Componente Principal
export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("movil");
  const current = categories.find((c) => c.id === activeCategory);

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig transition={{ duration: 0.45, ease: "easeOut", staggerChildren: 0.1 }}>
        <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-white pt-20">
          
          {/* ---------------- Hero Section ---------------- */}
          <section className="relative w-full h-[45vh] sm:h-[50vh] mb-8 overflow-hidden">
            <m.div
              className="absolute inset-0 bg-cover bg-center hero-image"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              style={{ backgroundImage: `url(${current.heroImage})`, filter: "brightness(0.7)" }}
            >
              <img
                src={current.heroImage}
                alt=""
                className="hidden"
                loading="lazy"
                decoding="async"
              />
            </m.div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
            
            <div className="relative h-full flex flex-col items-center justify-center text-white px-4 text-center">
              <m.h1
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="text-3xl sm:text-5xl md:text-7xl font-bold mb-2 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
              >
                {current.label}
              </m.h1>
              <m.p
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="text-lg sm:text-xl md:text-2xl"
              >
                {current.available}
              </m.p>
            </div>
          </section>
          {/* ------------------------------------------------- */}

          {/* ------------- Selector de Categorías ------------ */}
          <section className="px-4 mb-12">
            <div className="max-w-screen-xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {categories.map((cat) => (
                  <m.button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl font-medium shadow-xl transition-all duration-300 min-h-[140px] ${
                      activeCategory === cat.id
                        ? "bg-white text-green-600 shadow-green-500/20 scale-[1.02]"
                        : "bg-black/40 text-white hover:bg-black/50 backdrop-blur-md"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-1 sm:mb-2 ${
                        activeCategory === cat.id ? "bg-green-100" : "bg-white/10"
                      }`}
                    >
                      {cat.id === 'movil' && (
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-4.2-5.78v1.75l3.2-2.99L12.8 9v1.7c-3.11.43-4.35 2.56-4.8 4.7 1.11-1.5 2.58-2.18 4.8-2.18z"/>
                        </svg>
                      )}
                      {cat.id === 'tablet' && (
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 1H5c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H5V5h14v14z"/>
                        </svg>
                      )}
                      {cat.id === 'laptop' && (
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2h-4zM4 5h16v11H4V5zm8 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                        </svg>
                      )}
                      {cat.id === 'watch' && (
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 12c0-2.54-1.19-4.81-3.04-6.27L16 0H8l-.95 5.73C5.19 7.19 4 9.45 4 12s1.19 4.81 3.05 6.27L8 24h8l.96-5.73C18.81 16.81 20 14.54 20 12zM6 12c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6z"/>
                        </svg>
                      )}
                      {cat.id === 'desktop' && (
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6v2H7v2h10v-2h-2v-2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM3 17V5h18v12H3z"/>
                        </svg>
                      )}
                      {cat.id === 'cargador' && (
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13 5V2H11v3H8l4 8v7h2v-7l4-8h-3z"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-center font-medium text-sm sm:text-base">{cat.label}</span>
                    <span className="text-center text-xs text-white/80 mt-2">
                      {cat.id === 'movil' && 'Desde iPhone 7'}
                      {cat.id === 'tablet' && 'iPad y iPad Pro'}
                      {cat.id === 'laptop' && 'MacBook Air y Pro'}
                      {cat.id === 'watch' && 'Desde Series 3'}
                      {cat.id === 'desktop' && 'iMac y Mac mini'}
                      {cat.id === 'cargador' && 'Originales Apple'}
                    </span>
                  </m.button>
                ))}
              </div>
            </div>
          </section>
          {/* ----------------------------------------------------- */}

          {/* ---------------- LISTA DE SERVICIOS ---------------- */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <m.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
            >
              Descubre Nuestros Servicios
            </m.h2>

            <m.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {current.services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </m.div>
          </section>

          {/* ----------------------- PROCESO ----------------------- */}
          <section className="bg-gradient-to-b from-white to-gray-50 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <m.h2
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
              >
                Nuestro Proceso
              </m.h2>

              <m.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {serviceProcess.map((step) => (
                  <ProcessStep key={step.id} step={step} />
                ))}
              </m.div>
            </div>
          </section>

          {/* ---------------------- CTA FINAL ---------------------- */}
          <section className="py-12 sm:py-20 bg-gradient-to-r from-green-500 to-emerald-600 relative overflow-hidden">
            <m.div
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
            >
              <div className="text-center text-white">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                  ¿Listo para reparar tu dispositivo?
                </h2>
                <p className="text-base sm:text-xl mb-6 sm:mb-8 opacity-90">
                  Contacta con nosotros ahora y obtén un diagnóstico gratuito
                </p>
                <m.a
                  href="https://wa.me/51951828282"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-green-600 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                  Contactar Ahora
                </m.a>
              </div>
            </m.div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-white to-transparent" />
            </div>
          </section>

          {/* ---------------- Botones Flotantes ---------------- */}
          <FloatingButtons />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
