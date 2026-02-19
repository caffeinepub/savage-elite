import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetTeamSignup } from '../hooks/useQueries';
import TeamSignupForm from '../components/TeamSignupForm';
import { CheckCircle2 } from 'lucide-react';

export default function TeamSignup() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: existingSignup, isLoading } = useGetTeamSignup();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600 mb-6 uppercase tracking-wider">
            Join Savage Elite
          </h1>
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-600 rounded-lg p-8 shadow-2xl shadow-yellow-900/30">
            <p className="text-xl text-gray-300 mb-4">
              Please log in to apply for the Savage Elite gaming team.
            </p>
            <p className="text-gray-400">
              Click the Login button in the header to get started.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (existingSignup) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600 mb-6 uppercase tracking-wider text-center">
            Application Submitted
          </h1>
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-green-600 rounded-lg p-8 shadow-2xl shadow-green-900/30">
            <div className="flex items-center gap-4 mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <div>
                <h2 className="text-2xl font-bold text-green-400 uppercase tracking-wide">
                  You're In The Queue!
                </h2>
                <p className="text-gray-400">Your application has been received</p>
              </div>
            </div>

            <div className="space-y-3 bg-black/30 rounded p-6 border border-green-900/30">
              <div>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">Gamer Tag:</span>
                <p className="text-lg text-white font-semibold">{existingSignup.gamerTag}</p>
              </div>
              <div>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">Email:</span>
                <p className="text-lg text-white">{existingSignup.email}</p>
              </div>
              <div>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">Preferred Role:</span>
                <p className="text-lg text-white">{existingSignup.preferredRole}</p>
              </div>
              <div>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">Experience Level:</span>
                <p className="text-lg text-white">{existingSignup.experienceLevel}</p>
              </div>
            </div>

            <p className="text-gray-400 mt-6 text-center">
              Our team will review your application and get back to you soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600 mb-4 uppercase tracking-wider">
            Join Savage Elite
          </h1>
          <p className="text-xl text-gray-400">
            Think you have what it takes? Apply now and prove your worth.
          </p>
        </div>

        <TeamSignupForm />
      </div>
    </div>
  );
}
