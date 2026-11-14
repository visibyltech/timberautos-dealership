import React from 'react';
import { Heart, Eye, Calendar, ArrowRight } from 'lucide-react';
import { Vehicle } from '../../types';
import { formatNaira } from '../../utils/formatters';
import { useDealership } from '../../context/DealershipContext';
import showroomFallback from '../../assets/images/hero_luxury_showroom_1794141434269.jpg';
import mercedesImage from '../../assets/images/vehicle_mercedes_g63_1794141435015.jpg';
import rangeRoverImage from '../../assets/images/vehicle_range_rover_1794141435125.jpg';
import lexusImage from '../../assets/images/vehicle_lexus_lx600_1794141437259.jpg';
import landCruiserImage from '../../assets/images/vehicle_toyota_landcruiser_1794141435833.jpg';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onCalculateInstallment?: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelectVehicle, onCalculateInstallment }) => {
  const { savedVehicles, toggleSaveVehicle } = useDealership();
  const isSaved = savedVehicles.some((v) => v.id === vehicle.id);
  const legacyImageMap: Record<string, string> = {
    '/src/assets/images/hero_luxury_showroom_1794141434269.jpg': showroomFallback,
    '/src/assets/images/vehicle_mercedes_g63_1794141435015.jpg': mercedesImage,
    '/src/assets/images/vehicle_range_rover_1794141435125.jpg': rangeRoverImage,
    '/src/assets/images/vehicle_lexus_lx600_1794141437259.jpg': lexusImage,
    '/src/assets/images/vehicle_toyota_landcruiser_1794141435833.jpg': landCruiserImage
  };
  const storedImage = vehicle.images?.[0] || '';
  const mainImage = legacyImageMap[storedImage] || storedImage || showroomFallback;
  const availabilityClass = vehicle.availability === 'available'
    ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40'
    : vehicle.availability === 'reserved'
      ? 'text-amber-400 bg-amber-950/60 border-amber-800/40'
      : 'text-neutral-400 bg-neutral-900/80 border-neutral-700/50';

  return (
    <div className="group relative bg-[#171B25] border border-[#303542] hover:border-[#D4AF37]/60 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 flex flex-col">
      <div className="relative aspect-[4/3] w-full bg-[#0D0F14] overflow-hidden cursor-pointer" onClick={() => onSelectVehicle(vehicle)}>
        <img src={mainImage} alt={vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model} loading="lazy" referrerPolicy="no-referrer"
          onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = showroomFallback; }}
          className="w-full h-full object-cover object-center brightness-90 contrast-105 saturate-105 group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className={'px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider rounded border backdrop-blur-md pointer-events-auto ' + availabilityClass}>{vehicle.availability}</span>
          <button onClick={(event) => { event.stopPropagation(); toggleSaveVehicle(vehicle.id); }}
            className={'p-2 rounded-full backdrop-blur-md transition-colors pointer-events-auto ' + (isSaved ? 'bg-[#D4AF37] text-black shadow-md' : 'bg-black/60 text-white hover:text-[#D4AF37] hover:bg-black/80 border border-white/10')}
            title={isSaved ? 'Remove from Saved' : 'Save Vehicle'} aria-label="Save Vehicle">
            <Heart className={'w-4 h-4 ' + (isSaved ? 'fill-black' : '')} />
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-4 flex flex-1 flex-col min-w-0">
        <div className="flex items-center justify-between gap-2 text-xs text-gray-300 mb-1">
          <span className="uppercase tracking-wider font-semibold text-gray-200">{vehicle.make}</span>
          <span className="flex items-center gap-1 shrink-0"><Calendar className="w-3.5 h-3.5 text-neutral-500" />{vehicle.year}</span>
        </div>
        <h3 onClick={() => onSelectVehicle(vehicle)} className="text-base sm:text-lg font-bold text-white group-hover:text-[#E5C158] transition-colors leading-snug cursor-pointer line-clamp-1 font-heading">{vehicle.model}</h3>
        <div className="mt-2 pt-2 border-t border-[#303542]">
          <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-medium">Asking Price</span>
          <span className="text-sm sm:text-lg font-extrabold text-gold-gradient font-heading tabular-nums break-words">{formatNaira(vehicle.price)}</span>
        </div>
        <div className="mt-auto pt-3 grid grid-cols-2 gap-1.5">
          <button onClick={() => onSelectVehicle(vehicle)} className="min-w-0 w-full py-1.5 px-1.5 sm:px-2 bg-[#222733] hover:bg-[#2B3240] text-gray-100 hover:text-[#E5C158] border border-[#3A4050] hover:border-[#D4AF37]/50 rounded-md text-[10px] sm:text-xs font-semibold transition-all flex items-center justify-center gap-1">
            <Eye className="w-3.5 h-3.5" /><span>Details</span>
          </button>
          {onCalculateInstallment && vehicle.availability !== 'sold' && (
            <button onClick={() => onCalculateInstallment(vehicle)} className="min-w-0 w-full py-1.5 px-1.5 sm:px-2 bg-[#2B2618] hover:bg-[#3A311B] text-[#E5C158] border border-[#C6A64B]/60 rounded-md text-[10px] sm:text-xs font-semibold transition-all flex items-center justify-center gap-1 text-center leading-tight" title="Calculate Installment Plan">
              <span>Installments</span><ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
