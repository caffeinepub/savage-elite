import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { ShoppingCart, Users, Shield, Store } from 'lucide-react';
import { SiCaffeine } from 'react-icons/si';
import LoginButton from './LoginButton';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useIsCallerAdmin } from '../hooks/useQueries';
import ProfileSetupModal from './ProfileSetupModal';

export default function Layout() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { data: isAdmin } = useIsCallerAdmin();

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-red-900/30 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => navigate({ to: '/' })}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <img
                src="/assets/generated/savage-elite-logo.dim_512x512.png"
                alt="Savage Elite"
                className="h-12 w-12 object-contain group-hover:scale-110 transition-transform"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-red-500 tracking-wider uppercase">
                  Savage Elite
                </span>
                <span className="text-xs text-green-400 font-semibold tracking-widest">
                  GAMING TEAM
                </span>
              </div>
            </button>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => navigate({ to: '/shop' })}
                className={`flex items-center gap-2 px-4 py-2 rounded font-bold uppercase text-sm tracking-wider transition-all ${
                  currentPath === '/shop' || currentPath === '/'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:text-red-400 hover:bg-red-950/30'
                }`}
              >
                <Store className="w-4 h-4" />
                Shop
              </button>
              <button
                onClick={() => navigate({ to: '/signup' })}
                className={`flex items-center gap-2 px-4 py-2 rounded font-bold uppercase text-sm tracking-wider transition-all ${
                  currentPath === '/signup'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:text-green-400 hover:bg-green-950/30'
                }`}
              >
                <Users className="w-4 h-4" />
                Join Team
              </button>
              {isAuthenticated && (
                <button
                  onClick={() => navigate({ to: '/cart' })}
                  className={`flex items-center gap-2 px-4 py-2 rounded font-bold uppercase text-sm tracking-wider transition-all ${
                    currentPath === '/cart'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:text-red-400 hover:bg-red-950/30'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                </button>
              )}
              {isAdmin && (
                <button
                  onClick={() => navigate({ to: '/admin' })}
                  className={`flex items-center gap-2 px-4 py-2 rounded font-bold uppercase text-sm tracking-wider transition-all ${
                    currentPath === '/admin'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-950/30'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </button>
              )}
            </nav>

            {/* Login Button */}
            <LoginButton />
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex items-center gap-3 mt-4 overflow-x-auto pb-2">
            <button
              onClick={() => navigate({ to: '/shop' })}
              className={`flex items-center gap-2 px-3 py-2 rounded font-bold uppercase text-xs tracking-wider transition-all whitespace-nowrap ${
                currentPath === '/shop' || currentPath === '/'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:text-red-400 hover:bg-red-950/30'
              }`}
            >
              <Store className="w-4 h-4" />
              Shop
            </button>
            <button
              onClick={() => navigate({ to: '/signup' })}
              className={`flex items-center gap-2 px-3 py-2 rounded font-bold uppercase text-xs tracking-wider transition-all whitespace-nowrap ${
                currentPath === '/signup'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:text-green-400 hover:bg-green-950/30'
              }`}
            >
              <Users className="w-4 h-4" />
              Join
            </button>
            {isAuthenticated && (
              <button
                onClick={() => navigate({ to: '/cart' })}
                className={`flex items-center gap-2 px-3 py-2 rounded font-bold uppercase text-xs tracking-wider transition-all whitespace-nowrap ${
                  currentPath === '/cart'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:text-red-400 hover:bg-red-950/30'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                Cart
              </button>
            )}
            {isAdmin && (
              <button
                onClick={() => navigate({ to: '/admin' })}
                className={`flex items-center gap-2 px-3 py-2 rounded font-bold uppercase text-xs tracking-wider transition-all whitespace-nowrap ${
                  currentPath === '/admin'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-950/30'
                }`}
              >
                <Shield className="w-4 h-4" />
                Admin
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-red-900/30 bg-black/80 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Savage Elite Gaming Team. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Built with</span>
              <SiCaffeine className="text-red-500 w-4 h-4" />
              <span>using</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  window.location.hostname
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 font-semibold transition-colors"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Profile Setup Modal */}
      {showProfileSetup && <ProfileSetupModal />}
    </div>
  );
}
