import React, { useState } from 'react';
import { 
  Search, MessageCircle, Bell, 
  Image, Smile, Send, MoreVertical,
  ThumbsUp, Share2, Bookmark
} from 'lucide-react';
import { BottomNavigation } from '../components/BottomNavigation';

export function Social() {
  const [newPost, setNewPost] = useState('');

  const posts = [
    {
      id: 1,
      user: {
        name: 'Ana García',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        username: '@anagarcia'
      },
      content: 'Acabo de completar mi curso de fotografía digital. ¡Increíble experiencia! 📸',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
      likes: 124,
      comments: 18,
      timestamp: '2h'
    },
    {
      id: 2,
      user: {
        name: 'Carlos López',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
        username: '@carloslopez'
      },
      content: 'Compartiendo conocimientos sobre marketing digital en mi última clase. ¡Gracias a todos por participar! 🚀',
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a',
      likes: 89,
      comments: 12,
      timestamp: '4h'
    },
    {
      id: 3,
      user: {
        name: 'Laura Martínez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        username: '@lauramartinez'
      },
      content: 'Nuevo proyecto de diseño web en camino. ¡Emocionada por compartir los resultados! 💻',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
      likes: 156,
      comments: 24,
      timestamp: '6h'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-2 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-white">ÜSocial</h1>
          <div className="flex items-center space-x-4">
            <button aria-label="Buscar" className="text-gray-300 hover:text-white">
              <Search className="w-6 h-6" />
            </button>
            <button aria-label="Mensajes" className="text-gray-300 hover:text-white">
              <MessageCircle className="w-6 h-6" />
            </button>
            <button aria-label="Notificaciones" className="text-gray-300 hover:text-white relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>

        {/* Create Post */}
        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-4">
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="¿Qué estás pensando?"
                className="w-full bg-gray-600 text-white placeholder-gray-400 rounded-lg p-3 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex items-center justify-between mt-3">
                <div className="flex space-x-2">
                  <button aria-label="Adjuntar imagen" className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-full">
                    <Image className="w-5 h-5" />
                  </button>
                  <button aria-label="Abrir selector de emojis" className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-full">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <button 
                  className="px-4 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 flex items-center"
                  disabled={!newPost.trim()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="px-4 pb-20">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-800 rounded-lg mb-4 overflow-hidden">
            {/* Post Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-white">{post.user.name}</h3>
                  <p className="text-sm text-gray-400">{post.user.username} · {post.timestamp}</p>
                </div>
              </div>
              <button aria-label="Más opciones" className="text-gray-400 hover:text-white">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Post Content */}
            <p className="px-4 pb-4 text-white">{post.content}</p>
            
            {post.image && (
              <img
                src={post.image}
                alt="Post content"
                className="w-full aspect-video object-cover"
              />
            )}

            {/* Post Actions */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-700">
              <div className="flex space-x-6">
                <button className="flex items-center text-gray-400 hover:text-purple-500">
                  <ThumbsUp className="w-5 h-5 mr-2" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center text-gray-400 hover:text-purple-500">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span>{post.comments}</span>
                </button>
                <button aria-label="Compartir post" className="flex items-center text-gray-400 hover:text-purple-500">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <button aria-label="Guardar post" className="text-gray-400 hover:text-purple-500">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNavigation />
    </div>
  );
}