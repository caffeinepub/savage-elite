import { Shield } from 'lucide-react';

export default function AccessDeniedScreen() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-600 rounded-lg p-12 text-center shadow-2xl shadow-red-900/30">
          <Shield className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h1 className="text-4xl font-black text-red-500 mb-4 uppercase tracking-wider">
            Access Denied
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            You don't have permission to access this area.
          </p>
          <p className="text-gray-400">
            This section is restricted to administrators only.
          </p>
        </div>
      </div>
    </div>
  );
}
