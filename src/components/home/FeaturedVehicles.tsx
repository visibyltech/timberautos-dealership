import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Vehicle } from '../../types';
import { VehicleCard } from '../inventory/VehicleCard';

interface FeaturedVehiclesProps {
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  onCalculateInstallment: (vehicle: Vehicle) => void;
  onViewAllInventory: () => void;
}

export const FeaturedVehicles: React.FC<FeaturedVehiclesProps> = ({
  vehicles,
  onSelectVehicle,
  onCalculateInstallment,
  onViewAllInventory
}) => {
  // Show featured or top vehicles
  const displayVehicles = vehicles.filter((v) => v.featured).slice(0, 4);

  return (
    <section className="py-20 bg-[#0B0C10] border-t border-[#181a22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dealership Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Featured Luxury Inventory
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Every vehicle undergoes a stringent 300-point diagnostic inspection, verified customs documentation, and complete ownership history validation.
            </p>
          </div>

          <button
            onClick={onViewAllInventory}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-black bg-[#161820] hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#E5C158] border border-[#D4AF37]/40 rounded-lg transition-all group cursor-pointer"
          >
            <span>View All Cars ({vehicles.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {displayVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelectVehicle={onSelectVehicle}
              onCalculateInstallment={onCalculateInstallment}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
