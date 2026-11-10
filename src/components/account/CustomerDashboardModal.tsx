import React, { useState } from 'react';
import {
  X,
  User,
  Heart,
  ShoppingBag,
  Calendar,
  CreditCard,
  Bell,
  LogOut,
  Download,
  Eye,
  Shield,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useDealership } from '../../context/DealershipContext';
import { formatNaira, formatDate } from '../../utils/formatters';
import { Vehicle } from '../../types';

interface CustomerDashboardModalProps {
  onClose: () => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onOpenAdmin: () => void;
}

export const CustomerDashboardModal: React.FC<CustomerDashboardModalProps> = ({
  onClose,
  onSelectVehicle,
  onOpenAdmin
}) => {
  const {
    currentUser,
    savedVehicles,
    orders,
    installments,
    inspections,
    notifications,
    logout,
    isAdmin
  } = useDealership();

  const [activeTab, setActiveTab] = useState<'profile' | 'saved' | 'orders' | 'installments' | 'inspections' | 'notifications'>('profile');

  // Only show records belonging to the signed-in account.
  const userOrders = orders.filter((order) => order.customer?.email === currentUser?.email);
  const userInstallments = installments.filter((item) => item.customer?.email === currentUser?.email);
  const userInspections = inspections.filter((item) => item.customer?.email === currentUser?.email);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl my-auto bg-[#0d0f16] border border-[#232735] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#12141d] border-b border-[#202330] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1b1e28] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] font-bold text-sm">
              {currentUser ? currentUser.fullName.charAt(0) : 'C'}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
                {currentUser ? currentUser.fullName : 'VIP Client Portal'}
              </h3>
              <p className="text-[11px] text-[#D4AF37]">
                {currentUser?.role === 'admin' ? 'Administrator Account' : 'Timber Autos Account'} · {currentUser?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAdmin();
                }}
                className="px-3 py-1 bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#E5C158] hover:text-black border border-[#D4AF37]/40 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Console</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white bg-[#1a1c26] rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="px-6 py-2.5 bg-[#151722] border-b border-[#212430] flex items-center gap-2 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'profile' ? 'bg-[#D4AF37] text-black font-bold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'saved' ? 'bg-[#D4AF37] text-black font-bold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Saved Cars ({savedVehicles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'orders' ? 'bg-[#D4AF37] text-black font-bold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Orders ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('installments')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'installments' ? 'bg-[#D4AF37] text-black font-bold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Installments ({userInstallments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inspections')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'inspections' ? 'bg-[#D4AF37] text-black font-bold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Inspections ({userInspections.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'notifications' ? 'bg-[#D4AF37] text-black font-bold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Alerts ({notifications.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#13151f] rounded-xl border border-[#222532] space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block">
                    Account Identity
                  </span>
                  <div className="space-y-1 text-xs">
                    <span className="text-neutral-400 block">Full Name:</span>
                    <span className="text-white font-semibold text-sm">{currentUser?.fullName}</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <span className="text-neutral-400 block">Email Address:</span>
                    <span className="text-white font-semibold">{currentUser?.email}</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <span className="text-neutral-400 block">Telephone Number:</span>
                    <span className="text-white font-semibold">{currentUser?.phone}</span>
                  </div>
                </div>

                <div className="p-4 bg-[#13151f] rounded-xl border border-[#222532] space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">Account Security</span>
                    <p className="text-xs text-neutral-400 leading-relaxed">You are signed in to your Timber Autos account. Your account access is managed securely.</p>
                    <p className="text-xs text-neutral-300 mt-3">Account type: <span className="text-[#D4AF37] font-semibold">{isAdmin ? 'Administrator' : 'Customer'}</span></p>
                  </div>
                  <button onClick={() => { void logout(); onClose(); }} className="self-start px-3 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-medium rounded-lg border border-red-800/40 flex items-center gap-1.5">
                    <LogOut className="w-3.5 h-3.5" />Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SAVED CARS TAB */}
          {activeTab === 'saved' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                Your Saved Automobiles
              </h4>
              {savedVehicles.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-400 bg-[#12141c] rounded-xl border border-[#20232e]">
                  No saved vehicles in your wishlist yet. Click the heart icon on any vehicle card to save it.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedVehicles.map((v) => (
                    <div
                      key={v.id}
                      className="bg-[#12141c] border border-[#20232e] p-3 rounded-xl flex items-center gap-3"
                    >
                      <img
                        src={v.images[0] || '/src/assets/images/hero_luxury_showroom_1794141434269.jpg'}
                        alt={v.model}
                        className="w-20 h-14 object-cover rounded-lg"
                      />
                      <div className="flex-1 truncate">
                        <span className="text-[11px] text-[#D4AF37] block font-semibold">{v.year} {v.make}</span>
                        <h5 className="text-xs font-bold text-white truncate">{v.model}</h5>
                        <span className="text-xs font-extrabold text-gold-gradient tabular-nums">{formatNaira(v.price)}</span>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectVehicle(v);
                        }}
                        className="px-3 py-1.5 bg-[#1b1e2a] hover:bg-[#D4AF37] text-neutral-200 hover:text-black rounded-lg text-xs font-semibold transition-colors"
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                Purchase Orders &amp; Delivery Tracking
              </h4>
              {userOrders.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-400 bg-[#12141c] rounded-xl border border-[#20232e]">
                  No purchase orders found.
                </div>
              ) : (
                userOrders.map((ord) => (
                  <div key={ord.id} className="bg-[#12141c] border border-[#20232e] p-4 rounded-xl space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#1b1d28]">
                      <div>
                        <span className="text-[11px] font-bold text-[#D4AF37]">{ord.reference}</span>
                        <h5 className="text-sm font-bold text-white">
                          {ord.vehicleSnapshot.year} {ord.vehicleSnapshot.make} {ord.vehicleSnapshot.model}
                        </h5>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 text-[11px] font-semibold uppercase rounded bg-[#181a24] text-neutral-300 border border-[#2a2d3c]">
                          {ord.orderStatus.replace('_', ' ')}
                        </span>
                        <span className="text-sm font-extrabold text-gold-gradient tabular-nums">
                          {formatNaira(ord.totalAmount)}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-neutral-400">
                      <div>
                        <span className="block text-[10px] uppercase text-neutral-500">Order Placed:</span>
                        <span>{formatDate(ord.createdAt)}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase text-neutral-500">Fulfillment Method:</span>
                        <span className="capitalize">{ord.deliveryMethod.replace('_', ' ')}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase text-neutral-500">Payment Status:</span>
                        <span className="text-emerald-400 font-semibold uppercase">{ord.paymentStatus}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* INSTALLMENTS TAB */}
          {activeTab === 'installments' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                Active Installment Plans
              </h4>
              {userInstallments.map((inst) => (
                <div key={inst.id} className="bg-[#12141c] border border-[#20232e] p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[11px] font-semibold text-[#D4AF37]">Ref: {inst.reference}</span>
                      <h5 className="text-sm font-bold text-white">
                        {inst.vehicleSnapshot.year} {inst.vehicleSnapshot.make} {inst.vehicleSnapshot.model}
                      </h5>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-semibold uppercase rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {inst.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-400 pt-2 border-t border-[#1a1c26]">
                    <span>Tenor: {inst.durationMonths} Months</span>
                    <span>Deposit: {formatNaira(inst.depositAmount)}</span>
                    <span className="text-white font-bold">Monthly: {formatNaira(inst.monthlyPayment)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* INSPECTIONS TAB */}
          {activeTab === 'inspections' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                Inspection Appointments
              </h4>
              {userInspections.map((insp) => (
                <div key={insp.id} className="bg-[#12141c] border border-[#20232e] p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-[#D4AF37]">Ref: {insp.reference}</span>
                    <h5 className="text-sm font-bold text-white">
                      {insp.vehicleSnapshot.year} {insp.vehicleSnapshot.make} {insp.vehicleSnapshot.model}
                    </h5>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {insp.preferredDate} at {insp.preferredTime} · {insp.location}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold uppercase rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {insp.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                Notifications &amp; Advisories
              </h4>
              {notifications.map((notif) => (
                <div key={notif.id} className="p-3 bg-[#13151f] rounded-lg border border-[#20232e] text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white">{notif.title}</span>
                    <span className="text-[10px] text-neutral-500">{formatDate(notif.createdAt)}</span>
                  </div>
                  <p className="text-neutral-400">{notif.message}</p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
