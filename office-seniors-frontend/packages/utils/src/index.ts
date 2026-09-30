export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function formatDateTime(date: string, time: string): string {
  return `${formatDate(date)} at ${formatTime(time)}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount);
}

export function getInitials(firstName?: string | null, lastName?: string | null): string {
  const first = firstName?.charAt(0) || '';
  const last = lastName?.charAt(0) || '';
  return (first + last).toUpperCase() || '?';
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: '#22C55E',
    completed: '#3B82F6',
    pending: '#F59E0B',
    cancelled: '#EF4444',
    rejected: '#EF4444',
    approved: '#22C55E',
    disbursed: '#8B5CF6',
    claimed: '#06B6D4',
    'no-show': '#F97316',
    'under_review': '#F59E0B',
    waitlisted: '#6B7280',
    dropped: '#EF4444',
    scheduled: '#3B82F6',
    confirmed: '#22C55E',
  };
  return colors[status] || '#6B7280';
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
