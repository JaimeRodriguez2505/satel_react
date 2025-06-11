import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      title: "Dirección",
      details: "Pasaje Chule 34 Arequipa 04001 Perú",
      link: "https://maps.app.goo.gl/rewEnZweHP47Qv9s8"
    },
    {
      icon: <FaPhone className="w-6 h-6" />,
      title: "Teléfono",
      details: "+51 951 828 282",
      link: "tel:+51951828282"
    },
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      title: "Email",
      details: "satelmovil@gmail.com",
      link: "mailto:satelmovil@gmail.com"
    },
    {
      icon: <FaWhatsapp className="w-6 h-6" />,
      title: "WhatsApp",
      details: "+51 951 828 282",
      link: "https://wa.me/51951828282"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-white pt-24">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] mb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3)`,
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">
            Contáctanos
          </h1>
          <p className="text-2xl md:text-3xl text-center max-w-3xl text-white">
            Estamos aquí para ayudarte
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16">
          {/* Formulario de contacto */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Envíanos un mensaje</h2>
            <form className="space-y-6">
              <div className="space-y-4">
                <div className="relative hover:-translate-y-1 transition-transform">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                  />
                </div>
                <div className="relative hover:-translate-y-1 transition-transform">
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                  />
                </div>
                <div className="relative hover:-translate-y-1 transition-transform">
                  <input
                    type="tel"
                    placeholder="Número de teléfono"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                  />
                </div>
                <div className="relative hover:-translate-y-1 transition-transform">
                  <textarea
                    placeholder="Tu mensaje"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                  />
                </div>
              </div>
              <button
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="space-y-8">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600">{item.details}</p>
                  </div>
                </div>
              </a>
            ))}

            {/* Mapa */}
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7654.786241574211!2d-71.530609!3d-16.404849!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424b551fe959d7%3A0x54bdf0b345b75052!2sSATEL%20MOVIL-%20Reparaci%C3%B3n%20de%20iphone%20Especializado!5e0!3m2!1ses!2spe!4v1749054653649!5m2!1ses!2spe"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Horario de Atención */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Horario de Atención</h2>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-gray-600">Lunes - Viernes</div>
                <div className="font-semibold">9:00 AM - 7:00 PM</div>
                <div className="text-gray-600">Sábados</div>
                <div className="font-semibold">10:00 AM - 2:00 PM</div>
                <div className="text-gray-600">Domingos</div>
                <div className="font-semibold">Cerrado</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
