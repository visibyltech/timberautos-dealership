import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Vehicle } from '../../types';
import { useDealership } from '../../context/DealershipContext';
import { formatNaira, formatKm } from '../../utils/formatters';

interface SearchModalProps {
  onClose: () => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose, onSelectVehicle }) => {
  const { vehicles } = useDealership();
  const [query, setQuery] = useState('');

  const results = vehicles.filter((v) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      (v.trim && v.trim.toLowerCase().includes(q)) ||
      v.vin.toLowerCase().includes(q) ||
      v.year.toString().includes(q) ||
      v.bodyType.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl bg-[#0f1118] border border-[#272b38] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="p-4 bg-[#141620] border-b border-[#222532] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#D4AF37]" />
          <input
            type="text"
            autoFocus
            placeholder="Type vehicle make, model, year, or VIN (e.g. Mercedes, G 63, 2024, Range Rover)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {!query.trim() ? (
            <div className="py-8 text-center text-xs text-neutral-500">
              Start typing to search available showroom vehicles, specifications, and VIN records.
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              No matching luxury vehicles found for "{query}".
            </div>
          ) : (
            results.map((v) => (
              <div
                key={v.id}
                onClick={() => {
                  onClose();
                  onSelectVehicle(v);
                }}
                className="p-3 bg-[#13151f] hover:bg-[#1a1d2b] border border-[#1f2230] hover:border-[#D4AF37]/50 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={v.images[0] || '/src/assets/images/hero_luxury_showroom_1794141434269.jpg'}
                    alt={v.model}
                    className="w-14 h-10 object-cover rounded-lg border border-[#292d3b]"
                  />
                  <div>
                    <span className="text-[11px] text-[#D4AF37] font-semibold">{v.year} {v.make}</span>
                    <h5 className="text-xs font-bold text-white group-hover:text-[#E5C158]">{v.model}</h5>
                    <span className="text-[10px] text-neutral-400">VIN: {v.vin} · {formatKm(v.mileage)}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-extrabold text-gold-gradient block tabular-nums">
                    {formatNaira(v.price)}
                  </span>
                  <span className="text-[10px] text-neutral-400 uppercase">
                    {v.availability}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
