import React from 'react';
import { ArrowRight } from 'lucide-react';
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
    <section className="pt-3 pb-8 sm:pt-8 sm:pb-12 bg-[#0D0F14] border-t border-[#292D37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end items-center justify-between gap-3 mb-3 sm:mb-6">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Featured Vehicles
            </h2>
          </div>

          <button
            onClick={onViewAllInventory}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#E5C158] hover:text-black bg-[#171B25] hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#E5C158] border border-[#C6A64B]/60 rounded-lg transition-all group cursor-pointer"
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
