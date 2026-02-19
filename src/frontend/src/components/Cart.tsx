import { useGetCart, useUpdateCartItem, useClearCart, useGetAllMerchItems } from '../hooks/useQueries';
import CartItem from './CartItem';
import { Loader2, ShoppingBag, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Cart() {
  const { data: cartItems, isLoading: cartLoading } = useGetCart();
  const { data: merchItems, isLoading: merchLoading } = useGetAllMerchItems();
  const clearCart = useClearCart();

  const isLoading = cartLoading || merchLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 animate-spin text-red-500" />
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-900/50 rounded-lg p-12 text-center shadow-xl">
          <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-400 mb-2">Your cart is empty</h2>
          <p className="text-gray-500">Add some merch to get started!</p>
        </div>
      </div>
    );
  }

  const total = cartItems.reduce((sum, cartItem) => {
    const item = merchItems?.find((m) => m.id === cartItem.itemId);
    if (!item) return sum;
    return sum + Number(item.price) * Number(cartItem.quantity);
  }, 0);

  const handleClearCart = async () => {
    try {
      await clearCart.mutateAsync();
      toast.success('Cart cleared');
    } catch (error) {
      toast.error('Failed to clear cart');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-900/50 rounded-lg p-6 shadow-xl">
        <div className="space-y-4 mb-6">
          {cartItems.map((cartItem) => {
            const item = merchItems?.find((m) => m.id === cartItem.itemId);
            if (!item) return null;
            return <CartItem key={cartItem.itemId.toString()} cartItem={cartItem} item={item} />;
          })}
        </div>

        <div className="border-t border-red-900/30 pt-6">
          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-black text-white uppercase tracking-wide">Total:</span>
            <span className="text-3xl font-black text-red-500">${total.toFixed(2)}</span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleClearCart}
              disabled={clearCart.isPending}
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded font-bold uppercase text-sm tracking-wider transition-all border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Cart</span>
            </button>

            <button
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-3 px-6 rounded uppercase tracking-wider transition-all shadow-lg shadow-green-900/50"
              onClick={() => toast.info('Checkout coming soon!')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
