import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, total, removeFromCart, updateQuantity } = useCart();

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: [0.1, 0.45, 0.3, 0.98]
      }
    })
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-white pt-24">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] mb-16 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3)`,
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Tu <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Carrito</span>
          </motion.h1>
        </div>
        {/* Decorative gradient line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 via-green-400 to-green-600"></div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-8">¿Por qué no agregas algunos productos?</p>
            <Link
              to="/catalogo"
              className="inline-block bg-green-500 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors duration-300 shadow-lg hover:shadow-green-500/50"
            >
              Ir al Catálogo
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-center gap-6">
                    <img
                      src={item.imageUrl}
                      alt={item.nombre}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">{item.nombre}</h3>
                      <p className="text-gray-600 text-sm mb-2">{item.descripcion}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                            disabled={item.quantity <= 1}
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="text-gray-800 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-xl font-bold text-green-600">
                            S/ {((item.en_oferta ? item.precio_de_oferta : item.precio) * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors duration-300"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 sticky top-28"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Resumen</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-xl font-bold text-gray-800">S/ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Envío</span>
                    <span className="text-green-600">Gratis</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-gray-800">Total</span>
                    <span className="text-green-600">S/ {total.toFixed(2)}</span>
                  </div>
                </div>
                
                <a
                  href={`https://wa.me/51951828282?text=Hola, me gustaría comprar los siguientes productos:%0A${cart
                    .map(item => `- ${item.quantity}x ${item.nombre} (S/ ${((item.en_oferta ? item.precio_de_oferta : item.precio) * item.quantity).toFixed(2)})`)
                    .join('%0A')}%0A%0ATotal: S/ ${total.toFixed(2)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-black px-6 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  Finalizar Compra
                </a>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
