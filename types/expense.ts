export type ExpenseCategory = 'food' | 'transport' | 'other';

export interface Expense {
  id: string;
  date: Date;
  category: ExpenseCategory;
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
  period: {
    start: Date;
    end: Date;
  };
}

export type ViewMode = 'day' | 'week' | 'month' | 'year';
