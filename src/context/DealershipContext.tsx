import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Vehicle,
  Order,
  InstallmentApplication,
  InspectionBooking,
  DealershipSettings,
  UserAccount,
  NotificationItem,
  FinancingEnquiry,
  OrderStatus,
  InstallmentStatus,
  InspectionStatus
} from '../types';
import {
  INITIAL_VEHICLES,
  INITIAL_ORDERS,
  INITIAL_INSTALLMENTS,
  INITIAL_INSPECTIONS,
  INITIAL_SETTINGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_USER
} from '../data/seedData';

interface DealershipContextType {
  vehicles: Vehicle[];
  orders: Order[];
  installments: InstallmentApplication[];
  inspections: InspectionBooking[];
  settings: DealershipSettings;
  notifications: NotificationItem[];
  currentUser: UserAccount | null;
  savedVehicles: Vehicle[];
  isAdmin: boolean;
  
  // Actions
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'createdAt'>) => Vehicle;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  toggleSaveVehicle: (vehicleId: string) => void;
  
  // Order & Checkout
  placeOrder: (order: Omit<Order, 'id' | 'reference' | 'createdAt' | 'orderStatus' | 'paymentStatus'> & { paymentProofUrl?: string }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, adminNotes?: string) => void;
  
  // Installments
  submitInstallment: (app: Omit<InstallmentApplication, 'id' | 'reference' | 'createdAt' | 'status' | 'paymentSchedule'>) => InstallmentApplication;
  updateInstallmentStatus: (appId: string, status: InstallmentStatus, adminNotes?: string) => void;
  recordInstallmentPayment: (appId: string, scheduleItemId: string) => void;
  
  // Inspections
  bookInspection: (booking: Omit<InspectionBooking, 'id' | 'reference' | 'createdAt' | 'status'>) => { success: boolean; booking?: InspectionBooking; error?: string };
  updateInspectionStatus: (bookingId: string, status: InspectionStatus, confirmedDate?: string, confirmedTime?: string, internalNotes?: string) => void;
  
  // Financing Enquiries
  submitFinancingEnquiry: (enquiry: Omit<FinancingEnquiry, 'id' | 'reference' | 'createdAt'>) => FinancingEnquiry;
  
  // Settings & System
  updateSettings: (newSettings: DealershipSettings) => void;
  markNotificationRead: (id: string) => void;
  loginAs: (role: 'customer' | 'admin', email?: string) => void;
  logout: () => void;
}

const DealershipContext = createContext<DealershipContextType | undefined>(undefined);

const STORAGE_KEYS = {
  VEHICLES: 'tal_vehicles_v1',
  ORDERS: 'tal_orders_v1',
  INSTALLMENTS: 'tal_installments_v1',
  INSPECTIONS: 'tal_inspections_v1',
  SETTINGS: 'tal_settings_v1',
  NOTIFICATIONS: 'tal_notifications_v1',
  USER: 'tal_user_v1'
};

