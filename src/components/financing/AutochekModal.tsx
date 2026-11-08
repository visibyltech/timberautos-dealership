import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Building,
  HelpCircle,
  ArrowRight,
  Database,
  PhoneCall
} from 'lucide-react';
import { Vehicle } from '../../types';
import { formatNaira } from '../../utils/formatters';
import { useDealership } from '../../context/DealershipContext';

interface AutochekModalProps {
  vehicle?: Vehicle | null;
  onClose: () => void;
}

export const AutochekModal: React.FC<AutochekModalProps> = ({ vehicle, onClose }) => {
  const { submitFinancingEnquiry } = useDealership();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+234');
  const [employmentStatus, setEmploymentStatus] = useState('Salaried Professional');
  const [submittedLead, setSubmittedLead] = useState(false);

  const autochekUrl = 'https://www.autochek.africa/ng/pre-qualification';

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    submitFinancingEnquiry({
      customer: {
        fullName,
        email,
        phone
      },
      vehicleId: vehicle?.id,
      vehicleName: vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Showroom Inventory',
      estimatedBudget: vehicle?.price,
      employmentStatus,
      redirectedToAutochek: true
    });
    setSubmittedLead(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl my-auto bg-[#0d0f16] border border-[#232735] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#12141d] border-b border-[#202330] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Autochek External Vehicle Financing
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white bg-[#1a1c26] rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {/* Partnership Announcement */}
          <div className="bg-[#13151f] p-5 rounded-xl border border-[#242838] space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#E5C158] uppercase tracking-wider">
                External Financing Partner · Autochek Africa
              </span>
            </div>

            <h4 className="text-xl font-bold text-white font-heading">
              Drive Home with Autochek Multi-Bank Vehicle Loans
            </h4>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Vehicle financing is provided by our external financing partner, <strong className="text-white">Autochek Africa</strong> (Nigeria). Approvals, interest rates, tenors (up to 3–5 years), and monthly payments are independently determined by Autochek and its partner commercial financial institutions.
            </p>

            {vehicle && (
              <div className="pt-2 border-t border-[#1f222e] flex items-center justify-between text-xs">
                <span className="text-neutral-400">Target Vehicle:</span>
                <span className="text-white font-semibold">{vehicle.year} {vehicle.make} {vehicle.model} ({formatNaira(vehicle.price)})</span>
              </div>
            )}
          </div>

          {/* Key Terms Disclosures */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
            <div className="p-3 bg-[#11131a] rounded-lg border border-[#1e212b] space-y-1">
              <div className="flex items-center gap-2 text-white font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Tenors up to 36–60 Months</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Spread auto loans through Tier-1 Nigerian commercial banks.
              </p>
            </div>

            <div className="p-3 bg-[#11131a] rounded-lg border border-[#1e212b] space-y-1">
              <div className="flex items-center gap-2 text-white font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>30% Minimum Down Payment</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Finance up to 70% of the vehicle’s verified value.
              </p>
            </div>
          </div>

          {/* Primary Action Button to Official Autochek Page */}
          <div className="pt-2">
            <a
              href={autochekUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] text-black text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-xl shadow-[#D4AF37]/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 text-center"
            >
              <span>Explore Prequalification on Official Autochek Portal</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <span className="text-[11px] text-neutral-500 text-center block mt-2">
              Opens safely in a new browser tab: https://www.autochek.africa/ng/pre-qualification
            </span>
          </div>

          {/* Optional: Timber Autos Financing Advisory Callback Form */}
          {!submittedLead ? (
            <form onSubmit={handleSubmitLead} className="p-4 bg-[#10121a] rounded-xl border border-[#1f222e] space-y-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider block font-heading">
                Need Guidance? Request a Timber Autos Loan Advisor Call
              </span>
              <p className="text-[11px] text-neutral-400">
                Our in-house finance team can assist you through the Autochek document preparation and inspection protocol.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-[#161822] border border-[#272b38] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-[#161822] border border-[#272b38] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="py-2 px-3 bg-[#1e212c] hover:bg-[#282c3c] text-[#D4AF37] border border-[#D4AF37]/40 rounded-lg text-xs font-bold uppercase transition-colors"
                >
                  Request Callback
                </button>
              </div>
            </form>
          ) : (
            <div className="p-3 bg-emerald-950/60 border border-emerald-800/60 rounded-lg text-xs text-emerald-300 text-center">
              Advisory request logged. A Timber Autos finance specialist will contact you shortly to coordinate with Autochek.
            </div>
          )}

          {/* Architecture note for future API dealer feed */}
          <div className="p-3.5 bg-[#0b0c11] rounded-lg border border-[#1b1d26] text-[11px] text-neutral-400 space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-300 font-semibold">
              <Database className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Dealer Integration Architecture Note:</span>
            </div>
            <p>
              Timber Autos Limited maintains its own verified inventory. In accordance with dealership guidelines, our catalog schema is engineered for direct synchronization when an authorized Autochek Dealer API feed is provisioned.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
