import { useState } from 'react';

export default function HomePage() {
  const [selectedDevice, setSelectedDevice] = useState('iphone');

  const deviceContent = {
    iphone: {
      title: "Especialistas en iPhones",
      description: "En nuestro centro de servicio, nos especializamos en la restauración de iPhones. Con un equipo de técnicos altamente calificados y experiencia probada, estamos listos para devolverle la vida a tu iPhone. Desde la pantalla rota hasta problemas de batería o fallas en el software, confía en nosotros para brindarte soluciones eficaces.",
      features: [
        "Restauración de Circuitos con Maestría",
        "Un Análisis a la Medida de tus Necesidades",
        "Componentes Nuevos, Rendimiento Óptimo"
      ],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    },
    watch: {
      title: "Expertos en Apple Watch",
      description: "Tu Apple Watch merece el mejor cuidado. Nuestro equipo especializado maneja con precisión las delicadas reparaciones que tu dispositivo necesita. Desde problemas de pantalla hasta issues de batería, estamos aquí para mantener tu Apple Watch funcionando perfectamente.",
      features: [
        "Reparación de Pantalla y Cristal",
        "Reemplazo de Batería Certificado",
        "Solución de Problemas de Software"
      ],
      image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80"
    },
    ipad: {
      title: "Servicio Especializado para iPads",
      description: "Tu iPad es una herramienta vital para tu creatividad y productividad. Nuestros técnicos están capacitados para manejar cualquier problema que pueda surgir, asegurando que tu dispositivo vuelva a funcionar con el máximo rendimiento.",
      features: [
        "Reparación de Pantalla y Digitalizador",
        "Diagnóstico Completo del Sistema",
        "Recuperación de Datos y Respaldo"
      ],
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80"
    },
    macbook: {
      title: "Reparación Profesional de MacBooks",
      description: "Tu MacBook merece un servicio de primera clase. Nuestros expertos técnicos tienen la experiencia y las herramientas necesarias para diagnosticar y reparar cualquier problema, desde issues de hardware hasta optimización de software.",
      features: [
        "Reparación de Placa Base",
        "Actualización de Hardware",
        "Mantenimiento Preventivo"
      ],
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80"
    }
  };

  const features = [
    {
      id: 1,
      title: "Experiencia y Especialización",
      description: "Con años de experiencia y una dedicación inquebrantable a la calidad, nuestros técnicos altamente capacitados son verdaderos maestros en la reparación de dispositivos Apple. Cada uno de ellos lleva consigo el conocimiento y las certificaciones necesarias para abordar cualquier problema que tu dispositivo pueda enfrentar.",
      image: "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      title: "Servicio de Primera Clase",
      description: "En Satel Móvil, no solo reparamos dispositivos; restauramos la comodidad y la tranquilidad. Ofrecemos un servicio rápido y confiable, garantizando que tus dispositivos vuelvan a funcionar en un abrir y cerrar de ojos.",
      image: "https://images.unsplash.com/photo-1578937014192-39b5fb6b08da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      title: "Calidad Garantizada",
      description: "Nuestra pasión por la excelencia se refleja en cada reparación que realizamos. Respaldamos nuestra calidad con garantías sólidas, asegurando que tu inversión esté protegida.",
      image: "https://images.unsplash.com/photo-1580508174046-170816f65662?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 4,
      title: "Compromiso con el Cliente",
      description: "Tu satisfacción es nuestra prioridad número uno. Estamos aquí para responder tus preguntas, resolver tus problemas y hacer que tu experiencia sea lo más placentera posible.",
      image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "María García",
      role: "Cliente",
      content: "Excelente servicio. Repararon mi iPhone en tiempo récord y el precio fue muy justo.",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      name: "Juan Pérez",
      role: "Cliente",
      content: "Personal muy profesional y atento. Definitivamente volveré si necesito más reparaciones.",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 3,
      name: "Ana Martínez",
      role: "Cliente",
      content: "La mejor experiencia en reparación de dispositivos Apple. Muy recomendado.",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Bienvenido a SatelMovil
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Somos mucho más que un servicio técnico de dispositivos Apple. Somos un equipo apasionado de expertos en tecnología que se enorgullece de ser tu aliado confiable cuando se trata de mantener tus dispositivos Apple en perfecto estado.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white"></div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Satel Móvil: Tu Socio Confiable en Reparación de Dispositivos Apple
            </h2>
            <p className="text-xl text-gray-600">
              Donde la excelencia técnica se encuentra con el compromiso personal. En Satel Móvil, tu satisfacción es nuestra prioridad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature) => (
              <div key={feature.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                <div className="relative h-64">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                    {feature.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Especialistas Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div className="space-y-6">
              <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
                <button 
                  onClick={() => setSelectedDevice('iphone')}
                  className={`px-6 py-2 font-semibold border-b-2 transition-colors ${
                    selectedDevice === 'iphone' 
                      ? 'text-green-600 border-green-600' 
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  iPhones
                </button>
                <button 
                  onClick={() => setSelectedDevice('watch')}
                  className={`px-6 py-2 font-semibold border-b-2 transition-colors ${
                    selectedDevice === 'watch' 
                      ? 'text-green-600 border-green-600' 
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  Apple Watch
                </button>
                <button 
                  onClick={() => setSelectedDevice('ipad')}
                  className={`px-6 py-2 font-semibold border-b-2 transition-colors ${
                    selectedDevice === 'ipad' 
                      ? 'text-green-600 border-green-600' 
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  iPads
                </button>
                <button 
                  onClick={() => setSelectedDevice('macbook')}
                  className={`px-6 py-2 font-semibold border-b-2 transition-colors ${
                    selectedDevice === 'macbook' 
                      ? 'text-green-600 border-green-600' 
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  MacBooks
                </button>
              </div>

              <h2 className="text-3xl font-bold text-gray-900">
                {deviceContent[selectedDevice].title}
              </h2>
              
              <p className="text-gray-600 leading-relaxed">
                {deviceContent[selectedDevice].description}
              </p>

              <ul className="space-y-4">
                {deviceContent[selectedDevice].features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Imagen */}
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img
                src={deviceContent[selectedDevice].image}
                alt={`Técnico reparando ${selectedDevice}`}
                className="w-full h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Testimonios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              En Satel Móvil, creemos en la transparencia y la calidad. No solo somos expertos en reparaciones de dispositivos Apple, sino que también nos enorgullecemos de contar con la satisfacción de nuestros clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ¡Conéctate con Nosotros en las Redes Sociales!
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              En Satel Móvil, valoramos la comunidad y la comunicación directa con nuestros clientes. Sigue nuestras redes sociales para estar al tanto de las últimas noticias, consejos de tecnología, ofertas exclusivas y actualizaciones sobre nuestros servicios de reparación de dispositivos Apple. Únete a nuestra creciente comunidad en línea y mantente conectado con nosotros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Instagram */}
            <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 p-1 rounded-xl transform transition-all duration-300 hover:scale-105">
              <div className="bg-white p-6 rounded-lg h-full flex flex-col items-center justify-center">
                <svg className="w-12 h-12 text-pink-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Instagram</h3>
                <p className="text-gray-600 text-center mb-4">Síguenos para ver fotos exclusivas y contenido detrás de cámaras</p>
                <a href="#" className="text-pink-500 font-semibold hover:text-pink-600">@satelmovil</a>
              </div>
            </div>

            {/* Facebook */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-1 rounded-xl transform transition-all duration-300 hover:scale-105">
              <div className="bg-white p-6 rounded-lg h-full flex flex-col items-center justify-center">
                <svg className="w-12 h-12 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Facebook</h3>
                <p className="text-gray-600 text-center mb-4">Entérate de nuestras últimas novedades y ofertas</p>
                <a href="#" className="text-blue-600 font-semibold hover:text-blue-700">/satelmovil</a>
              </div>
            </div>

            {/* Twitter/X */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-1 rounded-xl transform transition-all duration-300 hover:scale-105">
              <div className="bg-white p-6 rounded-lg h-full flex flex-col items-center justify-center">
                <svg className="w-12 h-12 text-gray-900 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Twitter</h3>
                <p className="text-gray-600 text-center mb-4">Consejos técnicos y actualizaciones en tiempo real</p>
                <a href="#" className="text-gray-900 font-semibold hover:text-gray-700">@satelmovil</a>
              </div>
            </div>

            {/* WhatsApp Business */}
            <div className="bg-gradient-to-r from-green-500 to-green-400 p-1 rounded-xl transform transition-all duration-300 hover:scale-105">
              <div className="bg-white p-6 rounded-lg h-full flex flex-col items-center justify-center">
                <svg className="w-12 h-12 text-green-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp</h3>
                <p className="text-gray-600 text-center mb-4">Contacto directo para consultas y citas</p>
                <a href="#" className="text-green-500 font-semibold hover:text-green-600">+34 XXX XXX XXX</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}