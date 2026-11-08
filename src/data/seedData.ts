import { Vehicle, DealershipSettings, UserAccount, Order, InstallmentApplication, InspectionBooking, NotificationItem } from '../types';
import showroomImage from '../assets/images/hero_luxury_showroom_1794141434269.jpg';
import mercedesImage from '../assets/images/vehicle_mercedes_g63_1794141435015.jpg';
import rangeRoverImage from '../assets/images/vehicle_range_rover_1794141435125.jpg';
import lexusImage from '../assets/images/vehicle_lexus_lx600_1794141437259.jpg';
import landCruiserImage from '../assets/images/vehicle_toyota_landcruiser_1794141435833.jpg';

export const INITIAL_SETTINGS: DealershipSettings = {
  businessName: 'TIMBER AUTOS LIMITED',
  slogan: 'Your Trusted Auto Partner.',
  phone: '+2348143112826',
  whatsapp: '+2348143112826',
  email: 'info@timberautos.ng',
  notificationEmail: 'sales@timberautos.ng',
  showroomLocations: [
    {
      city: 'Lagos Head Office & Showroom',
      address: 'Plot 14, Admiralty Way, Lekki Phase 1, Lagos, Nigeria',
      hours: 'Mon – Sat: 8:00 AM – 6:30 PM | Sun: By Appointment'
    },
    {
      city: 'Abuja Executive Showroom',
      address: 'Shehu Shagari Way, Central Business District, Abuja, Nigeria',
      hours: 'Mon – Sat: 9:00 AM – 6:00 PM'
    }
  ],
  bankDetails: {
    bankName: 'Zenith Bank PLC',
    accountName: 'TIMBER AUTOS LIMITED',
    accountNumber: '1018944120',
    sortCode: '057150013'
  },
  installmentSettings: {
    minDepositPercent: 30,
    adminFeePercent: 3.5,
    annualInterestRatePercent: 8,
    allowedDurations: [3, 6, 9, 12, 18, 24]
  },
  paystackPublicKey: 'pk_test_sample_timber_autos_dealership'
};

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'tal-veh-001',
    make: 'Mercedes-Benz',
    model: 'AMG G 63 V8 Biturbo',
    trim: 'Night Edition Stronger Than Time',
    year: 2024,
    price: 385000000,
    mileage: 1200,
    engineCapacity: '4.0L Handcrafted AMG V8 Biturbo (577 hp / 627 lb-ft)',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    bodyType: 'Luxury SUV',
    condition: 'brand-new',
    exteriorColor: 'Obsidian Black Metallic with Gold Trim',
    interiorColor: 'Exclusive Nappa Leather Black & Bengal Red',
    vin: 'W1N978164RX912401',
    description: 'The pinnacle of luxury off-road performance. Finished in stunning Obsidian Black Metallic with bespoke gold-accented 22-inch forged cross-spoke wheels, AMG carbon fiber interior package, Burmester high-end 3D surround sound system, multicontour dynamic front massage seats, and twin side-pipe exhaust with sport valve acoustics.',
    keyFeatures: [
      'AMG RIDE CONTROL suspension with adaptive damping',
      'Burmester® 3D Surround Sound Audio System',
      '22" AMG Cross-Spoke Forged Gold-Rim Wheels',
      'Widescreen Cockpit with Dual 12.3-inch displays',
      'Multibeam LED Headlights with Adaptive Highbeam',
      'Three 100% Differential Locks (Center, Rear, Front)'
    ],
    availability: 'available',
    images: [
      mercedesImage,
      showroomImage
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    featured: true,
    source: 'timber_autos',
    createdAt: '2024-10-15T10:00:00Z'
  },
  {
    id: 'tal-veh-002',
    make: 'Land Rover',
    model: 'Range Rover Autobiography SV',
    trim: 'Long Wheelbase Executive First-Class',
    year: 2024,
    price: 340000000,
    mileage: 3500,
    engineCapacity: '4.4L Twin-Turbocharged V8 (523 hp / 553 lb-ft)',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    bodyType: 'Luxury SUV',
    condition: 'foreign-used',
    exteriorColor: 'Santorini Black with Satin Bronze Exterior Pack',
    interiorColor: 'Perlino / Ebony Semi-Aniline Leather',
    vin: 'SALWR2V45PA889312',
    description: 'Supreme executive comfort and effortless British craftsmanship. Long wheelbase configuration offering limousine-like rear legroom, SV bespoke wood veneers, refrigerated center compartment, deployable club tables, and Meridian Signature 1600W 35-speaker active noise cancelling audio.',
    keyFeatures: [
      'Executive Class Comfort-Plus rear seating with hot stone massage',
      'Meridian™ Signature Sound System (35 speakers, 1600W)',
      'Electronic Air Suspension with Dynamic Response Pro',
      'All-Wheel Steering for unprecedented agility',
      'ClearSight Interior Rear-View Video Mirror',
      'Full Dubai customs clearance documentation & clean CarFax'
    ],
    images: [
      rangeRoverImage,
      showroomImage
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    availability: 'available',
    featured: true,
    source: 'timber_autos',
    createdAt: '2024-10-18T12:30:00Z'
  },
  {
    id: 'tal-veh-003',
    make: 'Lexus',
    model: 'LX 600 Ultra Luxury',
    trim: 'VIP 4-Passenger Executive Suite',
    year: 2024,
    price: 295000000,
    mileage: 2100,
    engineCapacity: '3.5L Twin-Turbo V6 (409 hp / 479 lb-ft)',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    bodyType: 'Luxury SUV',
    condition: 'brand-new',
    exteriorColor: 'Caviar Black Metallic',
    interiorColor: 'Sunflare Diamond-Stitched Semi-Aniline Leather',
    vin: 'JTJHY00W7P4019281',
    description: 'The definitive executive flagship SUV built on the legendary GA-F platform. Configured with dual rear captain chairs reclining up to 48 degrees with power footrests, dedicated rear climate touch console, Mark Levinson 25-speaker surround system, and full-time multi-terrain monitor.',
    keyFeatures: [
      'Ultra Luxury 4-passenger VIP lounge seating',
      'Mark Levinson® 25-speaker 2,400-watt Reference Surround Sound',
      'Active Height Control (AHC) air suspension',
      'Rear seat entertainment screens with wireless headphones',
      'Dual touchscreens (12.3-inch upper + 7-inch lower)',
      'Lexus Safety System+ 2.5 with pedestrian pre-collision'
    ],
    images: [
      lexusImage,
      showroomImage
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    availability: 'available',
    featured: true,
    source: 'timber_autos',
    createdAt: '2024-10-22T08:15:00Z'
  },
  {
    id: 'tal-veh-004',
    make: 'Toyota',
    model: 'Land Cruiser 300 ZX',
    trim: 'ZX V6 Twin Turbo Flagship',
    year: 2024,
    price: 225000000,
    mileage: 4800,
    engineCapacity: '3.5L Twin-Turbo V6 (409 hp / 650 Nm torque)',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    bodyType: 'Luxury SUV',
    condition: 'brand-new',
    exteriorColor: 'Precious White Pearl with Dark Chrome Accents',
    interiorColor: 'Saddle Tan Premium Leather with Dark Wood Accents',
    vin: 'JTMBA31J2P4088192',
    description: 'Unrivalled durability meets modern luxury. The Land Cruiser 300 ZX represents Toyota’s highest tier of Japanese engineering, equipped with hydraulic power steering, torque-sensing limited-slip differential, multi-terrain select 3D camera system, rear seat screens, and fingerprint-authenticated push start.',
    keyFeatures: [
      'Adaptive Variable Suspension (AVS) with rear torque-sensing LSD',
      'JBL® Synthesis 14-speaker premium audio',
      'Fingerprint push-button engine ignition',
      'Cool box center console refrigerator',
      'Power fold third-row seating (7-seater)',
      'Heads-Up Display (HUD) and 360-degree panoramic view monitor'
    ],
    images: [
      landCruiserImage,
      showroomImage
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    availability: 'available',
    featured: true,
    source: 'timber_autos',
    createdAt: '2024-10-25T14:40:00Z'
  },
  {
    id: 'tal-veh-005',
    make: 'Mercedes-Benz',
    model: 'GLE 450 4MATIC',
    trim: 'AMG Line Premium Plus',
    year: 2023,
    price: 145000000,
    mileage: 18500,
    engineCapacity: '3.0L Turbo Inline-6 with EQ Boost (362 hp + 21 hp electric)',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    bodyType: 'Luxury SUV',
    condition: 'foreign-used',
    exteriorColor: 'Selenite Grey Metallic',
    interiorColor: 'Macchiato Beige / Black Nappa Leather',
    vin: '4JGED5KB4PB219401',
    description: 'Immaculate US-direct foreign-used GLE 450 with complete service records. Features panoramic sliding roof, AMG body styling, 21-inch AMG multi-spoke wheels, AIRMATIC suspension, augmented reality MBUX navigation, and 64-color ambient lighting.',
    keyFeatures: [
      '4MATIC all-wheel drive with torque-on-demand',
      'Burmester® surround audio system',
      'Panoramic glass sunroof with one-touch electric shade',
      'MBUX with augmented reality navigation overlay',
      'Heated and ventilated front seats with memory',
      'Clean CarFax with zero accident history'
    ],
    images: [
      showroomImage,
      mercedesImage
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    availability: 'available',
    featured: false,
    source: 'timber_autos',
    createdAt: '2024-10-28T09:00:00Z'
  },
  {
    id: 'tal-veh-006',
    make: 'Lexus',
    model: 'RX 350 F-Sport AWD',
    trim: 'F-Sport Series 3',
    year: 2022,
    price: 78000000,
    mileage: 29000,
    engineCapacity: '3.5L V6 DOHC 24-Valve (295 hp)',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    bodyType: 'Crossover',
    condition: 'foreign-used',
    exteriorColor: 'Nebula Gray Pearl',
    interiorColor: 'Circuit Red NuLuxe with Scored Aluminum',
    vin: '2T2BZMCA4NC104928',
    description: 'Dynamic styling paired with rock-solid Japanese dependability. Foreign-used Canada-spec RX 350 F-Sport with verified customs assessment. Sport-tuned suspension, F-Sport mesh spindle grille, Mark Levinson premium audio, and Apple CarPlay / Android Auto integration.',
    keyFeatures: [
      'F-Sport adaptive variable suspension and drive mode select',
      '12.3-inch multimedia display with Navigation',
      'Mark Levinson 15-speaker premium sound',
      'Heated steering wheel & perforated sport seats',
      'Customs duty fully paid and verified'
    ],
    images: [
      lexusImage
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    availability: 'reserved',
    featured: false,
    source: 'timber_autos',
    createdAt: '2024-11-01T11:20:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    reference: 'TAL-ORD-2024-8891',
    vehicleId: 'tal-veh-002',
    vehicleSnapshot: {
      make: 'Land Rover',
      model: 'Range Rover Autobiography SV',
      year: 2024,
      price: 340000000,
      image: rangeRoverImage,
      vin: 'SALWR2V45PA889312'
    },
    customer: {
      fullName: 'Chief Emeka Adeleke',
      email: 'emeka.adeleke@groupcorp.ng',
      phone: '+2348039912044',
      address: '22 Queen’s Drive, Ikoyi',
      city: 'Lagos',
      state: 'Lagos State'
    },
    deliveryMethod: 'nationwide_delivery',
    deliveryAddress: '22 Queen’s Drive, Ikoyi, Lagos State',
    paymentMethod: 'bank_transfer',
    paymentStatus: 'verified',
    orderStatus: 'preparing_delivery',
    totalAmount: 340000000,
    paymentProofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500',
    adminNotes: 'Zenith Bank wire transfer verified. Vehicle cleared for enclosed carrier delivery.',
    createdAt: '2024-11-03T14:22:00Z'
  }
];

export const INITIAL_INSTALLMENTS: InstallmentApplication[] = [
  {
    id: 'inst-1001',
    reference: 'TAL-INST-2024-0419',
    vehicleId: 'tal-veh-004',
    vehicleSnapshot: {
      make: 'Toyota',
      model: 'Land Cruiser 300 ZX',
      year: 2024,
      price: 225000000,
      image: landCruiserImage
    },
    customer: {
      fullName: 'Dr. Folake Balogun',
      email: 'fbalogun@mediconsult.ng',
      phone: '+2348123456789',
      address: 'Plot 8, Maitama Hills, Abuja',
      city: 'Abuja',
      state: 'FCT',
      employmentType: 'business_owner',
      monthlyIncome: 35000000
    },
    durationMonths: 12,
    vehiclePrice: 225000000,
    depositPercentage: 35,
    depositAmount: 78750000,
    remainingBalance: 146250000,
    adminCharges: 11700000,
    monthlyPayment: 13162500,
    totalAmountPayable: 236700000,
    status: 'approved',
    adminNotes: 'Application audited and approved with 35% down payment. CAC registration and 6-month bank statements verified.',
    paymentSchedule: [
      { id: 'sch-1', monthNumber: 1, dueDate: '2024-12-05', amountDue: 13162500, status: 'paid', paidAt: '2024-12-04', paymentReference: 'TAL-PAY-99120', receiptNumber: 'REC-001' },
      { id: 'sch-2', monthNumber: 2, dueDate: '2025-01-05', amountDue: 13162500, status: 'unpaid' },
      { id: 'sch-3', monthNumber: 3, dueDate: '2025-02-05', amountDue: 13162500, status: 'unpaid' },
      { id: 'sch-4', monthNumber: 4, dueDate: '2025-03-05', amountDue: 13162500, status: 'unpaid' },
      { id: 'sch-5', monthNumber: 5, dueDate: '2025-04-05', amountDue: 13162500, status: 'unpaid' },
      { id: 'sch-6', monthNumber: 6, dueDate: '2025-05-05', amountDue: 13162500, status: 'unpaid' },
      { id: 'sch-7', monthNumber: 7, dueDate: '2025-06-05', amountDue: 13162500, status: 'unpaid' },
      { id: 'sch-8', monthNumber: 8, dueDate: '2025-07-05', amountDue: 13162500, status: 'unpaid' },
      { id: 'sch-9', monthNumber: 9, dueDate: '2025-08-05', amountDue: 13162500, status: 'unpaid' },
      { id: 'sch-10', monthNumber: 10, dueDate: '2025-09-05', amountDue: 13162500, status: 'unpaid' },
      { id: 'sch-11', monthNumber: 11, dueDate: '2025-10-05', amountDue: 13162500, status: 'unpaid' },
      { id: 'sch-12', monthNumber: 12, dueDate: '2025-11-05', amountDue: 13162500, status: 'unpaid' }
    ],
    createdAt: '2024-11-02T16:00:00Z'
  }
];

export const INITIAL_INSPECTIONS: InspectionBooking[] = [
  {
    id: 'insp-1001',
    reference: 'TAL-INSP-2024-5512',
    vehicleId: 'tal-veh-001',
    vehicleSnapshot: {
      make: 'Mercedes-Benz',
      model: 'AMG G 63 V8 Biturbo',
      year: 2024,
      price: 385000000,
      image: mercedesImage,
      vin: 'W1N978164RX912401'
    },
    customer: {
      fullName: 'Hon. Babatunde Sanwo',
      email: 'babatunde.s@apexholdings.ng',
      phone: '+2348021122334'
    },
    preferredDate: '2024-11-12',
    preferredTime: '11:00 AM',
    location: 'Lagos Head Office Showroom (Lekki Phase 1)',
    status: 'confirmed',
    confirmedDate: '2024-11-12',
    confirmedTime: '11:00 AM',
    internalNotes: 'Client is an executive buyer. Ready for private test bay inspection with Senior Automotive Consultant.',
    createdAt: '2024-11-04T09:12:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New High-Value Order Received',
    message: 'Order TAL-ORD-2024-8891 placed for Range Rover Autobiography SV (₦340,000,000).',
    type: 'order',
    targetId: 'ord-1001',
    read: false,
    createdAt: '2024-11-03T14:22:00Z'
  },
  {
    id: 'notif-2',
    title: 'VIP Inspection Appointment Scheduled',
    message: 'Hon. Babatunde Sanwo scheduled an inspection for 2024 Mercedes-AMG G 63.',
    type: 'inspection',
    targetId: 'insp-1001',
    read: false,
    createdAt: '2024-11-04T09:12:00Z'
  },
  {
    id: 'notif-3',
    title: 'Installment Plan Active',
    message: 'Dr. Folake Balogun installment plan approved for Toyota Land Cruiser 300 ZX.',
    type: 'installment',
    targetId: 'inst-1001',
    read: true,
    createdAt: '2024-11-02T16:00:00Z'
  }
];

export const INITIAL_USER: UserAccount = {
  id: 'usr-customer-1',
  email: 'client@timberautos.ng',
  fullName: 'Alhaji Ibrahim Danjuma',
  phone: '+2348143112826',
  role: 'customer',
  savedVehicleIds: ['tal-veh-001', 'tal-veh-003'],
  createdAt: '2024-10-01T00:00:00Z'
};
