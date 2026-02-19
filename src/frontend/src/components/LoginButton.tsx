import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

export default function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <button
      onClick={handleAuth}
      disabled={disabled}
      className={`flex items-center gap-2 px-6 py-2 rounded font-bold uppercase text-sm tracking-wider transition-all ${
        isAuthenticated
          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
          : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-900/50'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {disabled ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : isAuthenticated ? (
        <>
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </>
      ) : (
        <>
          <LogIn className="w-4 h-4" />
          <span>Login</span>
        </>
      )}
    </button>
  );
}
