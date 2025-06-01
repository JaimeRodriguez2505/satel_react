import React from 'react';

export default function AboutPage() {
  const stats = [
    {
      id: 1,
      number: "232",
      title: "Clientes Felices",
      icon: (
        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 2,
      number: "521",
      title: "Proyectos",
      icon: (
        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      id: 3,
      number: "1463",
      title: "Soportes",
      icon: (
        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 4,
      number: "15",
      title: "Trabajadores",
      icon: (
        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Carlos Rodríguez",
      role: "Director Técnico",
      image: "/team/carlos.jpg",
      description: "Con más de 10 años de experiencia en reparación de dispositivos Apple, Carlos lidera nuestro equipo técnico con pasión y dedicación.",
      social: {
        linkedin: "https://linkedin.com/in/carlos-rodriguez",
        twitter: "https://twitter.com/carlos_tech",
        instagram: "https://instagram.com/carlos.tech"
      }
    },
    {
      id: 2,
      name: "Elena Torres",
      role: "Especialista en iPhone",
      image: "/team/elena.jpg",
      description: "Experta certificada en reparación de iPhones, Elena ha restaurado más de 1,000 dispositivos en su carrera.",
      social: {
        linkedin: "https://linkedin.com/in/elena-torres",
        twitter: "https://twitter.com/elena_tech",
        instagram: "https://instagram.com/elena.tech"
      }
    },
    {
      id: 3,
      name: "Miguel Ángel Sanz",
      role: "Técnico de MacBook",
      image: "/team/miguel.jpg",
      description: "Especialista en reparación de placas base y recuperación de datos en MacBooks.",
      social: {
        linkedin: "https://linkedin.com/in/miguel-sanz",
        twitter: "https://twitter.com/miguel_tech",
        instagram: "https://instagram.com/miguel.tech"
      }
    }
  ];

  const pillars = [
    {
      id: 1,
      title: "Seguridad",
      description: "Tu dispositivo está en manos expertas. Utilizamos procesos seguros y componentes certificados.",
      icon: (
        <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Confianza",
      description: "Transparencia total en nuestro trabajo y comunicación honesta con cada cliente.",
      icon: (
        <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Experiencia",
      description: "Años de experiencia respaldando cada reparación con conocimiento técnico profundo.",
      icon: (
        <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero Section con Historia */}
      <div className="relative bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white py-32 px-4 md:py-40">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-emerald-300">
              Nuestra Historia
            </h1>
            <p className="text-lg md:text-2xl mb-4 text-green-300 font-semibold">
              Desde 2014
            </p>
            <p className="text-base md:text-lg leading-relaxed text-gray-100 px-4 md:px-0">
              Nuestra historia es un viaje de pasión y dedicación. Comenzamos con la visión de brindar soluciones excepcionales para dispositivos Apple, y a lo largo de los años, hemos crecido gracias a la confianza y el apoyo de nuestros clientes. Nuestro compromiso es simple: ofrecer la más alta calidad en reparaciones y servicios, respaldados por un equipo de expertos apasionados por la tecnología. En cada dispositivo que tocamos, vemos la oportunidad de devolver la funcionalidad y la magia. Juntos, convertimos desafíos en soluciones y problemas en sonrisas.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white"></div>
      </div>

      {/* Stats Section */}
      <section className="py-12 -mt-24 relative z-10 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-emerald-200">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-emerald-50">
                    {React.cloneElement(stat.icon, { className: "w-8 h-8 text-emerald-600" })}
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-emerald-900 mb-2">{stat.number}</h3>
                <p className="text-emerald-700 font-medium">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilares Section */}
      <section className="py-20 bg-gradient-to-b from-white via-emerald-50 to-white px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              Nuestros Pilares
            </h2>
            <p className="text-lg text-emerald-700 max-w-3xl mx-auto">
              Nos enorgullecemos de ser tu socio confiable en reparación de dispositivos Apple. Trabajamos incansablemente para superar tus expectativas y asegurarnos de que tus dispositivos vuelvan a la vida con un toque de excelencia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {pillars.map((pillar) => (
              <div key={pillar.id} className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-emerald-200">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-emerald-50 inline-block">
                    {React.cloneElement(pillar.icon, { className: "w-12 h-12 text-emerald-600" })}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-emerald-900 mb-4">{pillar.title}</h3>
                <p className="text-emerald-700">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-emerald-50 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-lg text-emerald-700 max-w-3xl mx-auto">
              Experimentados en tecnología, apasionados por la excelencia. Nuestro equipo es tu respaldo para mantener tus dispositivos Apple en óptimas condiciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-emerald-200">
                <div className="relative h-72 md:h-80">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-emerald-300 font-medium">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-emerald-700 mb-6">{member.description}</p>
                  <div className="flex justify-center space-x-6">
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-600 transition-colors duration-300"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-600 transition-colors duration-300"
                      aria-label="Twitter"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-600 transition-colors duration-300"
                      aria-label="Instagram"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
