import { useGetAllSignups } from '../hooks/useQueries';
import { Loader2, Users } from 'lucide-react';

export default function AdminSignupList() {
  const { data: signups, isLoading, error } = useGetAllSignups();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 animate-spin text-yellow-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 text-lg">Failed to load signups. Please try again later.</p>
      </div>
    );
  }

  if (!signups || signups.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-900/50 rounded-lg p-12 text-center shadow-xl">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-400 mb-2">No applications yet</h2>
          <p className="text-gray-500">Team signup applications will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-900/50 rounded-lg shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/50 border-b border-yellow-900/30">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-black text-yellow-400 uppercase tracking-wider">
                  Gamer Tag
                </th>
                <th className="px-6 py-4 text-left text-sm font-black text-yellow-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-black text-yellow-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-black text-yellow-400 uppercase tracking-wider">
                  Experience
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-900/20">
              {signups.map((signup, index) => (
                <tr key={index} className="hover:bg-yellow-900/10 transition-colors">
                  <td className="px-6 py-4 text-white font-semibold">{signup.gamerTag}</td>
                  <td className="px-6 py-4 text-gray-300">{signup.email}</td>
                  <td className="px-6 py-4 text-gray-300">{signup.preferredRole}</td>
                  <td className="px-6 py-4 text-gray-300">{signup.experienceLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Total Applications: <span className="font-bold text-yellow-400">{signups.length}</span>
        </p>
      </div>
    </div>
  );
}
