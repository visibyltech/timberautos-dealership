import React from 'react';
import { ExternalLink, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface FinancingBannerProps {
  onOpenFinancingModal: () => void;
}

export const FinancingBanner: React.FC<FinancingBannerProps> = ({ onOpenFinancingModal }) => {
  return (
    <section className="py-20 bg-[#0E1015] border-t border-[#1a1d24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#14161f] via-[#161822] to-[#12141c] border border-[#262a36] p-8 sm:p-12 shadow-2xl">
          
          {/* Subtle background decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1e28] border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-wider text-[#E5C158]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>External Financing Partner</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                Car Financing Powered by <span className="text-[#D4AF37]">Autochek Africa</span>
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Through our accredited partnership with Autochek Nigeria, Timber Autos clients can access fast pre-qualification, competitive auto loan tenors of up to 3–5 years from leading commercial banks, and low monthly repayments.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Up to 70% Loan-to-Value</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>24–48 Hour Prequalification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Multi-Bank Competitive Offers</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-start lg:items-end">
              <button
                onClick={onOpenFinancingModal}
                className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#D4AF37] to-[#E5C158] rounded-lg shadow-lg shadow-[#D4AF37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Car Financing</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://www.autochek.africa/ng/pre-qualification"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-neutral-300 hover:text-white bg-[#191c25] hover:bg-[#202430] border border-[#2a2e3c] rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Autochek Pre-Qualification Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
