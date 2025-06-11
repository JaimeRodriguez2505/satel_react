// Imágenes del carrusel
export const carouselImages = [
  {
    url: '/carru1.jpg',
    title: 'Bienvenido a SatelMóvil',
    subtitle: 'Tu centro experto en reparaciones Apple',
  }
];

// Configuración del carrusel
export const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 0,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  fade: true
};

// Contenido de cada dispositivo
export const deviceContent = {
  iphone: {
    title: 'Especialistas en iPhones',
    description:
      'En nuestro centro de servicio, nos especializamos en la restauración de iPhones. Con un equipo de técnicos altamente calificados y experiencia probada, estamos listos para devolverle la vida a tu iPhone. Desde la pantalla rota hasta problemas de batería o fallas en el software, confía en nosotros para brindarte soluciones eficaces.',
    features: [
      'Restauración de Circuitos con Maestría',
      'Análisis a la Medida de tus Necesidades',
      'Componentes Nuevos, Rendimiento Óptimo',
    ],
    image: '/i16.jpeg',
  },
  watch: {
    title: 'Expertos en Apple Watch',
    description:
      'Tu Apple Watch merece el mejor cuidado. Nuestro equipo especializado maneja con precisión las delicadas reparaciones que tu dispositivo necesita. Desde problemas de pantalla hasta issues de batería, estamos aquí para mantener tu Apple Watch funcionando perfectamente.',
    features: [
      'Reparación de Pantalla y Cristal',
      'Reemplazo de Batería Certificado',
      'Solución de Problemas de Software',
    ],
    image:
      '/w2.jpeg',
  },
  ipad: {
    title: 'Servicio Especializado para iPads',
    description:
      'Tu iPad es una herramienta vital para tu creatividad y productividad. Nuestros técnicos están capacitados para manejar cualquier problema que pueda surgir, asegurando que tu dispositivo vuelva a funcionar con el máximo rendimiento.',
    features: [
      'Reparación de Pantalla y Digitalizador',
      'Diagnóstico Completo del Sistema',
      'Recuperación de Datos y Respaldo',
    ],
    image:
      '/ipro.jpeg',
  },
  macbook: {
    title: 'Reparación Profesional de MacBooks',
    description:
      'Tu MacBook merece un servicio de primera clase. Nuestros expertos técnicos tienen la experiencia y las herramientas necesarias para diagnosticar y reparar cualquier problema, desde issues de hardware hasta optimización de software.',
    features: [
      'Reparación de Placa Base',
      'Actualización de Hardware',
      'Mantenimiento Preventivo',
    ],
    image:
      '/mpro.jpeg',
  },
};

// Secciones "¿Por qué elegirnos?"
export const features = [
  {
    id: 1,
    title: 'Experiencia y Especialización',
    description:
      'Con años de experiencia y una dedicación inquebrantable a la calidad, nuestros técnicos altamente capacitados son verdaderos maestros en la reparación de dispositivos Apple.',
    image: '/home1.jpg',
  },
  {
    id: 2,
    title: 'Servicio de Primera Clase',
    description:
      'En Satel Móvil, no solo reparamos dispositivos; restauramos la comodidad y la tranquilidad. Ofrecemos un servicio rápido y confiable.',
    image: '/home2.avif',
  },
  {
    id: 3,
    title: 'Calidad Garantizada',
    description:
      'Nuestra pasión por la excelencia se refleja en cada reparación que realizamos. Respaldamos nuestra calidad con garantías sólidas.',
    image: '/gara.jpg',
  },
  {
    id: 4,
    title: 'Compromiso con el Cliente',
    description:
      'Tu satisfacción es nuestra prioridad número uno. Estamos aquí para responder tus preguntas y hacer que tu experiencia sea lo más placentera posible.',
    image:
      'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
  },
];

// Testimonios
export const testimonials = [
  {
    id: 1,
    name: 'María García',
    role: 'Cliente Satisfecha',
    content: 'Excelente servicio. Repararon mi iPhone en tiempo récord y el precio fue muy justo. La atención fue increíble.',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 2,
    name: 'Juan Pérez',
    role: 'Cliente Frecuente',
    content: 'Personal muy profesional y atento. He traído varios dispositivos y siempre quedan como nuevos. Definitivamente volveré.',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    role: 'Cliente Empresarial',
    content: 'La mejor experiencia en reparación de dispositivos Apple. El servicio empresarial es excepcional. Muy recomendado.',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  }
];

// Redes sociales
export const socialLinks = [
  { type: 'facebook', color: 'hover:text-blue-600' },
  { type: 'twitter', color: 'hover:text-sky-500' },
  { type: 'instagram', color: 'hover:text-pink-600' },
  { type: 'linkedin', color: 'hover:text-blue-700' }
];
