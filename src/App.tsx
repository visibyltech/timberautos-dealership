import React, { useEffect, useState } from 'react';
import { DealershipProvider, useDealership } from './context/DealershipContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { HeroSlider } from './components/home/HeroSlider';
import { FeaturedVehicles } from './components/home/FeaturedVehicles';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { InstallmentPreview } from './components/home/InstallmentPreview';
import { FinancingBanner } from './components/home/FinancingBanner';
import { InspectionBanner } from './components/home/InspectionBanner';
import { Testimonials } from './components/home/Testimonials';
import { InventoryView } from './components/inventory/InventoryView';
import { VehicleDetailsModal } from './components/inventory/VehicleDetailsModal';
import { BuyNowModal } from './components/checkout/BuyNowModal';
import { InstallmentPortalModal } from './components/installments/InstallmentPortalModal';
import { InspectionBookingModal } from './components/inspections/InspectionBookingModal';
import { AutochekModal } from './components/financing/AutochekModal';
import { SearchModal } from './components/common/SearchModal';
import { AuthModal } from './components/common/AuthModal';
import { CustomerDashboardModal } from './components/account/CustomerDashboardModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { TermsModal } from './components/common/TermsModal';
import { AboutUsView } from './components/pages/AboutUsView';
import { ContactView } from './components/pages/ContactView';
import { Vehicle } from './types';

const VALID_TABS = ['home', 'inventory', 'financing', 'installments', 'inspection', 'about', 'contact'];

