import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Clock, ExternalLink, ArrowUpRight } from 'lucide-react';
import { useDealership } from '../../context/DealershipContext';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenTerms: (type: 'terms' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTerms }) => {
  const { settings } = useDealership();

  return (
    <footer className="bg-[#07080b] border-t border-[#1c1e26] text-neutral-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#181a22]">
          
          {/* Brand info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-black border border-[#D4AF37]/40 p-1 flex items-center justify-center">
                <img
                  src="/assets/aistudio/file_00000000d02881f485cd91770ad63cb9_5f7889d7.png"
                  alt="Timber Autos Limited"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-lg tracking-wider uppercase font-heading">
                  TIMBER AUTOS <span className="text-[#D4AF37]">LIMITED</span>
                </h3>
                <p className="text-[#D4AF37] text-xs font-medium">Your Trusted Auto Partner.</p>
              </div>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              Nigeria’s premier luxury automotive dealership. Specializing in verified brand-new and foreign-used automobile sales, custom vehicle importation, flexible installment plans up to 24 months, and Autochek car financing.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-sm text-neutral-300">
              <a href={`tel:${settings.phone}`} className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>{settings.phone}</span>
              </a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span>{settings.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-heading border-l-2 border-[#D4AF37] pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="hover:text-white transition-colors">
                  Browse Inventory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('installments')} className="hover:text-white transition-colors">
                  Pay in Installments (3–24 Mo)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('financing')} className="hover:text-white transition-colors">
                  Car Financing (Autochek)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inspection')} className="hover:text-white transition-colors">
                  Book Vehicle Inspection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About Timber Autos
                </button>
              </li>
            </ul>
          </div>

          {/* Luxury Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-heading border-l-2 border-[#D4AF37] pl-2">
              Vehicle Classes
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('inventory')} className="hover:text-white transition-colors">
                  Luxury Flagship SUVs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="hover:text-white transition-colors">
                  Executive Sedans
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="hover:text-white transition-colors">
                  Mercedes-AMG Line
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="hover:text-white transition-colors">
                  Range Rover Collection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="hover:text-white transition-colors">
                  Lexus LX / RX Series
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="hover:text-white transition-colors">
                  Toyota Land Cruiser ZX
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom & Operations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-heading border-l-2 border-[#D4AF37] pl-2">
              Showroom Locations
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-neutral-400">
              <div>
                <p className="text-white font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Lagos Executive Showroom
                </p>
                <p>Plot 14, Admiralty Way, Lekki Phase 1, Lagos</p>
              </div>
              <div>
                <p className="text-white font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Abuja VIP Center
                </p>
                <p>Shehu Shagari Way, Central Business District, Abuja</p>
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Mon – Sat: 8:00 AM – 6:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} TIMBER AUTOS LIMITED (RC 1948201). All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenTerms('privacy')}
              className="hover:text-neutral-300 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenTerms('terms')}
              className="hover:text-neutral-300 transition-colors"
            >
              Terms of Vehicle Purchase &amp; Installments
            </button>
            <a
              href="https://www.autochek.africa/ng"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
            >
              Autochek Partner <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
