import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Play, BarChart, Users, ShoppingBag, User } from 'lucide-react';
import { useEffect, useState } from 'react';

const NAVIGATION_ITEMS = [
  { icon: Play, label: 'UPlay', path: '/play' },
  { icon: BarChart, label: 'UStats', path: '/analytics' },
  { icon: Users, label: 'USocial', path: '/social' },
  { icon: ShoppingBag, label: 'UMarket', path: '/marketplace' },
  { icon: User, label: 'Perfil', path: '/profile' }
];

export function BottomNavigation() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const isNearBottom = window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 100;

      if (!isHovered) {
        setIsVisible(!isScrollingDown || isNearBottom);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHovered]);

  // Don't show navigation during fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsVisible(!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Touch-sensitive area */}
      <div 
        className="absolute -top-20 left-0 right-0 h-20 bg-gradient-to-t from-black/5 to-transparent"
        onMouseEnter={() => setIsVisible(true)}
      />
      
      <div className="flex justify-around items-center h-16 px-4 max-w-lg mx-auto">
        {NAVIGATION_ITEMS.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
              location.pathname === path ? 'text-purple-600' : 'text-gray-600'
            } hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
            role="link"
            aria-current={location.pathname === path ? 'page' : undefined}
          >
            <Icon className="h-6 w-6 mb-1" aria-hidden="true" />
            <span className="text-xs font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}