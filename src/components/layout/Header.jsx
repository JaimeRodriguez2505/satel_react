// src/components/Header.jsx
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaShoppingCart,
  FaUser
} from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, logout } = useAuth();

  /* animación suave para cada ítem */
  const navItemVariants = {
    hidden:  { opacity: 0, y: -10 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.07 }
    })
  };

  /* paleta — usamos los valores RGB solicitados */
  const surface = '#303031';
  const accent  = '#33B759';

  /* enlaces de navegación — mantén tus rutas originales */
  const links = [
    { to: '/',          label: 'Inicio'     },
    { to: '/servicios', label: 'Servicios'  },
    { to: '/catalogo',  label: 'Catálogo'   },
    { to: '/nosotros',  label: 'Nosotros'   }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[9999]">
      {/* ░░░ Barra superior ░░░ */}
      <div
        className="text-sm py-3 px-2 sm:px-6 flex justify-between flex-wrap"
        style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex items-center gap-1">
            <FaPhoneAlt className="text-xs" /> +51 951 828 282
          </span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-xs" /> Pasaje Chule 34 Arequipa 04001 Perú
          </span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center gap-1">
            <FaClock className="text-xs" /> Lun - Dom 10:00-20:00
          </span>
        </div>

        <div className="flex gap-4">
          <a href="https://facebook.com" style={{ color: '#ffffff' }}
             className="hover:opacity-80 transition-opacity"><FaFacebookF /></a>
          <a href="https://instagram.com" style={{ color: '#ffffff' }}
             className="hover:opacity-80 transition-opacity"><FaInstagram /></a>
        </div>
      </div>

      {/* ░░░ Navegación principal ░░░ */}
      <motion.nav
        initial={{ y: -70 }}
        animate={{ y: 0 }}
        transition={{ duration: .35 }}
        style={{ backgroundColor: surface }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-36">
            {/* Logo y nombre */}
            <Link to="/" className="relative group shrink-0 flex items-center gap-4">
              <motion.img
                src="/logo.png"
                alt="Satel Móvil"
                className="h-28 w-auto drop-shadow-xl transition-transform duration-300
                           group-hover:scale-105"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              />
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col"
              >
                <span className="text-4xl font-bold text-[#33B759]" style={{ fontFamily: 'Montserrat' }}>
                  Satel
                </span>
                <span className="text-4xl font-bold text-white" style={{ fontFamily: 'Montserrat' }}>
                  Móvil
                </span>
              </motion.div>
            </Link>

            {/* Menú desktop */}
            <div className="hidden md:flex items-center space-x-9">
              {links.map(({ to, label }, i) => (
                <motion.div key={label} custom={i}
                            initial="hidden" animate="visible" variants={navItemVariants}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `inline-block pb-0.5 font-medium tracking-wide transition-colors
                       ${isActive ? 'border-b-2 text-[#33B759]' : 'text-[#e5e5e5] hover:opacity-90'}`
                    }
                    style={({ isActive }) => ({
                      borderColor: isActive ? accent : 'transparent'
                    })}
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}

              {/* Carrito + CTA */}
              <motion.div custom={links.length + 1}
                          initial="hidden" animate="visible" variants={navItemVariants}
                          className="flex items-center gap-6">
                <Link to="/carrito" className="relative" style={{ color: '#d1d1d1' }}>
                  <FaShoppingCart size={22} />
                  {!!itemCount && (
                    <span
                      className="absolute -top-2 -right-2 text-xs font-bold w-5 h-5 rounded-full
                                 flex items-center justify-center"
                      style={{ backgroundColor: accent, color: '#fff' }}
                    >
                      {itemCount}
                    </span>
                  )}
                </Link>

                <div className="relative group">
                  {user ? (
                    <div className="flex items-center gap-2">
                      <Link
                        to="/dashboard"
                        className="text-[#d1d1d1] hover:text-white transition-colors"
                      >
                        <FaUser size={20} />
                      </Link>
                      <button
                        onClick={logout}
                        className="text-sm text-red-500 hover:text-red-400 transition-colors"
                      >
                        Salir
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="text-[#d1d1d1] hover:text-white transition-colors"
                    >
                      <FaUser size={20} />
                    </Link>
                  )}
                </div>

                <Link
                  to="/contacto"
                  className="px-5 py-2.5 rounded-lg shadow-md font-medium transition-transform"
                  style={{
                    backgroundColor: accent,
                    color: '#000'
                  }}
                >
                  Contáctanos
                </Link>
              </motion.div>
            </div>

            {/* Botón hamburguesa */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: accent }}
            >
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d={isMenuOpen ? 'M6 18L18 6M6 6l12 12'
                                    : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: .25 }}
          className="md:hidden overflow-hidden"
          style={{ backgroundColor: surface }}
        >
          <div className="px-4 py-4 space-y-2 text-center font-medium">
            {links.map(({ to, label }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 transition-opacity ${isActive ? 'text-[#33B759]' : 'text-[#e5e5e5]'}`
                }
              >
                {label}
              </NavLink>
            ))}

            <div className="pt-3 flex items-center justify-center gap-6">
              <Link to="/carrito" onClick={() => setIsMenuOpen(false)} className="relative"
                    style={{ color: '#e5e5e5' }}>
                <FaShoppingCart size={22} />
                {!!itemCount && (
                  <span
                    className="absolute -top-2 -right-3 text-xs font-bold w-5 h-5 rounded-full
                               flex items-center justify-center"
                    style={{ backgroundColor: accent, color: '#fff' }}
                  >
                    {itemCount}
                  </span>
                )}
              </Link>
              <div className="flex items-center justify-center gap-4">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-[#e5e5e5] hover:text-white transition-colors"
                    >
                      <FaUser size={20} />
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      Salir
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#e5e5e5] hover:text-white transition-colors"
                  >
                    <FaUser size={20} />
                  </Link>
                )}
              </div>
              <Link
                to="/contacto"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg shadow-md"
                style={{ backgroundColor: accent, color: '#000' }}
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Línea de acento inferior */}
      <div style={{ height: '4px', backgroundColor: accent }}></div>
    </header>
  );
}
