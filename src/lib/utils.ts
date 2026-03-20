/**
 * Format a date from YYYY-MM-DD to DD/MM/YYYY
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

/**
 * Escape HTML to prevent XSS
 */
export function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Format currency value
 */
export function formatCurrency(value: string): string {
  if (!value) return 'R$ —';
  const num = parseFloat(value.replace(/[^\d.,-]/g, '').replace(',', '.'));
  if (isNaN(num)) return 'R$ —';
  return `R$ ${num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Display value with fallback
 */
export function displayValue(value: string, fallback: string = '—'): string {
  return value?.trim() || fallback;
}

/**
 * Parse currency string to number
 */
export function parseCurrency(value: string): number {
  const num = parseFloat(value.replace(/[^\d.,-]/g, '').replace(',', '.'));
  return isNaN(num) ? 0 : num;
}

/**
 * Calculate total monthly investment
 */
export function calculateTotal(services: Array<{ val: string }>): number {
  return services.reduce((sum, svc) => sum + parseCurrency(svc.val), 0);
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
