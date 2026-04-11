export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
}

export type Category = 'Food' | 'Travel' | 'Bills' | 'Entertainment' | 'Shopping' | 'Other';
