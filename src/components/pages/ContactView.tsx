import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { useDealership } from '../../context/DealershipContext';

export const ContactView: React.FC = () => {
  const { settings } = useDealership();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+234');
  const [subject, setSubject] = useState('Vehicle Sourcing Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="py-16 bg-[#0B0C10] min-h-screen text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            Connect With Our Executives
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Contact Timber Autos Limited
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Whether you require assistance with luxury vehicle purchasing, custom overseas vehicle importation, installment structuring, or showroom appointments, our consultants are at your service.
          </p>
        </div>

        {/* Contact Information & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Showrooms & Hotline (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone & WhatsApp Card */}
            <div className="bg-[#12141c] border border-[#222532] p-6 rounded-2xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block font-heading">
                Direct Communications
              </span>

              <div className="space-y-3">
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-3 p-3 bg-[#171924] rounded-xl border border-[#232736] hover:border-[#D4AF37]/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 block">Telephone Hotline:</span>
                    <span className="text-sm font-bold text-white">{settings.phone}</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/2348143112826"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/40 hover:border-emerald-500/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-400">
                    <MessageCircle className="w-5 h-5 fill-emerald-500" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-emerald-300 block">Official WhatsApp:</span>
                    <span className="text-sm font-bold text-white">+234 814 311 2826</span>
                  </div>
                </a>

                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 p-3 bg-[#171924] rounded-xl border border-[#232736] hover:border-[#D4AF37]/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 block">Client Support Email:</span>
                    <span className="text-sm font-bold text-white">{settings.email}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Showroom Addresses */}
            <div className="bg-[#12141c] border border-[#222532] p-6 rounded-2xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block font-heading">
                Physical Showrooms
              </span>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    <span>Lagos Head Office Showroom</span>
                  </div>
                  <p className="text-neutral-400 pl-6">Plot 14, Admiralty Way, Lekki Phase 1, Lagos, Nigeria</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    <span>Abuja Executive Center</span>
                  </div>
                  <p className="text-neutral-400 pl-6">Shehu Shagari Way, Central Business District, Abuja</p>
                </div>

                <div className="pt-2 border-t border-[#1e212b] flex items-center gap-2 text-neutral-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Mon – Sat: 8:00 AM – 6:30 PM | Sundays by Appointment</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#12141c] border border-[#222532] p-8 rounded-2xl">
            <h3 className="text-lg font-bold text-white font-heading mb-2">
              Send an Automotive Inquiry
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Our executive sales and importation consultants will respond within 2 operational hours.
            </p>

            {isSent ? (
              <div className="p-8 text-center space-y-4 bg-[#151824] rounded-xl border border-[#222636]">
                <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white font-heading">
                  Inquiry Dispatched Successfully
                </h4>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Thank you for reaching out to Timber Autos Limited. A dedicated representative has been notified and will contact you via {phone}.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold uppercase rounded-lg"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chief Adeleke"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.ng"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">Telephone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 800 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Vehicle Sourcing Inquiry">Vehicle Sourcing / Importation</option>
                      <option value="Showroom Vehicle Purchase">Showroom Vehicle Purchase</option>
                      <option value="Installment Payment Inquiry">Installment Payment Inquiry (Up to 24 Mo)</option>
                      <option value="Inspection Appointment">Private Inspection Appointment</option>
                      <option value="Autochek Financing Support">Autochek Financing Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Message Details *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about the vehicle you wish to acquire, specific trim requirements, or preferred delivery timeline..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-7 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:scale-[1.01] transition-transform flex items-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
