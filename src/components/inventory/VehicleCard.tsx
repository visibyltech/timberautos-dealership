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

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onSelectVehicle,
  onCalculateInstallment
}) => {
  const { savedVehicles, toggleSaveVehicle } = useDealership();
  const isSaved = savedVehicles.some((v) => v.id === vehicle.id);

  // Resolve legacy /src/assets paths already saved in customers' browser storage.
  const legacyImageMap: Record<string, string> = {
    '/src/assets/images/hero_luxury_showroom_1794141434269.jpg': showroomFallback,
    '/src/assets/images/vehicle_mercedes_g63_1794141435015.jpg': mercedesImage,
    '/src/assets/images/vehicle_range_rover_1794141435125.jpg': rangeRoverImage,
    '/src/assets/images/vehicle_lexus_lx600_1794141437259.jpg': lexusImage,
    '/src/assets/images/vehicle_toyota_landcruiser_1794141435833.jpg': landCruiserImage
  };
  const storedImage = vehicle.images?.[0] || '';
  const mainImage = legacyImageMap[storedImage] || storedImage || showroomFallback;

  const getAvailabilityClass = () => {
    switch (vehicle.availability) {
      case 'available':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40';
      case 'reserved':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/40';
      case 'sold':
        return 'text-neutral-400 bg-neutral-900/80 border-neutral-700/50';
      default:
        return 'text-neutral-400';
    }
  };

  return (
    <div className="group relative bg-white border border-[#DEDAD0] hover:border-[#D4AF37]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 flex flex-col justify-between">
      
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full bg-[#E9E7E1] overflow-hidden cursor-pointer" onClick={() => onSelectVehicle(vehicle)}>
        <img
          src={mainImage}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = showroomFallback;
          }}
          className="w-full h-full object-cover object-center brightness-125 contrast-100 saturate-110 group-hover:scale-105 transition-transform duration-500"
        />

        {/* Ambient Dark Gradient at bottom of image */}
        

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded border backdrop-blur-md pointer-events-auto ${getAvailabilityClass()}`}>
            {vehicle.availability}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveVehicle(vehicle.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-colors pointer-events-auto ${
              isSaved
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'bg-black/60 text-white hover:text-[#D4AF37] hover:bg-black/80 border border-white/10'
            }`}
            title={isSaved ? 'Remove from Saved' : 'Save Vehicle'}
            aria-label="Save Vehicle"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-black' : ''}`} />
          </button>
        </div>

      {/* Card Content Area */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Make and Year */}
          <div className="flex items-center justify-between gap-2 text-xs text-[#68645D] mb-1">
            <span className="uppercase tracking-wider font-semibold text-[#45423D]">{vehicle.make}</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              {vehicle.year}
            </span>
          </div>

          {/* Model Title */}
          <h3 
            onClick={() => onSelectVehicle(vehicle)}
            className="text-lg font-bold text-[#242424] group-hover:text-[#8B6814] transition-colors leading-snug cursor-pointer line-clamp-1 font-heading"
          >
            {vehicle.model}
          </h3>

          {/* Asking Price */}
          <div className="mt-2 pt-2 border-t border-[#E8E4DC]">
            <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-medium">Asking Price</span>
            <span className="text-sm sm:text-lg font-extrabold text-gold-gradient font-heading tabular-nums break-words">{formatNaira(vehicle.price)}</span>
          </div>

          {/* Key Specs Row */}
          <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-1 sm:gap-2 py-2 px-2 sm:py-2.5 sm:px-3 bg-[#F4F2EC] rounded-lg border border-[#E2DED5] text-[9px] sm:text-[11px] text-[#45423D]">
            <div className="flex items-center gap-1.5 truncate" title={formatKm(vehicle.mileage)}>
              <Gauge className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="truncate">{formatKm(vehicle.mileage)}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate" title={vehicle.transmission}>
              <Cog className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="truncate">{vehicle.transmission}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate" title={vehicle.fuelType}>
              <Fuel className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="truncate">{vehicle.fuelType}</span>
            </div>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="mt-3 pt-2 border-t border-[#E8E4DC] grid grid-cols-2 gap-1.5">
          <button
            onClick={() => onSelectVehicle(vehicle)}
            className="min-w-0 w-full py-1.5 px-1.5 sm:px-2 bg-[#F2F0EA] hover:bg-[#E8E4DC] text-[#242424] hover:text-[#8B6814] border border-[#DCD8CF] hover:border-[#D4AF37]/50 rounded-md text-[10px] sm:text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          {onCalculateInstallment && vehicle.availability !== 'sold' && (
            <button
              onClick={() => onCalculateInstallment(vehicle)}
              className="min-w-0 w-full py-1.5 px-1.5 sm:px-2 bg-[#F7F0DA] hover:bg-[#F0E5C2] text-[#76580F] border border-[#C6A64B]/60 rounded-md text-[10px] sm:text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer text-center leading-tight"
              title="Calculate Installment Plan"
            >
              <span className="whitespace-normal">Installments</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
