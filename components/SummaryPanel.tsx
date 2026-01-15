'use client';

import { ExpenseSummary } from '@/types/expense';
import { formatCurrency, formatDateDisplay } from '@/lib/utils';
import { UtensilsCrossed, Bus, Package, TrendingUp } from 'lucide-react';

interface SummaryPanelProps {
  summary: ExpenseSummary;
}

export function SummaryPanel({ summary }: SummaryPanelProps) {
  const categories = [
    {
      key: 'food' as const,
      label: 'Comida',
      icon: UtensilsCrossed,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      key: 'transport' as const,
      label: 'Transporte',
      icon: Bus,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      key: 'other' as const,
      label: 'Otros',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const getPercentage = (amount: number) => {
    if (summary.total === 0) return 0;
    return ((amount / summary.total) * 100).toFixed(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-blue-500" size={24} />
        <h3 className="text-xl font-bold">Resumen del Período</h3>
      </div>
      
      <div className="mb-4 text-sm text-gray-600">
        {formatDateDisplay(summary.period.start)} - {formatDateDisplay(summary.period.end)}
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="text-sm text-gray-600 mb-1">Total Gastado</div>
        <div className="text-3xl font-bold text-blue-600">
          {formatCurrency(summary.total)}
        </div>
      </div>

      <div className="space-y-3">
        {categories.map((category) => {
          const amount = summary.byCategory[category.key];
          const percentage = getPercentage(amount);
          const Icon = category.icon;

          return (
            <div key={category.key} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-full ${category.bgColor}`}>
                    <Icon className={category.color} size={20} />
                  </div>
                  <span className="font-medium">{category.label}</span>
                </div>
                <span className="text-sm text-gray-500">{percentage}%</span>
              </div>
              
              <div className="mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${category.bgColor.replace('50', '500')}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-lg font-semibold text-gray-800">
                {formatCurrency(amount)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
