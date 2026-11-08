import React, { useState } from 'react';
import {
  X, Heart, Calendar, Gauge, Cog, Fuel, ShieldCheck, CheckCircle2,
  Video, CreditCard, Eye, ArrowRight
} from 'lucide-react';
import { Vehicle } from '../../types';
import { formatNaira, formatKm, formatCondition } from '../../utils/formatters';
import { useDealership } from '../../context/DealershipContext';
import showroomImage from '../../assets/images/hero_luxury_showroom_1794141434269.jpg';
import mercedesImage from '../../assets/images/vehicle_mercedes_g63_1794141435015.jpg';
import rangeRoverImage from '../../assets/images/vehicle_range_rover_1794141435125.jpg';
import lexusImage from '../../assets/images/vehicle_lexus_lx600_1794141437259.jpg';
import landCruiserImage from '../../assets/images/vehicle_toyota_landcruiser_1794141435833.jpg';

interface VehicleDetailsModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onBuyNow: (vehicle: Vehicle) => void;
  onPayInstallments: (vehicle: Vehicle) => void;
  onBookInspection: (vehicle: Vehicle) => void;
  onCarFinancing: (vehicle: Vehicle) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

const LEGACY_IMAGES: Record<string, string> = {
  '/src/assets/images/hero_luxury_showroom_1794141434269.jpg': showroomImage,
  '/src/assets/images/vehicle_mercedes_g63_1794141435015.jpg': mercedesImage,
  '/src/assets/images/vehicle_range_rover_1794141435125.jpg': rangeRoverImage,
  '/src/assets/images/vehicle_lexus_lx600_1794141437259.jpg': lexusImage,
  '/src/assets/images/vehicle_toyota_landcruiser_1794141435833.jpg': landCruiserImage
};

const resolveVehicleImage = (path?: string) => {
  if (!path) return showroomImage;
  return LEGACY_IMAGES[path] || path;
};

