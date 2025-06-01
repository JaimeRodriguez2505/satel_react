import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white py-4 px-6 shadow-lg transition-all duration-300 border-b border-emerald-700/20">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center hover:text-emerald-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Satel Móvil
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              `hover:text-emerald-200 transition-colors duration-300 ${isActive ? 'text-white font-medium border-b-2 border-emerald-400' : 'text-emerald-100'}`
            }
          >
            Inicio
          </NavLink>
          <NavLink 
            to="/servicios" 
            className={({isActive}) => 
              `hover:text-emerald-200 transition-colors duration-300 ${isActive ? 'text-white font-medium border-b-2 border-emerald-400' : 'text-emerald-100'}`
            }
          >
            Servicios
          </NavLink>
          <NavLink 
            to="/catalogo" 
            className={({isActive}) => 
              `hover:text-blue-200 transition-colors ${isActive ? 'text-white font-medium' : 'text-blue-100'}`
            }
          >
            Catálogo
          </NavLink>
          <NavLink 
            to="/nosotros" 
            className={({isActive}) => 
              `hover:text-blue-200 transition-colors ${isActive ? 'text-white font-medium' : 'text-blue-100'}`
            }
          >
            Nosotros
          </NavLink>
          <Link 
            to="/contacto" 
            className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg hover:bg-emerald-200 transition-all duration-300 font-medium shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5"
          >
            Contáctanos
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-emerald-700/50 transition-colors duration-300"
        >
          <svg
            className="h-6 w-6 text-emerald-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4">
          <div className="flex flex-col space-y-4">
            <NavLink
              to="/"
              className={({isActive}) => 
                `hover:text-blue-200 transition-colors ${isActive ? 'text-white font-medium' : 'text-blue-100'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </NavLink>
            <NavLink
              to="/servicios"
              className={({isActive}) => 
                `hover:text-blue-200 transition-colors ${isActive ? 'text-white font-medium' : 'text-blue-100'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </NavLink>
            <NavLink
              to="/catalogo"
              className={({isActive}) => 
                `hover:text-blue-200 transition-colors ${isActive ? 'text-white font-medium' : 'text-blue-100'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Catálogo
            </NavLink>
            <NavLink
              to="/nosotros"
              className={({isActive}) => 
                `hover:text-blue-200 transition-colors ${isActive ? 'text-white font-medium' : 'text-blue-100'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Nosotros
            </NavLink>
            <Link
              to="/contacto"
              className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg hover:bg-emerald-200 transition-all duration-300 font-medium shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Contactar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}