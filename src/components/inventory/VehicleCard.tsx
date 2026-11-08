import React from 'react';
import { Heart, Fuel, Gauge, Cog, Eye, Calendar, ArrowRight } from 'lucide-react';
import { Vehicle } from '../../types';
import { formatNaira, formatKm, formatCondition } from '../../utils/formatters';
import { useDealership } from '../../context/DealershipContext';

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

  const mainImage = vehicle.images[0] || '/src/assets/images/hero_luxury_showroom_1794141434269.jpg';

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
    <div className="group relative bg-[#111318] border border-[#21242d] hover:border-[#D4AF37]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/80 flex flex-col justify-between">
      
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] w-full bg-[#0c0d12] overflow-hidden cursor-pointer" onClick={() => onSelectVehicle(vehicle)}>
        <img
          src={mainImage}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Ambient Dark Gradient at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-transparent opacity-80" />

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

        {/* Condition Ribbon at bottom of photo */}
        <div className="absolute bottom-2.5 left-3 z-10 text-[11px] font-medium text-neutral-300 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span>{formatCondition(vehicle.condition)}</span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Make and Year */}
          <div className="flex items-center justify-between gap-2 text-xs text-neutral-400 mb-1">
            <span className="uppercase tracking-wider font-semibold text-neutral-300">{vehicle.make}</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              {vehicle.year}
            </span>
          </div>

          {/* Model Title */}
          <h3 
            onClick={() => onSelectVehicle(vehicle)}
            className="text-lg font-bold text-white group-hover:text-[#E5C158] transition-colors leading-snug cursor-pointer line-clamp-1 font-heading"
          >
            {vehicle.model}
          </h3>

          {vehicle.trim && (
            <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
              {vehicle.trim}
            </p>
          )}

          {/* Price */}
          <div className="mt-3.5 pt-3 border-t border-[#1e212a] flex items-baseline justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">
                Asking Price
              </span>
              <span className="text-xl font-extrabold text-gold-gradient font-heading tabular-nums">
                {formatNaira(vehicle.price)}
              </span>
            </div>

            {/* Estimated monthly installment teaser */}
            <div className="text-right">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">
                From / month
              </span>
              <span className="text-xs font-semibold text-neutral-300 tabular-nums">
                {formatNaira(Math.round((vehicle.price * 0.7) / 24))}
              </span>
            </div>
          </div>

          {/* Key Specs Row */}
          <div className="mt-4 grid grid-cols-3 gap-2 py-2.5 px-3 bg-[#0d0e13] rounded-lg border border-[#1b1d24] text-[11px] text-neutral-300">
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
        <div className="mt-5 pt-3 border-t border-[#1e212a] flex items-center gap-2">
          <button
            onClick={() => onSelectVehicle(vehicle)}
            className="flex-1 py-2.5 px-3 bg-[#171a22] hover:bg-[#222530] text-white hover:text-[#E5C158] border border-[#2b2f3d] hover:border-[#D4AF37]/50 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>

          {onCalculateInstallment && vehicle.availability !== 'sold' && (
            <button
              onClick={() => onCalculateInstallment(vehicle)}
              className="py-2.5 px-3 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#E5C158] border border-[#D4AF37]/30 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
              title="Calculate Installment Plan"
            >
              <span>Installment</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
