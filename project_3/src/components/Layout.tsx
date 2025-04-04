import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Search, Bell, Globe, MessageCircleQuestion as QuestionMarkCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Coom</span>
                  <span className="text-white">Ünity</span>
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 px-4 py-1.5 bg-[#333333] text-white rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <button className="p-2 text-gray-400 hover:text-white" aria-label="Ayuda">
                <QuestionMarkCircle className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white" aria-label="Notificaciones">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white" aria-label="Idioma">
                <Globe className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate(user ? '/profile' : '/login')}
                className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"
                aria-label="Perfil de usuario"
              >
                <User className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}