import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { Marketplace } from './pages/Marketplace';
import { ProductDetails } from './pages/ProductDetails';
import { Checkout } from './pages/Checkout';
import { Orders } from './pages/Orders';
import { Reviews } from './pages/Reviews';
import { VideoHome } from './pages/VideoHome';
import { VideoPlayer } from './pages/VideoPlayer';
import { Analytics } from './pages/Analytics';
import { Social } from './pages/Social';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/play" element={<VideoHome />} />
            <Route path="/video/:id" element={<VideoPlayer />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/social" element={<Social />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;