import React from 'react';
import showroomImage from '../../assets/images/hero_luxury_showroom_1794141434269.jpg';
import { Calendar, Wrench, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

interface InspectionBannerProps {
  onOpenBookingModal: () => void;
}

export const InspectionBanner: React.FC<InspectionBannerProps> = ({ onOpenBookingModal }) => {
  return (
    <section className="py-20 bg-[#F5F4F0] border-t border-[#DEDAD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Visual Card */}
          <div className="relative rounded-2xl overflow-hidden border border-[#DEDAD0] bg-[#E9E7E1] aspect-[16/10] shadow-2xl group">
            <img
              src={showroomImage}
              alt="Timber Autos VIP Inspection Bays"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F3D778] block mb-1">
                Lagos &amp; Abuja Service Centers
              </span>
              <h3 className="text-xl font-bold text-[#242424] font-heading">
                State-of-the-Art Private Diagnostic Bays
              </h3>
              <p className="text-xs text-[#4F4B44] mt-1">
                Experience the vehicle first-hand with our master technician before final purchase.
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#F3D778]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Personalised Appointment</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#242424] tracking-tight font-heading">
              Book a Private Vehicle Inspection
            </h2>

            <p className="text-[#4F4B44] text-sm sm:text-base leading-relaxed">
              We welcome prospective buyers to examine any vehicle in our showroom. Schedule a private viewing slot with an assigned Senior Automotive Consultant. Bring your own independent mechanic, run live diagnostics, or take a private test drive.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#4F4B44]">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-[#DEDAD0]">
                <Wrench className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#242424] block">Full Diagnostic Scans</span>
                  <span className="text-[#68645D]">Electronic OBD-II readouts and sensor diagnostics.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-[#DEDAD0]">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#242424] block">Original Customs Docs</span>
                  <span className="text-[#68645D]">Physical inspection of authentic customs assessments.</span>
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
