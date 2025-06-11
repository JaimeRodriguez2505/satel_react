import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, getCategories } from '../services/api';
import { FaWhatsapp, FaShoppingCart, FaTimes, FaSearch, FaChevronDown, FaEye } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

//================================================================================
// COMPONENTES INTERNOS CON DISEÑO FINAL
//================================================================================

// Componente para una tarjeta de producto individual (Con Stock y Botones Visibles)
const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const stockColor = product.stock < 10 ? (product.stock === 0 ? 'text-red-500' : 'text-yellow-600') : 'text-gray-500';
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-gray-100 flex flex-col"
    >
      <div className="relative pt-[100%] overflow-hidden bg-gray-100 cursor-pointer" onClick={() => onQuickView(product)}>
        <img src={product.imageUrl} alt={product.nombre} className="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-x-3">
          <div className="text-white text-sm bg-black/50 backdrop-blur-sm p-3 rounded-full hover:bg-black/70 transition-colors" title="Vista Rápida"><FaEye /></div>
        </div>
        {product.en_oferta && <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">OFERTA</div>}
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="font-bold text-lg mb-1 text-gray-800 line-clamp-2">{product.nombre}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.descripcion}</p>
        <p className={`text-xs font-bold uppercase tracking-wide ${stockColor}`}>{product.stock > 0 ? `${product.stock} en Stock` : 'Agotado'}</p>
        <div className="flex justify-between items-center mt-auto pt-2">
          <div>
            {product.en_oferta ? (
              <><p className="text-sm text-gray-400 line-through">{`S/ ${(product.price || 0).toFixed(2)}`}</p><p className="text-xl font-extrabold text-green-600">{`S/ ${(product.precio_de_oferta || 0).toFixed(2)}`}</p></>
            ) : (
              <p className="text-xl font-extrabold text-gray-800">{`S/ ${(product.price || 0).toFixed(2)}`}</p>
            )}
          </div>
           {/* ============== BOTONES DE ACCIÓN VISIBLES Y JUNTOS ============== */}
           <div className="flex items-center gap-x-2">
                <button disabled={product.stock === 0} onClick={() => { addToCart(product); toast.success(`${product.nombre} agregado!`); }} className="p-3 bg-gray-100 text-gray-700 rounded-full hover:bg-green-500 hover:text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-300" title="Agregar al Carrito"><FaShoppingCart size={18} /></button>
                <a href={`https://wa.me/51951828282?text=Hola, estoy interesado en el producto: ${product.nombre}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-green-100 text-green-700 rounded-full hover:bg-green-500 hover:text-white transition-colors duration-300" title="Consultar por WhatsApp"><FaWhatsapp size={18} /></a>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

// Componentes de esqueleto de carga
const SkeletonCard = () => <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100"><div className="pt-[100%] bg-gray-200 animate-pulse"></div><div className="p-5"><div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div><div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div><div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div><div className="flex justify-between items-center mt-4"><div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div><div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div></div></div></div>;
const SkeletonSidebar = () => <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-100 space-y-6">{Array.from({length: 3}).map((_, i) => (<div key={i}><div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse mb-4"></div><div className="space-y-3"><div className="h-8 w-full bg-gray-200 rounded animate-pulse"></div><div className="h-8 w-full bg-gray-200 rounded animate-pulse"></div><div className="h-8 w-full bg-gray-200 rounded animate-pulse"></div></div></div>))}</div>;

// Componente de acordeón para filtros
const FilterAccordion = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-200 py-6">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <h3 className="font-semibold text-gray-800">{title}</h3>
                <FaChevronDown className={`transition-transform duration-300 text-gray-800 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>{isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="pt-4">{children}</div></motion.div>}</AnimatePresence>
        </div>
    );
};

