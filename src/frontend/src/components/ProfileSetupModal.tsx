import { useState } from 'react';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfileSetupModal() {
  const [name, setName] = useState('');
  const [gamerTag, setGamerTag] = useState('');
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !gamerTag.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await saveProfile.mutateAsync({ name: name.trim(), gamerTag: gamerTag.trim() });
      toast.success('Profile created successfully!');
    } catch (error) {
      toast.error('Failed to create profile');
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-600 rounded-lg p-8 max-w-md w-full shadow-2xl shadow-red-900/50">
        <h2 className="text-3xl font-black text-red-500 mb-2 uppercase tracking-wider">
          Welcome, Warrior!
        </h2>
        <p className="text-gray-400 mb-6">Set up your profile to join Savage Elite</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-red-900/50 rounded text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="gamerTag" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
              Gamer Tag
            </label>
            <input
              id="gamerTag"
              type="text"
              value={gamerTag}
              onChange={(e) => setGamerTag(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-red-900/50 rounded text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              placeholder="Enter your gamer tag"
              required
            />
          </div>

          <button
            type="submit"
            disabled={saveProfile.isPending}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 px-6 rounded uppercase tracking-wider transition-all shadow-lg shadow-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saveProfile.isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Profile...</span>
              </>
            ) : (
              <span>Create Profile</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
