import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  Car
} from 'lucide-react';
import { Vehicle, InspectionBooking } from '../../types';
import { useDealership } from '../../context/DealershipContext';

interface InspectionBookingModalProps {
  initialVehicle?: Vehicle | null;
  onClose: () => void;
}

export const InspectionBookingModal: React.FC<InspectionBookingModalProps> = ({
  initialVehicle,
  onClose
}) => {
  const { vehicles, bookInspection, inspections } = useDealership();

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    initialVehicle?.id || vehicles[0]?.id || ''
  );
  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+234');
  
  // Tomorrow's date formatted as YYYY-MM-DD
  const defaultDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [preferredDate, setPreferredDate] = useState(defaultDate);
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [location, setLocation] = useState('Lagos Head Office Showroom (Lekki Phase 1)');
  const [notes, setNotes] = useState('');

  const [submittedBooking, setSubmittedBooking] = useState<InspectionBooking | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const timeSlots = [
    '09:00 AM',
    '11:00 AM',
    '01:00 PM',
    '03:00 PM',
    '05:00 PM'
  ];

  const showroomLocations = [
    'Lagos Head Office Showroom (Lekki Phase 1)',
    'Abuja Executive Showroom (Central Business District)'
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      setErrorMessage('Please complete all contact details.');
      return;
    }

    setErrorMessage('');

    const result = bookInspection({
      vehicleId: selectedVehicle.id,
      vehicleSnapshot: {
        make: selectedVehicle.make,
        model: selectedVehicle.model,
        year: selectedVehicle.year,
        price: selectedVehicle.price,
        image: selectedVehicle.images[0] || '/src/assets/images/hero_luxury_showroom_1794141434269.jpg',
        vin: selectedVehicle.vin
      },
      customer: {
        fullName,
        email,
        phone,
        notes
      },
      preferredDate,
      preferredTime,
      location
    });

    if (!result.success) {
      setErrorMessage(result.error || 'The selected slot is unavailable.');
      return;
    }

    if (result.booking) {
      setSubmittedBooking(result.booking);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl my-auto bg-[#0d0f16] border border-[#232735] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#12141d] border-b border-[#202330] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Vehicle Inspection Appointment
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white bg-[#1a1c26] rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {!submittedBooking ? (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              
              {/* Selected Vehicle Banner */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Select Vehicle for Inspection
                </label>
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="w-full bg-[#181a24] border border-[#292d3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.year} {v.make} {v.model} ({v.exteriorColor}) — VIN: {v.vin}
                    </option>
                  ))}
                </select>
              </div>

              {selectedVehicle && (
                <div className="flex items-center gap-3 p-3 bg-[#13151f] rounded-lg border border-[#20232e]">
                  <img
                    src={selectedVehicle.images[0] || '/src/assets/images/hero_luxury_showroom_1794141434269.jpg'}
                    alt={selectedVehicle.model}
                    className="w-14 h-10 object-cover rounded-lg"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      Chassis VIN: {selectedVehicle.vin} · {selectedVehicle.engineCapacity}
                    </span>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 bg-red-950/60 border border-red-800/60 rounded-lg text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-neutral-300 font-medium mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Chief / Dr / Mr"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#181a24] border border-[#292d3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-300 font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.ng"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#181a24] border border-[#292d3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-300 font-medium mb-1">Telephone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#181a24] border border-[#292d3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Showroom Center */}
              <div>
                <label className="block text-[11px] text-neutral-300 font-medium mb-1">Preferred Inspection Showroom</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#181a24] border border-[#292d3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  {showroomLocations.map((loc, i) => (
                    <option key={i} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-neutral-300 font-medium mb-1">Appointment Date *</label>
                  <input
                    type="date"
                    required
                    min={defaultDate}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-[#181a24] border border-[#292d3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-300 font-medium mb-1">Preferred Time Slot *</label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-[#181a24] border border-[#292d3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-300 font-medium mb-1">
                  Specific Diagnostic Requests / Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Please arrange computer scanner test, bringing personal mechanic..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#181a24] border border-[#292d3c] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/20"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Inspection Request</span>
                </button>
              </div>

            </form>
          ) : (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Inspection Request Received
                </span>
                <h3 className="text-2xl font-extrabold text-white font-heading">
                  Reference: {submittedBooking.reference}
                </h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  Your appointment slot for <strong className="text-white">{submittedBooking.preferredDate} at {submittedBooking.preferredTime}</strong> has been logged. Our showroom manager will confirm the booking via email and telephone.
                </p>
              </div>

              <div className="bg-[#13151f] p-4 rounded-xl border border-[#212430] text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Vehicle:</span>
                  <span className="text-white font-bold">{submittedBooking.vehicleSnapshot.year} {submittedBooking.vehicleSnapshot.make} {submittedBooking.vehicleSnapshot.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Location:</span>
                  <span className="text-neutral-200">{submittedBooking.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Initial Status:</span>
                  <span className="text-amber-400 font-semibold uppercase">{submittedBooking.status}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-black text-xs font-bold uppercase rounded-lg hover:opacity-90"
              >
                Done
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
