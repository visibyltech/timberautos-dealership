import React, { useState, useEffect } from 'react';
import showroomImage from '../../assets/images/hero_luxury_showroom_1794141434269.jpg';
import mercedesImage from '../../assets/images/vehicle_mercedes_g63_1794141435015.jpg';
import rangeRoverImage from '../../assets/images/vehicle_range_rover_1794141435125.jpg';
import landCruiserImage from '../../assets/images/vehicle_toyota_landcruiser_1794141435833.jpg';
import { ArrowRight, ShieldCheck, CreditCard, Sparkles, Award } from 'lucide-react';

interface HeroSliderProps {
  onExploreVehicles: () => void;
  onExploreFinancing: () => void;
}

const SLIDES = [
  {
    image: showroomImage,
    badge: 'Welcome to Timber Autos Limited',
    subtitle: 'Exclusive Dealership Showroom',
    carName: 'Flagship Luxury Collection'
  },
  {
    image: mercedesImage,
    badge: 'Iconic Power & Heritage',
    subtitle: 'Immediate Showroom Delivery',
    carName: '2024 Mercedes-AMG G 63 V8'
  },
  {
    image: rangeRoverImage,
    badge: 'British Aristocratic Luxury',
    subtitle: 'Santorini Black SV Autobiography',
    carName: '2024 Range Rover SV Long Wheelbase'
  },
  {
    image: landCruiserImage,
    badge: 'Master of All Terrains',
    subtitle: 'Twin-Turbo V6 Precision',
    carName: '2024 Toyota Land Cruiser 300 ZX'
  }
];

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onExploreVehicles,
  onExploreFinancing
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full min-h-[540px] sm:min-h-[620px] lg:min-h-[680px] bg-[#F5F4F0] overflow-hidden select-none">
      {/* Background Images with smooth crossfade */}
      {SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.carName}
              className={`w-full h-full object-cover object-center brightness-110 saturate-110 transform transition-transform duration-[7000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/78 to-white/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F5F4F0] via-transparent to-white/25" />
          </div>
        );
      })}

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto min-h-[540px] sm:min-h-[620px] lg:min-h-[680px] px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col justify-center">
        <div className="max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-6">
          
          {/* Subtle gold brand eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-[#C6A64B]/60 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-widest text-[#E5C158] font-medium font-heading">
              {SLIDES[currentSlide].badge}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-[2rem] sm:text-5xl md:text-6xl font-extrabold text-[#242424] tracking-tight leading-[1.1] font-heading">
            Drive Excellence. <br />
            <span className="text-gold-gradient">Own Your Dream Car.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#4F4B44] leading-relaxed max-w-xl">
            Discover exceptional vehicles, flexible payment options and trusted automotive services with <strong className="text-[#242424] font-semibold">Timber Autos Limited</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreVehicles}
              className="px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] rounded-lg shadow-xl shadow-[#D4AF37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Our Vehicles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreFinancing}
              className="px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#45423D] bg-white/90 hover:bg-[#F0EEE8] border border-[#D8D3C9] hover:border-[#D4AF37]/60 rounded-lg backdrop-blur-md hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Financing</span>
            </button>
          </div>

          {/* Trust Highlights Strip */}
          <div className="pt-4 sm:pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-[#D8D3C9] max-w-2xl text-xs">
            <div className="flex items-center gap-2 text-[#4F4B44]">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Verified Clean Title</span>
            </div>
            <div className="flex items-center gap-2 text-[#4F4B44]">
              <CreditCard className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Up to 24 Mo Installments</span>
            </div>
            <div className="flex items-center gap-2 text-[#4F4B44]">
              <Award className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Autochek Certified</span>
            </div>
            <div className="flex items-center gap-2 text-[#4F4B44]">
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>VIP Inspection Bays</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators at bottom */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center items-center gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-neutral-600 hover:bg-neutral-400'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
