import React from 'react';
import { Menu, Search, MessageSquare, Bell } from 'lucide-react';

interface ProfileOverviewProps {
  onSearch?: () => void;
  onMenu?: () => void;
}

export function ProfileOverview({ onSearch, onMenu }: ProfileOverviewProps) {
  return (
    <div className="bg-white px-4 py-2 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button onClick={onMenu} className="p-2" aria-label="Open menu">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="ml-2 text-xl font-semibold">Mi Perfil</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={onSearch} className="p-2" aria-label="Search">
            <Search className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2" aria-label="Messages">
            <MessageSquare className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 relative" aria-label="Notifications">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button className="px-4 py-2 text-sm font-medium text-purple-600 border-b-2 border-purple-600">
          Mi perfil
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-500">
          Actividad
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-500">
          Configuración
        </button>
      </div>
    </div>
  );
}