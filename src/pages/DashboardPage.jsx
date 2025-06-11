import React, { useState, useEffect, useCallback, useMemo } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FaTachometerAlt, FaBoxOpen, FaTags, FaPlus, FaTrash, FaEdit, FaTimes, FaDollarSign, FaExclamationTriangle, FaChartPie, FaChartBar, FaChartLine, FaSave } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// Helper para formatear a Soles
const formatCurrency = (value) => `S/ ${Number(value).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

//================================================================================
// COMPONENTES INTERNOS (DashboardStats, CategoryManager, ProductFormModal)
//================================================================================
const StatCard = ({ icon, title, value, colorClass, onClick = () => {} }) => (
  <button onClick={onClick} className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 text-left w-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <div className={`text-3xl p-3 rounded-full ${colorClass}`}>{icon}</div>
    <div><p className="text-gray-500 text-sm">{title}</p><p className="text-2xl font-bold text-gray-800">{value}</p></div>
  </button>
);
const DashboardStats = ({ products, categories, navigateTo }) => {
  const totalInventoryValue = useMemo(() => products.reduce((acc, p) => acc + (parseFloat(p.price) * p.stock), 0), [products]);
  const lowStockCount = useMemo(() => products.filter(p => p.stock < 10).length, [products]);
  const topStockProducts = useMemo(() => products.sort((a,b) => b.stock - a.stock).slice(0, 5), [products]);
  const categoryDistribution = useMemo(() => Object.entries(products.reduce((acc, p) => ({...acc, [p.category?.name || 'N/A']: (acc[p.category?.name || 'N/A'] || 0) + 1}), {})).map(([name, value]) => ({ name, value })), [products]);
  const productsByDate = useMemo(() => Object.entries(products.reduce((acc, p) => ({...acc, [new Date(p.createdAt).toLocaleDateString('es-PE')]: (acc[new Date(p.createdAt).toLocaleDateString('es-PE')] || 0) + 1}), {})).map(([name, value]) => ({name, productos: value})).sort((a,b) => new Date(a.name) - new Date(b.name)), [products]);
  const PIE_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatCard icon={<FaBoxOpen />} title="Total de Productos" value={products.length} colorClass="bg-blue-100 text-blue-600" onClick={() => navigateTo('products')} />
              <StatCard icon={<FaDollarSign />} title="Valor del Inventario" value={formatCurrency(totalInventoryValue)} colorClass="bg-green-100 text-green-600" />
              <StatCard icon={<FaTags />} title="Total de Categorías" value={categories.length} colorClass="bg-indigo-100 text-indigo-600" onClick={() => navigateTo('categories')} />
              <StatCard icon={<FaExclamationTriangle />} title="Productos con Stock Bajo (<10)" value={lowStockCount} colorClass="bg-yellow-100 text-yellow-600" onClick={() => navigateTo('products', { lowStock: true })} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center"><FaChartLine className="mr-2 text-cyan-500"/>Nuevos Productos por Día</h3><ResponsiveContainer width="100%" height={300}><LineChart data={productsByDate}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="productos" stroke="#06b6d4" strokeWidth={2} /></LineChart></ResponsiveContainer></div>
      </div>
      <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center"><FaChartPie className="mr-2 text-purple-500"/>Distribución por Categoría</h3><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={categoryDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>{categoryDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
          <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center"><FaChartBar className="mr-2 text-blue-500"/>Top 5 Productos con más Stock</h3><ResponsiveContainer width="100%" height={250}><BarChart data={topStockProducts} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis type="category" dataKey="name" width={80} tick={{fontSize: 10}}/><Tooltip formatter={(value) => `${value} unidades`}/><Bar dataKey="stock" fill="#3b82f6" /></BarChart></ResponsiveContainer></div>
      </div>
    </div>
  );
};
const CategoryManager = ({ products, categories, refetchCategories }) => {
  const [name, setName] = useState(''); const [editingCategory, setEditingCategory] = useState(null); const [loading, setLoading] = useState(false);
  const productCounts = useMemo(() => categories.reduce((acc, category) => ({...acc, [category.id]: products.filter(p => p.categoryId === category.id).length}), {}), [products, categories]);
  const handleAdd = async (e) => { e.preventDefault(); if (!name.trim()) return toast.error('El nombre es requerido.'); setLoading(true); try { await api.post('/categories', { name }); toast.success('Categoría creada.'); setName(''); refetchCategories(); } catch (error) { toast.error('No se pudo crear la categoría.'); } finally { setLoading(false); } };
  const handleUpdate = async (e) => { e.preventDefault(); if (!editingCategory.name.trim()) return toast.error('El nombre es requerido.'); setLoading(true); try { await api.put(`/categories/${editingCategory.id}`, { name: editingCategory.name }); toast.success('Categoría actualizada.'); setEditingCategory(null); refetchCategories(); } catch (error) { toast.error('No se pudo actualizar la categoría.'); } finally { setLoading(false); } }
  const handleDelete = async (id) => { if (productCounts[id] > 0) return toast.error('No se puede eliminar una categoría que tiene productos asociados.'); if (!window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) return; try { await api.delete(`/categories/${id}`); toast.success('Categoría eliminada.'); refetchCategories(); } catch (error) { toast.error('No se pudo eliminar la categoría.'); } };
  return <div className="bg-white p-8 rounded-lg shadow-md w-full"><h3 className="text-xl font-bold mb-4 text-gray-800">Añadir Nueva Categoría</h3><form onSubmit={handleAdd} className="flex items-center space-x-2 mb-8"><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre de la categoría" className="input-style flex-grow text-gray-800 bg-white"/><button type="submit" disabled={loading} className="btn-primary"><FaPlus /> Añadir</button></form><h3 className="text-xl font-bold mb-4 text-gray-800">Categorías Existentes</h3><div className="overflow-x-auto"><table className="min-w-full bg-white"><thead className="bg-gray-50"><tr><th className="th-style text-gray-800">Nombre</th><th className="th-style text-gray-800">Productos</th><th className="th-style text-right text-gray-800">Acciones</th></tr></thead><tbody className="divide-y divide-gray-200">{categories.map(cat => (<tr key={cat.id}><td className="py-4 px-6 text-gray-800">{editingCategory?.id === cat.id ? <input type="text" value={editingCategory.name} onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})} className="input-style text-gray-800 bg-white"/> : cat.name}</td><td className="py-4 px-6 text-sm text-gray-800">{productCounts[cat.id] || 0}</td><td className="py-4 px-6 text-sm text-right space-x-2">{editingCategory?.id === cat.id ? (<><button onClick={handleUpdate} disabled={loading} className="btn-success">Guardar</button><button onClick={() => setEditingCategory(null)} className="btn-secondary">Cancelar</button></>) : (<><button onClick={() => setEditingCategory(cat)} className="text-blue-600 hover:text-blue-900"><FaEdit /></button><button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-900"><FaTrash /></button></>)}</td></tr>))}</tbody></table></div></div>;
};
const ProductFormModal = ({ isOpen, onClose, product, categories, onSuccess }) => {
    const isEditMode = Boolean(product); const [formData, setFormData] = useState({}); const [imageFile, setImageFile] = useState(null); const [loading, setLoading] = useState(false);
    useEffect(() => { const initialState = { name: '', description: '', price: '', categoryId: '', stock: '', SKU: '', en_oferta: false, precio_de_oferta: '' }; setFormData(isEditMode ? { ...initialState, ...product } : initialState); }, [product, isEditMode, isOpen]);
    const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
    const handleFileChange = e => setImageFile(e.target.files[0]);
    const handleSubmit = async (e) => { e.preventDefault(); if (!isEditMode && !imageFile) return toast.error('La imagen es requerida para un nuevo producto.'); setLoading(true); const data = new FormData(); Object.keys(formData).forEach(key => data.append(key, formData[key])); if (imageFile) data.append('imagen', imageFile); try { if (isEditMode) { await api.put(`/products/${product.id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Producto actualizado.'); } else { await api.post('/products', data, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Producto creado.'); } onSuccess(); onClose(); } catch (error) { console.error("Error submitting product:", error.response?.data); toast.error(error.response?.data?.message || 'Ocurrió un error.'); } finally { setLoading(false); } };
    if (!isOpen) return null;
    return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"><div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"><form onSubmit={handleSubmit} className="p-6"><div className="flex justify-between items-center border-b pb-3 mb-5"><h2 className="text-xl font-bold">{isEditMode ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h2><button type="button" onClick={onClose} className="p-2 rounded-full hover:bg-gray-200"><FaTimes /></button></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre del Producto" className="input-style" required /><input name="price" type="number" min="0" step="0.01" value={formData.price} onChange={handleChange} placeholder="Precio" className="input-style" required /><textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" className="input-style md:col-span-2" required /><input name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} placeholder="Stock" className="input-style" required /><input name="SKU" value={formData.SKU} onChange={handleChange} placeholder="SKU" className="input-style" /><select name="categoryId" value={formData.categoryId} onChange={handleChange} className="input-style" required><option value="">Selecciona Categoría</option>{categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}</select><div className="flex items-center space-x-3 p-3 rounded-md bg-gray-100"><input id="en_oferta_modal" name="en_oferta" type="checkbox" checked={formData.en_oferta} onChange={handleChange} className="h-5 w-5 rounded" /><label htmlFor="en_oferta_modal" className='font-medium text-gray-700'>¿En oferta?</label></div>{formData.en_oferta && <input name="precio_de_oferta" type="number" min="0" step="0.01" value={formData.precio_de_oferta} onChange={handleChange} placeholder="Precio de Oferta" className="input-style" required />}<div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Imagen {isEditMode && "(Opcional: solo si quieres cambiarla)"}</label><input type="file" name="imagen" onChange={handleFileChange} className="input-style" accept="image/*" /></div></div><div className="flex justify-end space-x-3 pt-5 border-t mt-5"><button type="button" onClick={onClose} className="btn-secondary">Cancelar</button><button type="submit" disabled={loading} className="btn-success">{loading ? 'Guardando...' : 'Guardar Cambios'}</button></div></form></div></div>;
};