// Barra lateral de filtros
const FilterSidebar = ({ categories, selectedCategory, setSelectedCategory, sortBy, setSortBy, priceRange, setPriceRange, minPrice, maxPrice }) => (
    <aside className="lg:w-1/4 xl:w-1/5">
        <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-100 sticky top-28">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Filtros</h2>
            <FilterAccordion title="Categorías">
                <div className="space-y-2">
                    <button onClick={() => setSelectedCategory('all')} className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 text-sm ${selectedCategory === 'all' ? 'bg-green-500 text-white font-semibold' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>Todas</button>
                    {categories.map(c => <button key={c.id} onClick={() => setSelectedCategory(c.id.toString())} className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 text-sm ${selectedCategory === c.id.toString() ? 'bg-green-500 text-white font-semibold' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>{c.name}</button>)}
                </div>
            </FilterAccordion>
            <FilterAccordion title="Avanzado" defaultOpen={true}>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="sort-by" className="font-semibold mb-2 text-gray-800 text-sm block">Ordenar por</label>
                        <select id="sort-by" value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-200 focus:border-green-500 focus:ring-0 text-sm text-gray-800">
                            <option value="featured" className="text-gray-800">Destacados</option>
                            <option value="price-asc" className="text-gray-800">Precio: Menor a Mayor</option>
                            <option value="price-desc" className="text-gray-800">Precio: Mayor a Menor</option>
                            <option value="name-asc" className="text-gray-800">Nombre: A-Z</option>
                            <option value="name-desc" className="text-gray-800">Nombre: Z-A</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="price-range" className="font-semibold mb-2 text-gray-800 text-sm block">Precio Máximo: <span className="font-bold text-green-600">{`S/ ${priceRange[1]}`}</span></label>
                        <input id="price-range" type="range" min={minPrice} max={maxPrice} value={priceRange[1]} onChange={e => setPriceRange([minPrice, +e.target.value])} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500" />
                    </div>
                </div>
            </FilterAccordion>
        </div>
    </aside>
);

// Modal de vista previa
const ProductPreviewModal = ({ product, onClose, addToCart }) => {
    if (!product) return null;
    return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}><motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full relative shadow-2xl" onClick={e => e.stopPropagation()}><button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors z-10"><FaTimes size={20} /></button><div className="grid grid-cols-1 md:grid-cols-2"><div className="relative aspect-square bg-gray-100"><img src={product.imageUrl} alt={product.nombre} className="absolute inset-0 w-full h-full object-cover" /></div><div className="p-8 flex flex-col"><h2 className="text-3xl font-bold text-gray-800 mb-2">{product.nombre}</h2><p className="text-gray-500 mb-6 flex-grow">{product.descripcion}</p><div className="flex justify-between items-center mb-6">{product.en_oferta ? (<div className="space-y-1"><span className="text-lg text-gray-400 line-through block">{`S/ ${(product.price || 0).toFixed(2)}`}</span><span className="text-4xl font-bold text-green-600 block">{`S/ ${(product.precio_de_oferta || 0).toFixed(2)}`}</span></div>) : (<span className="text-4xl font-bold text-gray-800 block">{`S/ ${(product.price || 0).toFixed(2)}`}</span>)}</div><div className="flex flex-col sm:flex-row gap-4"><button onClick={() => { addToCart(product); toast.success(`${product.nombre} agregado!`); onClose(); }} className="flex-1 bg-green-500 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"><FaShoppingCart size={20} /><span>Agregar al Carrito</span></button><a href={`https://wa.me/51951828282?text=Hola, estoy interesado en el producto: ${product.nombre}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-gray-800 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-black transition-colors flex items-center justify-center space-x-2"><FaWhatsapp size={20} /><span>Consultar</span></a></div></div></div></motion.div></motion.div>;
};

// Componente principal de la página
export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minPrice, setMinPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { addToCart } = useCart();
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([getProducts(), getCategories()]);
        const productsArray = Array.isArray(productsData.data) ? productsData.data : [];
        const processedProducts = productsArray.map(p => ({...p, price: parseFloat(p.price) || 0, precio_de_oferta: parseFloat(p.precio_de_oferta) || 0, nombre: p.name, descripcion: p.description, imageUrl: p.imagen ? `https://api.satelmovil.com/uploads/${p.imagen}` : '/placeholder.jpg' }));
        setProducts(processedProducts);
        const categoriesArray = Array.isArray(categoriesData.data) ? categoriesData.data : [];
        setCategories(categoriesArray);
        const prices = processedProducts.map(p => p.price).filter(p => !isNaN(p));
        if (prices.length > 0) { const min = Math.floor(Math.min(...prices)); const max = Math.ceil(Math.max(...prices)); setMinPrice(min); setMaxPrice(max); setPriceRange([min, max]); }
      } catch (err) { setError('Error al cargar los datos.'); console.error('Error:', err);
      } finally { setLoading(false); }
    };
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products
      .filter(p => (selectedCategory === 'all' || p.categoryId?.toString() === selectedCategory))
      .filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(p => p.price <= priceRange[1]);
    switch (sortBy) {
        case 'price-asc': return filtered.sort((a, b) => (a.en_oferta ? a.precio_de_oferta : a.price) - (b.en_oferta ? b.precio_de_oferta : b.price));
        case 'price-desc': return filtered.sort((a, b) => (b.en_oferta ? b.precio_de_oferta : b.price) - (a.en_oferta ? a.precio_de_oferta : a.price));
        case 'name-asc': return filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
        case 'name-desc': return filtered.sort((a, b) => b.nombre.localeCompare(a.nombre));
        default: return filtered;
    }
  }, [products, selectedCategory, searchTerm, priceRange, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      {/* SECCIÓN SUPERIOR - INTOCADA */}
      <section className="relative w-full h-[40vh] mb-16 overflow-hidden">
        <motion.div className="absolute inset-0 bg-cover bg-center" initial={{ scale: 1 }} animate={{ scale: 1.1 }} transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }} style={{ backgroundImage: `url(/banner.avif)`, filter: 'brightness(0.7)'}}/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <motion.h1 className="text-4xl md:text-6xl font-bold text-center mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Nuestro <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Catálogo</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-xl mx-auto w-full">
            <div className="relative"><input type="text" placeholder="Buscar productos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-6 py-4 rounded-lg bg-gray-900/50 border border-green-500/20 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 text-white placeholder-gray-400 transition-all duration-300"/><FaSearch className="w-6 h-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"/></div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 via-green-400 to-green-600"></div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <FilterSidebar {...{categories, selectedCategory, setSelectedCategory, sortBy, setSortBy, priceRange, setPriceRange, minPrice, maxPrice}} />
            <main className="lg:w-3/4 xl:w-4/5">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                  </div>
                ) : error ? (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg"><p>{error}</p></div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-16"><h3 className="text-2xl font-semibold text-gray-700">No se encontraron productos</h3><p className="text-gray-500 mt-2">Intenta cambiar tus criterios de búsqueda o filtros.</p></div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                      {filteredProducts.map(product => <ProductCard key={product.id} product={product} onQuickView={setSelectedProduct} />)}
                  </div>
                )}
            </main>
        </div>
      </div>
      
      <AnimatePresence>
        {selectedProduct && <ProductPreviewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} addToCart={addToCart} />}
      </AnimatePresence>
    </div>
  );
}