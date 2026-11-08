export type VehicleCondition = 'brand-new' | 'foreign-used' | 'nigerian-used';
export type VehicleAvailability = 'available' | 'reserved' | 'sold';
export type TransmissionType = 'Automatic' | 'Manual' | 'Dual-Clutch';
export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
export type BodyType = 'Luxury SUV' | 'Sedan' | 'Coupe' | 'Truck / Pickup' | 'Crossover';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  trim?: string;
  year: number;
  price: number; // in NGN
  mileage: number; // in km
  engineCapacity: string; // e.g. "4.0L V8 Biturbo (577 hp)"
  transmission: TransmissionType;
  fuelType: FuelType;
  bodyType: BodyType;
  condition: VehicleCondition;
  exteriorColor: string;
  interiorColor: string;
  vin: string;
  description: string;
  keyFeatures: string[];
  availability: VehicleAvailability;
  images: string[];
  videoUrl?: string;
  featured: boolean;
  source: 'timber_autos' | 'autochek_partner_feed';
  createdAt: string;
}

export interface CustomerContact {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  notes?: string;
}

export type OrderPaymentMethod = 'paystack' | 'bank_transfer';
export type OrderPaymentStatus = 'pending' | 'verified' | 'failed';
export type OrderDeliveryMethod = 'showroom_collection' | 'nationwide_delivery';
export type OrderStatus = 'pending' | 'payment_verified' | 'preparing_delivery' | 'ready_for_collection' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  reference: string;
  vehicleId: string;
  vehicleSnapshot: {
    make: string;
    model: string;
    year: number;
    price: number;
    image: string;
    vin: string;
  };
  customer: CustomerContact;
  deliveryMethod: OrderDeliveryMethod;
  deliveryAddress?: string;
  paymentMethod: OrderPaymentMethod;
  paymentStatus: OrderPaymentStatus;
  orderStatus: OrderStatus;
  totalAmount: number;
  paymentProofUrl?: string;
  adminNotes?: string;
  createdAt: string;
}

export type InstallmentDuration = 3 | 6 | 9 | 12 | 18 | 24;
export type InstallmentStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'completed';

export interface InstallmentPaymentScheduleItem {
  id: string;
  monthNumber: number;
  dueDate: string;
  amountDue: number;
  status: 'unpaid' | 'paid' | 'overdue';
  paidAt?: string;
  paymentReference?: string;
  receiptNumber?: string;
}

export interface InstallmentApplication {
  id: string;
  reference: string;
  vehicleId: string;
  vehicleSnapshot: {
    make: string;
    model: string;
    year: number;
    price: number;
    image: string;
  };
  customer: CustomerContact & {
    employmentType: 'employed' | 'self_employed' | 'business_owner' | 'corporate';
    monthlyIncome: number;
    bvn?: string;
    idType?: string;
  };
  durationMonths: InstallmentDuration;
  vehiclePrice: number;
  depositPercentage: number;
  depositAmount: number;
  remainingBalance: number;
  adminCharges: number;
  monthlyPayment: number;
  totalAmountPayable: number;
  status: InstallmentStatus;
  documentUrls?: string[];
  paymentSchedule?: InstallmentPaymentScheduleItem[];
  adminNotes?: string;
  createdAt: string;
}

export type InspectionStatus = 'pending' | 'confirmed' | 'rescheduled' | 'cancelled' | 'completed' | 'no_show';

export interface InspectionBooking {
  id: string;
  reference: string;
  vehicleId: string;
  vehicleSnapshot: {
    make: string;
    model: string;
    year: number;
    price: number;
    image: string;
    vin: string;
  };
  customer: CustomerContact;
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string; // e.g. "10:00 AM"
  location: string; // Dealership showroom
  status: InspectionStatus;
  confirmedDate?: string;
  confirmedTime?: string;
  internalNotes?: string;
  createdAt: string;
}

export interface FinancingEnquiry {
  id: string;
  reference: string;
  vehicleId?: string;
  vehicleName?: string;
  customer: CustomerContact;
  estimatedBudget?: number;
  employmentStatus?: string;
  notes?: string;
  redirectedToAutochek: boolean;
  createdAt: string;
}

export interface UserAccount {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: 'customer' | 'admin';
  avatarUrl?: string;
  savedVehicleIds: string[];
  createdAt: string;
}

export interface DealershipSettings {
  businessName: string;
  slogan: string;
  phone: string;
  whatsapp: string;
  email: string;
  showroomLocations: {
    city: string;
    address: string;
    hours: string;
  }[];
  bankDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    sortCode?: string;
  };
  installmentSettings: {
    minDepositPercent: number; // e.g. 30
    adminFeePercent: number; // e.g. 5
    annualInterestRatePercent: number; // e.g. 12
    allowedDurations: InstallmentDuration[];
  };
  paystackPublicKey: string;
  notificationEmail: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'installment' | 'inspection' | 'system';
  targetId?: string;
  read: boolean;
  createdAt: string;
}
