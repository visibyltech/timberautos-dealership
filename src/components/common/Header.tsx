import React, { useState } from 'react';
import { Search, Heart, User, Menu, X, Shield, Calculator } from 'lucide-react';
import { useDealership } from '../../context/DealershipContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenSaved: () => void;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenSaved,
  onOpenAuth,
  onOpenAdmin
}) => {
  const { savedVehicles, currentUser, isAdmin } = useDealership();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'inventory', label: 'Browse Cars' },
    { id: 'financing', label: 'Car Financing' },
    { id: 'installments', label: 'Pay in Installments' },
    { id: 'inspection', label: 'Book Inspection' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top micro info strip */}
      <div className="hidden sm:block bg-[#F1EFE9] border-b border-[#DEDAD0] text-xs text-[#68645D] py-1.5 px-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center md:justify-between">
          <div className="hidden md:flex items-center gap-4 text-[#68645D]">
            <span>Lekki Phase 1, Lagos &amp; CBD, Abuja</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-[#D4AF37] font-medium hidden sm:inline">
              Your Trusted Auto Partner
            </span>
            {isAdmin && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1 text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-2 py-0.5 rounded text-[11px] font-medium hover:bg-[#D4AF37]/20 transition-all"
              >
                <Shield className="w-3 h-3" />
                Admin Portal
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2DED5] transition-all">
        <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-6">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none shrink min-w-0"
          >
            <div className="relative w-7 h-7 sm:w-11 sm:h-11 rounded-lg overflow-hidden bg-white border border-[#D4AF37]/40 flex items-center justify-center shadow-lg shadow-black/10 group shrink-0">
              <img
                src="/assets/aistudio/file_00000000d02881f485cd91770ad63cb9_5f7889d7.png"
                alt="Timber Autos Limited Logo"
                className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-lg md:text-xl font-extrabold tracking-wide sm:tracking-wider text-[#242424] uppercase font-heading flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                TIMBER AUTOS <span className="hidden sm:inline text-[#D4AF37] font-light">LTD</span>
              </span>
              <span className="hidden sm:block text-[10px] tracking-widest uppercase text-[#68645D] -mt-0.5">
                Luxury Dealership &amp; Import
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-medium text-[#45423D]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 whitespace-nowrap transition-colors ${
                    isActive 
                      ? 'text-[#E5C158] font-semibold' 
                      : 'hover:text-[#171717] text-[#45423D]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#E5C158] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Primary CTA */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-1 sm:p-2.5 text-[#45423D] hover:text-[#D4AF37] hover:bg-[#F1EFE9] rounded-lg transition-colors border border-transparent hover:border-[#2d303a]"
              title="Search Inventory"
              aria-label="Search Inventory"
            >
              <Search className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </button>

            {/* Saved Vehicles Wishlist */}
            <button
              onClick={onOpenSaved}
              className="relative p-1 sm:p-2.5 text-[#45423D] hover:text-[#D4AF37] hover:bg-[#F1EFE9] rounded-lg transition-colors border border-transparent hover:border-[#2d303a]"
              title="Saved Vehicles"
              aria-label="Saved Vehicles"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {savedVehicles.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedVehicles.length}
                </span>
              )}
            </button>

            {/* Installment calculator shortcut */}
            <button
              onClick={() => handleNavClick('installments')}
              className="p-1 sm:p-2.5 text-[#45423D] hover:text-[#D4AF37] hover:bg-[#F1EFE9] rounded-lg transition-colors border border-transparent hover:border-[#2d303a] shrink-0"
              title="Installment Calculator"
              aria-label="Installment Calculator"
            >
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            {/* Account / Login */}
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-3 py-1.5 sm:py-2 text-[#45423D] hover:text-[#171717] hover:bg-[#F1EFE9] rounded-lg transition-colors border border-transparent hover:border-[#2d303a]"
              title={currentUser ? currentUser.fullName : "Customer Account"}
            >
              <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#F0EDE5] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] text-xs font-bold shrink-0">
                {currentUser ? currentUser.fullName.charAt(0) : <User className="w-3.5 h-3.5" />}
              </div>
              <span className="hidden xl:inline text-xs font-medium max-w-[100px] truncate">
                {currentUser ? currentUser.fullName.split(' ')[0] : 'Account'}
              </span>
            </button>

            {/* Prominent Browse Cars Button */}
            <button
              onClick={() => handleNavClick('inventory')}
              className="hidden xl:inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] rounded-lg hover:shadow-lg hover:shadow-[#D4AF37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
            >
              Browse Cars
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 sm:p-2 text-[#45423D] hover:text-[#171717] hover:bg-[#F1EFE9] rounded-lg transition-colors shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#E2DED5] px-5 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#181a22] text-[#E5C158] font-semibold border-l-2 border-[#D4AF37]'
                    : 'text-[#45423D] hover:bg-[#14161d] hover:text-[#171717]'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 border-t border-[#DEDAD0] flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('inventory')}
                className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#D4AF37] to-[#E5C158] rounded-lg"
              >
                Explore Inventory
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 text-center text-xs font-medium text-[#D4AF37] bg-[#161820] border border-[#D4AF37]/30 rounded-lg flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                Administrator Dashboard
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
