export type ExpenseCategory = 'food' | 'transport' | 'other';
export type TransportSubCategory = 'saeta' | 'didi' | 'uber';
export type FoodSubCategory = 'pedidos_ya' | 'rappi' | 'homemade' | 'bought';

export type SubCategory = TransportSubCategory | FoodSubCategory;

export interface Expense {
  id: string;
  title?: string;
  date: Date;
  category: ExpenseCategory;
  subCategory?: SubCategory;
  amount: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DayExpenses {
  date: string; // YYYY-MM-DD format
  expenses: Expense[];
  total: number;
  byCategory: {
    food: number;
    transport: number;
    other: number;
  };
}

export interface ExpenseSummary {
  total: number;
  byCategory: {
    food: number;
    transport: number;
    other: number;
  };
  bySubCategory: Record<string, number>;
  period: {
    start: Date;
    end: Date;
  };
}

export type ViewMode = 'day' | 'week' | 'month' | 'year';
