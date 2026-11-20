import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { useDealership } from '../../context/DealershipContext';
interface FooterProps { onNavigate: (tab: string) => void; onOpenTerms: (type: 'terms' | 'privacy') => void; }
export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTerms }) => {
  const { settings } = useDealership();
  return <footer className="bg-[#0B0D12] border-t border-[#292D37] text-gray-400 py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div><h3 className="text-white font-extrabold text-sm uppercase font-heading">TIMBER AUTOS <span className="text-[#D4AF37]">LIMITED</span></h3>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs">
            <a href={`tel:${settings.phone}`} className="flex items-center gap-1.5 hover:text-[#D4AF37]"><Phone className="w-3.5 h-3.5 text-[#D4AF37]" />{settings.phone}</a>
            <a href={`mailto:${settings.email}`} className="flex items-center gap-1.5 hover:text-[#D4AF37]"><Mail className="w-3.5 h-3.5 text-[#D4AF37]" />{settings.email}</a>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
          <button onClick={() => onNavigate('home')} className="hover:text-[#D4AF37]">Home</button><button onClick={() => onNavigate('inventory')} className="hover:text-[#D4AF37]">Browse Cars</button><button onClick={() => onNavigate('installments')} className="hover:text-[#D4AF37]">Installments</button><button onClick={() => onNavigate('financing')} className="hover:text-[#D4AF37]">Financing</button><button onClick={() => onOpenTerms('privacy')} className="hover:text-[#D4AF37]">Privacy</button><button onClick={() => onOpenTerms('terms')} className="hover:text-[#D4AF37]">Terms</button>
        </nav>
      </div>
      <div className="mt-4 pt-3 border-t border-[#292D37] flex justify-between text-[10px] text-gray-500"><span>© {new Date().getFullYear()} TIMBER AUTOS LIMITED</span><button onClick={() => onNavigate('home')} className="hover:text-[#D4AF37]">Back to top</button></div>
    </div>
  </footer>;
};
