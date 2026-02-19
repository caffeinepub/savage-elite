import { useState } from 'react';
import { useSubmitTeamSignup } from '../hooks/useQueries';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function TeamSignupForm() {
  const [gamerTag, setGamerTag] = useState('');
  const [email, setEmail] = useState('');
  const [preferredRole, setPreferredRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');

  const submitSignup = useSubmitTeamSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gamerTag.trim() || !email.trim() || !preferredRole || !experienceLevel) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await submitSignup.mutateAsync({
        gamerTag: gamerTag.trim(),
        email: email.trim(),
        preferredRole,
        experienceLevel,
      });
      toast.success('Application submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit application');
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-600 rounded-lg p-8 shadow-2xl shadow-green-900/30">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="gamerTag" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
            Gamer Tag *
          </label>
          <input
            id="gamerTag"
            type="text"
            value={gamerTag}
            onChange={(e) => setGamerTag(e.target.value)}
            className="w-full px-4 py-3 bg-black/50 border border-green-900/50 rounded text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
            placeholder="Your in-game name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-black/50 border border-green-900/50 rounded text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="preferredRole" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
            Preferred Role *
          </label>
          <select
            id="preferredRole"
            value={preferredRole}
            onChange={(e) => setPreferredRole(e.target.value)}
            className="w-full px-4 py-3 bg-black/50 border border-green-900/50 rounded text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
            required
          >
            <option value="">Select your role</option>
            <option value="Tank">Tank</option>
            <option value="DPS">DPS</option>
            <option value="Support">Support</option>
            <option value="Flex">Flex</option>
            <option value="IGL">IGL (In-Game Leader)</option>
          </select>
        </div>

        <div>
          <label htmlFor="experienceLevel" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
            Experience Level *
          </label>
          <select
            id="experienceLevel"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="w-full px-4 py-3 bg-black/50 border border-green-900/50 rounded text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
            required
          >
            <option value="">Select your level</option>
            <option value="Beginner">Beginner (0-1 years)</option>
            <option value="Intermediate">Intermediate (1-3 years)</option>
            <option value="Advanced">Advanced (3-5 years)</option>
            <option value="Expert">Expert (5+ years)</option>
            <option value="Professional">Professional (Competitive)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitSignup.isPending}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-6 rounded uppercase tracking-wider transition-all shadow-lg shadow-green-900/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitSignup.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <span>Submit Application</span>
          )}
        </button>
      </form>
    </div>
  );
}
