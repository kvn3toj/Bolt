import React from 'react';
import { Camera, Heart, Code, Briefcase, Dumbbell, Clock, Palette, Coins, MessageSquare, Users } from 'lucide-react';

const CATEGORIES = [
  { id: 'photography', icon: Camera, name: 'Fotografía' },
  { id: 'mindfulness', icon: Heart, name: 'Mindfulness' },
  { id: 'technology', icon: Code, name: 'Tecnología' },
  { id: 'business', icon: Briefcase, name: 'Negocios' },
  { id: 'health', icon: Dumbbell, name: 'Salud' },
  { id: 'productivity', icon: Clock, name: 'Productividad' },
  { id: 'art', icon: Palette, name: 'Arte' },
  { id: 'finance', icon: Coins, name: 'Finanzas' },
  { id: 'communication', icon: MessageSquare, name: 'Comunicación' },
  { id: 'social', icon: Users, name: 'Emprendimiento' }
];

interface VideoCategoriesProps {
  onSelect: (categoryId: string) => void;
  selectedCategory: string;
}

export function VideoCategories({ onSelect, selectedCategory }: VideoCategoriesProps) {
  return (
    <div key="video-categories" className="grid grid-cols-4 gap-4 p-4">
      {CATEGORIES.map(({ id, icon: Icon, name }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`flex flex-col items-center ${
            selectedCategory === id ? 'text-purple-600' : 'text-gray-600'
          }`}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${
            selectedCategory === id ? 'bg-purple-100' : 'bg-gray-100'
          }`}>
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-xs text-center">{name}</span>
        </button>
      ))}
    </div>
  );
}