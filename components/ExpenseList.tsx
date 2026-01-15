'use client';

import { Expense } from '@/types/expense';
import { formatCurrency } from '@/lib/utils';
import { Trash2, UtensilsCrossed, Bus, Package } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const categoryIcons = {
  food: UtensilsCrossed,
  transport: Bus,
  other: Package,
};

const categoryColors = {
  food: 'text-green-600 bg-green-50',
  transport: 'text-blue-600 bg-blue-50',
  other: 'text-purple-600 bg-purple-50',
};

const categoryLabels = {
  food: 'Comida',
  transport: 'Transporte',
  other: 'Otros',
};

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay gastos registrados para este día
      </div>
    );
  }

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="space-y-3">
      {expenses.map((expense) => {
        const Icon = categoryIcons[expense.category];
        return (
          <div
            key={expense.id}
            className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className={`p-2 rounded-full ${categoryColors[expense.category]}`}>
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{categoryLabels[expense.category]}</span>
                  {expense.description && (
                    <span className="text-sm text-gray-500">- {expense.description}</span>
                  )}
                </div>
                <div className="text-lg font-semibold text-gray-800">
                  {formatCurrency(expense.amount)}
                </div>
              </div>
            </div>
            <button
              onClick={() => onDelete(expense.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Eliminar gasto"
            >
              <Trash2 size={18} />
            </button>
          </div>
        );
      })}
      
      <div className="pt-3 border-t border-gray-200">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total del día:</span>
          <span className="text-blue-600">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
