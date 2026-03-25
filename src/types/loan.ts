export interface LoanOption {
  amount: number;
  fee: number;
}

export interface UserData {
  fullName: string;
  phoneNumber: string;
  idNumber: string;
  loanType: string;
}

export interface PaymentResponse {
  success: boolean;
  message?: string;
  transaction_request_id?: string;
  data?: any;
}

export const LOAN_OPTIONS: LoanOption[] = [
  { amount: 5500, fee: 199 },
  { amount: 6800, fee: 229 },
  { amount: 7800, fee: 269 },
  { amount: 9800, fee: 289 },
  { amount: 11200, fee: 329 },
  { amount: 16800, fee: 349 },
  { amount: 21200, fee: 369 },
  { amount: 25600, fee: 499 },
  { amount: 30000, fee: 569 },
  { amount: 35400, fee: 689 },
  { amount: 39800, fee: 829 },
  { amount: 44200, fee: 1109 },
  { amount: 48600, fee: 1699 },
  { amount: 60600, fee: 2149 },
];

export const LOAN_TYPES = [
  "Business Loan",
  "Personal Loan",
  "Education Loan",
  "Medical Loan",
  "Emergency Loan",
] as const;

export type LoanType = typeof LOAN_TYPES[number];
