import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { useDealership } from '../../context/DealershipContext';

interface AuthModalProps {
  onClose: () => void;
  onOpenDashboard: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onOpenDashboard }) => {
  const { currentUser, loginWithEmail, registerWithEmail, logout } = useDealership();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (mode === 'register') {
        await registerWithEmail(fullName, email, password);
      } else {
        await loginWithEmail(email, password);
      }
      onClose();
      onOpenDashboard();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to sign in. Please try again.';
      setError(message.replace('Firebase: ', '').replace(/\s*\(auth\/[a-z-]+\)\.?/i, ''));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-md bg-[#0f1118] border border-[#272b38] rounded-2xl shadow-2xl p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#1f2230]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              {currentUser ? 'Client Account Status' : (mode === 'login' ? 'Client Sign In' : 'Register VIP Account')}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-white bg-[#181a24] rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {currentUser ? (
          <div className="space-y-4">
            <div className="p-4 bg-[#141622] rounded-xl border border-[#222534] space-y-1">
              <span className="text-[11px] text-[#D4AF37] font-semibold block">Signed In As:</span>
              <h4 className="text-sm font-bold text-white">{currentUser.fullName}</h4>
              <p className="text-xs text-neutral-400">{currentUser.email}</p>
              <p className="text-[11px] text-neutral-500 capitalize">Role: {currentUser.role}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenDashboard();
                }}
                className="flex-1 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-black font-bold text-xs uppercase rounded-lg"
              >
                Go to Portal
              </button>
              <button
                onClick={() => { void logout(); }}
                className="px-4 py-2.5 bg-red-950/60 border border-red-800 text-red-300 font-bold text-xs uppercase rounded-lg hover:bg-red-900/60"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs text-neutral-300 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alhaji Ibrahim Danjuma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#181a24] border border-[#272b38] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="client@timberautos.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#181a24] border border-[#272b38] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#181a24] border border-[#272b38] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {error && <p role="alert" className="text-xs text-red-300 bg-red-950/40 border border-red-900 rounded-lg p-3">{error}</p>}

            <button
              type="submit" disabled={busy}
              className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:opacity-95 cursor-pointer"
            >
              {busy ? 'Please wait...' : mode === 'login' ? 'Sign In to Portal' : 'Create VIP Account'}
            </button>



            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-xs text-neutral-400 hover:text-[#D4AF37] underline"
              >
                {mode === 'login' ? 'New client? Register an account' : 'Already registered? Sign in'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
