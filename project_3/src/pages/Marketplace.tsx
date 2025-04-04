import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../lib/types';
import { Link } from 'react-router-dom';
import { MarketplaceOverview } from '../components/MarketplaceOverview';
import { useCartStore } from '../stores/cartStore';
import { 
  Star, Heart, MapPin, Package, Tag,
  MessageCircle, Share2
} from 'lucide-react';
import { BottomNavigation } from '../components/BottomNavigation';

export function Marketplace() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const { addItem, items } = useCartStore();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  const categories = [
    { id: 'electronics', name: 'Electrónicos', icon: Package },
    { id: 'fashion', name: 'Moda', icon: Tag },
    { id: 'home', name: 'Hogar', icon: Package },
    { id: 'sports', name: 'Deportes', icon: Package },
  ];


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('products')
          .select('*');

        if (searchTerm) {
          query = query.ilike('name', `%${searchTerm}%`);
        }

        if (selectedCategory !== 'all') {
          query = query.eq('category', selectedCategory);
        }
        
        query = query.limit(10);

        const { data, error } = await query;

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  async function fetchFeaturedProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .limit(3);

      if (error) throw error;
      setFeaturedProducts(data || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-[#1E1E1E] min-h-screen text-white pb-20">
      <MarketplaceOverview 
        onSearch={setSearchTerm}
        onFilter={() => setShowFilters(!showFilters)}
        cartItemCount={items.length}
      />

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white p-4 shadow-lg rounded-b-lg">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Rango de Precio</h3>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full"
                  aria-label="Rango de precio mínimo"
                />
                <span className="text-sm text-gray-600">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Calificación</h3>
              <div className="flex space-x-2">
                {[5,4,3,2,1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating)}
                    aria-label={`Filtrar por ${rating} estrellas`}
                    className={`p-2 rounded ${
                      selectedRating === rating 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'bg-gray-100'
                    }`}
                  >
                    {rating}★
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Category Grid */}
      <div className="grid grid-cols-4 gap-2 p-4">
        {categories.map(({ id, name, icon: Icon }) => (
          <div key={id} className="flex flex-col items-center">
            <button
              onClick={() => {
                setSelectedCategory(id);
                setShowFilters(false);
              }}
              aria-label={`Filtrar por categoría ${name}`}
              className="w-14 h-14 bg-[#2A2A2A] hover:bg-[#333333] rounded-full flex items-center justify-center mb-2 transition-colors"
            >
              <Icon className="w-6 h-6 text-gray-300" />
            </button>
            <span className="text-xs text-gray-300">{name}</span>
          </div>
        ))}
      </div>

      {/* Featured Products */}
      <div className="px-4 mb-8">
        <h2 className="text-lg font-medium mb-4 text-white">Productos Destacados</h2>
        <div className="space-y-4">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="block bg-[#2A2A2A] rounded-lg shadow-lg overflow-hidden hover:bg-[#333333] transition-colors"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <button 
                  aria-label="Agregar a favoritos" 
                  className="absolute top-2 right-2 p-2 bg-gray-900/50 backdrop-blur-sm rounded-full"
                >
                  <Heart className="w-5 h-5 text-white" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20" />
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-lg text-white">{product.name}</h3>
                    <p className="text-sm text-gray-400">{product.description}</p>
                  </div>
                  <span className="text-lg font-bold text-purple-600">
                    ${product.price}
                  </span>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center mr-4">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-white">{product.rating?.toFixed(1)}</span>
                    <span className="text-xs text-gray-400 ml-1">
                      ({product.reviews_count})
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin className="w-4 h-4 mr-1" />
                    {product.location}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button aria-label="Contactar vendedor" className="p-2 text-gray-400 hover:text-white">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button aria-label="Compartir producto" className="p-2 text-gray-400 hover:text-white">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => addItem({
                      productId: product.id,
                      quantity: 1,
                      name: product.name,
                      price: product.price
                    })}
                    className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Recommended Section */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-medium text-white">Recomendados</h2>
          <button aria-label="Ver todos los productos recomendados" className="text-sm text-purple-400 hover:text-purple-300">Ver todo</button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="px-4 grid grid-cols-2 gap-4">
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="bg-[#2A2A2A] rounded-lg shadow-lg overflow-hidden relative hover:bg-[#333333] transition-colors"
            >
              <button aria-label="Agregar a favoritos" className="absolute top-2 right-2 z-10 p-1.5 bg-gray-900/50 backdrop-blur-sm rounded-full">
                <Heart className="w-4 h-4 text-white" />
              </button>
              
              {product.images[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-32 object-cover"
                />
              )}
              
              <div className="p-2">
                <div className="flex items-center mb-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-xs ml-1 text-white">{product.rating?.toFixed(1)}</span>
                  <span className="text-xs text-gray-300 ml-1">({product.reviews_count})</span>
                </div>
                
                <h3 className="text-sm font-medium line-clamp-2 mb-1 text-white">{product.name}</h3>
                
                <div className="flex items-center text-xs text-gray-400 mb-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{product.location || 'No location'}</span>
                </div>
                
                <span className="text-sm font-semibold text-purple-400">${product.price}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}