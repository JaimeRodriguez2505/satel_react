import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, getCategories } from '../services/api';
import { FaWhatsapp, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const { addToCart } = useCart();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  // Efecto para cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Obtener datos
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        
        // Asegurarse de que tenemos un array de productos
        const productsArray = Array.isArray(productsData.data) ? productsData.data : 
                            Array.isArray(productsData) ? productsData : [];
        
        const processedProducts = productsArray.map(product => ({
          ...product,
          price: typeof product.price === 'string' ? parseFloat(product.price) : product.price || 0,
          precio_de_oferta: product.precio_de_oferta ? parseFloat(product.precio_de_oferta) : 0,
          nombre: product.name, // Mapear name a nombre para mantener compatibilidad
          descripcion: product.description, // Mapear description a descripcion
          imageUrl: product.imagen ? `https://api.satelmovil.com/uploads/${product.imagen}` : '/placeholder.jpg'
        }));
        
        // Guardar productos procesados
        setProducts(processedProducts);
        
        // Procesar categorías
        const categoriesArray = Array.isArray(categoriesData.data) ? categoriesData.data :
                              Array.isArray(categoriesData) ? categoriesData : [];
        setCategories(categoriesArray);
        
        // Calcular rango de precios
        const prices = processedProducts.map(p => p.price).filter(p => !isNaN(p));
        if (prices.length > 0) {
          setPriceRange([
            Math.floor(Math.min(...prices)),
            Math.ceil(Math.max(...prices))
          ]);
        }
      } catch (err) {
        setError('Error al cargar los datos. Por favor, intenta nuevamente.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Efecto para actualizar productos filtrados cuando cambien los criterios de filtrado
  useEffect(() => {
    const updateFilteredProducts = async () => {
      try {
        setLoading(true);
        
        // Filtrar productos localmente primero
        let filtered = [...products];
        
        // Filtrar por categoría
        if (selectedCategory !== 'all') {
          filtered = filtered.filter(product => {
            const productCategory = product.categoryId?.toString() || product.category?.toString();
            return productCategory === selectedCategory;
          });
        }
        
        // Filtrar por término de búsqueda
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          filtered = filtered.filter(product =>
            (product.nombre || '').toLowerCase().includes(searchLower) ||
            (product.descripcion || '').toLowerCase().includes(searchLower)
          );
        }
        
        // Filtrar por rango de precios
        filtered = filtered.filter(product =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
        );
        
        // Ordenar productos
        switch (sortBy) {
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'name-asc':
            filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
          case 'name-desc':
            filtered.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
          default: // featured o default
            // Mantener el orden original
            break;
        }

        // Actualizar los productos filtrados
        setFilteredProducts(filtered);
      } catch (err) {
        setError('Error al filtrar los productos. Por favor, intenta nuevamente.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    updateFilteredProducts();
  }, [products, selectedCategory, searchTerm, priceRange, sortBy]);

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
            backgroundImage: `url(/banner.avif)`,
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
            Nuestro <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Catálogo</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-lg bg-gray-900/50 border border-green-500/20 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 text-white placeholder-gray-400 transition-all duration-300"
              />
              <svg className="w-6 h-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>
        </div>
        {/* Decorative gradient line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 via-green-400 to-green-600"></div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de filtros */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/4"
          >
            <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-xl font-bold mb-6 text-green-400">Filtros</h2>
              
              {/* Categorías */}
              <div className="mb-8">
                <h3 className="font-medium mb-4 text-green-400">Categorías</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                      selectedCategory === 'all'
                        ? 'bg-green-500 text-black font-medium'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    Todas las categorías
                  </button>
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id.toString())}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                        selectedCategory === category.id.toString()
                          ? 'bg-green-500 text-black font-medium'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ordenar por */}
              <div className="mb-8">
                <h3 className="font-medium mb-4 text-green-400">Ordenar por</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-green-500/20 text-gray-300 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                >
                  <option value="featured">Destacados</option>
                  <option value="price-low">Precio: Menor a mayor</option>
                  <option value="price-high">Precio: Mayor a menor</option>
                  <option value="name">Nombre</option>
                </select>
              </div>

              {/* Rango de precios */}
              <div>
                <h3 className="font-medium mb-4 text-green-400">Rango de precios</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                      className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-green-500/20 text-gray-300 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                      className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-green-500/20 text-gray-300 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lista de productos */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
              </div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-900/50 border-l-4 border-red-500 p-6 rounded-lg"
              >
                <p className="text-red-400">{error}</p>
              </motion.div>
            ) : filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <h3 className="text-xl font-medium text-green-400 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-400">
                  Intenta ajustar los filtros de búsqueda
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100"
                >
                  <div 
                    className="relative pt-[100%] overflow-hidden bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsPreviewOpen(true);
                      }}
                    >
                      <img
                        src={product.imagen ? `https://api.satelmovil.com/uploads/${product.imagen}` : '/placeholder.jpg'}
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.en_oferta && (
                        <div className="absolute top-4 left-4 bg-green-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                          Oferta
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-lg font-medium">Ver Detalles</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-2 text-gray-800">
                        {product.nombre}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.descripcion}
                      </p>
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          {product.en_oferta ? (
                            <>
                              <span className="text-sm text-gray-500 line-through block">
                                S/ {(product.price || 0).toFixed(2)}
                              </span>
                              <span className="text-2xl font-bold text-green-600 block">
                                S/ {(product.precio_de_oferta || 0).toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="text-2xl font-bold text-green-600 block">
                              S/ {(product.price || 0).toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              addToCart(product);
                              toast.success('Producto agregado al carrito');
                            }}
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                          >
                            <FaShoppingCart size={20} />
                          </motion.button>
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={`https://wa.me/51951828282?text=Hola, estoy interesado en el producto: ${product.name} - Precio: S/ ${product.en_oferta ? (product.precio_de_oferta || 0).toFixed(2) : (product.price || 0).toFixed(2)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300 shadow-lg hover:shadow-green-500/50 flex items-center space-x-2"
                          >
                            <FaWhatsapp size={20} />
                            <span>Comprar</span>
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de vista previa */}
      <AnimatePresence>
        {isPreviewOpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsPreviewOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full relative shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white text-gray-600 hover:bg-gray-100 transition-colors duration-300 z-10 shadow-lg"
              >
                <FaTimes size={20} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-square">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.nombre}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {selectedProduct.en_oferta && (
                    <div className="absolute top-4 left-4 bg-green-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                      Oferta
                    </div>
                  )}
                </div>
                
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-green-400 mb-4">
                    {selectedProduct.nombre}
                  </h2>
                  <p className="text-gray-400 mb-6">
                    {selectedProduct.descripcion}
                  </p>
                  
                  <div className="space-y-6">                      {selectedProduct.en_oferta ? (
                      <div className="space-y-2">
                        <span className="text-sm text-gray-500 line-through block">
                          S/ {(selectedProduct.price || 0).toFixed(2)}
                        </span>
                        <span className="text-4xl font-bold text-green-400 block">
                          S/ {(selectedProduct.precio_de_oferta || 0).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-4xl font-bold text-green-400 block">
                        S/ {(selectedProduct.price || 0).toFixed(2)}
                      </span>
                    )}

                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          addToCart(selectedProduct);
                          toast.success('Producto agregado al carrito');
                          setIsPreviewOpen(false);
                        }}
                        className="flex-1 bg-green-500 text-black px-6 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center space-x-2"
                      >
                        <FaShoppingCart size={20} />
                        <span>Agregar al carrito</span>
                      </motion.button>
                    </div>

                    <div className="border-t border-gray-800 pt-6 mt-6">
                      <h3 className="text-xl font-bold text-green-400 mb-4">
                        Detalles del producto
                      </h3>
                      <ul className="space-y-3">
                        {selectedProduct.caracteristicas?.map((caracteristica, index) => (
                          <li key={index} className="flex items-start space-x-2 text-gray-400">
                            <span className="text-green-400 mt-1">•</span>
                            <span>{caracteristica}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
