import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wallet, Heart, ClipboardList, Activity,
  Target, FileText, HelpCircle, ChevronLeft, Star
} from 'lucide-react';

interface MarketplaceMenuProps {
  onClose: () => void;
}

export function MarketplaceMenu({ onClose }: MarketplaceMenuProps) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50">
      <div className="bg-gray-900 w-full max-w-md min-h-screen">
        <div className="p-4 flex items-center space-x-2">
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded-lg text-white"
            aria-label="Close Menu"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-white">Menú ÜMarket / Consumidor</span>
        </div>

        <div className="p-4 space-y-6">
          {/* Profile Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36" 
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-300">Hola,</span>
                    <span className="text-sm font-medium text-white">@Nickname</span>
                  </div>
                  <p className="text-xs text-gray-400">Lucía Gómez López</p>
                </div>
              </div>
              <Link 
                to="/profile"
                className="text-sm text-purple-400 font-medium hover:text-purple-300"
                onClick={onClose}
              >
                Ver
              </Link>
            </div>

            <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-white">0</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-white">12</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-white">8.0</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <span className="text-sm text-white">Mi progreso</span>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-purple-600 rounded-full" />
            </div>
          </div>

          {/* Wallet */}
          <Link
            to="/wallet"
            onClick={onClose}
            className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            <div className="flex items-center space-x-3">
              <Wallet className="w-5 h-5 text-gray-300" />
              <span className="text-sm text-white">Mi Wallet</span>
            </div>
            <span className="text-sm text-purple-400">U 2020</span>
          </Link>

          {/* Main Menu Items */}
          <div className="space-y-2">
            <Link
              to="/wishlist"
              onClick={onClose}
              className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg group"
            >
              <Heart className="w-5 h-5 text-gray-300 group-hover:text-white" />
              <span className="text-sm text-gray-300 group-hover:text-white">Mi Wishlist</span>
            </Link>
            <Link
              to="/requests"
              onClick={onClose}
              className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg"
            >
              <ClipboardList className="w-5 h-5 text-gray-600" />
              <span className="text-sm">Mis solicitudes</span>
            </Link>
            <Link
              to="/activity"
              onClick={onClose}
              className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg"
            >
              <Activity className="w-5 h-5 text-gray-600" />
              <span className="text-sm">Mi actividad</span>
            </Link>
          </div>

          {/* General Section */}
          <div>
            <h3 className="text-sm mb-2 text-gray-400">Generales</h3>
            <div className="space-y-2">
              <Link
                to="/missions"
                onClick={onClose}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg"
              >
                <Target className="w-5 h-5 text-gray-600" />
                <span className="text-sm">Misiones</span>
              </Link>
              <Link
                to="/forms"
                onClick={onClose}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg"
              >
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="text-sm">Formularios</span>
              </Link>
              <Link
                to="/help"
                onClick={onClose}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg"
              >
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <span className="text-sm">Ayuda</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}