//================================================================================
// COMPONENTE INTERNO: Administrador de Productos (Lógica de Stock Rápido CORREGIDA)
//================================================================================
const ProductManager = ({ products, categories, refetchProducts, initialFilters = {} }) => {
  const [filters, setFilters] = useState({ search: '', category: 'all', onSale: 'all', ...initialFilters });
  const [sort, setSort] = useState({ by: 'createdAt', order: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [quickStock, setQuickStock] = useState({});
  const [stockLoading, setStockLoading] = useState(null);
  const ITEMS_PER_PAGE = 10;
  
  useEffect(() => { setFilters(prev => ({...prev, ...initialFilters})); }, [initialFilters]);
  const handleFilterChange = e => { const { name, type, value, checked } = e.target; setFilters(prev => ({...prev, [name]: type === 'checkbox' ? checked : value})); setCurrentPage(1); };
  const filteredAndSortedProducts = useMemo(() => products.filter(p => (p.name.toLowerCase().includes(filters.search.toLowerCase()) || p.SKU?.toLowerCase().includes(filters.search.toLowerCase())) && (filters.category === 'all' || p.categoryId == filters.category) && (filters.onSale === 'all' || p.en_oferta === (filters.onSale === 'yes')) && (!filters.lowStock || p.stock < 10)).sort((a, b) => { let valA = a[sort.by], valB = b[sort.by]; if (sort.by === 'createdAt') { valA = new Date(valA); valB = new Date(valB); } let comparison = valA > valB ? 1 : (valA < valB ? -1 : 0); return sort.order === 'asc' ? comparison : -comparison; }), [products, filters, sort]);
  const paginatedProducts = useMemo(() => filteredAndSortedProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE), [filteredAndSortedProducts, currentPage]);
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const openAddModal = () => { setEditingProduct(null); setIsModalOpen(true); };
  const openEditModal = (product) => { setEditingProduct(product); setIsModalOpen(true); };
  
  const handleQuickStockChange = (productId, value) => {
    // CORRECCIÓN: Lógica de cambio de stock más estable. Solo actualiza el estado.
    setQuickStock(prev => ({...prev, [productId]: value}));
  };

  const handleSaveStock = async (product) => {
    const newStockValue = quickStock[product.id];
    if (newStockValue === undefined || newStockValue === '') return toast.error('El stock no puede estar vacío.');
    const parsedStock = parseInt(newStockValue, 10);
    if (isNaN(parsedStock) || parsedStock < 0) return toast.error('Ingresa un número de stock válido.');
    
    setStockLoading(product.id);
    try {
        // CORRECCIÓN: Se replica la lógica del modal de edición que SÍ funciona.
        // Se envían todos los datos del producto en FormData, usando PUT.
        const productData = new FormData();
        Object.keys(product).forEach(key => {
            if (key !== 'category' && key !== 'imageUrl') { // No enviar data anidada o del frontend
                productData.append(key, product[key]);
            }
        });
        productData.set('stock', parsedStock); // Sobreescribir solo el stock

        await api.put(`/products/${product.id}`, productData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        toast.success(`Stock actualizado para ${product.name}`);
        setQuickStock(prev => { const newState = {...prev}; delete newState[product.id]; return newState; });
        await refetchProducts();
    } catch (error) {
        console.error("Error quick stock update:", error.response?.data);
        toast.error("No se pudo actualizar el stock.");
    } finally {
        setStockLoading(null);
    }
  }

  return (
    <>
      <ProductFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={editingProduct} categories={categories} onSuccess={refetchProducts}/>
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 items-end">
            <input type="text" name="search" value={filters.search} placeholder="Buscar por Nombre o SKU..." onChange={handleFilterChange} className="input-style text-gray-800 bg-white"/>
            <select name="category" value={filters.category} onChange={handleFilterChange} className="input-style text-gray-800 bg-white">
              <option value="all" className="text-gray-800 bg-white">Todas las Categorías</option>
              {categories.map(c => <option key={c.id} value={c.id} className="text-gray-800 bg-white">{c.name}</option>)}
            </select>
            <select name="onSale" value={filters.onSale} onChange={handleFilterChange} className="input-style text-gray-800 bg-white">
              <option value="all" className="text-gray-800 bg-white">Cualquier Estado</option>
              <option value="yes" className="text-gray-800 bg-white">En Oferta</option>
              <option value="no" className="text-gray-800 bg-white">Sin Oferta</option>
            </select>
            <label className="flex items-center space-x-2 text-gray-800">
              <input type="checkbox" name="lowStock" checked={filters.lowStock} onChange={handleFilterChange} />
              <span>Solo Stock Bajo</span>
            </label>
            <button onClick={openAddModal} className="btn-primary">Añadir Producto</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="th-style text-gray-800">Producto</th>
                <th className="th-style text-gray-800">Precio</th>
                <th className="th-style w-56 text-gray-800">Stock</th>
                <th className="th-style text-gray-800">Estado</th>
                <th className="th-style text-right text-gray-800">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedProducts.map(prod => (
                <tr key={prod.id}>
                  <td className="py-2 px-4 flex items-center space-x-3">
                    <img src={prod.imageUrl} alt={prod.name} className="w-12 h-12 object-cover rounded"/>
                    <div>
                      <p className="font-medium text-gray-800">{prod.name}</p>
                      <p className="text-xs text-gray-500">{prod.category?.name || 'N/A'}</p>
                    </div>
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-800">
                    {formatCurrency(prod.price)}
                    {prod.en_oferta && <span className="text-green-600 ml-1">({formatCurrency(prod.precio_de_oferta)})</span>}
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex items-center justify-start space-x-2">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button onClick={() => handleQuickStockChange(prod.id, (quickStock[prod.id] ?? prod.stock) - 1)} className="btn-icon-round text-gray-800">-</button>
                        <input type="number" value={quickStock[prod.id] ?? prod.stock} onChange={(e) => handleQuickStockChange(prod.id, e.target.value)} className="input-stock text-gray-800"/>
                        <button onClick={() => handleQuickStockChange(prod.id, (quickStock[prod.id] ?? prod.stock) + 1)} className="btn-icon-round text-gray-800">+</button>
                      </div>
                      <div className="w-8 h-8 flex items-center justify-center">
                        {quickStock[prod.id] !== undefined && (
                          <button onClick={() => handleSaveStock(prod)} disabled={stockLoading === prod.id} className="text-green-600 hover:text-green-800 disabled:text-gray-300">
                            {stockLoading === prod.id ? <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900'></div> : <FaSave size={18}/>}
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${prod.en_oferta ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {prod.en_oferta ? 'En Oferta' : 'Normal'}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-right space-x-2">
                    <button onClick={() => openEditModal(prod)} className="text-blue-600 hover:text-blue-900"><FaEdit /></button>
                    <button onClick={() => handleDelete(prod.id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-700">Mostrando {paginatedProducts.length} de {filteredAndSortedProducts.length} productos</span>
          <div className="flex space-x-1">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="btn-secondary px-3 py-1 text-gray-800">Anterior</button>
            <span className="px-3 py-1 text-sm text-gray-800">Página {currentPage} de {totalPages}</span>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="btn-secondary px-3 py-1 text-gray-800">Siguiente</button>
          </div>
        </div>
      </div>
    </>
  );
};

//================================================================================
// COMPONENTE PRINCIPAL: DashboardPage
//================================================================================
const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialProductFilters, setInitialProductFilters] = useState({});
  const fetchData = useCallback(async () => { setLoading(true); setError(null); try { const [productsRes, categoriesRes] = await Promise.all([api.get('/products'), api.get('/categories')]); const processedProducts = productsRes.data.map(product => ({...product, imageUrl: product.imagen ? `https://api.satelmovil.com/uploads/${product.imagen}` : '/placeholder.jpg'})); setProducts(processedProducts); setCategories(categoriesRes.data); } catch (err) { setError('No se pudieron cargar los datos del dashboard.'); toast.error('Error al cargar datos.'); } finally { setLoading(false); } }, []);
  useEffect(() => { fetchData(); }, [fetchData]);
  const handleNavigation = (tab, filters = {}) => { setInitialProductFilters(filters); setActiveTab(tab); };
  const TabButton = ({ tabId, icon, label }) => (<button onClick={() => handleNavigation(tabId)} className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tabId ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>{icon}<span>{label}</span></button>);
  const renderContent = () => {
    if (loading) return <div className="text-center p-10"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div></div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
    switch (activeTab) {
      case 'stats': return <DashboardStats products={products} categories={categories} navigateTo={handleNavigation} />;
      case 'products': return <ProductManager products={products} categories={categories} refetchProducts={fetchData} initialFilters={initialProductFilters} />;
      case 'categories': return <CategoryManager products={products} categories={categories} refetchCategories={fetchData} />;
      default: return null;
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 pt-48 pb-10">
      <div className="container mx-auto px-4">
        <header className="mb-8"><h1 className="text-4xl font-extrabold text-gray-800 text-center">Panel de Administración</h1></header>
        <div className="flex justify-center mb-8"><div className="flex space-x-2 bg-white p-2 rounded-lg border shadow-sm"><TabButton tabId="stats" label="Estadísticas" icon={<FaTachometerAlt />} /><TabButton tabId="products" label="Productos" icon={<FaBoxOpen />} /><TabButton tabId="categories" label="Categorías" icon={<FaTags />} /></div></div>
        <main className="w-full max-w-7xl mx-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default DashboardPage;