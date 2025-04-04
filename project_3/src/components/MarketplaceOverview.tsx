import React from 'react';
import { Search, Filter, ShoppingCart, Mic, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MarketplaceMenu } from './MarketplaceMenu';

interface MarketplaceOverviewProps {
  onSearch: (term: string) => void;
  onFilter: () => void;
  cartItemCount: number;
}

export function MarketplaceOverview({ onSearch, onFilter, cartItemCount }: MarketplaceOverviewProps) {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div className="bg-[#1E1E1E] px-4 py-2 sticky top-0 z-10">
      {showMenu && <MarketplaceMenu onClose={() => setShowMenu(false)} />}
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button 
            onClick={() => setShowMenu(true)} 
            className="p-2 -ml-2 hover:bg-[#2A2A2A] rounded-full"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-semibold ml-2 text-white">ÜMarket</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={onFilter}
            className="p-2 text-white hover:bg-[#2A2A2A] rounded-full"
          >
            <Filter className="w-5 h-5" />
          </button>
          <Link to="/orders" className="p-2 text-white hover:bg-[#2A2A2A] rounded-full">
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <Link to="/reviews" className="relative p-2">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Role Selector */}
      <div className="flex rounded-full bg-[#2A2A2A] p-1 mb-4">
        <button
          className="flex-1 py-2 text-sm font-medium rounded-full bg-purple-600 text-white"
        >
          Consumidor
        </button>
        <button
          className="flex-1 py-2 text-sm font-medium rounded-full text-gray-300 hover:bg-[#333333]"
        >
          Proveedor
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="¿Qué quieres encontrar?"
          className="w-full pl-10 pr-12 py-3 bg-[#2A2A2A] text-white placeholder-gray-400 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
        <button className="absolute right-3 top-3">
          <Mic className="h-5 w-5 text-gray-300" />
        </button>
      </div>
    </div>
  );
}