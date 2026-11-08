import React, { useState, useMemo } from 'react';
import { Vehicle } from '../../types';
import { VehicleCard } from './VehicleCard';
import { VehicleFilterBar, FilterState } from './VehicleFilterBar';
import { Car, Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface InventoryViewProps {
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  onCalculateInstallment: (vehicle: Vehicle) => void;
}

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  make: '',
  condition: '',
  bodyType: '',
  transmission: '',
  fuelType: '',
  availability: '',
  minPrice: 0,
  maxPrice: 500000000,
  minYear: 2018,
  maxYear: 2025
};

export const InventoryView: React.FC<InventoryViewProps> = ({
  vehicles,
  onSelectVehicle,
  onCalculateInstallment
}) => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'year_desc' | 'mileage_asc'>('featured');

  const availableMakes = useMemo(() => {
    const set = new Set<string>();
    vehicles.forEach(v => set.add(v.make));
    return Array.from(set).sort();
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      // Search
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const match =
          v.make.toLowerCase().includes(query) ||
          v.model.toLowerCase().includes(query) ||
          (v.trim && v.trim.toLowerCase().includes(query)) ||
          v.vin.toLowerCase().includes(query) ||
          v.year.toString().includes(query);
        if (!match) return false;
      }

      // Make
      if (filters.make && v.make !== filters.make) return false;

      // Condition
      if (filters.condition && v.condition !== filters.condition) return false;

      // Body Type
      if (filters.bodyType && v.bodyType !== filters.bodyType) return false;

      // Transmission
      if (filters.transmission && v.transmission !== filters.transmission) return false;

      // Fuel Type
      if (filters.fuelType && v.fuelType !== filters.fuelType) return false;

      // Availability
      if (filters.availability && v.availability !== filters.availability) return false;

      // Price Range
      if (v.price < filters.minPrice || v.price > filters.maxPrice) return false;

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'year_desc':
          return b.year - a.year;
        case 'mileage_asc':
          return a.mileage - b.mileage;
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  }, [vehicles, filters, sortBy]);

  const handleReset = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <div className="py-12 bg-[#0B0C10] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Showroom</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Automobile Marketplace
          </h1>
          <p className="text-neutral-400 text-sm max-w-2xl leading-relaxed">
            Browse our hand-curated collection of verified luxury vehicles available for direct online purchase, 3–24 month installment plans, and Autochek car financing.
          </p>
        </div>

        {/* Filter Bar */}
        <VehicleFilterBar
          filters={filters}
          setFilters={setFilters}
          availableMakes={availableMakes}
          totalResults={filteredVehicles.length}
          onReset={handleReset}
        />

        {/* Sort and Count Sub-Bar */}
        <div className="flex items-center justify-between mb-6 text-xs text-neutral-400">
          <div>
            Showing <span className="text-white font-semibold">{filteredVehicles.length}</span> of {vehicles.length} vehicles
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#14161f] border border-[#242733] rounded-lg px-3 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="featured">Featured First</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="year_desc">Year: Newest</option>
              <option value="mileage_asc">Mileage: Lowest</option>
            </select>
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelectVehicle={onSelectVehicle}
                onCalculateInstallment={onCalculateInstallment}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#12141c] border border-[#20232d] rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4 my-12">
            <div className="w-14 h-14 rounded-full bg-[#1b1e2a] border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
              <Car className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">
              No matching vehicles found
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We couldn't find any vehicle matching your current filter parameters. Try expanding your price range or resetting all filters.
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-black text-xs font-bold uppercase rounded-lg hover:opacity-90 transition-opacity"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
