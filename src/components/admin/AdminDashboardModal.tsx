import React, { useState } from 'react';
import {
  X,
  Menu,
  LayoutDashboard,
  Car,
  PlusCircle,
  FolderTree,
  ShoppingBag,
  CreditCard,
  Receipt,
  CalendarCheck,
  Users,
  Building,
  Bell,
  Globe,
  Settings,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Upload,
  Plus,
  Shield,
  Download
} from 'lucide-react';
import { useDealership } from '../../context/DealershipContext';
import { formatNaira, formatDate, formatKm, formatCondition } from '../../utils/formatters';
import { Vehicle, VehicleAvailability, OrderStatus, InstallmentStatus, InspectionStatus, VehicleCondition } from '../../types';

interface AdminDashboardModalProps {
  onClose: () => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ onClose, onSelectVehicle }) => {
  const {
    vehicles,
    orders,
    installments,
    inspections,
    settings,
    notifications,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    updateOrderStatus,
    updateInstallmentStatus,
    updateInspectionStatus,
    recordInstallmentPayment,
    updateSettings,
    markNotificationRead
  } = useDealership();

  const [activeSection, setActiveSection] = useState<string>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // New vehicle form states
  const [newMake, setNewMake] = useState('Mercedes-Benz');
  const [newModel, setNewModel] = useState('');
  const [newTrim, setNewTrim] = useState('');
  const [newYear, setNewYear] = useState(2024);
  const [newPrice, setNewPrice] = useState(150000000);
  const [newMileage, setNewMileage] = useState(5000);
  const [newEngine, setNewEngine] = useState('4.0L V8 Biturbo');
  const [newTransmission, setNewTransmission] = useState<'Automatic' | 'Manual' | 'Dual-Clutch'>('Automatic');
  const [newFuel, setNewFuel] = useState<'Petrol' | 'Diesel' | 'Hybrid' | 'Electric'>('Petrol');
  const [newBody, setNewBody] = useState<'Luxury SUV' | 'Sedan' | 'Coupe' | 'Crossover'>('Luxury SUV');
  const [newCondition, setNewCondition] = useState<VehicleCondition>('brand-new');
  const [newExterior, setNewExterior] = useState('Obsidian Black');
  const [newInterior, setNewInterior] = useState('Black / Tan Leather');
  const [newVin, setNewVin] = useState('TAL-VIN-' + Math.floor(100000 + Math.random() * 900000));
  const [newDescription, setNewDescription] = useState('');
  const [vehicleImages, setVehicleImages] = useState<File[]>([]);
  const [vehicleVideo, setVehicleVideo] = useState<File | null>(null);
  const [mediaUploading, setMediaUploading] = useState(false);
  const [mediaError, setMediaError] = useState('');
  const [newFeatured, setNewFeatured] = useState(true);

  // Settings form states
  const [setBankName, setSetBankName] = useState(settings.bankDetails.bankName);
  const [setAccountName, setSetAccountName] = useState(settings.bankDetails.accountName);
  const [setAccountNumber, setSetAccountNumber] = useState(settings.bankDetails.accountNumber);
  const [setPaystackKey, setSetPaystackKey] = useState(settings.paystackPublicKey);
  const [setAdminEmail, setSetAdminEmail] = useState(settings.notificationEmail);
  const [setPhone, setSetPhone] = useState(settings.phone);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Metrics
  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter((v) => v.availability === 'available').length;
  const reservedVehicles = vehicles.filter((v) => v.availability === 'reserved').length;
  const soldVehicles = vehicles.filter((v) => v.availability === 'sold').length;

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'pending').length;
  const confirmedOrders = orders.filter((o) => o.orderStatus === 'payment_verified' || o.orderStatus === 'completed').length;
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'verified')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const pendingInstallments = installments.filter((i) => i.status === 'pending').length;
  const approvedInstallments = installments.filter((i) => i.status === 'approved').length;
  const upcomingInspections = inspections.filter((i) => i.status === 'pending' || i.status === 'confirmed').length;

  const navMenuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'inventory', label: 'Vehicle Inventory', icon: Car, badge: totalVehicles },
    { id: 'add_vehicle', label: 'Add New Vehicle', icon: PlusCircle },
    { id: 'categories', label: 'Vehicle Categories', icon: FolderTree },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: pendingOrders },
    { id: 'installments', label: 'Installment Applications', icon: CreditCard, badge: pendingInstallments },
    { id: 'payments', label: 'Installment Payments', icon: Receipt },
    { id: 'inspections', label: 'Inspection Bookings', icon: CalendarCheck, badge: upcomingInspections },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: notifications.filter(n => !n.read).length },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleCreateVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    setMediaError('');
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) { setMediaError('Cloudinary is not connected yet. Add the Cloudinary cloud name and unsigned upload preset in Vercel before publishing vehicles.'); return; }
    if (vehicleImages.length === 0) { setMediaError('Please select at least one vehicle photo from your gallery.'); return; }
    const uploadFile = async (file: File, resourceType: 'image' | 'video') => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', 'timberautos/vehicles');
      const response = await fetch('https://api.cloudinary.com/v1_1/' + cloudName + '/' + resourceType + '/upload', { method: 'POST', body: formData });
      const result = await response.json();
      if (!response.ok || !result.secure_url) throw new Error(result.error?.message || 'A media file could not be uploaded.');
      return result.secure_url as string;
    };
    setMediaUploading(true);
    try {
      const uploadedImages = await Promise.all(vehicleImages.map((file) => uploadFile(file, 'image')));
      const uploadedVideoUrl = vehicleVideo ? await uploadFile(vehicleVideo, 'video') : undefined;
      addVehicle({
        make: newMake, model: newModel.trim(), trim: newTrim || undefined, year: Number(newYear), price: Number(newPrice), mileage: Number(newMileage),
        engineCapacity: newEngine, transmission: newTransmission, fuelType: newFuel, bodyType: newBody, condition: newCondition,
        exteriorColor: newExterior, interiorColor: newInterior, vin: newVin,
        description: newDescription || (newYear + ' ' + newMake + ' ' + newModel + ' presented by Timber Autos Limited.'),
        keyFeatures: [], availability: 'available', images: uploadedImages, videoUrl: uploadedVideoUrl, featured: newFeatured, source: 'timber_autos'
      });
      setVehicleImages([]); setVehicleVideo(null);
      alert('Vehicle and selected media have been uploaded and added to the showroom.');
      setActiveSection('inventory');
    } catch (error) { setMediaError(error instanceof Error ? error.message : 'Upload failed. Please try again.'); }
    finally { setMediaUploading(false); }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...settings,
      phone: setPhone,
      notificationEmail: setAdminEmail,
      paystackPublicKey: setPaystackKey,
      bankDetails: {
        ...settings.bankDetails,
        bankName: setBankName,
        accountName: setAccountName,
        accountNumber: setAccountNumber
      }
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-hidden">
      <div 
        className="relative w-full max-w-7xl h-[94vh] bg-[#0c0e14] border border-[#232734] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Bar */}
        <div className="px-3 sm:px-6 py-3 bg-[#12141c] border-b border-[#1f222d] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 rounded-lg bg-[#1a1c26] text-white" aria-label="Open admin menu"><Menu className="w-5 h-5" /></button>
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center text-black font-extrabold text-sm shadow-md">
              TAL
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-extrabold text-white tracking-wide sm:tracking-wider uppercase font-heading flex items-center gap-2">
                TIMBER AUTOS LIMITED <span className="hidden sm:inline text-[#D4AF37] text-xs font-normal">| Executive Management Portal</span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white bg-[#181a24] rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Layout: Sidebar + Main Content Area */}
        {mobileMenuOpen && (
          <div className="absolute inset-0 top-[58px] z-40 md:hidden">
            <button aria-label="Close menu" onClick={() => setMobileMenuOpen(false)} className="absolute inset-0 bg-black/65" />
            <aside className="relative h-full w-[min(86vw,320px)] bg-[#0e1017] border-r border-[#2a2d38] p-3 overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-[#242733]"><span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Dealership Menu</span><button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded bg-[#1a1c26] text-neutral-300"><X className="w-4 h-4" /></button></div>
              <div className="space-y-1">
                {navMenuItems.map((item) => { const Icon = item.icon; const active = activeSection === item.id; return <button key={item.id} onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }} className={'w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm ' + (active ? 'bg-[#D4AF37] text-black font-bold' : 'text-neutral-200 hover:bg-[#191c26]')}><span className="flex items-center gap-3"><Icon className="w-4 h-4" />{item.label}</span>{item.badge !== undefined && item.badge > 0 && <span className="text-xs font-bold text-[#D4AF37]">{item.badge}</span>}</button>; })}
              </div>
            </aside>
          </div>
        )}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Sidebar */}
          <aside className="hidden md:flex md:w-64 max-h-none bg-[#0e1017] border-b md:border-b-0 md:border-r border-[#1e212b] p-2 sm:p-3 flex flex-col justify-between shrink-0 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-1">
              <span className="col-span-2 md:col-span-1 text-[10px] uppercase font-bold tracking-widest text-neutral-500 px-2 md:px-3 py-1 block">
                Dealership Operations
              </span>

              {navMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center justify-between px-2 sm:px-3 py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#D4AF37] text-black font-bold shadow-md'
                        : 'text-neutral-300 hover:bg-[#161822] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-black text-[#D4AF37]' : 'bg-[#1e212c] text-[#D4AF37]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom session indicator */}
            <div className="hidden md:block pt-3 border-t border-[#1b1d28] px-2 text-[11px] text-neutral-400">
              <span className="text-white font-semibold block">MD Console Active</span>
              <span className="text-neutral-500">Security: Encrypted Session</span>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 overflow-y-auto p-3 sm:p-6 bg-[#0c0e14]">
            
            {/* 1. OVERVIEW */}
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    Dealership Executive Overview
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Real-time operational telemetry across showroom stock, customer orders, installment financing, and VIP inspections.
                  </p>
                </div>

                {/* Top Metrics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#12141c] border border-[#20232e] p-4 rounded-xl space-y-1">
                    <span className="text-[11px] text-neutral-400 uppercase font-semibold">Total Inventory</span>
                    <div className="text-2xl font-extrabold text-white font-heading">{totalVehicles}</div>
                    <span className="text-[11px] text-emerald-400">{availableVehicles} Available in Showroom</span>
                  </div>

                  <div className="bg-[#12141c] border border-[#20232e] p-4 rounded-xl space-y-1">
                    <span className="text-[11px] text-neutral-400 uppercase font-semibold">Total Orders</span>
                    <div className="text-2xl font-extrabold text-white font-heading">{totalOrders}</div>
                    <span className="text-[11px] text-[#D4AF37]">{pendingOrders} Pending Verification</span>
                  </div>

                  <div className="bg-[#12141c] border border-[#20232e] p-4 rounded-xl space-y-1">
                    <span className="text-[11px] text-neutral-400 uppercase font-semibold">Verified Revenue</span>
                    <div className="text-xl sm:text-2xl font-extrabold text-gold-gradient font-heading tabular-nums">
                      {formatNaira(totalRevenue)}
                    </div>
                    <span className="text-[11px] text-neutral-400">{confirmedOrders} Complete purchases</span>
                  </div>

                  <div className="bg-[#12141c] border border-[#20232e] p-4 rounded-xl space-y-1">
                    <span className="text-[11px] text-neutral-400 uppercase font-semibold">Installment Applications</span>
                    <div className="text-2xl font-extrabold text-white font-heading">{installments.length}</div>
                    <span className="text-[11px] text-emerald-400">{approvedInstallments} Active Amortizations</span>
                  </div>
                </div>

                {/* Second Row: Recent Orders & Recent Inspection Requests */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Recent Orders List */}
                  <div className="bg-[#12141c] border border-[#20232e] rounded-xl p-5 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-[#1b1e28]">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                        Recent Online Purchases
                      </h4>
                      <button onClick={() => setActiveSection('orders')} className="text-xs text-[#D4AF37] hover:underline">
                        View All
                      </button>
                    </div>

                    {orders.slice(0, 3).map((ord) => (
                      <div key={ord.id} className="p-3 bg-[#151722] rounded-lg border border-[#20232e] flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-white block">{ord.vehicleSnapshot.year} {ord.vehicleSnapshot.make} {ord.vehicleSnapshot.model}</span>
                          <span className="text-neutral-400">{ord.customer.fullName} · {ord.reference}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-gold-gradient block tabular-nums">{formatNaira(ord.totalAmount)}</span>
                          <span className="text-[10px] text-emerald-400 uppercase">{ord.paymentStatus}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Upcoming Inspections List */}
                  <div className="bg-[#12141c] border border-[#20232e] rounded-xl p-5 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-[#1b1e28]">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                        Showroom Inspection Appointments
                      </h4>
                      <button onClick={() => setActiveSection('inspections')} className="text-xs text-[#D4AF37] hover:underline">
                        View All
                      </button>
                    </div>

                    {inspections.slice(0, 3).map((insp) => (
                      <div key={insp.id} className="p-3 bg-[#151722] rounded-lg border border-[#20232e] flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-white block">{insp.vehicleSnapshot.make} {insp.vehicleSnapshot.model}</span>
                          <span className="text-neutral-400">{insp.customer.fullName} · {insp.preferredDate} ({insp.preferredTime})</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {insp.status}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            )}

            {/* 2. VEHICLE INVENTORY TABLE */}
            {activeSection === 'inventory' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white font-heading">Showroom Vehicle Inventory</h3>
                    <p className="text-xs text-neutral-400">Manage pricing, specifications, availability statuses, and featured rankings.</p>
                  </div>
                  <button
                    onClick={() => setActiveSection('add_vehicle')}
                    className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-black text-xs font-bold uppercase rounded-lg flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Vehicle</span>
                  </button>
                </div>

                <div className="border border-[#20232e] rounded-xl overflow-hidden bg-[#12141c]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#171924] text-neutral-400 border-b border-[#20232e]">
                      <tr>
                        <th className="py-3 px-4">Vehicle</th>
                        <th className="py-3 px-3">Price</th>
                        <th className="py-3 px-3">Mileage / Engine</th>
                        <th className="py-3 px-3">Condition</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#181a24] text-neutral-300">
                      {vehicles.map((v) => (
                        <tr key={v.id} className="hover:bg-[#151722]">
                          <td className="py-3 px-4 flex items-center gap-3">
                            <img
                              src={v.images[0] || '/src/assets/images/hero_luxury_showroom_1794141434269.jpg'}
                              alt={v.model}
                              className="w-12 h-9 object-cover rounded border border-[#232734]"
                            />
                            <div>
                              <span className="font-bold text-white block">{v.year} {v.make} {v.model}</span>
                              <span className="text-[10px] text-neutral-500">VIN: {v.vin}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 font-bold text-gold-gradient tabular-nums">
                            {formatNaira(v.price)}
                          </td>
                          <td className="py-3 px-3">
                            <span className="block text-white">{formatKm(v.mileage)}</span>
                            <span className="text-[10px] text-neutral-500">{v.engineCapacity}</span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-neutral-300 capitalize">{formatCondition(v.condition)}</span>
                          </td>
                          <td className="py-3 px-3">
                            <select
                              value={v.availability}
                              onChange={(e) => updateVehicle(v.id, { availability: e.target.value as VehicleAvailability })}
                              className="bg-[#181a24] border border-[#2b2f3e] rounded px-2 py-1 text-xs text-white focus:outline-none"
                            >
                              <option value="available">Available</option>
                              <option value="reserved">Reserved</option>
                              <option value="sold">Sold</option>
                            </select>
                          </td>
                          <td className="py-3 px-3 text-right space-x-2">
                            <button
                              onClick={() => {
                                onClose();
                                onSelectVehicle(v);
                              }}
                              className="p-1.5 text-neutral-400 hover:text-white bg-[#1a1d28] rounded"
                              title="View details"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to remove ${v.year} ${v.make} ${v.model}?`)) {
                                  deleteVehicle(v.id);
                                }
                              }}
                              className="p-1.5 text-neutral-400 hover:text-red-400 bg-[#1a1d28] rounded"
                              title="Delete vehicle"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. ADD NEW VEHICLE FORM */}
            {activeSection === 'add_vehicle' && (
              <div className="max-w-4xl space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">Add New Automobile to Inventory</h3>
                  <p className="text-xs text-neutral-400">Add vehicle details and select up to four photos and one walkthrough video from your device.</p>
                </div>

                <form onSubmit={handleCreateVehicle} className="bg-[#12141c] p-6 rounded-xl border border-[#20232e] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">Make *</label>
                      <input
                        type="text"
                        required
                        value={newMake}
                        onChange={(e) => setNewMake(e.target.value)}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">Model *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. AMG G 63 or Range Rover"
                        value={newModel}
                        onChange={(e) => setNewModel(e.target.value)}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">Trim / Edition</label>
                      <input
                        type="text"
                        placeholder="e.g. Night Package / V8 Biturbo"
                        value={newTrim}
                        onChange={(e) => setNewTrim(e.target.value)}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">Year *</label>
                      <input
                        type="number"
                        required
                        value={newYear}
                        onChange={(e) => setNewYear(Number(e.target.value))}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">Price (₦ NGN) *</label>
                      <input
                        type="number"
                        required
                        value={newPrice}
                        onChange={(e) => setNewPrice(Number(e.target.value))}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">Mileage (km) *</label>
                      <input
                        type="number"
                        required
                        value={newMileage}
                        onChange={(e) => setNewMileage(Number(e.target.value))}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">Body Style</label>
                      <select
                        value={newBody}
                        onChange={(e) => setNewBody(e.target.value as any)}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Luxury SUV">Luxury SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Crossover">Crossover</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">Condition</label>
                      <select
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value as any)}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="brand-new">Brand-New</option>
                        <option value="foreign-used">Foreign-Used (Tokunbo)</option>
                        <option value="nigerian-used">Nigerian-Used</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">Transmission</label>
                      <select
                        value={newTransmission}
                        onChange={(e) => setNewTransmission(e.target.value as any)}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        <option value="Dual-Clutch">Dual-Clutch</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">Fuel Type</label>
                      <select
                        value={newFuel}
                        onChange={(e) => setNewFuel(e.target.value as any)}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Electric">Electric</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">Engine Capacity / Specs</label>
                      <input
                        type="text"
                        value={newEngine}
                        onChange={(e) => setNewEngine(e.target.value)}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">Exterior Color</label>
                      <input
                        type="text"
                        value={newExterior}
                        onChange={(e) => setNewExterior(e.target.value)}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">Interior Color</label>
                      <input
                        type="text"
                        value={newInterior}
                        onChange={(e) => setNewInterior(e.target.value)}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">Vehicle Identification Number (VIN)</label>
                    <input
                      type="text"
                      required
                      value={newVin}
                      onChange={(e) => setNewVin(e.target.value)}
                      className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">Primary Photograph Path / URL</label>
                      <input
                        type="text"
                        required
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-300 font-medium mb-1">Walkthrough Video URL (MP4 / WebM)</label>
                      <input
                        type="text"
                        value={newVideoUrl}
                        onChange={(e) => setNewVideoUrl(e.target.value)}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">Vehicle Description</label>
                    <textarea
                      rows={3}
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Comprehensive overview of equipment, provenance, and luxury features..."
                      className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featToggle"
                      checked={newFeatured}
                      onChange={(e) => setNewFeatured(e.target.checked)}
                      className="rounded bg-[#181a24] border-[#282c3c] text-[#D4AF37]"
                    />
                    <label htmlFor="featToggle" className="text-xs text-neutral-300">
                      Feature on homepage showcase
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-black text-xs font-bold uppercase rounded-lg hover:scale-[1.01] transition-transform"
                    >
                      Publish Vehicle to Showroom
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 4. ORDERS MANAGEMENT */}
            {activeSection === 'orders' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">Vehicle Orders Management</h3>
                  <p className="text-xs text-neutral-400">Review buyer details, verify wire payments, and dispatch enclosed carrier delivery.</p>
                </div>

                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div key={ord.id} className="bg-[#12141c] border border-[#20232e] rounded-xl p-5 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1b1e28]">
                        <div>
                          <span className="text-xs font-bold text-[#D4AF37]">{ord.reference}</span>
                          <h4 className="text-base font-bold text-white">
                            {ord.vehicleSnapshot.year} {ord.vehicleSnapshot.make} {ord.vehicleSnapshot.model}
                          </h4>
                          <span className="text-xs text-neutral-400">VIN: {ord.vehicleSnapshot.vin}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-extrabold text-gold-gradient tabular-nums">
                            {formatNaira(ord.totalAmount)}
                          </span>
                          <span className="text-xs text-neutral-400 block capitalize">
                            Method: {ord.paymentMethod.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-300">
                        <div>
                          <span className="text-[10px] uppercase text-neutral-500 block">Buyer:</span>
                          <span className="font-semibold text-white">{ord.customer.fullName}</span>
                          <span className="block text-neutral-400">{ord.customer.phone}</span>
                          <span className="block text-neutral-400">{ord.customer.email}</span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase text-neutral-500 block">Delivery:</span>
                          <span className="capitalize">{ord.deliveryMethod.replace('_', ' ')}</span>
                          {ord.deliveryAddress && (
                            <span className="block text-neutral-400 text-[11px] mt-0.5">{ord.deliveryAddress}</span>
                          )}
                        </div>

                        <div>
                          <span className="text-[10px] uppercase text-neutral-500 block">Payment Proof / Reference:</span>
                          {ord.paymentProofUrl ? (
                            <a
                              href={ord.paymentProofUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#D4AF37] underline text-xs block"
                            >
                              View Payment Receipt
                            </a>
                          ) : (
                            <span className="text-neutral-500 italic">No proof link attached</span>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#1b1e28] flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-neutral-400">Status:</span>
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="bg-[#181a24] border border-[#2b2f3e] rounded px-2.5 py-1 text-xs text-white focus:outline-none"
                          >
                            <option value="pending">Pending Verification</option>
                            <option value="payment_verified">Payment Verified</option>
                            <option value="preparing_delivery">Preparing Delivery</option>
                            <option value="ready_for_collection">Ready for Showroom Collection</option>
                            <option value="completed">Completed / Handed Over</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>

                        {ord.paymentStatus !== 'verified' && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, 'payment_verified', 'Payment verified by MD')}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold uppercase transition-colors"
                          >
                            Verify Wire Payment
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. INSTALLMENT APPLICATIONS */}
            {activeSection === 'installments' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">Installment Applications</h3>
                  <p className="text-xs text-neutral-400">Review credit dossiers, income declarations, approve or reject applications, and structure amortizations.</p>
                </div>

                <div className="space-y-4">
                  {installments.map((app) => (
                    <div key={app.id} className="bg-[#12141c] border border-[#20232e] rounded-xl p-5 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1b1e28]">
                        <div>
                          <span className="text-xs font-bold text-[#D4AF37]">{app.reference}</span>
                          <h4 className="text-base font-bold text-white">
                            {app.vehicleSnapshot.year} {app.vehicleSnapshot.make} {app.vehicleSnapshot.model}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-extrabold text-gold-gradient tabular-nums">
                            {formatNaira(app.monthlyPayment)} / mo
                          </span>
                          <span className="text-xs text-neutral-400 block">
                            Tenor: {app.durationMonths} Months ({app.depositPercentage}% deposit)
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-300">
                        <div>
                          <span className="text-[10px] uppercase text-neutral-500 block">Applicant:</span>
                          <span className="font-semibold text-white">{app.customer.fullName}</span>
                          <span className="block text-neutral-400">{app.customer.phone}</span>
                          <span className="block text-neutral-400">{app.customer.email}</span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase text-neutral-500 block">Employment &amp; Income:</span>
                          <span className="capitalize">{app.customer.employmentType.replace('_', ' ')}</span>
                          <span className="block text-emerald-400 font-semibold tabular-nums">
                            Est. Monthly: {formatNaira(app.customer.monthlyIncome)}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase text-neutral-500 block">Financial Breakdown:</span>
                          <span>Deposit: {formatNaira(app.depositAmount)}</span>
                          <span className="block">Remaining: {formatNaira(app.remainingBalance)}</span>
                        </div>
                      </div>

                      {app.adminNotes && (
                        <div className="p-2.5 bg-[#0e1017] rounded text-xs text-neutral-400 italic">
                          Admin Notes: {app.adminNotes}
                        </div>
                      )}

                      <div className="pt-3 border-t border-[#1b1e28] flex items-center justify-between gap-3">
                        <span className={`px-2.5 py-1 text-xs font-semibold uppercase rounded border ${
                          app.status === 'approved'
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                            : app.status === 'rejected'
                            ? 'bg-red-950 text-red-400 border-red-800'
                            : 'bg-amber-950 text-amber-400 border-amber-800'
                        }`}>
                          Current Status: {app.status}
                        </span>

                        <div className="flex items-center gap-2">
                          {app.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateInstallmentStatus(app.id, 'approved', 'Approved by MD Underwriting Committee.')}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold uppercase transition-colors"
                              >
                                Approve Plan
                              </button>
                              <button
                                onClick={() => updateInstallmentStatus(app.id, 'rejected', 'Does not meet minimum debt-to-income threshold.')}
                                className="px-3 py-1.5 bg-red-800 hover:bg-red-700 text-white rounded text-xs font-bold uppercase transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. INSPECTION BOOKINGS */}
            {activeSection === 'inspections' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">Inspection Appointments</h3>
                  <p className="text-xs text-neutral-400">Confirm requested viewing bays, assign consultants, or reschedule appointment dates.</p>
                </div>

                <div className="space-y-3">
                  {inspections.map((insp) => (
                    <div key={insp.id} className="bg-[#12141c] border border-[#20232e] rounded-xl p-5 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#1b1e28]">
                        <div>
                          <span className="text-xs font-bold text-[#D4AF37]">{insp.reference}</span>
                          <h4 className="text-base font-bold text-white">
                            {insp.vehicleSnapshot.year} {insp.vehicleSnapshot.make} {insp.vehicleSnapshot.model}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-white block">
                            Requested: {insp.preferredDate} at {insp.preferredTime}
                          </span>
                          <span className="text-[11px] text-neutral-400">{insp.location}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <span className="text-white font-semibold">{insp.customer.fullName}</span> · {insp.customer.phone} · {insp.customer.email}
                          {insp.customer.notes && (
                            <p className="text-neutral-400 italic mt-1">Client note: "{insp.customer.notes}"</p>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={insp.status}
                            onChange={(e) => updateInspectionStatus(insp.id, e.target.value as InspectionStatus)}
                            className="bg-[#181a24] border border-[#2b2f3e] rounded px-2.5 py-1 text-xs text-white focus:outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="rescheduled">Rescheduled</option>
                            <option value="completed">Completed</option>
                            <option value="no_show">No Show</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. SETTINGS */}
            {activeSection === 'settings' && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">Dealership &amp; Gateway Settings</h3>
                  <p className="text-xs text-neutral-400">Configure bank accounts, Paystack API public keys, and notification dispatch emails.</p>
                </div>

                {saveSuccess && (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Settings successfully saved and live across the platform.</span>
                  </div>
                )}

                <form onSubmit={handleSaveSettings} className="bg-[#12141c] p-6 rounded-xl border border-[#20232e] space-y-4">
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block">
                      Bank Wire Transfer Details
                    </span>

                    <div>
                      <label className="block text-xs text-neutral-300 mb-1">Bank Name</label>
                      <input
                        type="text"
                        value={setBankName}
                        onChange={(e) => setSetBankName(e.target.value)}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 mb-1">Account Name</label>
                      <input
                        type="text"
                        value={setAccountName}
                        onChange={(e) => setSetAccountName(e.target.value)}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 mb-1">Account Number (NUBAN)</label>
                      <input
                        type="text"
                        value={setAccountNumber}
                        onChange={(e) => setSetAccountNumber(e.target.value)}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#1e212b]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block">
                      Payment Gateway &amp; Communications
                    </span>

                    <div>
                      <label className="block text-xs text-neutral-300 mb-1">Paystack Public Key</label>
                      <input
                        type="text"
                        value={setPaystackKey}
                        onChange={(e) => setSetPaystackKey(e.target.value)}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 mb-1">Transactional Notification Email</label>
                      <input
                        type="email"
                        value={setAdminEmail}
                        onChange={(e) => setSetAdminEmail(e.target.value)}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 mb-1">Dealership Phone / WhatsApp</label>
                      <input
                        type="text"
                        value={setPhone}
                        onChange={(e) => setSetPhone(e.target.value)}
                        className="w-full bg-[#181a24] border border-[#282c3c] rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C158] text-black text-xs font-bold uppercase rounded-lg hover:opacity-95"
                    >
                      Save Configuration
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Other sections fallback */}
            {(activeSection === 'categories' || activeSection === 'payments' || activeSection === 'customers' || activeSection === 'notifications') && (
              <div className="bg-[#12141c] p-6 rounded-xl border border-[#20232e] space-y-4">
                <h3 className="text-base font-bold text-white capitalize">{activeSection.replace('_', ' ')}</h3>
                <p className="text-xs text-neutral-400">
                  All corresponding records are actively monitored in live synchronization with the dealership customer database.
                </p>
                {activeSection === 'notifications' && (
                  <div className="space-y-2">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-3 bg-[#161822] rounded border border-[#212430] text-xs flex justify-between items-center">
                        <div>
                          <span className="font-bold text-white block">{n.title}</span>
                          <span className="text-neutral-400">{n.message}</span>
                        </div>
                        <span className="text-[10px] text-neutral-500">{formatDate(n.createdAt)}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeSection === 'customers' && (
                  <div className="text-xs text-neutral-300 space-y-2">
                    <div className="p-3 bg-[#161822] rounded flex justify-between">
                      <div>
                        <span className="font-bold text-white block">Chief Emeka Adeleke</span>
                        <span className="text-neutral-400">emeka.adeleke@groupcorp.ng · +2348039912044</span>
                      </div>
                      <span className="text-[#D4AF37] font-semibold">VIP Purchaser</span>
                    </div>
                    <div className="p-3 bg-[#161822] rounded flex justify-between">
                      <div>
                        <span className="font-bold text-white block">Dr. Folake Balogun</span>
                        <span className="text-neutral-400">fbalogun@mediconsult.ng · +2348123456789</span>
                      </div>
                      <span className="text-emerald-400 font-semibold">Active Installment</span>
                    </div>
                  </div>
                )}
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
};