function DealershipApp() {
  const { vehicles } = useDealership();

  // Navigation state
  const [activeTab, setActiveTabState] = useState<string>(() => {
    const initialTab = window.location.hash.replace('#', '');
    return VALID_TABS.includes(initialTab) ? initialTab : 'home';
  });

  // Keep in-app navigation in browser history so Android/browser Back returns
  // to the previous Timber Autos page instead of leaving the website.
  const setActiveTab = (tab: string) => {
    if (!VALID_TABS.includes(tab) || tab === activeTab) return;
    window.history.pushState({ timberAutosTab: tab }, '', `${window.location.pathname}${window.location.search}#${tab}`);
    setActiveTabState(tab);
  };

  // Modals state
  const [selectedVehicleForDetails, setSelectedVehicleForDetails] = useState<Vehicle | null>(null);

  const handleSelectVehicle = (vehicle: Vehicle) => {
    window.history.pushState({ ...(window.history.state || {}), timberAutosModal: 'vehicle' }, '', window.location.href);
    setSelectedVehicleForDetails(vehicle);
  };

  const handleCloseVehicleDetails = () => {
    if (window.history.state?.timberAutosModal === 'vehicle') {
      window.history.back();
    } else {
      setSelectedVehicleForDetails(null);
    }
  };
  const [selectedVehicleForBuyNow, setSelectedVehicleForBuyNow] = useState<Vehicle | null>(null);
  const [selectedVehicleForInstallment, setSelectedVehicleForInstallment] = useState<Vehicle | null>(null);
  const [showInstallmentPortal, setShowInstallmentPortal] = useState(false);
  const [selectedVehicleForInspection, setSelectedVehicleForInspection] = useState<Vehicle | null>(null);
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [selectedVehicleForFinancing, setSelectedVehicleForFinancing] = useState<Vehicle | null>(null);
  const [showAutochekModal, setShowAutochekModal] = useState(false);

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCustomerDashboard, setShowCustomerDashboard] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [termsModalType, setTermsModalType] = useState<'terms' | 'privacy' | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      const tab = window.location.hash.replace('#', '');
      setActiveTabState(VALID_TABS.includes(tab) ? tab : 'home');
      setSelectedVehicleForDetails(null);
      setSelectedVehicleForBuyNow(null);
      setSelectedVehicleForInstallment(null);
      setShowInstallmentPortal(false);
      setSelectedVehicleForInspection(null);
      setShowInspectionModal(false);
      setSelectedVehicleForFinancing(null);
      setShowAutochekModal(false);
      setShowSearchModal(false);
      setShowAuthModal(false);
      setShowCustomerDashboard(false);
      setShowAdminModal(false);
      setTermsModalType(null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handlers
  const handleOpenBuyNow = (vehicle: Vehicle) => {
    setSelectedVehicleForDetails(null);
    setSelectedVehicleForBuyNow(vehicle);
  };

  const handleOpenInstallments = (vehicle?: Vehicle) => {
    setSelectedVehicleForDetails(null);
    setSelectedVehicleForInstallment(vehicle || null);
    setShowInstallmentPortal(true);
  };

  const handleOpenInspection = (vehicle?: Vehicle) => {
    setSelectedVehicleForDetails(null);
    setSelectedVehicleForInspection(vehicle || null);
    setShowInspectionModal(true);
  };

  const handleOpenFinancing = (vehicle?: Vehicle) => {
    setSelectedVehicleForDetails(null);
    setSelectedVehicleForFinancing(vehicle || null);
    setShowAutochekModal(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#F3F4F6] flex flex-col selection:bg-[#D4AF37] selection:text-black">
      
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setShowSearchModal(true)}
        onOpenSaved={() => setShowCustomerDashboard(true)}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenAdmin={() => setShowAdminModal(true)}
      />

      {/* Main Page Content Router */}
      <main className="flex-1">
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <>
            <HeroSlider
              onExploreVehicles={() => {
                setActiveTab('inventory');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreFinancing={() => handleOpenFinancing()}
            />

            <FeaturedVehicles
              vehicles={vehicles}
              onSelectVehicle={handleSelectVehicle}
              onCalculateInstallment={(veh) => handleOpenInstallments(veh)}
              onViewAllInventory={() => {
                setActiveTab('inventory');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <WhyChooseUs />

            <InstallmentPreview
              onExploreInstallments={() => handleOpenInstallments()}
            />

            <FinancingBanner
              onOpenFinancingModal={() => handleOpenFinancing()}
            />

            <InspectionBanner
              onOpenBookingModal={() => handleOpenInspection()}
            />

            <Testimonials />
          </>
        )}

        {/* TAB 2: BROWSE CARS / INVENTORY */}
        {activeTab === 'inventory' && (
          <InventoryView
            vehicles={vehicles}
            onSelectVehicle={handleSelectVehicle}
            onCalculateInstallment={(veh) => handleOpenInstallments(veh)}
          />
        )}

        {/* TAB 3: CAR FINANCING */}
        {activeTab === 'financing' && (
          <div className="py-12 bg-[#0B0C10]">
            <FinancingBanner onOpenFinancingModal={() => handleOpenFinancing()} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <FeaturedVehicles
                vehicles={vehicles}
                onSelectVehicle={handleSelectVehicle}
                onCalculateInstallment={(veh) => handleOpenInstallments(veh)}
                onViewAllInventory={() => setActiveTab('inventory')}
              />
            </div>
          </div>
        )}

        {/* TAB 4: PAY IN INSTALLMENTS */}
        {activeTab === 'installments' && (
          <div className="py-8 bg-[#0B0C10]">
            <InstallmentPreview onExploreInstallments={() => handleOpenInstallments()} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <FeaturedVehicles
                vehicles={vehicles}
                onSelectVehicle={handleSelectVehicle}
                onCalculateInstallment={(veh) => handleOpenInstallments(veh)}
                onViewAllInventory={() => setActiveTab('inventory')}
              />
            </div>
          </div>
        )}

        {/* TAB 5: BOOK INSPECTION */}
        {activeTab === 'inspection' && (
          <div className="py-8 bg-[#0B0C10]">
            <InspectionBanner onOpenBookingModal={() => handleOpenInspection()} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <FeaturedVehicles
                vehicles={vehicles}
                onSelectVehicle={handleSelectVehicle}
                onCalculateInstallment={(veh) => handleOpenInstallments(veh)}
                onViewAllInventory={() => setActiveTab('inventory')}
              />
            </div>
          </div>
        )}

        {/* TAB 6: ABOUT US */}
        {activeTab === 'about' && (
          <AboutUsView onNavigate={setActiveTab} />
        )}

        {/* TAB 7: CONTACT */}
        {activeTab === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setActiveTab}
        onOpenTerms={(type) => setTermsModalType(type)}
      />

      {/* Persistent Floating WhatsApp Advisory Button */}
      <WhatsAppButton currentVehicle={selectedVehicleForDetails} />

      {/* MODALS */}
      {/* 1. Vehicle Details Page/Modal */}
      {selectedVehicleForDetails && (
        <VehicleDetailsModal
          vehicle={selectedVehicleForDetails}
          onClose={handleCloseVehicleDetails}
          onBuyNow={handleOpenBuyNow}
          onPayInstallments={handleOpenInstallments}
          onBookInspection={handleOpenInspection}
          onCarFinancing={handleOpenFinancing}
          onSelectVehicle={(v) => setSelectedVehicleForDetails(v)}
        />
      )}

      {/* 2. Buy Now Checkout Modal */}
      {selectedVehicleForBuyNow && (
        <BuyNowModal
          vehicle={selectedVehicleForBuyNow}
          onClose={() => setSelectedVehicleForBuyNow(null)}
          onSuccess={(order) => {
            console.log('Order created:', order.reference);
          }}
        />
      )}

      {/* 3. Installments Portal Modal */}
      {showInstallmentPortal && (
        <InstallmentPortalModal
          initialVehicle={selectedVehicleForInstallment}
          onClose={() => {
            setShowInstallmentPortal(false);
            setSelectedVehicleForInstallment(null);
          }}
          onSelectVehicle={(v) => setSelectedVehicleForDetails(v)}
        />
      )}

      {/* 4. Inspection Booking Modal */}
      {showInspectionModal && (
        <InspectionBookingModal
          initialVehicle={selectedVehicleForInspection}
          onClose={() => {
            setShowInspectionModal(false);
            setSelectedVehicleForInspection(null);
          }}
        />
      )}

      {/* 5. Autochek Financing Modal */}
      {showAutochekModal && (
        <AutochekModal
          vehicle={selectedVehicleForFinancing}
          onClose={() => {
            setShowAutochekModal(false);
            setSelectedVehicleForFinancing(null);
          }}
        />
      )}

      {/* 6. Quick Search Modal */}
      {showSearchModal && (
        <SearchModal
          onClose={() => setShowSearchModal(false)}
          onSelectVehicle={(v) => {
            setShowSearchModal(false);
            handleSelectVehicle(v);
          }}
        />
      )}

      {/* 7. Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onOpenDashboard={() => setShowCustomerDashboard(true)}
        />
      )}

      {/* 8. Customer Account / Saved Vehicles Dashboard */}
      {showCustomerDashboard && (
        <CustomerDashboardModal
          onClose={() => setShowCustomerDashboard(false)}
          onSelectVehicle={(v) => {
            setShowCustomerDashboard(false);
            handleSelectVehicle(v);
          }}
          onOpenAdmin={() => setShowAdminModal(true)}
        />
      )}

      {/* 9. Administrator Dashboard */}
      {showAdminModal && (
        <AdminDashboardModal
          onClose={() => setShowAdminModal(false)}
          onSelectVehicle={(v) => {
            setShowAdminModal(false);
            handleSelectVehicle(v);
          }}
        />
      )}

      {/* 10. Legal & Terms Modal */}
      {termsModalType && (
        <TermsModal
          type={termsModalType}
          onClose={() => setTermsModalType(null)}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <DealershipProvider>
      <DealershipApp />
    </DealershipProvider>
  );
}
