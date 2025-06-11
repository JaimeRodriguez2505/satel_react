import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import api from '../services/api';

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterStockLow, setFilterStockLow] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    SKU: '',
    en_oferta: false,
    precio_de_oferta: '',
    categoryId: '',
    imagen: null
  });
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    SKU: '',
    en_oferta: false,
    precio_de_oferta: '',
    categoryId: ''
  });
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    lowStockProducts: 0,
    productsInOffer: 0,
    productsByCategory: {}
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Configurar el token en las cabeceras de axios
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const loadData = async () => {
      try {
        setLoading(true);
        const [productsResponse, categoriesResponse] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);

        const productsData = productsResponse.data;
        const categoriesData = categoriesResponse.data;

        setProducts(productsData);
        setCategories(categoriesData);
        setStats(calculateStats(productsData));
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Error al cargar las categorías');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      if (response.data) {
        setProducts(response.data);
      } else {
        setProducts([]);
        toast.error('No se encontraron productos');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
      toast.error(error.response?.data?.message || 'Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      SKU: product.SKU,
      en_oferta: product.en_oferta,
      precio_de_oferta: product.precio_de_oferta || '',
      categoryId: product.categoryId
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await api.delete(`/products/${productId}`);
        toast.success('Producto eliminado con éxito');
        fetchProducts(); // Recargar la lista de productos
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Error al eliminar el producto');
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(editFormData).forEach(key => {
        if (editFormData[key] !== undefined && editFormData[key] !== '') {
          formData.append(key, editFormData[key]);
        }
      });

      await api.put(`/products/${selectedProduct.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Producto actualizado con éxito');
      setIsEditModalOpen(false);
      fetchProducts(); // Recargar la lista de productos
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error al actualizar el producto');
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(createFormData).forEach(key => {
        if (createFormData[key] !== undefined && createFormData[key] !== '') {
          formData.append(key, createFormData[key]);
        }
      });

      await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Producto creado con éxito');
      setIsAddModalOpen(false);
      setCreateFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        SKU: '',
        en_oferta: false,
        precio_de_oferta: '',
        categoryId: '',
        imagen: null
      });
      fetchProducts(); // Recargar la lista de productos
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Error al crear el producto');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'file' ? files[0] : 
              value
    }));
    setCreateFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'file' ? files[0] : 
              value
    }));
  };

  const handleCreateInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setCreateFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'file' ? files[0] : 
              value
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const calculateStats = (products) => {
    const stats = {
      totalProducts: products.length,
      totalStock: 0,
      lowStockProducts: 0,
      productsInOffer: 0,
      productsByCategory: {}
    };

    products.forEach(product => {
      // Calcular stock total y productos con stock bajo
      stats.totalStock += parseInt(product.stock) || 0;
      if ((parseInt(product.stock) || 0) < 10) {
        stats.lowStockProducts++;
      }

      // Contar productos en oferta
      if (product.en_oferta) {
        stats.productsInOffer++;
      }

      // Agrupar por categoría
      const categoryName = categories.find(c => c.id === product.categoryId)?.name || 'Sin categoría';
      stats.productsByCategory[categoryName] = (stats.productsByCategory[categoryName] || 0) + 1;
    });

    return stats;
  };

  const getFilteredProducts = () => {
    return products.filter(product => {
      // Filtrar por categoría
      if (selectedCategory !== 'all' && product.categoryId?.toString() !== selectedCategory?.toString()) {
        return false;
      }

      // Filtrar por término de búsqueda
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Filtrar productos con stock bajo
      if (filterStockLow && parseInt(product.stock) >= 10) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'stock':
          return (parseInt(a.stock) || 0) - (parseInt(b.stock) || 0);
        case 'price':
          return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  };

  const handleQuickStockUpdate = async (productId, change) => {
    try {
      const product = products.find(p => p.id === productId);
      if (!product) return;

      const newStock = Math.max(0, parseInt(product.stock) + change);
      const formData = new FormData();
      formData.append('stock', newStock);

      await api.put(`/products/${productId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Actualizar el estado local inmediatamente
      setProducts(products.map(p => 
        p.id === productId ? { ...p, stock: newStock } : p
      ));

      // Actualizar estadísticas
      setStats(calculateStats(products.map(p => 
        p.id === productId ? { ...p, stock: newStock } : p
      )));

      toast.success(`Stock actualizado a ${newStock} unidades`);
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error('Error al actualizar el stock');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-white pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">
            Panel de Control
          </h1>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center space-x-2"
            >
              <FaPlus />
              <span>Nuevo Producto</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Cerrar Sesión
            </motion.button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Productos</h3>
            <p className="text-3xl font-bold text-green-500">{stats.totalProducts}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Stock Total</h3>
            <p className="text-3xl font-bold text-green-500">{stats.totalStock}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Stock Bajo</h3>
            <p className="text-3xl font-bold text-yellow-500">{stats.lowStockProducts}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-600 mb-2">En Oferta</h3>
            <p className="text-3xl font-bold text-blue-500">{stats.productsInOffer}</p>
          </motion.div>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">Todas las categorías</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="name">Nombre</option>
                <option value="stock">Stock</option>
                <option value="price">Precio</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filterStockLow}
                onChange={(e) => setFilterStockLow(e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Mostrar solo productos con stock bajo (menos de 10 unidades)</span>
            </label>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {getFilteredProducts().map((product, index) => (
                  <tr key={product.id} className={index % 2 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        {product.imagen && (
                          <img
                            src={`https://api.satelmovil.com/uploads/${product.imagen}`}
                            alt={product.name}
                            className="h-10 w-10 rounded-full object-cover mr-3"
                          />
                        )}
                        <div>
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm leading-5 text-gray-500">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        S/ {parseFloat(product.price || 0).toFixed(2)}
                      </div>
                      {product.en_oferta && product.precio_de_oferta && (
                        <div className="text-sm leading-5 text-green-500">
                          Oferta: S/ {parseFloat(product.precio_de_oferta || 0).toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuickStockUpdate(product.id, -1)}
                          className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                        >
                          -
                        </button>
                        <span className={`px-3 py-1 rounded-lg font-medium ${
                          parseInt(product.stock) < 10 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {product.stock}
                        </span>
                        <button
                          onClick={() => handleQuickStockUpdate(product.id, 1)}
                          className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.en_oferta
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.en_oferta ? 'En oferta' : 'Precio regular'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium">
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Modal de Edición */}
        <AnimatePresence>
          {isEditModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setIsEditModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-2xl p-6 w-full max-w-2xl"
                onClick={e => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold mb-6">Editar Producto</h2>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nombre</label>
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Categoría</label>
                      <select
                        name="categoryId"
                        value={editFormData.categoryId}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      >
                        <option value="">Seleccionar categoría</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Precio</label>
                      <input
                        type="number"
                        name="price"
                        value={editFormData.price}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Stock</label>
                      <input
                        type="number"
                        name="stock"
                        value={editFormData.stock}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">SKU</label>
                      <input
                        type="text"
                        name="SKU"
                        value={editFormData.SKU}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="en_oferta"
                          checked={editFormData.en_oferta}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-700">En oferta</label>
                      </div>
                      {editFormData.en_oferta && (
                        <div className="flex-1">
                          <input
                            type="number"
                            name="precio_de_oferta"
                            value={editFormData.precio_de_oferta}
                            onChange={handleInputChange}
                            placeholder="Precio de oferta"
                            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            step="0.01"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                      name="description"
                      value={editFormData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Imagen</label>
                    <input
                      type="file"
                      name="imagen"
                      onChange={handleInputChange}
                      className="mt-1 w-full"
                      accept="image/*"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal de Creación */}
        <AnimatePresence>
          {isAddModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setIsAddModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold mb-4">Crear Nuevo Producto</h2>
                <form onSubmit={handleCreateSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nombre</label>
                      <input
                        type="text"
                        name="name"
                        value={createFormData.name}
                        onChange={handleCreateInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">SKU</label>
                      <input
                        type="text"
                        name="SKU"
                        value={createFormData.SKU}
                        onChange={handleCreateInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Precio</label>
                      <input
                        type="number"
                        name="price"
                        value={createFormData.price}
                        onChange={handleCreateInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Stock</label>
                      <input
                        type="number"
                        name="stock"
                        value={createFormData.stock}
                        onChange={handleCreateInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Categoría</label>
                      <select
                        name="categoryId"
                        value={createFormData.categoryId}
                        onChange={handleCreateInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      >
                        <option value="">Seleccionar categoría</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Descripción</label>
                      <textarea
                        name="description"
                        value={createFormData.description}
                        onChange={handleCreateInputChange}
                        rows="3"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="en_oferta"
                        checked={createFormData.en_oferta}
                        onChange={handleCreateInputChange}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label className="text-sm font-medium text-gray-700">En oferta</label>
                    </div>
                    {createFormData.en_oferta && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Precio de oferta</label>
                        <input
                          type="number"
                          name="precio_de_oferta"
                          value={createFormData.precio_de_oferta}
                          onChange={handleCreateInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                    )}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Imagen</label>
                      <input
                        type="file"
                        name="imagen"
                        onChange={handleCreateInputChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Crear Producto
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
