import React from 'react';
import { ShieldCheck, Globe, Scale, CreditCard, Wrench, Headphones, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Quality Vehicles',
      description: 'Hand-picked luxury automobiles meeting international standards. Certified clean titles and authentic factory specifications.'
    },
    {
      icon: Globe,
      title: 'Trusted Vehicle Sourcing',
      description: 'Direct procurement networks across the USA, Germany, Canada and UAE. Zero third-party tampering or dubious intermediaries.'
    },
    {
      icon: Scale,
      title: 'Transparent Pricing',
      description: 'Clear asking prices with customs duty and port clearance fully settled. No hidden surcharges or post-purchase shocks.'
    },
    {
      icon: CreditCard,
      title: 'Flexible Payment Plans',
      description: 'Spread vehicle payments conveniently over 3 to 24 months, or access accredited external vehicle financing via Autochek.'
    },
    {
      icon: Wrench,
      title: 'Professional Inspection',
      description: 'Private showroom appointment booking, computerized OBD-II scans, paint meter checks, and structural chassis integrity reports.'
    },
    {
      icon: Headphones,
      title: 'Reliable Customer Support',
      description: 'Dedicated automotive consultants, enclosed nationwide carrier delivery, and concierge vehicle registration support.'
    }
  ];

  return (
    <section className="py-20 bg-[#0E1015] border-t border-[#1a1d24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Timber Autos Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Why Choose Timber Autos Limited
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            We are committed to elevating the automobile acquisition experience in Nigeria with integrity, transparency, and first-class client advisory.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#13151c] border border-[#20232c] hover:border-[#D4AF37]/50 p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-black/60 group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#1c1f28] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-5 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-heading group-hover:text-[#E5C158] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
