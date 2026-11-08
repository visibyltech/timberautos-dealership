import React, { useState } from 'react';
import { X, Lock, Mail, User, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { useDealership } from '../../context/DealershipContext';

interface AuthModalProps {
  onClose: () => void;
  onOpenDashboard: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onOpenDashboard }) => {
  const { currentUser, loginAs, logout } = useDealership();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs('customer', email);
    onClose();
    onOpenDashboard();
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
                onClick={logout}
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

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:opacity-95 cursor-pointer"
            >
              {mode === 'login' ? 'Sign In to Portal' : 'Create VIP Account'}
            </button>

            {/* Quick Demo Logins for instant evaluation */}
            <div className="pt-3 border-t border-[#1c1f2b] space-y-2">
              <span className="text-[10px] uppercase font-bold text-neutral-500 block text-center">
                One-Click Role Demonstration
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    loginAs('customer');
                    onClose();
                    onOpenDashboard();
                  }}
                  className="py-2 bg-[#161822] hover:bg-[#1f2230] text-neutral-300 text-[11px] font-medium rounded border border-[#272a38]"
                >
                  Customer Demo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    loginAs('admin');
                    onClose();
                    onOpenDashboard();
                  }}
                  className="py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#E5C158] text-[11px] font-medium rounded border border-[#D4AF37]/30"
                >
                  Admin Demo
                </button>
              </div>
            </div>

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
