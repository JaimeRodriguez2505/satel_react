import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen bg-black">
              <Header />
              <main className="flex-grow" style={{ marginTop: "10px", backgroundColor: "black" }}>
                <Routes>
                <Route path="/" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <HomePage />
                  </Suspense>
                } />
                <Route path="/catalogo" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <CatalogPage />
                  </Suspense>
                } />
                <Route path="/nosotros" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <AboutPage />
                  </Suspense>
                } />
                <Route path="/contacto" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ContactPage />
                  </Suspense>
                } />
                <Route path="/servicios" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <ServicesPage />
                  </Suspense>
                } />
                <Route path="/carrito" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <CartPage />
                  </Suspense>
                } />
                <Route path="/login" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <LoginPage />
                  </Suspense>
                } />
                <Route path="/register" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <RegisterPage />
                  </Suspense>
                } />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<LoadingSpinner />}>
                        <DashboardPage />
                      </Suspense>
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
                borderRadius: '8px',
                border: '1px solid #22c55e',
              },
              success: {
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
            }}
          />
        </CartProvider>
      </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;