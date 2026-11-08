import React, { useState } from 'react';
import {
  X,
  Calendar,
  Calculator,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  Clock,
  ArrowRight,
  Download,
  CreditCard,
  Building
} from 'lucide-react';
import { Vehicle, InstallmentDuration, InstallmentApplication } from '../../types';
import { formatNaira, formatDate } from '../../utils/formatters';
import { useDealership } from '../../context/DealershipContext';

interface InstallmentPortalModalProps {
  initialVehicle?: Vehicle | null;
  onClose: () => void;
  onSelectVehicle?: (vehicle: Vehicle) => void;
}

export const InstallmentPortalModal: React.FC<InstallmentPortalModalProps> = ({
  initialVehicle,
  onClose,
  onSelectVehicle
}) => {
  const { vehicles, submitInstallment, installments, recordInstallmentPayment } = useDealership();

  // Active tab: Calculator/Application OR Existing Customer Plans
  const [activeTab, setActiveTab] = useState<'apply' | 'my_plans'>('apply');

  // Selected vehicle for application
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    initialVehicle?.id || vehicles[0]?.id || ''
  );

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  // Calculator params
  const [depositPercent, setDepositPercent] = useState<number>(35);
  const [durationMonths, setDurationMonths] = useState<InstallmentDuration>(12);

  // Application form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+234');
  const [address, setAddress] = useState('');
  const [employmentType, setEmploymentType] = useState<'employed' | 'self_employed' | 'business_owner' | 'corporate'>('business_owner');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(25000000);
  const [bvn, setBvn] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Submission state
  const [submittedApp, setSubmittedApp] = useState<InstallmentApplication | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Calculations
  const vehiclePrice = selectedVehicle ? selectedVehicle.price : 0;
  const depositAmount = Math.round((vehiclePrice * depositPercent) / 100);
  const remainingBalance = vehiclePrice - depositAmount;
  // Flat administrative & underwriting charge: 5% of financed balance
  const adminCharges = Math.round(remainingBalance * 0.05);
  const totalAmountPayable = vehiclePrice + adminCharges;
  const monthlyPayment = Math.round((remainingBalance + adminCharges) / durationMonths);

  const durations: InstallmentDuration[] = [3, 6, 9, 12, 18, 24];

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setErrorMsg('You must review and agree to the Timber Autos installment assessment terms.');
      return;
    }
    if (!fullName || !email || !phone || !address) {
      setErrorMsg('Please complete all required contact information.');
      return;
    }

    setErrorMsg('');

    const newApp = submitInstallment({
      vehicleId: selectedVehicle.id,
      vehicleSnapshot: {
        make: selectedVehicle.make,
        model: selectedVehicle.model,
        year: selectedVehicle.year,
        price: selectedVehicle.price,
        image: selectedVehicle.images[0] || '/src/assets/images/hero_luxury_showroom_1794141434269.jpg'
      },
      customer: {
        fullName,
        email,
        phone,
        address,
        employmentType,
        monthlyIncome,
        bvn: bvn || undefined
      },
      durationMonths,
      vehiclePrice,
      depositPercentage: depositPercent,
      depositAmount,
      remainingBalance,
      adminCharges,
      monthlyPayment,
      totalAmountPayable
    });

    setSubmittedApp(newApp);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-5xl my-auto bg-[#0d0f16] border border-[#232735] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#12141d] border-b border-[#202330] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
                Pay in Installments (Up to 24 Months)
              </h3>
              <p className="text-[11px] text-[#D4AF37]">
                Spread vehicle payments conveniently with structured dealership terms
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher Tabs */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-[#181a24] rounded-lg border border-[#252836] text-xs">
              <button
                onClick={() => setActiveTab('apply')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  activeTab === 'apply' ? 'bg-[#D4AF37] text-black font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Calculator &amp; Application
              </button>
              <button
                onClick={() => setActiveTab('my_plans')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  activeTab === 'my_plans' ? 'bg-[#D4AF37] text-black font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Track Installment Plans ({installments.length})
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white bg-[#1a1c26] rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* TAB 1: CALCULATOR & APPLICATION FORM */}
          {activeTab === 'apply' && !submittedApp && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Calculator (6 cols) */}
              <div className="lg:col-span-6 space-y-5 bg-[#12141c] p-6 rounded-xl border border-[#212430]">
                <div className="flex items-center justify-between pb-3 border-b border-[#1c1f2b]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-[#D4AF37]" />
                    Installment Simulator
                  </h4>
                  <span className="text-[11px] text-[#E5C158]">
                    Subject to approval
                  </span>
                </div>

                {/* Vehicle Selection Dropdown */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Select Target Vehicle
                  </label>
                  <select
                    value={selectedVehicleId}
                    onChange={(e) => setSelectedVehicleId(e.target.value)}
                    className="w-full bg-[#181a24] border border-[#292d3c] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.year} {v.make} {v.model} — {formatNaira(v.price)} ({v.availability})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selected vehicle card snippet */}
                {selectedVehicle && (
                  <div className="flex items-center gap-3 p-3 bg-[#0d0e14] rounded-lg border border-[#1c1f28]">
                    <img
                      src={selectedVehicle.images[0] || '/src/assets/images/hero_luxury_showroom_1794141434269.jpg'}
                      alt={selectedVehicle.model}
                      className="w-16 h-12 object-cover rounded-lg shrink-0"
                    />
                    <div>
                      <span className="text-white font-bold text-xs block">
                        {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                      </span>
                      <span className="text-xs font-extrabold text-gold-gradient font-heading tabular-nums">
                        {formatNaira(selectedVehicle.price)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Duration Buttons */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-2">
                    Payment Duration (Months)
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {durations.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDurationMonths(d)}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                          durationMonths === d
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                            : 'bg-[#181a24] text-neutral-300 border-[#282c3c] hover:border-[#D4AF37]/50'
                        }`}
                      >
                        {d} Mo
                      </button>
                    ))}
                  </div>
                </div>

                {/* Down Payment Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-neutral-400 font-medium">Initial Down Payment ({depositPercent}%)</span>
                    <span className="text-[#E5C158] font-bold font-heading tabular-nums">{formatNaira(depositAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={70}
                    step={5}
                    value={depositPercent}
                    onChange={(e) => setDepositPercent(Number(e.target.value))}
                    className="w-full h-2 bg-[#20232d] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                    <span>30% Minimum Required</span>
                    <span>50%</span>
                    <span>70%</span>
                  </div>
                </div>

                {/* Calculation Output Box */}
                <div className="bg-[#0b0c11] border border-[#20232f] p-4 rounded-xl space-y-2.5 text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>Vehicle Price:</span>
                    <span className="text-white font-medium tabular-nums">{formatNaira(vehiclePrice)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Initial Deposit Paid Upfront:</span>
                    <span className="text-emerald-400 font-semibold tabular-nums">{formatNaira(depositAmount)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Remaining Financed Balance:</span>
                    <span className="text-white font-medium tabular-nums">{formatNaira(remainingBalance)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Administrative &amp; Verification Fee (5%):</span>
                    <span className="text-white font-medium tabular-nums">{formatNaira(adminCharges)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Total Amount Payable:</span>
                    <span className="text-white font-semibold tabular-nums">{formatNaira(totalAmountPayable)}</span>
                  </div>

                  <div className="pt-3 border-t border-[#1d202b] flex justify-between items-baseline">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                        Estimated Monthly Amortization
                      </span>
                      <span className="text-2xl font-extrabold text-gold-gradient font-heading tabular-nums">
                        {formatNaira(monthlyPayment)}
                      </span>
                      <span className="text-[11px] text-neutral-500 block">
                        payable on the 5th of each month for {durationMonths} months
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-500 italic">
                  * Approval is not guaranteed and requires underwriting verification of income and credit history.
                </p>
              </div>

              {/* Right Column: Formal Application Form (6 cols) */}
              <div className="lg:col-span-6 bg-[#12141c] p-6 rounded-xl border border-[#212430]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading pb-3 border-b border-[#1c1f2b] mb-4">
                  Official Installment Application
                </h4>

                {errorMsg && (
                  <div className="mb-4 p-3 bg-red-950/60 border border-red-800/60 rounded-lg text-xs text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitApplication} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-neutral-300 font-medium mb-1">Full Legal Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chief Babatunde Adeleke"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#181a24] border border-[#292d3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-300 font-medium mb-1">Corporate / Personal Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.ng"
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
                        placeholder="+234 803 000 0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#181a24] border border-[#292d3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-300 font-medium mb-1">Employment / Business Type *</label>
                      <select
                        value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value as any)}
                        className="w-full bg-[#181a24] border border-[#292d3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="business_owner">Business Owner / Director</option>
                        <option value="employed">Employed (Executive / Professional)</option>
                        <option value="self_employed">Self Employed</option>
                        <option value="corporate">Corporate Entity / Fleet</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-300 font-medium mb-1">Residential Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 15 Alexander Avenue, Ikoyi, Lagos"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#181a24] border border-[#292d3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-neutral-300 font-medium mb-1">Estimated Monthly Income (₦)</label>
                      <input
                        type="number"
                        placeholder="25,000,000"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                        className="w-full bg-[#181a24] border border-[#292d3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-300 font-medium mb-1">Bank Verification Number (BVN)</label>
                      <input
                        type="password"
                        maxLength={11}
                        placeholder="11-digit BVN"
                        value={bvn}
                        onChange={(e) => setBvn(e.target.value)}
                        className="w-full bg-[#181a24] border border-[#292d3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  {/* Document upload checklist notification */}
                  <div className="p-3 bg-[#0d0e14] rounded-lg border border-[#1d202a] text-[11px] text-neutral-400 space-y-1">
                    <span className="font-semibold text-[#E5C158] block">Required Verification Documents:</span>
                    <p>Upon submission, our Underwriting Committee will request 6 months certified bank statements, government-issued identification, and utility evidence prior to contract signing.</p>
                  </div>

                  {/* Agree Terms Checkbox */}
                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="installmentTerms"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 rounded bg-[#181a24] border-[#292d3c] text-[#D4AF37] focus:ring-0"
                    />
                    <label htmlFor="installmentTerms" className="text-[11px] text-neutral-300 cursor-pointer">
                      I understand that installment approval is subject to dealership credit verification and underwriting terms. Vehicle ownership is transferred upon completion of all scheduled payments.
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/20"
                    >
                      <span>Submit Installment Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>

              </div>

            </div>
          )}

          {/* APPLICATION SUBMITTED SUCCESS VIEW */}
          {submittedApp && (
            <div className="p-8 text-center space-y-6 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Application Under Review
                </span>
                <h3 className="text-2xl font-extrabold text-white font-heading">
                  Reference: {submittedApp.reference}
                </h3>
                <p className="text-xs text-neutral-400">
                  Your installment application for the <strong className="text-white">{submittedApp.vehicleSnapshot.year} {submittedApp.vehicleSnapshot.make} {submittedApp.vehicleSnapshot.model}</strong> has been logged. An underwriter will contact you within 24 hours.
                </p>
              </div>

              <div className="bg-[#12141c] p-4 rounded-xl border border-[#212430] text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Financed Tenor:</span>
                  <span className="text-white font-semibold">{submittedApp.durationMonths} Months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Initial Down Payment ({submittedApp.depositPercentage}%):</span>
                  <span className="text-emerald-400 font-semibold tabular-nums">{formatNaira(submittedApp.depositAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Monthly Amortization:</span>
                  <span className="text-gold-gradient font-bold tabular-nums">{formatNaira(submittedApp.monthlyPayment)} / month</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSubmittedApp(null);
                  setActiveTab('my_plans');
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-black text-xs font-bold uppercase rounded-lg hover:opacity-90"
              >
                View in Installment Dashboard
              </button>
            </div>
          )}

          {/* TAB 2: CUSTOMER INSTALLMENT PLANS & PAYMENT TRACKING */}
          {activeTab === 'my_plans' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-heading">
                    Approved Installment Plans &amp; Payment Schedules
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Track your amortization schedule, make upcoming monthly payments, and download payment receipts.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSubmittedApp(null);
                    setActiveTab('apply');
                  }}
                  className="px-3 py-1.5 bg-[#181a24] text-[#D4AF37] border border-[#D4AF37]/30 rounded-lg text-xs font-semibold hover:bg-[#D4AF37]/10"
                >
                  + New Application
                </button>
              </div>

              {installments.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-400 bg-[#12141c] rounded-xl border border-[#20232e]">
                  No active installment applications found. Use the calculator tab to apply.
                </div>
              ) : (
                installments.map((app) => {
                  const paidCount = app.paymentSchedule?.filter(s => s.status === 'paid').length || 0;
                  const totalCount = app.paymentSchedule?.length || app.durationMonths;
                  const totalPaidAmount = app.depositAmount + (paidCount * app.monthlyPayment);
                  const remainingOutstanding = Math.max(0, app.totalAmountPayable - totalPaidAmount);

                  return (
                    <div key={app.id} className="bg-[#12141c] border border-[#232735] rounded-xl p-5 space-y-5">
                      
                      {/* Plan Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1c1f2b]">
                        <div className="flex items-center gap-3">
                          <img
                            src={app.vehicleSnapshot.image}
                            alt={app.vehicleSnapshot.model}
                            className="w-14 h-10 object-cover rounded-lg border border-[#2a2e3d]"
                          />
                          <div>
                            <span className="text-[11px] text-[#D4AF37] font-semibold">Ref: {app.reference}</span>
                            <h5 className="text-sm font-bold text-white font-heading">
                              {app.vehicleSnapshot.year} {app.vehicleSnapshot.make} {app.vehicleSnapshot.model}
                            </h5>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 text-xs font-semibold uppercase rounded border ${
                            app.status === 'approved'
                              ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                              : app.status === 'completed'
                              ? 'bg-blue-950/60 text-blue-400 border-blue-800'
                              : 'bg-amber-950/60 text-amber-400 border-amber-800'
                          }`}>
                            {app.status.replace('_', ' ')}
                          </span>

                          <div className="text-right">
                            <span className="text-[10px] text-neutral-400 block uppercase">Monthly Due</span>
                            <span className="text-sm font-bold text-white tabular-nums">{formatNaira(app.monthlyPayment)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Financial Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-neutral-400">
                            Total Paid: <strong className="text-emerald-400 tabular-nums">{formatNaira(totalPaidAmount)}</strong>
                          </span>
                          <span className="text-neutral-400">
                            Outstanding Balance: <strong className="text-neutral-200 tabular-nums">{formatNaira(remainingOutstanding)}</strong>
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-[#1b1e28] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E5C158] transition-all duration-500"
                            style={{ width: `${Math.min(100, (totalPaidAmount / app.totalAmountPayable) * 100)}%` }}
                          />
                        </div>
                        <div className="text-[11px] text-neutral-500 text-right">
                          {paidCount} of {totalCount} monthly payments satisfied ({Math.round((totalPaidAmount / app.totalAmountPayable) * 100)}%)
                        </div>
                      </div>

                      {/* Payment Schedule Table */}
                      {app.paymentSchedule && app.paymentSchedule.length > 0 && (
                        <div className="space-y-2 pt-2">
                          <h6 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                            Scheduled Monthly Instalments
                          </h6>

                          <div className="border border-[#1e212c] rounded-lg overflow-hidden">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-[#161822] text-neutral-400 border-b border-[#1e212c]">
                                <tr>
                                  <th className="py-2.5 px-3">Month</th>
                                  <th className="py-2.5 px-3">Due Date</th>
                                  <th className="py-2.5 px-3">Amount Due</th>
                                  <th className="py-2.5 px-3">Status</th>
                                  <th className="py-2.5 px-3 text-right">Action / Receipt</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-[#181a24] text-neutral-300">
                                {app.paymentSchedule.map((item) => (
                                  <tr key={item.id} className="hover:bg-[#14161f]">
                                    <td className="py-2.5 px-3 font-semibold text-white">Month {item.monthNumber}</td>
                                    <td className="py-2.5 px-3 tabular-nums">{formatDate(item.dueDate)}</td>
                                    <td className="py-2.5 px-3 font-medium text-white tabular-nums">{formatNaira(item.amountDue)}</td>
                                    <td className="py-2.5 px-3">
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                                        item.status === 'paid'
                                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                          : 'bg-neutral-800 text-neutral-400'
                                      }`}>
                                        {item.status}
                                      </span>
                                    </td>
                                    <td className="py-2.5 px-3 text-right">
                                      {item.status === 'paid' ? (
                                        <button
                                          onClick={() => alert(`Receipt #${item.receiptNumber || 'REC-TAL'}: Verified payment of ${formatNaira(item.amountDue)} received on ${formatDate(item.paidAt || '')}.`)}
                                          className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 justify-end ml-auto"
                                        >
                                          <Download className="w-3.5 h-3.5" />
                                          <span>Receipt</span>
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => recordInstallmentPayment(app.id, item.id)}
                                          className="px-3 py-1 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-black font-bold text-[11px] rounded hover:opacity-90"
                                        >
                                          Pay Month {item.monthNumber}
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
