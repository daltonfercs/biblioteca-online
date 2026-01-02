import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RentalsProvider } from './context/RentalsContext';
import { CartProvider } from './context/CartContext';
import { BooksProvider } from './context/BooksContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import BookDetail from './pages/BookDetail';
import MyRentals from './pages/MyRentals';
import ShoppingCart from './pages/ShoppingCart';
import ConfirmRental from './pages/ConfirmRental';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BooksProvider>
          <RentalsProvider>
            <CartProvider>
              <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalog />} />
                <Route path="/libro/:id" element={<BookDetail />} />
                <Route path="/carrito" element={<ShoppingCart />} />
                <Route path="/confirmar-alquiler" element={<ConfirmRental />} />
                <Route path="/mis-alquileres" element={<MyRentals />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
            </CartProvider>
          </RentalsProvider>
        </BooksProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;