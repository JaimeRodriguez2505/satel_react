import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/api';

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

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsResponse, categoriesResponse] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        
        // Procesar los productos para asegurar que los precios sean números y las imágenes tengan URL completa
        const processedProducts = (productsResponse.data || productsResponse).map(product => ({
          ...product,
          price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
          precio_de_oferta: product.precio_de_oferta ? (typeof product.precio_de_oferta === 'string' ? parseFloat(product.precio_de_oferta) : product.precio_de_oferta) : null,
          imageUrl: product.imagen ? `http://localhost:3000/uploads/${product.imagen}` : 'https://via.placeholder.com/300x200?text=No+imagen'
        }));
        
        setProducts(processedProducts);
        setCategories(categoriesResponse.data || categoriesResponse);
        
        // Actualizar el rango de precios basado en los productos
        const prices = processedProducts.map(p => p.price).filter(p => !isNaN(p));
        if (prices.length > 0) {
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setPriceRange([minPrice, maxPrice]);
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

  // Filtrar y ordenar productos
  useEffect(() => {
    let filtered = [...products];

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.categoryId === selectedCategory);
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por rango de precios
    filtered = filtered.filter(p => {
      const price = typeof p.price === 'string' ? parseFloat(p.price) : p.price;
      return !isNaN(price) && price >= priceRange[0] && price <= priceRange[1];
    });

    // Ordenar productos
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Por defecto mantener el orden original
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cabecera del catálogo */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Nuestro Catálogo</h1>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Buscar servicios o productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de filtros */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Filtros</h2>
              
              {/* Categorías */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Categorías</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded ${
                      selectedCategory === 'all'
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    Todas las categorías
                  </button>
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ordenar por */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Ordenar por</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="featured">Destacados</option>
                  <option value="price-low">Precio: Menor a mayor</option>
                  <option value="price-high">Precio: Mayor a menor</option>
                  <option value="name">Nombre</option>
                </select>
              </div>

              {/* Rango de precios */}
              <div>
                <h3 className="font-medium mb-2">Rango de precios</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                      className="w-20 p-1 border rounded"
                    />
                    <span className="mx-2">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                      className="w-20 p-1 border rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de productos */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-700">{error}</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-500">
                  Intenta ajustar los filtros de búsqueda
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative pt-[75%] bg-gray-100">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300x200?text=No+imagen';
                        }}
                      />
                      {product.en_oferta && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                          Oferta
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          {product.en_oferta && product.precio_de_oferta ? (
                            <>
                              <span className="text-sm text-gray-500 line-through">
                                S/ {parseFloat(product.price).toFixed(2)}
                              </span>
                              <span className="text-xl font-bold text-red-600">
                                S/ {parseFloat(product.precio_de_oferta).toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="text-xl font-bold text-gray-900">
                              S/ {parseFloat(product.price).toFixed(2)}
                            </span>
                          )}
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Ver más
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
