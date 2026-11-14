import React from 'react';
import { ShieldCheck, Globe, Scale, CreditCard, Wrench, Headphones, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    { icon: ShieldCheck, title: 'Quality Vehicles', description: 'Hand-picked luxury automobiles meeting international standards, with verified clean titles and factory specifications.' },
    { icon: Globe, title: 'Trusted Vehicle Sourcing', description: 'Direct procurement networks across the USA, Germany, Canada and UAE.' },
    { icon: Scale, title: 'Transparent Pricing', description: 'Clear asking prices with customs duty and port clearance fully settled.' },
    { icon: CreditCard, title: 'Flexible Payment Plans', description: 'Spread payments over 3 to 24 months or explore Autochek financing.' },
    { icon: Wrench, title: 'Professional Inspection', description: 'Book a private inspection with diagnostic and vehicle condition checks.' },
    { icon: Headphones, title: 'Reliable Customer Support', description: 'Dedicated consultants, nationwide delivery and registration support.' }
  ];

  return (
    <section className="py-12 sm:py-14 bg-[#11141C] border-t border-[#292D37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Timber Autos Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">Why Choose Timber Autos Limited</h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Integrity, transparency and first-class client advisory throughout your vehicle purchase.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="bg-[#171B25] border border-[#303644] hover:border-[#D4AF37]/50 p-4 sm:p-5 rounded-xl transition-all duration-300 group">
                <div className="w-9 h-9 rounded-lg bg-[#242A36] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-3 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 font-heading">{pillar.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
