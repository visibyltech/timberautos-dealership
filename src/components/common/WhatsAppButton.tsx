import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Vehicle } from '../../types';

interface WhatsAppButtonProps {
  currentVehicle?: Vehicle | null;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ currentVehicle }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const phone = '2348143112826';
  
  const getMessage = () => {
    if (currentVehicle) {
      return `Hello Timber Autos Limited, I am interested in inquiring about the ${currentVehicle.year} ${currentVehicle.make} ${currentVehicle.model} (VIN: ${currentVehicle.vin}, Asking Price: ₦${currentVehicle.price.toLocaleString()}). Please provide more details on availability, inspection and purchase options.`;
    }
    return `Hello Timber Autos Limited, I would like to inquire about your available vehicle inventory, installment plans, and automotive importation services.`;
  };

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(getMessage())}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Tooltip popup */}
      {showTooltip && (
        <div className="mb-2 bg-[#12141a] text-white border border-[#D4AF37]/40 rounded-xl p-3 shadow-2xl shadow-black/80 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-2 mb-1">
            <span className="text-xs font-bold text-[#E5C158] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Live Automotive Advisory
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-neutral-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[12px] text-neutral-300 leading-relaxed">
            {currentVehicle ? (
              <>Chat with a Senior Consultant regarding the <strong>{currentVehicle.year} {currentVehicle.make} {currentVehicle.model}</strong>.</>
            ) : (
              <>Need assistance sourcing a car, financing, or spreading payments up to 24 months? Talk to us on WhatsApp.</>
            )}
          </p>
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white pl-3 pr-4 py-3 rounded-full shadow-xl shadow-black/70 hover:shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all duration-300 border border-emerald-400/40"
        aria-label="Chat with Timber Autos on WhatsApp"
      >
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-medium leading-none text-emerald-100">Quick Response</span>
          <span className="text-xs font-bold leading-tight">Chat on WhatsApp</span>
        </div>

        {/* Subtle gold ring accent */}
        <span className="absolute -inset-0.5 rounded-full border border-[#D4AF37]/50 pointer-events-none group-hover:border-[#D4AF37] transition-colors"></span>
      </a>
    </div>
  );
};
