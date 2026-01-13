import { Expense, ExpenseSummary } from '@/types/expense';
import {
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  format,
} from 'date-fns';

export function calculateExpenseSummary(
  expenses: Expense[],
  startDate: Date,
  endDate: Date
): ExpenseSummary {
  const summary: ExpenseSummary = {
    total: 0,
    byCategory: {
      food: 0,
      transport: 0,
      other: 0,
    },
    period: {
      start: startDate,
      end: endDate,
    },
  };

  expenses.forEach((expense) => {
    summary.total += expense.amount;
    summary.byCategory[expense.category] += expense.amount;
  });

  return summary;
}

export function getMonthDateRange(date: Date): { start: Date; end: Date } {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date),
  };
}

export function getYearDateRange(date: Date): { start: Date; end: Date } {
  return {
    start: startOfYear(date),
    end: endOfYear(date),
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(amount);
}

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function formatDateDisplay(date: Date): string {
  return format(date, 'dd/MM/yyyy');
}
