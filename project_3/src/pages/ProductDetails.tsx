import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Heart, Share2, Star, MapPin,
  Truck, Shield, ArrowLeft,
  Send, Image, Paperclip, Smile
} from 'lucide-react';
import { useCartStore } from '../stores/cartStore';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const { addItem } = useCartStore();
  const chatRef = useRef<HTMLDivElement>(null);

  const messages = useMemo(() => [
    { id: 1, sender: 'seller', text: '¡Hola! ¿En qué puedo ayudarte?', time: '10:30' },
    { id: 2, sender: 'buyer', text: '¿Tiene garantía internacional?', time: '10:31' },
    { id: 3, sender: 'seller', text: 'Sí, cuenta con 1 año de garantía internacional', time: '10:32' }
  ], []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // This would normally come from your database
  const product = {
    id,
    name: 'Smartwatch Pro X',
    description: 'Último modelo con monitor cardíaco y seguimiento de actividad física. Incluye pantalla AMOLED, resistencia al agua y batería de larga duración.',
    price: 299.99,
    rating: 4.8,
    reviews: 156,
    seller: 'TechStore',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
    location: 'Miami, FL',
    stock: 50,
    features: [
      'Monitor cardíaco avanzado',
      'Pantalla AMOLED de 1.4"',
      'Resistente al agua (5ATM)',
      'Batería de 14 días',
      'GPS integrado'
    ],
    specs: {
      'Pantalla': 'AMOLED 1.4"',
      'Batería': '420mAh',
      'Resistencia': '5ATM',
      'Conectividad': 'Bluetooth 5.0',
      'Compatibilidad': 'iOS/Android'
    }
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id!,
      quantity,
      name: product.name,
      price: product.price
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-700 rounded-full"
          aria-label="Volver atrás"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex space-x-2">
          <button aria-label="Compartir producto" className="p-2 hover:bg-gray-700 rounded-full">
            <Share2 className="w-6 h-6 text-white" />
          </button>
          <button aria-label="Agregar a favoritos" className="p-2 hover:bg-gray-700 rounded-full">
            <Heart className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Product Images */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover"
        />
        <div className="absolute bottom-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-medium">
          1/4
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-gray-800 p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-xl font-semibold">{product.name}</h1>
            <div className="flex items-center mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1">{product.rating}</span>
              <span className="mx-1">•</span>
              <span className="text-gray-500">{product.reviews} reviews</span>
            </div>
          </div>
          <span className="text-2xl font-bold text-purple-600">
            ${product.price}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-400 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          {product.location}
        </div>

        <p className="text-gray-600 mb-4">
          {product.description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <h2 className="font-medium mb-2">Características principales</h2>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Specifications */}
        <div className="mb-6 bg-gray-700 rounded-lg p-4">
          <h2 className="font-medium mb-2">Especificaciones</h2>
          <div className="space-y-2">
            {Object.entries(product.specs).map(([key, value], index) => (
              <div key={index} className="flex justify-between py-2 border-b border-gray-600 last:border-0">
                <span className="text-gray-400">{key}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mb-6">
          <h2 className="font-medium mb-2">Cantidad</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-700"
              aria-label="Disminuir cantidad"
            >
              -
            </button>
            <span className="font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-700"
              aria-label="Aumentar cantidad"
            >
              +
            </button>
            <span className="text-sm text-gray-400">
              {product.stock} disponibles
            </span>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 gap-4 mb-6 mt-6">
          <div className="flex items-center space-x-3 bg-gray-700 p-3 rounded-lg">
            <Truck className="w-5 h-5 text-purple-600" />
            <div className="text-sm">
              <p className="font-medium">Envío Gratis</p>
              <p className="text-gray-400">En compras +$50</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-gray-700 p-3 rounded-lg">
            <Shield className="w-5 h-5 text-purple-600" />
            <div className="text-sm">
              <p className="font-medium">Garantía</p>
              <p className="text-gray-400">12 meses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black/80 z-50">
          <div className="absolute inset-x-0 bottom-0 bg-gray-800 rounded-t-xl">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <img
                  src={product.seller_avatar}
                  alt={product.seller_name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{product.seller_name}</h3>
                  <p className="text-sm text-gray-400">En línea</p>
                </div>
              </div>
              <button 
                onClick={() => setShowChat(false)}
                className="p-2 hover:bg-gray-700 rounded-full"
                aria-label="Cerrar chat"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={chatRef}
              className="h-[400px] overflow-y-auto p-4 space-y-4"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === 'buyer'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <button aria-label="Adjuntar imagen" className="p-2 hover:bg-gray-700 rounded-full">
                  <Image className="w-5 h-5 text-gray-400" />
                </button>
                <button aria-label="Adjuntar archivo" className="p-2 hover:bg-gray-700 rounded-full">
                  <Paperclip className="w-5 h-5 text-gray-400" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-gray-700 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button aria-label="Abrir selector de emojis" className="p-2 hover:bg-gray-700 rounded-full">
                  <Smile className="w-5 h-5 text-gray-400" />
                </button>
                <button aria-label="Enviar mensaje" className="p-2 bg-purple-600 rounded-full hover:bg-purple-700">
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setShowChat(true)}
            className="flex-1 py-3 border border-purple-600 text-purple-600 rounded-full font-medium hover:bg-purple-600/10"
          >
            Chat con vendedor
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700"
          >
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  );
}