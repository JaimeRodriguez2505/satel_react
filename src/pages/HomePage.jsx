import { useState } from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import {
  carouselImages,
  carouselSettings,
  deviceContent,
  features,
  testimonials,
  socialLinks
} from '../data/homePageData';

export default function HomePage() {
  const [selectedDevice, setSelectedDevice] = useState('iphone');

  // Variants para animaciones al hacer scroll
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.05, ease: 'easeOut' }
    })
  };

  const getSocialIcon = (type) => {
    switch(type) {
      case 'facebook': return FaFacebookF;
      case 'twitter': return FaTwitter;
      case 'instagram': return FaInstagram;
      case 'linkedin': return FaLinkedinIn;
      default: return FaFacebookF;
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-white pt-24">
      {/* Hero Section with Carousel */}
      <section className="relative w-full h-[80vh] overflow-hidden">
        <Slider {...carouselSettings} className="h-full">
          {carouselImages.map((slide, index) => (
            <div key={index} className="relative h-[80vh]">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url(${slide.url})`,
                  backgroundPosition: 'center',
                  filter: 'brightness(0.7)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
              <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
                <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">
                  {slide.title}
                </h1>
                <p className="text-2xl md:text-3xl text-center max-w-3xl text-white">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Sección "¿Por qué elegirnos?" */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            custom={0}
            className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
          >
            ¿Por qué elegirnos?
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            custom={1}
            className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-16"
          >
            Nuestro compromiso con la calidad, la rapidez y la satisfacción del cliente nos convierte en tu mejor opción.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                custom={index + 2}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative h-56">
                  <motion.img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                    {feature.title}
                  </h3>
                </div>
                <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Especialistas */}
      <section id="especialistas" className="w-full py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
          >
            Nuestras Especialidades
          </motion.h2>

          <div className="overflow-x-auto scrollbar-hide mb-12">
            <div className="flex space-x-6 justify-center">
              {Object.keys(deviceContent).map((key) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedDevice(key)}
                  className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                    selectedDevice === key
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              custom={2}
              className="space-y-8 max-w-xl mx-auto lg:mx-0"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
                {deviceContent[selectedDevice].title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {deviceContent[selectedDevice].description}
              </p>
              <ul className="space-y-6">
                {deviceContent[selectedDevice].features.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex items-start space-x-4"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-lg text-gray-600">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              custom={3}
              className="relative rounded-2xl shadow-2xl overflow-hidden group"
            >
              <motion.img
                src={deviceContent[selectedDevice].image}
                alt={deviceContent[selectedDevice].title}
                className="w-full h-[600px] object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
                            group-hover:from-black/70 transition-all duration-300"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="w-full py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            custom={0}
            className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
          >
            Lo que dicen nuestros clientes
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            custom={1}
            className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-16"
          >
            La confianza de nuestros clientes nos respalda. Ellos han vivido la experiencia Satel Móvil.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((tst, idx) => (
              <motion.div
                key={tst.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                custom={idx + 2}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full blur-lg opacity-50"></div>
                    <img
                      src={tst.image}
                      alt={tst.name}
                      className="w-20 h-20 rounded-full ring-4 ring-white relative z-10"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">{tst.name}</h4>
                    <p className="text-green-500 font-medium">{tst.role}</p>
                  </div>
                  <p className="text-gray-600 italic text-lg">"{tst.content}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Redes Sociales */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            custom={0}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
          >
            Síguenos en Redes Sociales
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            custom={1}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-12"
          >
            Mantente conectado con nosotros para las últimas novedades, ofertas especiales y contenido exclusivo.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            custom={2}
            className="flex justify-center space-x-8 mb-16"
          >
            {socialLinks.map((social, index) => {
              const Icon = getSocialIcon(social.type);
              return (
                <motion.a
                  key={index}
                  href="#"
                  className={`text-gray-400 transition-all duration-300 ${social.color}`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="h-8 w-8" />
                </motion.a>
              );
            })}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            custom={3}
            className="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
          >
            <motion.img
              src="/comunity.jpg"
              alt="Comunidad Satel Móvil"
              className="w-full h-[400px] object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}