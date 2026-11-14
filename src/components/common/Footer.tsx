import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { useDealership } from '../../context/DealershipContext';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenTerms: (type: 'terms' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTerms }) => {
  const { settings } = useDealership();

  return (
    <footer className="bg-[#0B0D12] border-t border-[#292D37] text-gray-400 pt-9 sm:pt-11 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-10 pb-8 border-b border-[#292D37]">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#171B25] border border-[#D4AF37]/40 p-1 flex items-center justify-center">
                <img src="/assets/aistudio/file_00000000d02881f485cd91770ad63cb9_5f7889d7.png" alt="Timber Autos Limited" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-base tracking-wide uppercase font-heading">TIMBER AUTOS <span className="text-[#D4AF37]">LIMITED</span></h3>
                <p className="text-[#D4AF37] text-[11px]">Your Trusted Auto Partner</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Quality new and foreign-used vehicles, flexible installment plans and trusted vehicle sourcing.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href={`tel:${settings.phone}`} className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"><Phone className="w-4 h-4 text-[#D4AF37]" /><span>{settings.phone}</span></a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"><Mail className="w-4 h-4 text-[#D4AF37]" /><span>{settings.email}</span></a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-[#D4AF37] pl-2">Explore</h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-3 gap-y-2 text-sm">
              <li><button onClick={() => onNavigate('home')} className="hover:text-[#D4AF37]">Home</button></li>
              <li><button onClick={() => onNavigate('inventory')} className="hover:text-[#D4AF37]">Browse Cars</button></li>
              <li><button onClick={() => onNavigate('installments')} className="hover:text-[#D4AF37]">Installments</button></li>
              <li><button onClick={() => onNavigate('financing')} className="hover:text-[#D4AF37]">Car Financing</button></li>
              <li><button onClick={() => onNavigate('inspection')} className="hover:text-[#D4AF37]">Book Inspection</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-[#D4AF37]">About Us</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-[#D4AF37]">Contact</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-[#D4AF37] pl-2">Information</h4>
            <p className="text-xs sm:text-sm leading-relaxed">Speak with our team about vehicle availability, purchase options and inspections.</p>
            <div className="flex flex-col items-start gap-2 text-sm">
              <button onClick={() => onOpenTerms('privacy')} className="hover:text-[#D4AF37]">Privacy Policy</button>
              <button onClick={() => onOpenTerms('terms')} className="hover:text-[#D4AF37]">Terms &amp; Conditions</button>
              <a href="https://www.autochek.africa/ng" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37]">Autochek Financing</a>
            </div>
          </div>
        </div>

        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-500">
          <span>&copy; {new Date().getFullYear()} TIMBER AUTOS LIMITED. All Rights Reserved.</span>
          <button onClick={() => onNavigate('home')} className="hover:text-[#D4AF37]">Back to top</button>
        </div>
      </div>
    </footer>
  );
};
