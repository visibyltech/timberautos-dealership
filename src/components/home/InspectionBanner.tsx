import React from 'react';
import { Calendar, Wrench, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

interface InspectionBannerProps {
  onOpenBookingModal: () => void;
}

export const InspectionBanner: React.FC<InspectionBannerProps> = ({ onOpenBookingModal }) => {
  return (
    <section className="py-20 bg-[#0B0C10] border-t border-[#1a1d25]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Visual Card */}
          <div className="relative rounded-2xl overflow-hidden border border-[#232733] bg-[#11131a] aspect-[16/10] shadow-2xl group">
            <img
              src="/src/assets/images/hero_luxury_showroom_1794141434269.jpg"
              alt="Timber Autos VIP Inspection Bays"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E5C158] block mb-1">
                Lagos &amp; Abuja Service Centers
              </span>
              <h3 className="text-xl font-bold text-white font-heading">
                State-of-the-Art Private Diagnostic Bays
              </h3>
              <p className="text-xs text-neutral-300 mt-1">
                Experience the vehicle first-hand with our master technician before final purchase.
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#E5C158]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Personalised Appointment</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Book a Private Vehicle Inspection
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              We welcome prospective buyers to examine any vehicle in our showroom. Schedule a private viewing slot with an assigned Senior Automotive Consultant. Bring your own independent mechanic, run live diagnostics, or take a private test drive.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#14161f] border border-[#1f222d]">
                <Wrench className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Full Diagnostic Scans</span>
                  <span className="text-neutral-400">Electronic OBD-II readouts and sensor diagnostics.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#14161f] border border-[#1f222d]">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Original Customs Docs</span>
                  <span className="text-neutral-400">Physical inspection of authentic customs assessments.</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBookingModal}
                className="px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#D4AF37] to-[#E5C158] rounded-lg shadow-lg shadow-[#D4AF37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Schedule Inspection Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
