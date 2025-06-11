// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';       // ← nuevo icono “X”

export default function Footer() {
  const surface = '#303031';   // (48,48,49)
  const accent  = '#33B759';   // (51,183,89)

  /* animación de bloques */
  const blockVariants = {
    hidden : { opacity: 0, y: 20 },
    visible: i => ({ opacity: 1, y: 0, transition: { duration: 0.3, delay: i * 0.05, ease: 'easeOut' } })
  };

  return (
    <footer style={{ backgroundColor: surface, color: '#c4c4c4' }}>
      {/* contenido principal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* logo y descripción */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={blockVariants} custom={0} className="space-y-6"
          >
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="Satel Móvil logo" className="h-12 w-12" />
              <span className="text-2xl font-bold text-[#33B759]">Satel&nbsp;Móvil</span>
            </Link>
            <p className="text-gray-400">
              Tu centro de confianza para la reparación de dispositivos Apple. Calidad y
              profesionalismo garantizados.
            </p>

            {/* redes */}
            <div className="flex space-x-4">
              {[
                { icon: FaFacebookF, href: '#' },
                { icon: FaXTwitter,  href: '#' },          // ← X
                { icon: FaInstagram, href: '#' },
                { icon: FaLinkedinIn, href: '#' }
              ].map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="transition-opacity hover:opacity-80"
                  style={{ color: accent }}
                  target="_blank" rel="noopener noreferrer"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* enlaces rápidos */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={blockVariants} custom={1} className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white">Enlaces Rápidos</h3>
            <ul className="space-y-4">
              {[
                { text: 'Inicio',     href: '/' },
                { text: 'Servicios',  href: '/servicios' },
                { text: 'Catálogo',   href: '/catalogo' },
                { text: 'Nosotros',   href: '/nosotros' },
                { text: 'Contacto',   href: '/contacto' }
              ].map(({ text, href }, i) => (
                <motion.li key={i} whileHover={{ x: 5 }}>
                  <Link
                    to={href}
                    className="transition-colors"
                    style={{ color: '#c4c4c4' }}
                    onMouseEnter={e => (e.currentTarget.style.color = accent)}
                    onMouseLeave={e => (e.currentTarget.style.color = '#c4c4c4')}
                  >
                    {text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* servicios */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={blockVariants} custom={2} className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white">Servicios</h3>
            <ul className="space-y-4">
              {[
                'Reparación de iPhone',
                'Reparación de iPad',
                'Reparación de MacBook',
                'Reparación de Apple Watch',
                'Diagnóstico Gratuito'
              ].map((srv, i) => (
                <motion.li key={i} whileHover={{ x: 5 }}>
                  <span
                    className="cursor-pointer transition-colors"
                    style={{ color: '#c4c4c4' }}
                    onMouseEnter={e => (e.currentTarget.style.color = accent)}
                    onMouseLeave={e => (e.currentTarget.style.color = '#c4c4c4')}
                  >
                    {srv}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* contacto */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={blockVariants} custom={3} className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white">Contacto</h3>
            <ul className="space-y-4">
              {[
                { icon: FaMapMarkerAlt, text: 'Pasaje Chule 34 Arequipa 04001 Perú' },
                { icon: FaPhoneAlt,     text: '+51 951 828 282' },
                { icon: FaEnvelope,     text: 'satelmovil@gmail.com' }
              ].map(({ icon: Icon, text }, i) => (
                <motion.li key={i} className="flex items-center space-x-3" whileHover={{ x: 5 }}>
                  <Icon className="h-5 w-5" style={{ color: accent }} />
                  <span className="text-gray-400">{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* barra inferior */}
      <div style={{ borderTop: `1px solid #2a2a2b` }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row
                        justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Satel Móvil. Todos los derechos reservados.</p>
            <span className="hidden md:inline">•</span>
            <p>Desarrollado por <a 
              href="https://tukituki.pe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#33B759] hover:text-[#2a9549] transition-colors"
            >TukiTuki Solutions SAC</a></p>
          </div>
          <div className="flex space-x-6 text-sm">
            {[
              { text: 'Política de Privacidad', href: '#' },
              { text: 'Términos y Condiciones', href: '#' }
            ].map(({ text, href }, i) => (
              <a
                key={i}
                href={href}
                className="transition-colors"
                style={{ color: '#c4c4c4' }}
                onMouseEnter={e => (e.currentTarget.style.color = accent)}
                onMouseLeave={e => (e.currentTarget.style.color = '#c4c4c4')}
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
