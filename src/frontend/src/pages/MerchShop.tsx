import MerchGrid from '../components/MerchGrid';

export default function MerchShop() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700 mb-4 uppercase tracking-wider">
          Merch Store
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Gear up with official Savage Elite merchandise. Show your allegiance to the elite.
        </p>
      </div>

      <MerchGrid />
    </div>
  );
}
