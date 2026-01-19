'use client';

import { Expense } from '@/types/expense';
import { formatCurrency } from '@/lib/utils';
import { Trash2, Package, Pencil } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

import { CATEGORY_CONFIG, SUB_CATEGORY_CONFIG } from '@/lib/constants';

export function ExpenseList({ expenses, onDelete, onEdit }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <Package className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p className="text-lg font-medium text-gray-600">No hay gastos registrados</p>
        <p className="text-sm text-gray-400">Agrega un gasto para verlo aquí</p>
      </div>
    );
  }

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {expenses.map((expense) => {
          const categoryConfig = CATEGORY_CONFIG[expense.category];
          const subCategoryConfig = expense.subCategory ? SUB_CATEGORY_CONFIG[expense.subCategory] : null;

          const Icon = subCategoryConfig ? subCategoryConfig.icon : categoryConfig.icon;

          // Determine colors
          const iconContainerClass = subCategoryConfig
            ? `${subCategoryConfig.color} ${subCategoryConfig.bgColor}`
            : `${categoryConfig.textColor} ${categoryConfig.bgColor}`;

          const badgeClass = subCategoryConfig
            ? `${subCategoryConfig.color} ${subCategoryConfig.bgColor} border border-${subCategoryConfig.color.split('-')[1]}-200`
            : `${categoryConfig.textColor} ${categoryConfig.bgColor}`;

          return (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
              className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`p-2 rounded-full ${iconContainerClass}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {expense.title ? (
                      <span className="font-semibold text-gray-800">{expense.title}</span>
                    ) : (
                      <span className="font-medium text-gray-700">
                        {subCategoryConfig ? subCategoryConfig.label : categoryConfig.label}
                      </span>
                    )}

                    <span className={`text-xs px-2 py-0.5 rounded-full ${badgeClass}`}>
                      {subCategoryConfig ? subCategoryConfig.label : categoryConfig.label}
                    </span>
                  </div>
                  {expense.description && (
                    <p className="text-sm text-gray-600 mt-0.5">{expense.description}</p>
                  )}
                  <div className="text-lg font-semibold text-gray-800">
                    {formatCurrency(expense.amount)}
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => onEdit(expense)}
                  className="p-2 text-blue-500 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100 hover:bg-blue-50 rounded-lg transition-all"
                  title="Editar gasto"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(expense.id)}
                  className="p-2 text-red-500 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100 hover:bg-red-50 rounded-lg transition-all"
                  title="Eliminar gasto"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <div className="pt-3 border-t border-gray-200">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total del día:</span>
          <span className="text-blue-600">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