export const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({
  vehicle, onClose, onBuyNow, onPayInstallments, onBookInspection,
  onCarFinancing, onSelectVehicle
}) => {
  const { vehicles, savedVehicles, toggleSaveVehicle } = useDealership();
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'photos' | 'video'>('photos');

  if (!vehicle) return null;

  const isSaved = savedVehicles.some((v) => v.id === vehicle.id);
  const images = (vehicle.images?.length ? vehicle.images : [showroomImage]).map(resolveVehicleImage);
  const relatedVehicles = vehicles
    .filter((v) => v.id !== vehicle.id && (v.make === vehicle.make || v.bodyType === vehicle.bodyType))
    .slice(0, 3);

  const actionClass = 'min-w-0 w-full min-h-[48px] px-2 py-2 rounded-lg border flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center text-[10px] sm:text-xs font-semibold leading-tight transition-colors';
  const imageFallback = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = showroomImage;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#292722]/55 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-5xl my-auto bg-[#F8F7F3] border border-[#DEDAD0] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[94dvh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 px-4 sm:px-6 py-3 bg-white border-b border-[#E4E0D8] flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] sm:text-xs uppercase tracking-wider text-[#D4AF37] font-bold">Timber Autos Limited</p>
            <p className="text-[10px] text-[#77736B]">Vehicle details</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => toggleSaveVehicle(vehicle.id)} className={`p-2.5 rounded-lg border transition-colors ${isSaved ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-[#F1EFE9] text-[#45423D] border-[#DCD8CF]'}`} title={isSaved ? 'Remove from Saved' : 'Save Vehicle'} aria-label="Save vehicle">
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-black' : ''}`} />
            </button>
            <button onClick={onClose} className="p-2.5 bg-[#F1EFE9] text-[#68645D] hover:text-[#171717] border border-[#DCD8CF] rounded-lg" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto overscroll-contain p-3 sm:p-6 space-y-5 sm:space-y-7">
          {/* Gallery is deliberately the first thing customers see. */}
          <section className="space-y-3">
            {vehicle.videoUrl && (
              <div className="flex items-center gap-2">
                <button onClick={() => setActiveTab('photos')} className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border ${activeTab === 'photos' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-white text-[#45423D] border-[#242735]'}`}>
                  <Eye className="w-3.5 h-3.5" /> Photographs ({images.length})
                </button>
                <button onClick={() => setActiveTab('video')} className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border ${activeTab === 'video' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-white text-[#45423D] border-[#242735]'}`}>
                  <Video className="w-3.5 h-3.5" /> Walkthrough Video
                </button>
              </div>
            )}

            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#E9E7E1] rounded-xl overflow-hidden border border-[#DEDAD0]">
              {activeTab === 'photos' ? (
                <img
                  key={images[activeMediaIndex] || images[0]}
                  src={images[activeMediaIndex] || images[0]}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  onError={imageFallback}
                  className="w-full h-full object-contain"
                />
              ) : (
                <video src={vehicle.videoUrl} controls autoPlay playsInline className="w-full h-full object-contain" />
              )}
              <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded bg-black/75 border border-white/15 text-[#E5C158]">
                {formatCondition(vehicle.condition)}
              </span>
            </div>

            {activeTab === 'photos' && images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveMediaIndex(idx)} className={`relative w-20 sm:w-24 shrink-0 aspect-[16/10] rounded-lg overflow-hidden border-2 ${activeMediaIndex === idx ? 'border-[#D4AF37]' : 'border-[#DEDAD0] opacity-75'}`}>
                    <img src={img} alt={`Vehicle photo ${idx + 1}`} onError={imageFallback} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Name and price immediately follow the photograph. */}
          <section className="bg-white border border-[#DEDAD0] rounded-xl p-4 sm:p-6 space-y-3">
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">{vehicle.year} · {vehicle.make}</span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-[#242424] font-heading mt-1 leading-tight">{vehicle.model}</h2>
              {vehicle.trim && <p className="text-sm text-[#68645D] mt-1">{vehicle.trim}</p>}
            </div>
            <div className="pt-3 border-t border-[#DEDAD0]">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#68645D] font-semibold block">Asking Price · Nigeria Customs Duty Paid</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-gold-gradient font-heading tabular-nums">{formatNaira(vehicle.price)}</span>
              <p className="text-xs sm:text-sm text-[#68645D] mt-1">Available for immediate delivery in Lagos or nationwide enclosed transport.</p>
            </div>

            {/* Four compact actions directly under the price. */}
            <div className="pt-2 grid grid-cols-2 gap-2">
              <button onClick={() => onBuyNow(vehicle)} disabled={vehicle.availability === 'sold'} className={`${actionClass} ${vehicle.availability === 'sold' ? 'bg-neutral-800 text-[#77736B] border-neutral-700' : 'bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-black border-[#D4AF37]'}`}>
                <CreditCard className="w-4 h-4" /><span>{vehicle.availability === 'sold' ? 'Vehicle Sold' : 'Buy Now'}</span>
              </button>
              <button onClick={() => onPayInstallments(vehicle)} disabled={vehicle.availability === 'sold'} className={`${actionClass} bg-[#F1EFE9] text-[#242424] border-[#DCD8CF] hover:border-[#D4AF37]/50`}>
                <Calendar className="w-4 h-4 text-[#D4AF37]" /><span>Pay in Installments</span>
              </button>
              <button onClick={() => onBookInspection(vehicle)} className={`${actionClass} bg-[#F1EFE9] text-[#45423D] border-[#DCD8CF] hover:border-[#D4AF37]/40`}>
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /><span>Book Inspection</span>
              </button>
              <button onClick={() => onCarFinancing(vehicle)} className={`${actionClass} bg-[#F7F0DA] text-[#76580F] border-[#C6A64B]/60 hover:bg-[#F0E5C2]`}>
                <ArrowRight className="w-4 h-4" /><span>Car Financing</span>
              </button>
            </div>
            <button onClick={() => toggleSaveVehicle(vehicle.id)} className="w-full py-2 text-xs font-semibold text-[#45423D] hover:text-[#171717] bg-[#0f1118] border border-[#DEDAD0] rounded-lg flex items-center justify-center gap-2">
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
              {isSaved ? 'Saved in Favourites' : 'Save to Favourites'}
            </button>
          </section>

          <section className="space-y-3">
            <h4 className="text-sm font-bold text-[#242424] uppercase tracking-wider border-l-2 border-[#D4AF37] pl-2">Technical Specifications</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-xs">
              {[
                ['Engine', vehicle.engineCapacity],
                ['Transmission', vehicle.transmission],
                ['Fuel Type', vehicle.fuelType],
                ['Mileage', formatKm(vehicle.mileage)],
                ['Exterior Color', vehicle.exteriorColor],
                ['Interior Color', vehicle.interiorColor]
              ].map(([label, value]) => (
                <div key={label} className="bg-[#F2F0EA] p-3 rounded-lg border border-[#E2DED5] min-w-0">
                  <span className="text-[#77736B] block text-[10px] uppercase">{label}</span>
                  <span className="text-[#242424] font-medium break-words">{value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <h4 className="text-sm font-bold text-[#242424] uppercase tracking-wider border-l-2 border-[#D4AF37] pl-2">Vehicle Overview</h4>
            <p className="text-[#45423D] text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-[#F2F0EA] p-4 rounded-xl border border-[#E2DED5]">{vehicle.description}</p>
          </section>

          {vehicle.keyFeatures?.length > 0 && (
            <section className="space-y-2">
              <h4 className="text-sm font-bold text-[#242424] uppercase tracking-wider border-l-2 border-[#D4AF37] pl-2">Factory Options &amp; Packages</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#45423D]">
                {vehicle.keyFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 bg-white rounded border border-[#E2DED5]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" /><span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="pt-4 border-t border-[#DEDAD0] space-y-3">
            <h3 className="text-base font-bold text-[#242424] font-heading">Showroom Assurance</h3>
            <div className="text-xs text-[#68645D] space-y-2">
              <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />Clean Nigerian Customs duty documents verified.</p>
              <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />Free diagnostic report upon showroom visit.</p>
              <p className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />Direct wire transfer verification &amp; Paystack accepted.</p>
            </div>
          </section>

          {relatedVehicles.length > 0 && (
            <section className="pt-5 border-t border-[#DEDAD0] space-y-3">
              <h3 className="text-base font-bold text-[#242424] font-heading">Similar Vehicles You May Consider</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedVehicles.map((related) => (
                  <button key={related.id} onClick={() => { onSelectVehicle(related); setActiveMediaIndex(0); setActiveTab('photos'); }} className="bg-white border border-[#20232e] hover:border-[#D4AF37]/50 rounded-xl p-3 flex items-center gap-3 text-left">
                    <img src={resolveVehicleImage(related.images?.[0])} alt={related.model} onError={imageFallback} className="w-16 h-12 object-cover rounded-lg shrink-0" />
                    <span className="min-w-0"><span className="block text-xs font-bold text-[#242424] truncate">{related.year} {related.make} {related.model}</span><span className="block text-[11px] font-semibold text-gold-gradient">{formatNaira(related.price)}</span></span>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
