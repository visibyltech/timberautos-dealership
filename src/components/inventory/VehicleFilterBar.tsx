import React from 'react';
import { Search, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { VehicleCondition, VehicleAvailability, BodyType, FuelType, TransmissionType } from '../../types';

export interface FilterState {
  searchQuery: string;
  make: string;
  condition: string;
  bodyType: string;
  transmission: string;
  fuelType: string;
  availability: string;
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
}

interface VehicleFilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableMakes: string[];
  totalResults: number;
  onReset: () => void;
}

export const VehicleFilterBar: React.FC<VehicleFilterBarProps> = ({
  filters,
  setFilters,
  availableMakes,
  totalResults,
  onReset
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const handleTextChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-[#111319] border border-[#21242e] rounded-xl p-5 mb-8 space-y-4 shadow-xl">
      
      {/* Top Search & Primary Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Search Query */}
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search make, model, VIN..."
            value={filters.searchQuery}
            onChange={(e) => handleTextChange('searchQuery', e.target.value)}
            className="w-full bg-[#181b24] border border-[#282c38] rounded-lg pl-10 pr-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Make Filter */}
        <div>
          <select
            value={filters.make}
            onChange={(e) => handleTextChange('make', e.target.value)}
            className="w-full bg-[#181b24] border border-[#282c38] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="">All Makes ({availableMakes.length})</option>
            {availableMakes.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Condition Filter */}
        <div>
          <select
            value={filters.condition}
            onChange={(e) => handleTextChange('condition', e.target.value)}
            className="w-full bg-[#181b24] border border-[#282c38] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="">All Conditions</option>
            <option value="brand-new">Brand-New Only</option>
            <option value="foreign-used">Foreign-Used (Tokunbo)</option>
            <option value="nigerian-used">Nigerian-Used</option>
          </select>
        </div>

        {/* Body Type Filter */}
        <div>
          <select
            value={filters.bodyType}
            onChange={(e) => handleTextChange('bodyType', e.target.value)}
            className="w-full bg-[#181b24] border border-[#282c38] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="">All Body Styles</option>
            <option value="Luxury SUV">Luxury SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Coupe">Coupe</option>
            <option value="Crossover">Crossover</option>
          </select>
        </div>

      </div>

      {/* Advanced Filter Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#1a1d26]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              showAdvanced
                ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#E5C158]'
                : 'bg-[#181a22] border-[#292d39] text-neutral-300 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showAdvanced ? 'Hide Advanced Filters' : 'More Filters (Price, Year, Fuel)'}</span>
          </button>

          {(filters.searchQuery || filters.make || filters.condition || filters.bodyType || filters.transmission || filters.fuelType || filters.availability || filters.minPrice > 0 || filters.maxPrice < 500000000) && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-neutral-400 hover:text-red-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        <span className="text-xs text-neutral-400">
          Showing <strong className="text-white font-semibold">{totalResults}</strong> luxury automobile{totalResults === 1 ? '' : 's'}
        </span>
      </div>

      {/* Advanced Filters Expandable Drawer */}
      {showAdvanced && (
        <div className="pt-3 border-t border-[#1a1d26] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
          
          {/* Availability */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-400 mb-1">Availability</label>
            <select
              value={filters.availability}
              onChange={(e) => handleTextChange('availability', e.target.value)}
              className="w-full bg-[#181b24] border border-[#282c38] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="">All Statuses</option>
              <option value="available">Available in Showroom</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
            </select>
          </div>

          {/* Transmission */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-400 mb-1">Transmission</label>
            <select
              value={filters.transmission}
              onChange={(e) => handleTextChange('transmission', e.target.value)}
              className="w-full bg-[#181b24] border border-[#282c38] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="">Any Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Dual-Clutch">Dual-Clutch</option>
            </select>
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-400 mb-1">Fuel Type</label>
            <select
              value={filters.fuelType}
              onChange={(e) => handleTextChange('fuelType', e.target.value)}
              className="w-full bg-[#181b24] border border-[#282c38] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="">Any Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-400 mb-1">
              Max Price: ₦{(filters.maxPrice / 1000000).toLocaleString()}M
            </label>
            <input
              type="range"
              min={50000000}
              max={500000000}
              step={10000000}
              value={filters.maxPrice}
              onChange={(e) => handleTextChange('maxPrice', Number(e.target.value))}
              className="w-full h-2 bg-[#20232d] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
          </div>

        </div>
      )}

    </div>
  );
};
