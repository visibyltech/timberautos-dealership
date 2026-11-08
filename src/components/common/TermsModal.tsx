import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface TermsModalProps {
  type: 'terms' | 'privacy';
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ type, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl my-auto bg-[#0d0f16] border border-[#232735] rounded-2xl shadow-2xl p-6 overflow-hidden max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#202330] shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              {type === 'terms' ? 'Vehicle Sales & Installment Terms of Contract' : 'Client Privacy Policy & Data Governance'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-white bg-[#181a24] rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-4 text-xs text-neutral-300 leading-relaxed">
          {type === 'terms' ? (
            <>
              <h4 className="text-sm font-bold text-white">1. Scope of Vehicle Sales &amp; Representation</h4>
              <p>Timber Autos Limited guarantees that all vehicles presented across our showrooms possess verified Nigerian Customs duty documentation and authentic factory VIN numbers. Vehicles are subject to prior sale until a formal deposit or full transaction reference is recorded.</p>

              <h4 className="text-sm font-bold text-white">2. In-House Installment Facility (Up to 24 Months)</h4>
              <p>Installment plans are subject to credit vetting by our Underwriting Committee. An agreed minimum deposit (commencing at 30%) must be disbursed prior to vehicle allocation. Legal vehicle ownership and final original title papers are formally transferred upon complete liquidation of the agreed amortization schedule.</p>

              <h4 className="text-sm font-bold text-white">3. Third-Party Financing (Autochek)</h4>
              <p>Financing through Autochek Africa is governed by the independent credit covenants and interest rate frameworks of Autochek and its designated commercial bank partners.</p>

              <h4 className="text-sm font-bold text-white">4. Inspection &amp; Pre-Delivery Protocol</h4>
              <p>Buyers are encouraged to utilize our VIP inspection appointment bays or engage independent diagnostic mechanics prior to final disbursement.</p>
            </>
          ) : (
            <>
              <h4 className="text-sm font-bold text-white">1. Information We Collect</h4>
              <p>Timber Autos Limited collects identity credentials, telephone numbers, residential locations, and financial capacity declarations solely for the facilitation of vehicle purchase agreements, customs documentation, and installment risk assessments.</p>

              <h4 className="text-sm font-bold text-white">2. Bank Verification &amp; Document Safeguards</h4>
              <p>BVN and bank statement submissions are processed via bank-grade cryptographic protocols and are never disseminated to unauthorized third-party commercial marketing networks.</p>

              <h4 className="text-sm font-bold text-white">3. Regulatory Compliance</h4>
              <p>Timber Autos Limited complies with the Nigeria Data Protection Act (NDPA) and anti-money laundering (AML/CFT) regulatory disclosure guidelines.</p>
            </>
          )}
        </div>

        <div className="pt-3 border-t border-[#1f222e] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-black font-bold text-xs uppercase rounded-lg"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
