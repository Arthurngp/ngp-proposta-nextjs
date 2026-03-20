import { ProposalData } from './types';

const STORAGE_KEY = 'ngp_proposal_data';

/**
 * Save proposal data to localStorage
 */
export function saveProposalData(data: ProposalData): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save proposal data:', error);
    }
  }
}

/**
 * Load proposal data from localStorage
 */
export function loadProposalData(): Partial<ProposalData> | null {
  if (typeof window !== 'undefined') {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load proposal data:', error);
      return null;
    }
  }
  return null;
}

/**
 * Clear all proposal data
 */
export function clearProposalData(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear proposal data:', error);
    }
  }
}
