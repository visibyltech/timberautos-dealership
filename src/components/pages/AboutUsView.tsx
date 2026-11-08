import React from 'react';
import { Shield, Award, Globe, Truck, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { useDealership } from '../../context/DealershipContext';

export const AboutUsView: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const { settings } = useDealership();

  const activities = [
    {
      title: 'Car Sales',
      desc: 'Showcasing pristine brand-new and certified foreign-used (Tokunbo) luxury vehicles across our executive showroom bays.'
    },
    {
      title: 'Vehicle Importation',
      desc: 'Direct containerized and RoRo shipment from verified auctions and franchised dealerships across the United States, Canada, Germany, and the UAE.'
    },
    {
      title: 'Automobile Trading',
      desc: 'Transparent trade-in appraisal and vehicle exchange protocols for clients seeking upgrade pathways.'
    },
    {
      title: 'Vehicle Sourcing',
      desc: 'Custom-tailored procurement of rare, limited-edition, or bespoke luxury specifications on behalf of discerning collectors and executives.'
    },
    {
      title: 'Vehicle Logistics',
      desc: 'Nationwide enclosed carrier transport, port clearance, title regularization, and door-to-door insured conveyance.'
    }
  ];

  return (
    <div className="py-16 bg-[#F5F4F0] min-h-screen text-[#4F4B44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              About Timber Autos Limited
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#242424] tracking-tight font-heading leading-tight">
              Redefining Automobile <br />
              <span className="text-gold-gradient">Excellence in Nigeria</span>
            </h1>
            <p className="text-sm sm:text-base text-[#4F4B44] leading-relaxed">
              Established with an unyielding commitment to integrity, exclusivity, and engineering perfection, <strong className="text-[#242424]">TIMBER AUTOS LIMITED</strong> is a premier luxury automobile dealership and automotive logistics powerhouse headquartered in Lagos, Nigeria.
            </p>
            <p className="text-sm text-[#68645D] leading-relaxed">
              Our founding philosophy—<em>"Your Trusted Auto Partner"</em>—embodies our guarantee: every motor vehicle in our showroom is delivered with unimpeachable customs documentation, rigorous structural diagnostic certifications, and flexible acquisition pathways.
            </p>
          </div>

          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[#DEDAD0] aspect-[4/3] bg-[#E9E7E1] shadow-lg">
            <img
              src="/public/assets/aistudio/file_00000000d02881f485cd91770ad63cb9_5f7889d7.png"
              alt="Timber Autos Limited Brand Identity"
              className="w-full h-full object-contain p-6 bg-gradient-to-br from-white via-[#F7F5EF] to-[#EEECE6]"
            />
          </div>
        </div>

        {/* Core Business Activities */}
        <div className="space-y-8 pt-8 border-t border-[#DEDAD0]">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424] font-heading">
              Our Core Business Activities
            </h2>
            <p className="text-xs text-[#68645D]">
              End-to-end automotive solutions designed around total client convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.map((act, idx) => (
              <div key={idx} className="bg-white border border-[#DEDAD0] p-6 rounded-xl hover:border-[#D4AF37]/40 transition-colors">
                <div className="text-xs font-bold text-[#76580F] uppercase tracking-wider mb-2">
                  0{idx + 1}. {act.title}
                </div>
                <p className="text-xs text-[#68645D] leading-relaxed">
                  {act.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Showrooms & Direct Line */}
        <div className="bg-white border border-[#DEDAD0] rounded-2xl p-8 sm:p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#242424] font-heading flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                Lagos Head Office Showroom
              </h3>
              <p className="text-xs text-[#4F4B44]">
                Plot 14, Admiralty Way, Lekki Phase 1, Lagos, Nigeria
              </p>
              <p className="text-xs text-[#77736B]">
                Operating Hours: Monday – Saturday: 8:00 AM – 6:30 PM (Sunday by VIP appointment)
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#242424] font-heading flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                Abuja VIP Center
              </h3>
              <p className="text-xs text-[#4F4B44]">
                Shehu Shagari Way, Central Business District, Abuja, FCT
              </p>
              <p className="text-xs text-[#77736B]">
                Operating Hours: Monday – Saturday: 9:00 AM – 6:00 PM
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#DEDAD0] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#D4AF37]" />
              <div>
                <span className="text-[10px] text-[#68645D] uppercase block">Direct Line &amp; WhatsApp:</span>
                <a href="tel:+2348143112826" className="text-[#242424] font-bold text-sm hover:text-[#D4AF37]">
                  +234 814 311 2826
                </a>
              </div>
            </div>

            <button
              onClick={() => onNavigate('inventory')}
              className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-black text-xs font-bold uppercase rounded-lg hover:scale-102 transition-transform"
            >
              Explore Showroom Inventory
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
