import { format, parseISO, differenceInCalendarDays, addDays, subDays, isValid } from 'date-fns';

export function formatDateFull(dateStr: string | null): string {
  if (!dateStr) return 'Select date';
  try {
    const d = parseISO(dateStr);
    if (!isValid(d)) return 'Select date';
    return format(d, 'dd MMM yyyy');
  } catch {
    return 'Select date';
  }
}

export function formatDateShort(dateStr: string | null): string {
  if (!dateStr) return '';
  try {
    const d = parseISO(dateStr);
    if (!isValid(d)) return '';
    return format(d, 'dd MMM');
  } catch {
    return '';
  }
}

export function calculateRentalPeriod(deliveryDateStr: string | null, pickupDateStr: string | null): {
  days: number;
  chargeableText: string;
  isValidRange: boolean;
} {
  if (!deliveryDateStr || !pickupDateStr) {
    return { days: 0, chargeableText: '--', isValidRange: false };
  }

  try {
    const delivery = parseISO(deliveryDateStr);
    const pickup = parseISO(pickupDateStr);

    if (!isValid(delivery) || !isValid(pickup)) {
      return { days: 0, chargeableText: '--', isValidRange: false };
    }

    const diffDays = differenceInCalendarDays(pickup, delivery);
    if (diffDays <= 0) {
      return { days: 0, chargeableText: '--', isValidRange: false };
    }

    let chargeableText = '--';
    if (diffDays > 2) {
      const chargeStart = addDays(delivery, 1);
      const chargeEnd = subDays(pickup, 1);
      chargeableText = `${format(chargeStart, 'dd MMM')} - ${format(chargeEnd, 'dd MMM')}`;
    } else if (diffDays === 2) {
      const singleCharge = addDays(delivery, 1);
      chargeableText = format(singleCharge, 'dd MMM');
    } else {
      chargeableText = format(delivery, 'dd MMM');
    }

    return {
      days: diffDays,
      chargeableText,
      isValidRange: true,
    };
  } catch {
    return { days: 0, chargeableText: '--', isValidRange: false };
  }
}
