'use client';

import { ExpenseSummary } from '@/types/expense';
import { formatCurrency, formatDateDisplay } from '@/lib/utils';
import { CATEGORY_SUB_CATEGORIES, SUB_CATEGORY_CONFIG } from '@/lib/constants';
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
        <h3 className="text-xl font-bold text-gray-800">Resumen del Período</h3>
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

          // Get sub-categories for this category if any
          const subCats = CATEGORY_SUB_CATEGORIES[category.key];
          const hasSubCats = subCats && subCats.some(sc => (summary.bySubCategory[sc] || 0) > 0);

          return (
            <div key={category.key} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-full ${category.bgColor}`}>
                    <Icon className={category.color} size={20} />
                  </div>
                  <span className="font-medium text-gray-800">{category.label}</span>
                </div>
                <span className="text-sm text-gray-600">{percentage}%</span>
              </div>

              <div className="mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${category.bgColor.replace('50', '500')}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-lg font-semibold text-gray-800 mb-1">
                {formatCurrency(amount)}
              </div>

              {/* Sub-categories breakdown */}
              {hasSubCats && subCats && (
                <div className="mt-3 pl-2 space-y-1 border-l-2 border-gray-100">
                  {subCats.map(subCat => {
                    const subAmount = summary.bySubCategory[subCat] || 0;
                    if (subAmount === 0) return null;
                    const subConfig = SUB_CATEGORY_CONFIG[subCat];
                    const subPercent = ((subAmount / amount) * 100).toFixed(0);

                    return (
                      <div key={subCat} className="flex justify-between items-center text-xs pl-2">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <div className={`w-1.5 h-1.5 rounded-full ${subConfig.bgColor.replace('100', '500').replace('200', '500')}`}></div>
                          <span>{subConfig.label}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-gray-400">{subPercent}%</span>
                          <span className="font-medium text-gray-700">{formatCurrency(subAmount)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
