import React, { useState } from 'react';
import { Calendar, DollarSign, Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';
import { formatNaira } from '../../utils/formatters';

interface InstallmentPreviewProps {
  onExploreInstallments: () => void;
}

export const InstallmentPreview: React.FC<InstallmentPreviewProps> = ({ onExploreInstallments }) => {
  // Sample calculator values for teaser
  const [vehicleValue, setVehicleValue] = useState<number>(180000000);
  const [depositPercent, setDepositPercent] = useState<number>(30);
  const [durationMonths, setDurationMonths] = useState<number>(12);

  const depositAmount = (vehicleValue * depositPercent) / 100;
  const remainingPrincipal = vehicleValue - depositAmount;
  const adminCharge = remainingPrincipal * 0.05; // 5% flat admin fee
  const totalFinanced = remainingPrincipal + adminCharge;
  const monthlyPayment = Math.round(totalFinanced / durationMonths);

  const durations = [3, 6, 9, 12, 18, 24];

  return (
    <section className="py-20 bg-gradient-to-b from-[#F5F4F0] via-[#EEECE6] to-[#F5F4F0] border-t border-[#DEDAD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#E5C158]">
              <Calendar className="w-3.5 h-3.5" />
              <span>In-House Installment Facility</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#242424] tracking-tight leading-tight font-heading">
              Your Dream Car, <br />
              <span className="text-gold-gradient">Within Reach.</span>
            </h2>

            <p className="text-[#4F4B44] text-base leading-relaxed">
              Spread your vehicle payments over an agreed period of up to <strong className="text-[#242424]">24 months</strong>, subject to eligibility approval and dealership terms. Take delivery upon deposit and manage your payments through our structured portal.
            </p>

            <ul className="space-y-3 text-sm text-[#4F4B44]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Flexible terms from 3 to 24 months</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Minimum deposit starting from 30%</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Transparent amortization schedule with zero hidden penalties</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Dedicated customer portal with receipt downloads</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onExploreInstallments}
                className="px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] rounded-lg shadow-lg shadow-[#D4AF37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Installment Plans</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Interactive Calculator Card */}
          <div className="lg:col-span-7 bg-white border border-[#DEDAD0] rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/10">
            <div className="flex items-center justify-between pb-4 border-b border-[#DEDAD0] mb-6">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-lg font-bold text-[#242424] font-heading">
                  Quick Installment Calculator
                </h3>
              </div>
              <span className="text-xs text-[#E5C158] font-medium bg-[#D4AF37]/10 px-2.5 py-1 rounded border border-[#D4AF37]/20">
                Live Estimates
              </span>
            </div>

            <div className="space-y-6">
              {/* Vehicle Price Slider */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-[#68645D] font-medium">Vehicle Value (₦)</span>
                  <span className="text-[#242424] font-bold text-sm font-heading tabular-nums">
                    {formatNaira(vehicleValue)}
                  </span>
                </div>
                <input
                  type="range"
                  min={50000000}
                  max={400000000}
                  step={5000000}
                  value={vehicleValue}
                  onChange={(e) => setVehicleValue(Number(e.target.value))}
                  className="w-full h-2 bg-[#E5E1D8] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
                <div className="flex justify-between text-[10px] text-[#77736B] mt-1">
                  <span>₦50,000,000</span>
                  <span>₦200,000,000</span>
                  <span>₦400,000,000</span>
                </div>
              </div>

              {/* Deposit Slider */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-[#68645D] font-medium">Initial Down Payment ({depositPercent}%)</span>
                  <span className="text-[#E5C158] font-bold text-sm font-heading tabular-nums">
                    {formatNaira(depositAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={70}
                  step={5}
                  value={depositPercent}
                  onChange={(e) => setDepositPercent(Number(e.target.value))}
                  className="w-full h-2 bg-[#E5E1D8] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
                <div className="flex justify-between text-[10px] text-[#77736B] mt-1">
                  <span>30% Minimum</span>
                  <span>50%</span>
                  <span>70%</span>
                </div>
              </div>

              {/* Duration Selector */}
              <div>
                <label className="block text-xs font-medium text-[#68645D] mb-2">
                  Financing Duration (Months)
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {durations.map((m) => (
                    <button
                      key={m}
                      onClick={() => setDurationMonths(m)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                        durationMonths === m
                          ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                          : 'bg-white text-[#4F4B44] border-[#DCD8CF] hover:border-[#D4AF37]/40'
                      }`}
                    >
                      {m} Mo
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculation Output Box */}
              <div className="bg-[#F4F2EC] border border-[#DEDAD0] p-5 rounded-xl space-y-3">
                <div className="flex justify-between items-center text-xs text-[#68645D]">
                  <span>Financed Balance:</span>
                  <span className="text-[#45423D] font-semibold tabular-nums">{formatNaira(remainingPrincipal)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#68645D]">
                  <span>Administrative &amp; Processing (5%):</span>
                  <span className="text-[#45423D] font-semibold tabular-nums">{formatNaira(adminCharge)}</span>
                </div>
                <div className="pt-3 border-t border-[#DEDAD0] flex justify-between items-baseline">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#68645D] font-semibold block">
                      Estimated Monthly Payment
                    </span>
                    <span className="text-2xl font-extrabold text-gold-gradient font-heading tabular-nums">
                      {formatNaira(monthlyPayment)}
                    </span>
                    <span className="text-[11px] text-[#77736B] block">
                      for {durationMonths} consecutive months
                    </span>
                  </div>

                  <button
                    onClick={onExploreInstallments}
                    className="px-4 py-2 bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#E5C158] hover:text-black border border-[#D4AF37]/40 rounded-lg text-xs font-bold uppercase transition-all"
                  >
                    Apply Now
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
