export function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(amount).replace('NGN', '₦');
}

export function formatKm(km: number): string {
  return `${new Intl.NumberFormat('en-US').format(km)} km`;
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function formatCondition(condition: string): string {
  switch (condition) {
    case 'brand-new':
      return 'Brand-New';
    case 'foreign-used':
      return 'Foreign-Used (Tokunbo)';
    case 'nigerian-used':
      return 'Nigerian-Used';
    default:
      return condition;
  }
}
