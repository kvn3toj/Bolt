import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';

export function Checkout() {
  const navigate = useNavigate();
  const { items, total, removeItem, updateQuantity, clearCart } = useCartStore();
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmation'>('cart');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setStep('confirmation');
    clearCart();
  };

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">¡Compra exitosa!</h1>
          <p className="text-gray-600 mb-8">
            Tu pedido ha sido procesado correctamente. Recibirás un correo con los detalles.
          </p>
          <button
            onClick={() => navigate('/marketplace')}
            className="w-full py-3 bg-purple-600 text-white rounded-full font-medium"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center sticky top-0 z-10 shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full mr-4"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Checkout</h1>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Cart Items */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-4 border-b">
            <h2 className="font-medium">Carrito de compras</h2>
          </div>
          <div className="divide-y">
            {items.map((item) => (
              <div key={item.productId} className="p-4 flex items-center">
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-red-500 text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-4 border-b">
            <h2 className="font-medium">Resumen del pedido</h2>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>${total().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Envío</span>
              <span>Gratis</span>
            </div>
            <div className="flex justify-between font-medium text-lg pt-3 border-t">
              <span>Total</span>
              <span>${total().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-4 border-b">
            <h2 className="font-medium">Método de pago</h2>
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <CreditCard className="w-6 h-6 text-purple-600" />
              <div>
                <p className="font-medium">Tarjeta terminada en 4242</p>
                <p className="text-sm text-gray-500">Expira 12/25</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-4 border-b">
            <h2 className="font-medium">Dirección de envío</h2>
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Truck className="w-6 h-6 text-purple-600" />
              <div>
                <p className="font-medium">Casa</p>
                <p className="text-sm text-gray-500">
                  123 Main St, Apt 4B
                  <br />
                  New York, NY 10001
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={loading || items.length === 0}
          className="w-full py-3 bg-purple-600 text-white rounded-full font-medium disabled:opacity-50"
        >
          {loading ? 'Procesando...' : 'Confirmar compra'}
        </button>
      </div>
    </div>
  );
}