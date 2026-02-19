import type { CartItem as CartItemType, MerchItem } from '../backend';
import { useUpdateCartItem } from '../hooks/useQueries';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface CartItemProps {
  cartItem: CartItemType;
  item: MerchItem;
}

export default function CartItem({ cartItem, item }: CartItemProps) {
  const updateCartItem = useUpdateCartItem();

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 0) return;

    try {
      await updateCartItem.mutateAsync({
        itemId: cartItem.itemId,
        newQuantity: BigInt(newQuantity),
      });
    } catch (error) {
      toast.error('Failed to update quantity');
      console.error(error);
    }
  };

  const subtotal = Number(item.price) * Number(cartItem.quantity);

  return (
    <div className="flex gap-4 bg-black/30 rounded-lg p-4 border border-red-900/30">
      <div className="w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-black/50">
        <img
          src={`/assets/generated/${item.imageUrl}`}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">{item.name}</h3>
          <p className="text-sm text-gray-400">${Number(item.price)} each</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleUpdateQuantity(Number(cartItem.quantity) - 1)}
              disabled={updateCartItem.isPending || Number(cartItem.quantity) <= 1}
              className="w-8 h-8 flex items-center justify-center bg-red-900/50 hover:bg-red-800 text-white rounded transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {Number(cartItem.quantity) <= 1 ? <Trash2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
            </button>

            <span className="w-12 text-center font-bold text-white">{Number(cartItem.quantity)}</span>

            <button
              onClick={() => handleUpdateQuantity(Number(cartItem.quantity) + 1)}
              disabled={updateCartItem.isPending}
              className="w-8 h-8 flex items-center justify-center bg-green-900/50 hover:bg-green-800 text-white rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <span className="text-xl font-black text-red-500">${subtotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
