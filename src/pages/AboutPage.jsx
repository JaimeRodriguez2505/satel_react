// src/pages/AboutPage.jsx
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function AboutPage() {
  // Variants para animaciones
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: i * 0.05,
        ease: "easeOut",
      },
    }),
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i = 0) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: i * 0.05,
        ease: "easeOut",
      },
    }),
  };

  // Pilares: Seguridad · Confianza · Experiencia
  const pillars = [
    {
      id: 1,
      title: 'Seguridad',
      description:
        'Tu dispositivo está en manos expertas. Utilizamos procesos seguros y componentes certificados para que vuelvas a conectar con tu mundo digital sin preocupaciones.',
      icon: (
        <svg
          className="w-12 h-12 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.021 12.021 0 002 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-1.657-.335-3.239-.934-4.684M12 8v4l3 3"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Confianza',
      description:
        'Construimos relaciones sólidas y transparentes con cada cliente. Sabemos lo importante que es tu dispositivo, y por eso trabajamos con honestidad y responsabilidad.',
      icon: (
        <svg
          className="w-12 h-12 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 12v2a4 4 0 01-8 0v-2m8-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Experiencia',
      description:
        'Años dedicados a la reparación y mantenimiento de dispositivos Apple nos han formado un know-how único. Con cada solución, sumamos conocimiento y perfeccionamos nuestro servicio.',
      icon: (
        <svg
          className="w-12 h-12 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.105 0-2 .672-2 1.5S10.895 11 12 11s2-.672 2-1.5S13.105 8 12 8zm0 8c-1.105 0-2 .672-2 1.5S10.895 19 12 19s2-.672 2-1.5S13.105 16 12 16z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 12c0 2.21-1.343 4-3 4s-3-1.79-3-4 1.343-4 3-4 3 1.79 3 4z"
          />
        </svg>
      ),
    },
  ];

  // Equipo: Wilfredo Huisa y Elizabeth Rodríguez Yucra
  const teamMembers = [
    {
      id: 1,
      name: 'Wilfredo Huisa',
      role: 'Técnico Especializado en Dispositivos Apple',
      image:
        '/el.png',
      description:
        'Profesional Electrónico con amplia experiencia técnica en dispositivos Apple y dedicación para brindar soluciones expertas.',
      social: {
        linkedin: 'https://linkedin.com/', // Reemplaza con su LinkedIn real
        twitter: 'https://twitter.com/',   // Reemplaza con su Twitter real
        instagram: 'https://instagram.com/', // Reemplaza con su Instagram real
      },
    },
    {
      id: 2,
      name: 'Elizabeth Rodriguez Yucra',
      role: 'Marketing',
      image:
        '/ella.png',
      description: 'Profesional en Marketing con visión para posicionar nuestra marca y conectar mejor con la comunidad.',
      social: {
        linkedin: 'https://linkedin.com/', // Reemplaza con su LinkedIn real
        twitter: 'https://twitter.com/',   // Reemplaza con su Twitter real
        instagram: 'https://instagram.com/', // Reemplaza con su Instagram real
      },
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-white pt-24">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] mb-20 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          style={{ 
            backgroundImage: `url(/banne.jpg)`,
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
          >
            Sobre Nosotros
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl text-center max-w-3xl text-white"
          >
            Expertos en reparación de dispositivos Apple
          </motion.p>
        </div>
      </section>

      {/* Historia Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <motion.img
              src="/panel.png"
              alt="Historia Satel Móvil"
              className="w-full h-[500px] object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </motion.div>

          <div className="space-y-6">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
            >
              Nuestra Historia
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={1}
              className="prose prose-lg text-gray-600"
            >
              <p className="mb-6">
                Satel Móvil nació de la pasión por la tecnología y el compromiso con la excelencia. 
                Desde nuestros inicios, nos hemos dedicado a proporcionar soluciones de reparación 
                de alta calidad para dispositivos Apple, construyendo una reputación basada en la 
                confianza y la experiencia técnica.
              </p>
              <p className="mb-6">
                A lo largo de los años, hemos invertido en tecnología de punta y en la formación 
                continua de nuestro equipo, manteniéndonos al día con las últimas innovaciones 
                de Apple y las mejores prácticas de reparación.
              </p>
              <p>
                Hoy, nos enorgullece ser un referente en la reparación de dispositivos Apple, 
                ofreciendo un servicio que combina expertise técnico con una atención al cliente 
                excepcional.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pilares Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
          >
            Nuestros Pilares
          </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={index}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{pillar.title}</h3>
                <p className="text-gray-600">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Equipo Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
          >
            Nuestro Equipo
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                custom={index}
                className="relative group"
              >
                <div className="relative rounded-2xl overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[400px] object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-green-400 font-medium mb-4">{member.role}</p>
                    <p className="text-white mb-6">{member.description}</p>
                    <div className="flex space-x-4">
                      {Object.entries(member.social).map(([platform, url], i) => (
                        <motion.a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-green-400 transition-colors duration-300"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                        >
                          {platform === 'linkedin' && <FaLinkedin size={24} />}
                          {platform === 'twitter' && <FaTwitter size={24} />}
                          {platform === 'instagram' && <FaInstagram size={24} />}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-600 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Necesitas ayuda con tu dispositivo?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Nuestro equipo está listo para asistirte
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-green-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Contáctanos
            </motion.button>
          </div>
        </motion.div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-white to-transparent"></div>
        </div>
      </section>
    </div>
  );
}
