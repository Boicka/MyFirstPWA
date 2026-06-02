import { TransactionCategory } from './category.model';

export type TransactionType = 'gasto' | 'ingreso';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: TransactionCategory;
  cardId: string | null;
  date: string;
  createdAt: string;
}

export interface CategoryBreakdown {
  category: TransactionCategory;
  label: string;
  icon: string;
  color: string;
  total: number;
  percentage: number;
}
