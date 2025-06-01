import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-emerald-900 to-emerald-950 text-white py-12 shadow-lg border-t border-emerald-800/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center hover:text-emerald-300 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Satel Móvil
            </h3>
            <p className="text-emerald-300/80 mb-4 hover:text-emerald-200 transition-colors duration-300">
              Tu tienda confiable de accesorios para celulares. Productos de calidad a los mejores precios.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-emerald-400 hover:text-emerald-300 transform hover:scale-110 transition-all duration-300">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="transform hover:translate-y-[-5px] transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 text-emerald-300">Categorías</h3>
            <ul className="space-y-2">
              <li><Link to="/category/protectores" className="text-emerald-300/80 hover:text-emerald-200 transition-colors duration-300 flex items-center"><span className="hover:translate-x-2 transition-transform duration-300 inline-flex items-center">Protectores de Pantalla</span></Link></li>
              <li><Link to="/category/cargadores" className="text-emerald-300/80 hover:text-emerald-200 transition-colors duration-300 flex items-center"><span className="hover:translate-x-2 transition-transform duration-300 inline-flex items-center">Cargadores</span></Link></li>
              <li><Link to="/category/accesorios" className="text-emerald-300/80 hover:text-emerald-200 transition-colors duration-300 flex items-center"><span className="hover:translate-x-2 transition-transform duration-300 inline-flex items-center">Accesorios</span></Link></li>
              <li><Link to="/category/auriculares" className="text-emerald-300/80 hover:text-emerald-200 transition-colors duration-300 flex items-center"><span className="hover:translate-x-2 transition-transform duration-300 inline-flex items-center">Auriculares</span></Link></li>
              <li><Link to="/category/fundas" className="text-emerald-300/80 hover:text-emerald-200 transition-colors duration-300 flex items-center"><span className="hover:translate-x-2 transition-transform duration-300 inline-flex items-center">Fundas</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-300">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-emerald-300/80 hover:text-emerald-200 transition-colors duration-300 flex items-center"><span className="hover:translate-x-2 transition-transform duration-300 inline-flex items-center">Inicio</span></Link></li>
              <li><Link to="/category/ofertas" className="text-emerald-300/80 hover:text-emerald-200 transition-colors duration-300 flex items-center"><span className="hover:translate-x-2 transition-transform duration-300 inline-flex items-center">Ofertas</span></Link></li>
              <li><Link to="/cart" className="text-emerald-300/80 hover:text-emerald-200 transition-colors duration-300 flex items-center"><span className="hover:translate-x-2 transition-transform duration-300 inline-flex items-center">Carrito</span></Link></li>
              <li><Link to="/contacto" className="text-emerald-300/80 hover:text-emerald-200 transition-colors duration-300 flex items-center"><span className="hover:translate-x-2 transition-transform duration-300 inline-flex items-center">Contacto</span></Link></li>
              <li><Link to="/politicas" className="text-emerald-300/80 hover:text-emerald-200 transition-colors duration-300 flex items-center"><span className="hover:translate-x-2 transition-transform duration-300 inline-flex items-center">Políticas de Privacidad</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-400">Av. Principal 123, Ciudad, País</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-400">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-gray-400">info@mobileshop.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-emerald-800/30 mt-8 pt-8 text-center text-emerald-400 text-sm">
          <p className="hover:text-emerald-300 transition-colors duration-300">&copy; {new Date().getFullYear()} Satel Móvil. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}