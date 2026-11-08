import React, { useState } from 'react';
import {
  X,
  Heart,
  Calendar,
  Gauge,
  Cog,
  Fuel,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Play,
  Video,
  FileText,
  MapPin,
  ArrowRight,
  CreditCard,
  Eye
} from 'lucide-react';
import { Vehicle } from '../../types';
import { formatNaira, formatKm, formatCondition } from '../../utils/formatters';
import { useDealership } from '../../context/DealershipContext';

interface VehicleDetailsModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onBuyNow: (vehicle: Vehicle) => void;
  onPayInstallments: (vehicle: Vehicle) => void;
  onBookInspection: (vehicle: Vehicle) => void;
  onCarFinancing: (vehicle: Vehicle) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({
  vehicle,
  onClose,
  onBuyNow,
  onPayInstallments,
  onBookInspection,
  onCarFinancing,
  onSelectVehicle
}) => {
  const { vehicles, savedVehicles, toggleSaveVehicle } = useDealership();
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'photos' | 'video'>('photos');

  if (!vehicle) return null;

  const isSaved = savedVehicles.some((v) => v.id === vehicle.id);
  const images = vehicle.images.length > 0
    ? vehicle.images
    : ['/src/assets/images/hero_luxury_showroom_1794141434269.jpg'];

  const relatedVehicles = vehicles
    .filter((v) => v.id !== vehicle.id && (v.make === vehicle.make || v.bodyType === vehicle.bodyType))
    .slice(0, 3);

  const phone = '2348143112826';
  const whatsappMsg = `Hello Timber Autos Limited, I am interested in inquiring about the ${vehicle.year} ${vehicle.make} ${vehicle.model} (Asking Price: ₦${vehicle.price.toLocaleString()}, VIN: ${vehicle.vin}). Please provide more details on availability, inspection and purchase options.`;
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-6xl my-auto bg-[#0d0f15] border border-[#252834] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[#12141c] border-b border-[#212430] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Timber Autos Limited · Showroom Showcase
            </span>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <span className="hidden sm:inline text-xs text-neutral-400">
              VIN: <strong className="text-neutral-200">{vehicle.vin}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveVehicle(vehicle.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isSaved
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                  : 'bg-[#181a24] text-neutral-300 border-[#282c3a] hover:text-[#D4AF37]'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save Vehicle'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-black' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-[#181a24] text-neutral-400 hover:text-white border border-[#282c3a] rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-8">
          
          {/* Main Grid: Gallery & Primary Purchasing Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Media Gallery (7 cols) */}
            <div className="lg:col-span-7 space-y-4 order-last lg:order-first">
              
              {/* Media Mode Tabs */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('photos')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
                    activeTab === 'photos'
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                      : 'bg-[#14161f] text-neutral-300 border-[#242735] hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Photographs ({images.length})</span>
                </button>

                {vehicle.videoUrl && (
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
                      activeTab === 'video'
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                        : 'bg-[#14161f] text-neutral-300 border-[#242735] hover:text-white'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Walkthrough Video</span>
                  </button>
                )}
              </div>

              {/* Main Media Viewport */}
              <div className="relative aspect-[16/10] w-full bg-black rounded-xl overflow-hidden border border-[#232733] shadow-lg">
                {activeTab === 'photos' ? (
                  <img
                    src={images[activeMediaIndex] || images[0]}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black">
                    <video
                      src={vehicle.videoUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                {/* Status pill on image */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded bg-black/70 backdrop-blur-md border border-white/20 text-[#E5C158]">
                    {formatCondition(vehicle.condition)}
                  </span>
                </div>
              </div>

              {/* Clickable Image Thumbnails */}
              {activeTab === 'photos' && images.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMediaIndex(idx)}
                      className={`relative aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all ${
                        activeMediaIndex === idx
                          ? 'border-[#D4AF37] scale-102 ring-2 ring-[#D4AF37]/30'
                          : 'border-[#222532] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Key Technical Specifications Table */}
              <div className="pt-4 space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading border-l-2 border-[#D4AF37] pl-2">
                  Technical Specifications
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-[#13151d] p-3 rounded-lg border border-[#1f222d]">
                    <span className="text-neutral-500 block text-[10px] uppercase">Engine</span>
                    <span className="text-white font-medium">{vehicle.engineCapacity}</span>
                  </div>

                  <div className="bg-[#13151d] p-3 rounded-lg border border-[#1f222d]">
                    <span className="text-neutral-500 block text-[10px] uppercase">Transmission</span>
                    <span className="text-white font-medium">{vehicle.transmission}</span>
                  </div>

                  <div className="bg-[#13151d] p-3 rounded-lg border border-[#1f222d]">
                    <span className="text-neutral-500 block text-[10px] uppercase">Fuel Type</span>
                    <span className="text-white font-medium">{vehicle.fuelType}</span>
                  </div>

                  <div className="bg-[#13151d] p-3 rounded-lg border border-[#1f222d]">
                    <span className="text-neutral-500 block text-[10px] uppercase">Mileage</span>
                    <span className="text-white font-medium tabular-nums">{formatKm(vehicle.mileage)}</span>
                  </div>

                  <div className="bg-[#13151d] p-3 rounded-lg border border-[#1f222d]">
                    <span className="text-neutral-500 block text-[10px] uppercase">Exterior Color</span>
                    <span className="text-white font-medium">{vehicle.exteriorColor}</span>
                  </div>

                  <div className="bg-[#13151d] p-3 rounded-lg border border-[#1f222d]">
                    <span className="text-neutral-500 block text-[10px] uppercase">Interior Color</span>
                    <span className="text-white font-medium">{vehicle.interiorColor}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-2 space-y-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading border-l-2 border-[#D4AF37] pl-2">
                  Vehicle Overview
                </h4>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-[#11131a] p-4 rounded-xl border border-[#1e212b]">
                  {vehicle.description}
                </p>
              </div>

              {/* Key Features List */}
              {vehicle.keyFeatures && vehicle.keyFeatures.length > 0 && (
                <div className="pt-2 space-y-2">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading border-l-2 border-[#D4AF37] pl-2">
                    Factory Options &amp; Packages
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                    {vehicle.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-[#12141c] rounded border border-[#1d202a]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Pricing & 6 Action CTAs (5 cols) */}
            <div className="lg:col-span-5 space-y-6 order-first lg:order-last">
              
              {/* Vehicle Title & Pricing Card */}
              <div className="bg-[#12141c] border border-[#242735] rounded-xl p-6 space-y-4">
                
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                    {vehicle.year} · {vehicle.make}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-0.5">
                    {vehicle.model}
                  </h2>
                  {vehicle.trim && (
                    <p className="text-xs text-neutral-400 mt-1">
                      {vehicle.trim}
                    </p>
                  )}
                </div>

                <div className="py-4 border-y border-[#1f222e]">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                    Asking Price (Nigeria Customs Duty Paid)
                  </span>
                  <span className="text-3xl font-extrabold text-gold-gradient font-heading tabular-nums">
                    {formatNaira(vehicle.price)}
                  </span>
                  <span className="text-[11px] text-neutral-400 block mt-1">
                    Available for immediate delivery in Lagos or nationwide enclosed transport.
                  </span>
                </div>

                {/* THE 6 MANDATORY ACTION BUTTONS */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  
                  {/* 1. Buy Now */}
                  <button
                    onClick={() => onBuyNow(vehicle)}
                    disabled={vehicle.availability === 'sold'}
                    className={`w-full min-h-[58px] py-3 px-2 text-[10px] sm:text-xs font-bold uppercase tracking-wide rounded-lg transition-all flex items-center justify-center gap-2 text-center shadow-lg cursor-pointer ${
                      vehicle.availability === 'sold'
                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                        : 'text-black bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] hover:scale-[1.02] shadow-[#D4AF37]/25'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>{vehicle.availability === 'sold' ? 'Vehicle Sold' : 'Buy Now — Online Purchase'}</span>
                  </button>

                  {/* 2. Pay in Installments */}
                  <button
                    onClick={() => onPayInstallments(vehicle)}
                    disabled={vehicle.availability === 'sold'}
                    className="w-full min-h-[58px] py-3 px-2 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-white bg-[#1a1d27] hover:bg-[#222634] border border-[#303444] hover:border-[#D4AF37]/50 rounded-lg transition-all flex items-center justify-center gap-2 text-center cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#D4AF37]" />
                    <span>Pay in Installments (Up to 24 Months)</span>
                  </button>

                  {/* 3. Book Inspection */}
                  <button
                    onClick={() => onBookInspection(vehicle)}
                    className="w-full min-h-[58px] py-3 px-2 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-neutral-200 bg-[#161821] hover:bg-[#1e202c] border border-[#272b39] hover:border-[#D4AF37]/40 rounded-lg transition-all flex items-center justify-center gap-2 text-center cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>Book Private Vehicle Inspection</span>
                  </button>

                  {/* 4. Car Financing */}
                  <button
                    onClick={() => onCarFinancing(vehicle)}
                    className="w-full min-h-[58px] py-3 px-2 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-[#E5C158] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-lg transition-all flex items-center justify-center gap-2 text-center cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>Autochek Car Financing</span>
                  </button>

                  {/* Save to Favourites */}
                  <button
                    onClick={() => toggleSaveVehicle(vehicle.id)}
                    className="col-span-2 w-full py-2.5 px-4 text-xs font-semibold text-neutral-300 hover:text-white bg-[#13151c] hover:bg-[#181a24] border border-[#222530] rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
                    <span>{isSaved ? 'Saved in Favourites' : 'Save to Favourites'}</span>
                  </button>

                </div>

                {/* Showroom Verification Assurance */}
                <div className="pt-4 border-t border-[#1f222e] text-[11px] text-neutral-400 space-y-1.5">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Clean Nigerian Customs duty documents verified.</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Free diagnostic report upon showroom visit.</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Direct wire transfer verification &amp; Paystack accepted.</span>
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Related Vehicles Section */}
          {relatedVehicles.length > 0 && (
            <div className="pt-8 border-t border-[#1c1f2b] space-y-4">
              <h3 className="text-lg font-bold text-white font-heading">
                Similar Vehicles You May Consider
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedVehicles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectVehicle(rel);
                      setActiveMediaIndex(0);
                    }}
                    className="bg-[#12141c] border border-[#20232e] hover:border-[#D4AF37]/50 rounded-xl p-3 flex items-center gap-3 cursor-pointer group transition-all"
                  >
                    <img
                      src={rel.images[0] || '/src/assets/images/hero_luxury_showroom_1794141434269.jpg'}
                      alt={rel.model}
                      className="w-16 h-12 object-cover rounded-lg shrink-0"
                    />
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-white group-hover:text-[#E5C158] truncate">
                        {rel.year} {rel.make} {rel.model}
                      </h4>
                      <p className="text-[11px] font-semibold text-gold-gradient tabular-nums">
                        {formatNaira(rel.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