export const DealershipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state with fallback to seed data
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.VEHICLES);
      return stored ? JSON.parse(stored) : INITIAL_VEHICLES;
    } catch {
      return INITIAL_VEHICLES;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return stored ? JSON.parse(stored) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [installments, setInstallments] = useState<InstallmentApplication[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.INSTALLMENTS);
      return stored ? JSON.parse(stored) : INITIAL_INSTALLMENTS;
    } catch {
      return INITIAL_INSTALLMENTS;
    }
  });

  const [inspections, setInspections] = useState<InspectionBooking[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.INSPECTIONS);
      return stored ? JSON.parse(stored) : INITIAL_INSPECTIONS;
    } catch {
      return INITIAL_INSPECTIONS;
    }
  });

  const [settings, setSettings] = useState<DealershipSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return stored ? JSON.parse(stored) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return stored ? JSON.parse(stored) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      return stored ? JSON.parse(stored) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  // Sync back to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INSTALLMENTS, JSON.stringify(installments));
  }, [installments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INSPECTIONS, JSON.stringify(inspections));
  }, [inspections]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  // Actions
  const addVehicle = (vehicleData: Omit<Vehicle, 'id' | 'createdAt'>): Vehicle => {
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: `tal-veh-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString()
    };
    setVehicles(prev => [newVehicle, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Vehicle Added to Inventory',
      message: `${newVehicle.year} ${newVehicle.make} ${newVehicle.model} is now live in the showroom.`,
      type: 'system',
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newVehicle;
  };

  const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const deleteVehicle = (id: string) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
  };

  const toggleSaveVehicle = (vehicleId: string) => {
    if (!currentUser) {
      // Create guest session if none
      const guest: UserAccount = {
        id: `usr-${Date.now().toString(36)}`,
        email: 'client@timberautos.ng',
        fullName: 'Valued Client',
        phone: '+2348143112826',
        role: 'customer',
        savedVehicleIds: [vehicleId],
        createdAt: new Date().toISOString()
      };
      setCurrentUser(guest);
      return;
    }

    const currentSaved = currentUser.savedVehicleIds || [];
    const isSaved = currentSaved.includes(vehicleId);
    const updatedSaved = isSaved
      ? currentSaved.filter(id => id !== vehicleId)
      : [...currentSaved, vehicleId];

    setCurrentUser({
      ...currentUser,
      savedVehicleIds: updatedSaved
    });
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'reference' | 'createdAt' | 'orderStatus' | 'paymentStatus'> & { paymentProofUrl?: string }): Order => {
    const refNumber = Math.floor(1000 + Math.random() * 9000);
    const reference = `TAL-ORD-${new Date().getFullYear()}-${refNumber}`;
    
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now().toString(36)}`,
      reference,
      orderStatus: orderData.paymentMethod === 'paystack' ? 'payment_verified' : 'pending',
      paymentStatus: orderData.paymentMethod === 'paystack' ? 'verified' : 'pending',
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);

    // Update vehicle availability to reserved or sold to prevent double-booking
    updateVehicle(orderData.vehicleId, {
      availability: orderData.paymentMethod === 'paystack' ? 'sold' : 'reserved'
    });

    // Notify admin
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Vehicle Order Placed',
      message: `${orderData.customer.fullName} placed order ${reference} for ${orderData.vehicleSnapshot.year} ${orderData.vehicleSnapshot.make} ${orderData.vehicleSnapshot.model} (₦${orderData.totalAmount.toLocaleString()}).`,
      type: 'order',
      targetId: newOrder.id,
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, adminNotes?: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const paymentStatus = (status === 'payment_verified' || status === 'completed') ? 'verified' : o.paymentStatus;
        return {
          ...o,
          orderStatus: status,
          paymentStatus,
          adminNotes: adminNotes ?? o.adminNotes
        };
      }
      return o;
    }));
  };

  const submitInstallment = (appData: Omit<InstallmentApplication, 'id' | 'reference' | 'createdAt' | 'status' | 'paymentSchedule'>): InstallmentApplication => {
    const refNumber = Math.floor(1000 + Math.random() * 9000);
    const reference = `TAL-INST-${new Date().getFullYear()}-${refNumber}`;

    // Generate tentative monthly schedule
    const schedule: InstallmentApplication['paymentSchedule'] = [];
    const today = new Date();
    for (let i = 1; i <= appData.durationMonths; i++) {
      const dueDate = new Date(today);
      dueDate.setMonth(today.getMonth() + i);
      schedule.push({
        id: `sch-${i}-${Date.now().toString(36)}`,
        monthNumber: i,
        dueDate: dueDate.toISOString().split('T')[0],
        amountDue: appData.monthlyPayment,
        status: 'unpaid'
      });
    }

    const newApp: InstallmentApplication = {
      ...appData,
      id: `inst-${Date.now().toString(36)}`,
      reference,
      status: 'pending',
      paymentSchedule: schedule,
      createdAt: new Date().toISOString()
    };

    setInstallments(prev => [newApp, ...prev]);

    // Notify admin
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Installment Application',
      message: `${appData.customer.fullName} submitted an application for ${appData.vehicleSnapshot.make} ${appData.vehicleSnapshot.model} (${appData.durationMonths} months).`,
      type: 'installment',
      targetId: newApp.id,
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newApp;
  };

  const updateInstallmentStatus = (appId: string, status: InstallmentStatus, adminNotes?: string) => {
    setInstallments(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status,
          adminNotes: adminNotes ?? app.adminNotes
        };
      }
      return app;
    }));
  };

  const recordInstallmentPayment = (appId: string, scheduleItemId: string) => {
    setInstallments(prev => prev.map(app => {
      if (app.id === appId && app.paymentSchedule) {
        const updatedSchedule = app.paymentSchedule.map(item => {
          if (item.id === scheduleItemId) {
            return {
              ...item,
              status: 'paid' as const,
              paidAt: new Date().toISOString(),
              paymentReference: `TAL-PAY-${Math.floor(10000 + Math.random() * 90000)}`,
              receiptNumber: `TAL-REC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`
            };
          }
          return item;
        });

        // Check if all paid
        const allPaid = updatedSchedule.every(s => s.status === 'paid');
        return {
          ...app,
          status: allPaid ? 'completed' : app.status,
          paymentSchedule: updatedSchedule
        };
      }
      return app;
    }));
  };

  const bookInspection = (bookingData: Omit<InspectionBooking, 'id' | 'reference' | 'createdAt' | 'status'>): { success: boolean; booking?: InspectionBooking; error?: string } => {
    // Check if slot is already booked for this date and time
    const slotTaken = inspections.some(
      b => b.status === 'confirmed' && b.preferredDate === bookingData.preferredDate && b.preferredTime === bookingData.preferredTime
    );

    if (slotTaken) {
      return {
        success: false,
        error: `The inspection slot on ${bookingData.preferredDate} at ${bookingData.preferredTime} has already been reserved. Please choose another time.`
      };
    }

    const refNumber = Math.floor(1000 + Math.random() * 9000);
    const reference = `TAL-INSP-${new Date().getFullYear()}-${refNumber}`;

    const newBooking: InspectionBooking = {
      ...bookingData,
      id: `insp-${Date.now().toString(36)}`,
      reference,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setInspections(prev => [newBooking, ...prev]);

    // Admin notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Vehicle Inspection Request',
      message: `${bookingData.customer.fullName} requested an inspection for ${bookingData.vehicleSnapshot.make} ${bookingData.vehicleSnapshot.model} on ${bookingData.preferredDate} at ${bookingData.preferredTime}.`,
      type: 'inspection',
      targetId: newBooking.id,
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);

    return { success: true, booking: newBooking };
  };

  const updateInspectionStatus = (
    bookingId: string,
    status: InspectionStatus,
    confirmedDate?: string,
    confirmedTime?: string,
    internalNotes?: string
  ) => {
    setInspections(prev => prev.map(insp => {
      if (insp.id === bookingId) {
        return {
          ...insp,
          status,
          confirmedDate: confirmedDate ?? insp.confirmedDate ?? insp.preferredDate,
          confirmedTime: confirmedTime ?? insp.confirmedTime ?? insp.preferredTime,
          internalNotes: internalNotes ?? insp.internalNotes
        };
      }
      return insp;
    }));
  };

  const submitFinancingEnquiry = (enquiryData: Omit<FinancingEnquiry, 'id' | 'reference' | 'createdAt'>): FinancingEnquiry => {
    const refNumber = Math.floor(1000 + Math.random() * 9000);
    const reference = `TAL-FIN-${new Date().getFullYear()}-${refNumber}`;

    const enquiry: FinancingEnquiry = {
      ...enquiryData,
      id: `fin-${Date.now().toString(36)}`,
      reference,
      createdAt: new Date().toISOString()
    };

    // Notify admin
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Autochek Financing Lead',
      message: `${enquiryData.customer.fullName} generated a pre-qualification lead for ${enquiryData.vehicleName || 'Vehicle Inventory'}.`,
      type: 'system',
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);

    return enquiry;
  };

  const updateSettings = (newSettings: DealershipSettings) => {
    setSettings(newSettings);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const loginAs = (role: 'customer' | 'admin', email?: string) => {
    if (role === 'admin') {
      setCurrentUser({
        id: 'usr-admin-1',
        email: email || 'admin@timberautos.ng',
        fullName: 'Timber Autos Managing Director',
        phone: '+2348143112826',
        role: 'admin',
        savedVehicleIds: [],
        createdAt: '2024-01-01T00:00:00Z'
      });
    } else {
      setCurrentUser({
        id: 'usr-customer-1',
        email: email || 'client@timberautos.ng',
        fullName: 'Alhaji Ibrahim Danjuma',
        phone: '+2348143112826',
        role: 'customer',
        savedVehicleIds: ['tal-veh-001', 'tal-veh-003'],
        createdAt: '2024-10-01T00:00:00Z'
      });
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const savedVehicles = vehicles.filter(v => currentUser?.savedVehicleIds?.includes(v.id));
  const isAdmin = currentUser?.role === 'admin';

  return (
    <DealershipContext.Provider
      value={{
        vehicles,
        orders,
        installments,
        inspections,
        settings,
        notifications,
        currentUser,
        savedVehicles,
        isAdmin,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        toggleSaveVehicle,
        placeOrder,
        updateOrderStatus,
        submitInstallment,
        updateInstallmentStatus,
        recordInstallmentPayment,
        bookInspection,
        updateInspectionStatus,
        submitFinancingEnquiry,
        updateSettings,
        markNotificationRead,
        loginAs,
        logout
      }}
    >
      {children}
    </DealershipContext.Provider>
  );
};

export const useDealership = () => {
  const context = useContext(DealershipContext);
  if (!context) {
    throw new Error('useDealership must be used within a DealershipProvider');
  }
  return context;
};
