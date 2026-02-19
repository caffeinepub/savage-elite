import { useIsCallerAdmin } from '../hooks/useQueries';
import AdminSignupList from '../components/AdminSignupList';
import AccessDeniedScreen from '../components/AccessDeniedScreen';
import { Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const { data: isAdmin, isLoading } = useIsCallerAdmin();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-red-500" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <AccessDeniedScreen />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mb-8 uppercase tracking-wider text-center">
        Admin Dashboard
      </h1>
      <AdminSignupList />
    </div>
  );
}
