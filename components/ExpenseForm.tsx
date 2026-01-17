import { useState, useEffect } from 'react';
import { ExpenseCategory, SubCategory } from '@/types/expense';
import { Plus, X } from 'lucide-react';
import { CATEGORY_CONFIG, CATEGORY_SUB_CATEGORIES, SUB_CATEGORY_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ExpenseFormProps {
  date: Date;
  onSubmit: (category: ExpenseCategory, amount: number, title?: string, description?: string, subCategory?: SubCategory) => void;
  onClose: () => void;
}

export function ExpenseForm({ date, onSubmit, onClose }: ExpenseFormProps) {
  const [category, setCategory] = useState<ExpenseCategory>('food');
  const [subCategory, setSubCategory] = useState<SubCategory | undefined>();
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Reset sub-category when category changes
  useEffect(() => {
    setSubCategory(undefined);
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);

    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Por favor, ingresa un monto válido mayor a 0');
      return;
    }

    onSubmit(category, amountNum, title || undefined, description || undefined, subCategory);
    setAmount('');
    setTitle('');
    setDescription('');
  };

  const availableSubCategories = CATEGORY_SUB_CATEGORIES[category];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in slide-in-from-bottom duration-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Agregar Gasto</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha
            </label>
            <input
              type="text"
              value={date.toLocaleDateString('es-AR')}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(CATEGORY_CONFIG) as ExpenseCategory[]).map((catKey) => {
                const config = CATEGORY_CONFIG[catKey];
                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => setCategory(catKey)}
                    className={cn(
                      "px-3 py-2 rounded-md font-medium transition-colors flex flex-col items-center gap-1",
                      category === catKey ? `${config.color} text-white` : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    <config.icon className="h-5 w-5" />
                    <span className="text-xs">{config.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {availableSubCategories && availableSubCategories.length > 0 && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo (Opcional)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableSubCategories.map((subCatKey) => {
                  const config = SUB_CATEGORY_CONFIG[subCatKey];
                  if (!config) return null;

                  return (
                    <button
                      key={subCatKey}
                      type="button"
                      onClick={() => setSubCategory(subCategory === subCatKey ? undefined : subCatKey)}
                      className={cn(
                        "px-2 py-2 rounded-md font-medium transition-all text-xs flex items-center justify-center gap-1.5 border",
                        subCategory === subCatKey
                          ? `${config.bgColor} ${config.color} border-${config.color.split('-')[1]}-400 ring-1 ring-${config.color.split('-')[1]}-400`
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <config.icon className="h-3.5 w-3.5" />
                      {config.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Almuerzo con amigos"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monto (ARS)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción (opcional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalles adicionales..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>

          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center gap-2 font-medium shadow-sm"
            >
              <Plus size={20} />
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
