import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FaTachometerAlt, FaBoxOpen, FaTags, FaPlus, FaTrash, FaEdit, FaTimes } from 'react-icons/fa';

//================================================================================
// COMPONENTE INTERNO: Estadísticas del Dashboard
//================================================================================
const DashboardStats = ({ products, categories }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
      <FaBoxOpen className="text-4xl text-blue-500" />
      <div>
        <p className="text-gray-500 text-sm">Total de Productos</p>
        <p className="text-3xl font-bold text-gray-800">{products.length}</p>
      </div>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
      <FaTags className="text-4xl text-green-500" />
      <div>
        <p className="text-gray-500 text-sm">Total de Categorías</p>
        <p className="text-3xl font-bold text-gray-800">{categories.length}</p>
      </div>
    </div>
  </div>
);


//================================================================================
// COMPONENTE INTERNO: Administrador de Categorías
//================================================================================
const CategoryManager = ({ categories, refetchCategories }) => {
  const [name, setName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null); // { id, name }
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('El nombre es requerido.');
    setLoading(true);
    try {
      await api.post('/categories', { name });
      toast.success('Categoría creada.');
      setName('');
      refetchCategories();
    } catch (error) {
      toast.error('No se pudo crear la categoría.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingCategory.name.trim()) return toast.error('El nombre es requerido.');
    setLoading(true);
    try {
      await api.put(`/categories/${editingCategory.id}`, { name: editingCategory.name });
      toast.success('Categoría actualizada.');
      setEditingCategory(null);
      refetchCategories();
    } catch (error) {
       toast.error('No se pudo actualizar la categoría.');
    } finally {
        setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) return;
    try {
      await api.delete(`/categories/${id}`);
      toast.success('Categoría eliminada.');
      refetchCategories();
    } catch (error) {
      toast.error('No se pudo eliminar. Asegúrate de que no tenga productos asociados.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full">
      <h3 className="text-xl font-bold mb-4">Añadir Nueva Categoría</h3>
      <form onSubmit={handleAdd} className="flex items-center space-x-2 mb-8">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la categoría"
          className="input-style flex-grow"
        />
        <button type="submit" disabled={loading} className="btn-primary">
          <FaPlus /> Añadir
        </button>
      </form>
      
      <h3 className="text-xl font-bold mb-4">Categorías Existentes</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map(cat => (
              <tr key={cat.id}>
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{cat.id}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                    {editingCategory?.id === cat.id ? (
                        <input 
                            type="text"
                            value={editingCategory.name}
                            onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                            className="input-style"
                        />
                    ) : (
                        cat.name
                    )}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-right space-x-2">
                    {editingCategory?.id === cat.id ? (
                        <>
                           <button onClick={handleUpdate} disabled={loading} className="btn-success">Guardar</button>
                           <button onClick={() => setEditingCategory(null)} className="btn-secondary">Cancelar</button>
                        </>
                    ) : (
                        <>
                           <button onClick={() => setEditingCategory(cat)} className="text-blue-600 hover:text-blue-900"><FaEdit /></button>
                           <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                        </>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


//================================================================================
// COMPONENTE INTERNO: Administrador de Productos
//================================================================================
const ProductManager = ({ products, categories, refetchProducts }) => {
  const formRef = React.useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', categoryId: '', stock: '', SKU: '', en_oferta: false, precio_de_oferta: '' });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', categoryId: '', stock: '', SKU: '', en_oferta: false, precio_de_oferta: '' });
    setImageFile(null);
    if(formRef.current) {
      formRef.current.reset();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
        toast.error('Por favor, selecciona una imagen para el producto.');
        return;
    }
    setLoading(true);

    const productData = new FormData();
    
    productData.append('name', formData.name);
    productData.append('description', formData.description);
    productData.append('price', String(formData.price));
    productData.append('categoryId', String(formData.categoryId));
    productData.append('stock', String(formData.stock));
    productData.append('SKU', formData.SKU);
    productData.append('en_oferta', String(formData.en_oferta));

    if (formData.en_oferta && formData.precio_de_oferta) {
        productData.append('precio_de_oferta', String(formData.precio_de_oferta));
    } else {
        productData.append('precio_de_oferta', '0');
    }

    productData.append('imagen', imageFile);

    try {
        await api.post('/products', productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        toast.success('¡Producto creado exitosamente!');
        resetForm();
        setShowForm(false);
        refetchProducts();
    } catch (error) {
        console.error('Error al crear producto. Respuesta del servidor:', error.response?.data);
        toast.error(error.response?.data?.message || 'No se pudo crear el producto.');
    } finally {
        setLoading(false);
    }
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Producto eliminado.');
      refetchProducts();
    } catch (error) {
      toast.error('No se pudo eliminar el producto.');
    }
  };
  
  const getCategoryName = (id) => categories.find(c => c.id == id)?.name || 'N/A';

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Productos Existentes</h3>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center space-x-2">
          {showForm ? <FaTimes/> : <FaPlus />}
          <span>{showForm ? 'Cerrar Formulario' : 'Añadir Producto'}</span>
        </button>
      </div>

      {showForm && (
        <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 border rounded-lg bg-gray-50">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre del Producto" className="input-style" required />
          <input name="price" type="number" min="0" value={formData.price} onChange={handleChange} placeholder="Precio" className="input-style" required />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" className="input-style md:col-span-2" required />
          <input name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} placeholder="Stock" className="input-style" required />
          <input name="SKU" value={formData.SKU} onChange={handleChange} placeholder="SKU" className="input-style" />
          <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="input-style" required>
            <option value="">Selecciona Categoría</option>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
          <div className="flex items-center space-x-3 p-3 rounded-md bg-gray-200">
            <input id="en_oferta" name="en_oferta" type="checkbox" checked={formData.en_oferta} onChange={handleChange} className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500" />
            <label htmlFor="en_oferta" className='font-medium text-gray-700'>¿Producto en oferta?</label>
          </div>
          {formData.en_oferta && <input name="precio_de_oferta" type="number" min="0" value={formData.precio_de_oferta} onChange={handleChange} placeholder="Precio de Oferta" className="input-style" required />}
          <div className="md:col-span-2"><input type="file" name="imagen" onChange={handleFileChange} className="input-style" required /></div>
          <div className="md:col-span-2 flex justify-end space-x-2"><button type="submit" disabled={loading} className="btn-success">Guardar Producto</button></div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="th-style">Imagen</th>
              <th className="th-style">Nombre</th>
              <th className="th-style">Categoría</th>
              <th className="th-style">Precio</th>
              <th className="th-style">Stock</th>
              <th className="th-style text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map(prod => (
              <tr key={prod.id}>
                <td className="py-2 px-4">
                  {/* Se usa la URL completa procesada en el estado */}
                  <img 
                    src={prod.imageUrl} 
                    alt={prod.name} 
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4 font-medium">{prod.name}</td>
                <td className="py-2 px-4 text-sm text-gray-500">{getCategoryName(prod.categoryId)}</td>
                <td className="py-2 px-4 text-sm text-gray-500">${prod.price}</td>
                <td className="py-2 px-4 font-bold">{prod.stock}</td>
                <td className="py-2 px-4 text-right space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 disabled:text-gray-300" title="Editar - Próximamente" disabled><FaEdit /></button>
                  <button onClick={() => handleDelete(prod.id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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

  // ====================== INICIO DE LA CORRECCIÓN ======================
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ]);
      
      // Procesar los productos para construir la URL completa de la imagen
      const processedProducts = productsRes.data.map(product => ({
        ...product,
        // Aquí se crea la URL absoluta para la imagen
        imageUrl: product.imagen ? `https://api.satelmovil.com/uploads/${product.imagen}` : '/placeholder.jpg'
      }));

      setProducts(processedProducts);
      setCategories(categoriesRes.data);

    } catch (err) {
      setError('No se pudieron cargar los datos del dashboard.');
      toast.error('Error al cargar datos.');
    } finally {
      setLoading(false);
    }
  }, []);
  // ======================= FIN DE LA CORRECCIÓN ========================


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const TabButton = ({ tabId, icon, label }) => (
    <button
      onClick={() => setActiveTab(tabId)}
      className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        activeTab === tabId ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  const renderContent = () => {
    if (loading) return <div className="text-center p-10">Cargando datos...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    switch (activeTab) {
      case 'stats':
        return <DashboardStats products={products} categories={categories} />;
      case 'products':
        return <ProductManager products={products} categories={categories} refetchProducts={fetchData} />;
      case 'categories':
        return <CategoryManager categories={categories} refetchCategories={fetchData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-48 pb-10">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center">Panel de Administración</h1>
        </header>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white p-2 rounded-lg border shadow-sm">
            <TabButton tabId="stats" label="Estadísticas" icon={<FaTachometerAlt />} />
            <TabButton tabId="products" label="Productos" icon={<FaBoxOpen />} />
            <TabButton tabId="categories" label="Categorías" icon={<FaTags />} />
          </div>
        </div>

        <main className="w-full max-w-6xl mx-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;