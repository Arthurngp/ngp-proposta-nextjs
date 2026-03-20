/**
 * Service item in a proposal
 */
export interface Service {
  id: string;
  desc: string;      // Service description
  val: string;       // Monthly value
  note: string;      // Additional notes
}

/**
 * Diagnosis fields for the proposal context
 */
export interface Diagnosis {
  d1: string;        // How leads are received
  d2: string;        // First contact time
  d3: string;        // Conversion rate
  d4: string;        // CRM usage
}

/**
 * Complete proposal data
 */
export interface ProposalData {
  // 1. Identification
  num: string;
  data: string;
  val: string;
  resp: string;

  // 2. Client Data
  rz: string;        // Company name
  cnpj: string;      // CNPJ/CPF
  dec: string;       // Decision maker
  cargo: string;     // Position
  wa: string;        // WhatsApp
  email: string;     // Email
  cidade: string;    // City/State
  seg: string;       // Segment
  site: string;      // Website/Instagram

  // 3. Business Context
  dor: string;       // Pain point
  fat: string;       // Monthly revenue
  tkt: string;       // Average ticket
  traf: string;      // Traffic investment

  // 3.1 Diagnosis
  d1: string;
  d2: string;
  d3: string;
  d4: string;

  // 4. Services
  services: Service[];

  // 5. Commercial Terms
  prazo: string;     // Contract term
  pag: string;       // Payment method
  inicio: string;    // Expected start
  onb: string;       // Onboarding days

  // 6. Observations
  obs: string;

  // 7. NGP Contact
  nfone: string;
  nemail: string;
  nsite: string;
}

/**
 * Progress tracking
 */
export interface ProgressData {
  filled: number;
  total: number;
  percentage: number;
}
