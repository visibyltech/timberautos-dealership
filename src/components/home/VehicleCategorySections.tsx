import React from 'react';
import { Vehicle } from '../../types';
import { VehicleCard } from '../inventory/VehicleCard';
interface Props { vehicles: Vehicle[]; onSelectVehicle: (vehicle: Vehicle) => void; onCalculateInstallment: (vehicle: Vehicle) => void; }
const CATEGORIES: { title: string; bodyType: Vehicle['bodyType']; subtitle: string }[] = [
 { title: 'SUVs & 4x4s', bodyType: 'Luxury SUV', subtitle: 'Luxury SUVs and capable off-road vehicles' },
 { title: 'Executive Sedans', bodyType: 'Sedan', subtitle: 'Refined comfort for every journey' },
 { title: 'Sports Cars & Coupes', bodyType: 'Coupe', subtitle: 'Performance and distinctive styling' },
 { title: 'Pickup Trucks', bodyType: 'Truck / Pickup', subtitle: 'Strength, utility and capability' },
 { title: 'Crossovers', bodyType: 'Crossover', subtitle: 'Versatile everyday vehicles' }
];
export const VehicleCategorySections: React.FC<Props> = ({ vehicles, onSelectVehicle, onCalculateInstallment }) => <div className="bg-[#0D0F14]">
 {CATEGORIES.map(category => { const items = vehicles.filter(v => v.bodyType === category.bodyType && v.availability !== 'sold'); if (!items.length) return null;
 return <section key={category.bodyType} className="py-6 sm:py-8 border-t border-[#292D37]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="mb-3"><h2 className="text-lg sm:text-xl font-extrabold text-white font-heading">{category.title}</h2><p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">{category.subtitle}</p></div>
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">{items.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} onSelectVehicle={onSelectVehicle} onCalculateInstallment={onCalculateInstallment} />)}</div>
 </div></section>; })}
</div>;
