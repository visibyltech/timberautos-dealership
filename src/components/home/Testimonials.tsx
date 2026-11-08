import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Engr. Dapo Alabi',
      role: 'Managing Director, Horizon Energy Services Ltd',
      location: 'Victoria Island, Lagos',
      vehicle: '2024 Mercedes-AMG G 63 V8 Biturbo',
      review: 'Procuring a brand-new G-Wagon in Lagos can often be fraught with import documentation worries. Timber Autos Limited made the entire process flawless. The car was delivered to my residence with all customs papers verified, and their customer care team is top-tier.',
      rating: 5
    },
    {
      name: 'Barr. Aisha Mohammed-Bello',
      role: 'Principal Partner, Bello & Associates Chambers',
      location: 'Asokoro, Abuja',
      vehicle: '2024 Range Rover Autobiography SV',
      review: 'The 12-month installment plan allowed our firm to acquire our executive Range Rover without straining operational capital. The payment schedule was crystal clear, and making monthly transfers through their portal is effortless.',
      rating: 5
    },
    {
      name: 'Dr. Chidi Okonkwo',
      role: 'Consultant Orthopedic Surgeon',
      location: 'Lekki Phase 1, Lagos',
      vehicle: '2024 Toyota Land Cruiser 300 ZX',
      review: 'I booked a private inspection appointment on a Friday morning. Their team put the Land Cruiser on the lift, performed an electronic scanner check in front of me, and answered every technical inquiry. True professionals.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-[#F0EEE8] border-t border-[#DEDAD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Dispatches</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#242424] tracking-tight font-heading">
            What Our Distinguished Clients Say
          </h2>
          <p className="text-[#68645D] text-xs sm:text-sm">
            Verified experiences from business leaders and automotive enthusiasts across Nigeria.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#DEDAD0] hover:border-[#D4AF37]/40 p-6 sm:p-7 rounded-xl flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-black/10 relative group"
            >
              <Quote className="w-8 h-8 text-[#D4AF37]/20 absolute top-5 right-5 group-hover:text-[#D4AF37]/30 transition-colors" />

              <div>
                <div className="flex items-center gap-1 text-[#D4AF37] mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                </div>

                <p className="text-[#4F4B44] text-sm leading-relaxed mb-6 italic">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#DEDAD0]">
                <div className="text-xs font-semibold text-[#76580F] mb-1">
                  Acquired: {item.vehicle}
                </div>
                <h4 className="text-[#242424] font-bold text-sm font-heading">
                  {item.name}
                </h4>
                <p className="text-[#68645D] text-xs">
                  {item.role} · {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
