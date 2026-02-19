import { useInternetIdentity } from '../hooks/useInternetIdentity';
import Cart from '../components/Cart';

export default function CartPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700 mb-6 uppercase tracking-wider">
            Shopping Cart
          </h1>
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-600 rounded-lg p-8 shadow-2xl shadow-yellow-900/30">
            <p className="text-xl text-gray-300 mb-4">
              Please log in to view your shopping cart.
            </p>
            <p className="text-gray-400">
              Click the Login button in the header to get started.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700 mb-8 uppercase tracking-wider text-center">
        Shopping Cart
      </h1>
      <Cart />
    </div>
  );
}
