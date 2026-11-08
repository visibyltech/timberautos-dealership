import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Building,
  Truck,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Upload,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  Download
} from 'lucide-react';
import { Vehicle, Order, OrderDeliveryMethod, OrderPaymentMethod } from '../../types';
import { formatNaira } from '../../utils/formatters';
import { useDealership } from '../../context/DealershipContext';

interface BuyNowModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onSuccess: (order: Order) => void;
}

export const BuyNowModal: React.FC<BuyNowModalProps> = ({
  vehicle,
  onClose,
  onSuccess
}) => {
  const { placeOrder, settings } = useDealership();

  // Form states
  const [step, setStep] = useState<'details' | 'fulfillment' | 'payment' | 'confirmation'>('details');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+234');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lagos');
  const [state, setState] = useState('Lagos State');
  const [deliveryMethod, setDeliveryMethod] = useState<OrderDeliveryMethod>('showroom_collection');
  const [paymentMethod, setPaymentMethod] = useState<OrderPaymentMethod>('bank_transfer');
  const [paymentProofUrl, setPaymentProofUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!vehicle) return null;

  const deliveryFee = deliveryMethod === 'nationwide_delivery' ? 500000 : 0;
  const documentationFee = 250000;
  const grandTotal = vehicle.price + deliveryFee + documentationFee;

  const handleNextToFulfillment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      setErrorMessage('Please fill in your name, email and telephone number.');
      return;
    }
    setErrorMessage('');
    setStep('fulfillment');
  };

  const handleNextToPayment = () => {
    if (deliveryMethod === 'nationwide_delivery' && (!address || !city)) {
      setErrorMessage('Please provide your full delivery address and city.');
      return;
    }
    setErrorMessage('');
    setStep('payment');
  };

  const handleProcessOrder = async () => {
    setIsProcessing(true);
    setErrorMessage('');

    try {
      if (paymentMethod === 'paystack') {
        // Trigger server-side Paystack verification simulation
        const response = await fetch('/api/paystack/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reference: `TAL-PSTK-${Date.now()}`,
            expectedAmount: grandTotal,
            vehicleId: vehicle.id
          })
        });

        const verifyResult = await response.json();
        if (!verifyResult.success) {
          throw new Error('Payment gateway verification declined.');
        }
      }

      // Create confirmed order
      const newOrder = placeOrder({
        vehicleId: vehicle.id,
        vehicleSnapshot: {
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          price: vehicle.price,
          image: vehicle.images[0] || '/src/assets/images/hero_luxury_showroom_1794141434269.jpg',
          vin: vehicle.vin
        },
        customer: {
          fullName,
          email,
          phone,
          address,
          city,
          state
        },
        deliveryMethod,
        deliveryAddress: deliveryMethod === 'nationwide_delivery' ? `${address}, ${city}, ${state}` : undefined,
        paymentMethod,
        totalAmount: grandTotal,
        paymentProofUrl: paymentProofUrl || undefined
      });

      setCompletedOrder(newOrder);
      setStep('confirmation');
      onSuccess(newOrder);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during order processing.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl my-auto bg-[#0e1017] border border-[#232734] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#131620] border-b border-[#212532] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Vehicle Purchase Order &amp; Checkout
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white bg-[#1a1c26] rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Vehicle Mini Summary Ribbon */}
        <div className="px-6 py-3 bg-[#161823] border-b border-[#212430] flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <img
              src={vehicle.images[0] || '/src/assets/images/hero_luxury_showroom_1794141434269.jpg'}
              alt={vehicle.model}
              className="w-12 h-9 object-cover rounded border border-[#2b2f3d]"
            />
            <div>
              <span className="text-white font-bold block">{vehicle.year} {vehicle.make} {vehicle.model}</span>
              <span className="text-neutral-400 text-[11px]">VIN: {vehicle.vin}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-neutral-400 uppercase block">Vehicle Total</span>
            <span className="text-sm font-extrabold text-gold-gradient font-heading tabular-nums">
              {formatNaira(vehicle.price)}
            </span>
          </div>
        </div>

        {/* Stepper Progress */}
        {step !== 'confirmation' && (
          <div className="px-6 py-2.5 bg-[#0f1118] border-b border-[#1b1e28] flex items-center justify-between text-[11px] font-medium text-neutral-400">
            <span className={step === 'details' ? 'text-[#D4AF37] font-bold' : ''}>1. Customer Information</span>
            <span>&rarr;</span>
            <span className={step === 'fulfillment' ? 'text-[#D4AF37] font-bold' : ''}>2. Fulfillment</span>
            <span>&rarr;</span>
            <span className={step === 'payment' ? 'text-[#D4AF37] font-bold' : ''}>3. Payment Verification</span>
          </div>
        )}

        {/* Error message banner */}
        {errorMessage && (
          <div className="m-4 p-3 bg-red-950/60 border border-red-800/60 rounded-lg text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Step 1: Customer Details */}
        {step === 'details' && (
          <form onSubmit={handleNextToFulfillment} className="p-6 space-y-4">
            <h4 className="text-sm font-bold text-white font-heading">
              Buyer Personal &amp; Contact Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Babatunde Adeleke"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#161922] border border-[#272a37] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#161922] border border-[#272a37] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Telephone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+234 803 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#161922] border border-[#272a37] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">City &amp; State</label>
                <input
                  type="text"
                  placeholder="Lekki, Lagos State"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#161922] border border-[#272a37] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-black text-xs font-bold uppercase rounded-lg hover:scale-[1.02] transition-transform flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue to Fulfillment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Fulfillment Selection */}
        {step === 'fulfillment' && (
          <div className="p-6 space-y-5">
            <h4 className="text-sm font-bold text-white font-heading">
              Select Delivery or Collection Method
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Showroom Collection */}
              <div
                onClick={() => setDeliveryMethod('showroom_collection')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  deliveryMethod === 'showroom_collection'
                    ? 'bg-[#181b24] border-[#D4AF37] ring-1 ring-[#D4AF37]'
                    : 'bg-[#12141c] border-[#222530] hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Building className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold text-white">Showroom VIP Collection</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Pick up your vehicle at our Lekki Phase 1, Lagos or CBD Abuja showroom with official keys &amp; papers handover.
                </p>
                <div className="mt-3 text-[11px] font-semibold text-emerald-400">Free of Charge</div>
              </div>

              {/* Nationwide Enclosed Delivery */}
              <div
                onClick={() => setDeliveryMethod('nationwide_delivery')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  deliveryMethod === 'nationwide_delivery'
                    ? 'bg-[#181b24] border-[#D4AF37] ring-1 ring-[#D4AF37]'
                    : 'bg-[#12141c] border-[#222530] hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold text-white">Nationwide Enclosed Carrier</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Fully insured private flatbed or enclosed carrier transit directly to your designated residence or estate.
                </p>
                <div className="mt-3 text-[11px] font-semibold text-neutral-300">₦500,000 Flat Transport &amp; Insurance</div>
              </div>

            </div>

            {deliveryMethod === 'nationwide_delivery' && (
              <div className="space-y-3 pt-2">
                <label className="block text-xs text-neutral-300 font-medium">Delivery Destination Address *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Estate name, street number, landmark, city"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#161922] border border-[#272a37] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            )}

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep('details')}
                className="px-4 py-2 bg-[#171922] text-neutral-300 text-xs font-medium rounded-lg hover:text-white"
              >
                Back
              </button>
              <button
                onClick={handleNextToPayment}
                className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-black text-xs font-bold uppercase rounded-lg hover:scale-[1.02] transition-transform flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Method & Verification */}
        {step === 'payment' && (
          <div className="p-6 space-y-5">
            <h4 className="text-sm font-bold text-white font-heading">
              Select Payment Method
            </h4>

            {/* Price breakdown summary */}
            <div className="bg-[#12141c] p-4 rounded-xl border border-[#20232e] space-y-2 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Vehicle Asking Price:</span>
                <span className="text-neutral-200 tabular-nums">{formatNaira(vehicle.price)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Customs Documentation &amp; Transfer Pack:</span>
                <span className="text-neutral-200 tabular-nums">{formatNaira(documentationFee)}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between text-neutral-400">
                  <span>Enclosed Nationwide Carrier:</span>
                  <span className="text-neutral-200 tabular-nums">{formatNaira(deliveryFee)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#1e212b] flex justify-between font-bold text-sm">
                <span className="text-white">Total Amount Payable:</span>
                <span className="text-gold-gradient font-heading tabular-nums">{formatNaira(grandTotal)}</span>
              </div>
            </div>

            {/* Payment Method Switcher */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Option A: Bank Transfer */}
              <div
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'bg-[#181b24] border-[#D4AF37] ring-1 ring-[#D4AF37]'
                    : 'bg-[#12141c] border-[#222530] hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Building className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold text-white">Dealership Bank Wire (Recommended)</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Direct transfer to Timber Autos Limited official corporate Zenith Bank account.
                </p>
              </div>

              {/* Option B: Paystack Gateway */}
              <div
                onClick={() => setPaymentMethod('paystack')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'paystack'
                    ? 'bg-[#181b24] border-[#D4AF37] ring-1 ring-[#D4AF37]'
                    : 'bg-[#12141c] border-[#222530] hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-bold text-white">Paystack Gateway</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Instant card, USSD, or virtual account transfer subject to bank daily transaction limits.
                </p>
              </div>

            </div>

            {/* If Bank Transfer Selected, display official bank details */}
            {paymentMethod === 'bank_transfer' && (
              <div className="bg-[#10121a] p-4 rounded-xl border border-[#232735] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E5C158] uppercase tracking-wider">
                    Official Corporate Bank Account
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                    Verified
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Bank:</span>
                    <span className="text-white font-semibold">{settings.bankDetails.bankName}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Account Name:</span>
                    <span className="text-white font-semibold">{settings.bankDetails.accountName}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Account Number:</span>
                    <span className="text-[#D4AF37] font-bold text-sm tracking-wider font-mono">
                      {settings.bankDetails.accountNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Sort Code:</span>
                    <span className="text-neutral-300 font-mono">{settings.bankDetails.sortCode || '057150013'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1d202a]">
                  <label className="block text-[11px] text-neutral-300 mb-1">
                    Upload Transfer Receipt / Reference Evidence (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter wire reference number or image receipt link"
                    value={paymentProofUrl}
                    onChange={(e) => setPaymentProofUrl(e.target.value)}
                    className="w-full bg-[#161922] border border-[#272a37] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            )}

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep('fulfillment')}
                className="px-4 py-2 bg-[#171922] text-neutral-300 text-xs font-medium rounded-lg hover:text-white"
              >
                Back
              </button>
              <button
                onClick={handleProcessOrder}
                disabled={isProcessing}
                className="px-7 py-3 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:scale-[1.02] disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer"
              >
                {isProcessing ? 'Verifying Transaction...' : 'Confirm & Authorize Order'}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation & Receipt */}
        {step === 'confirmation' && completedOrder && (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                Order Placed Successfully
              </span>
              <h3 className="text-2xl font-extrabold text-white font-heading">
                Reference: {completedOrder.reference}
              </h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Thank you for choosing Timber Autos Limited. Our Senior Automotive Logistics Officer has received your purchase order and is preparing the paperwork.
              </p>
            </div>

            <div className="bg-[#12141c] p-5 rounded-xl border border-[#20232e] text-left text-xs space-y-3 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-neutral-400">Vehicle:</span>
                <span className="text-white font-bold">{completedOrder.vehicleSnapshot.year} {completedOrder.vehicleSnapshot.make} {completedOrder.vehicleSnapshot.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Total Billed:</span>
                <span className="text-gold-gradient font-bold tabular-nums">{formatNaira(completedOrder.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Fulfillment:</span>
                <span className="text-neutral-200 uppercase">{completedOrder.deliveryMethod.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Payment Status:</span>
                <span className="text-emerald-400 font-semibold uppercase">{completedOrder.paymentStatus}</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-black text-xs font-bold uppercase rounded-lg hover:opacity-90"
              >
                Close &amp; Return to Showroom
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
