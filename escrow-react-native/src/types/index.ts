export interface Transaction {
  id: string;
  name: string;
  status: string;
  amount: string;
  date: string;
  role: 'buyer' | 'seller';
  counterparty: string;
  category: string;
  description: string;
}

export interface Notification {
  id: number;
  type: 'success' | 'alert' | 'info' | 'payment';
  title: string;
  message: string;
  time: string;
  read: boolean;
  details?: any;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export type KYCStatus = 'pending' | 'under-review' | 'verified' | 'rejected';
