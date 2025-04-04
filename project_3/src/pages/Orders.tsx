import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, Star, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Order } from '../lib/types';

export function Orders() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return; // Guard clause if user is null
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              *,
              product:products (*)
            )
          `)
          .eq('user_id', user.id) // Use user.id directly
          .eq('status', activeTab === 'active' ? 'pending' : 'delivered')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, activeTab]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Package className="w-5 h-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'shipped':
        return 'En camino';
      case 'delivered':
        return 'Entregado';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center sticky top-0 z-10 shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full mr-4"
          aria-label="Volver atrás"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Mis Pedidos</h1>
      </div>

      {/* Tabs */}
      <div className="flex p-4">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2 text-sm font-medium rounded-full ${
            activeTab === 'active'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Activos
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-2 text-sm font-medium rounded-full ml-2 ${
            activeTab === 'completed'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Completados
        </button>
      </div>

      {/* Orders List */}
      <div className="px-4 pb-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay pedidos {activeTab === 'active' ? 'activos' : 'completados'}
            </h3>
            <p className="text-gray-500">
              {activeTab === 'active'
                ? 'Tus pedidos en proceso aparecerán aquí'
                : 'Los pedidos entregados aparecerán aquí'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span className="ml-2 font-medium">
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Pedido #{order.id.slice(0, 8)}
                  </p>
                </div>

                <div className="divide-y">
                  {order.order_items?.map((item) => (
                    <div key={item.id} className="p-4 flex items-center">
                      {item.product?.images?.[0] && (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg mr-4"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium">{item.product?.name}</h3>
                        <p className="text-sm text-gray-500">
                          Cantidad: {item.quantity}
                        </p>
                        <p className="text-sm font-medium">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Total</span>
                    <span className="text-lg font-bold">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>

                  {order.status === 'delivered' && (
                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 bg-purple-600 text-white rounded-full text-sm font-medium">
                        <Star className="w-4 h-4 inline-block mr-1" />
                        Calificar
                      </button>
                      <button className="flex-1 py-2 border border-purple-600 text-purple-600 rounded-full text-sm font-medium">
                        <MessageCircle className="w-4 h-4 inline-block mr-1" />
                        Contactar vendedor
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}