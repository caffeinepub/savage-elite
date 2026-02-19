import { useGetAllMerchItems } from '../hooks/useQueries';
import MerchCard from './MerchCard';
import { Loader2 } from 'lucide-react';

export default function MerchGrid() {
  const { data: merchItems, isLoading, error } = useGetAllMerchItems();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 animate-spin text-red-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 text-lg">Failed to load merchandise. Please try again later.</p>
      </div>
    );
  }

  if (!merchItems || merchItems.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">No merchandise available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {merchItems.map((item) => (
        <MerchCard key={item.id.toString()} item={item} />
      ))}
    </div>
  );
}
