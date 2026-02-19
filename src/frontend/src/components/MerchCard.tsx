import { useState } from 'react';
import type { MerchItem } from '../backend';
import { useAddToCart } from '../hooks/useQueries';
import { ShoppingCart, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

interface MerchCardProps {
  item: MerchItem;
}

export default function MerchCard({ item }: MerchCardProps) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const addToCart = useAddToCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to cart');
      return;
    }

    try {
      await addToCart.mutateAsync({ itemId: item.id, quantity: BigInt(1) });
      toast.success('Added to cart!');
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    } catch (error) {
      toast.error('Failed to add to cart');
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-900/50 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-900/30 transition-all hover:scale-105 group">
      <div className="aspect-square overflow-hidden bg-black/50">
        <img
          src={`/assets/generated/${item.imageUrl}`}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-black text-white mb-2 uppercase tracking-wide">{item.name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-red-500">${Number(item.price)}</span>

          <button
            onClick={handleAddToCart}
            disabled={addToCart.isPending || justAdded}
            className={`flex items-center gap-2 px-4 py-2 rounded font-bold uppercase text-sm tracking-wider transition-all ${
              justAdded
                ? 'bg-green-600 text-white'
                : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-900/50'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
