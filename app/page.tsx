'use client';

import { useState, useEffect } from 'react';
import { Expense, ExpenseCategory, SubCategory } from '@/types/expense';
import { expenseService } from '@/lib/expenseService';
import { calculateExpenseSummary, getMonthDateRange } from '@/lib/utils';
import { CalendarView } from '@/components/CalendarView';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { SummaryPanel } from '@/components/SummaryPanel';
import { Plus, Wallet } from 'lucide-react';
import { startOfMonth, endOfMonth } from 'date-fns';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Home() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const loadExpenses = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const startDate = startOfMonth(currentMonth);
      const endDate = endOfMonth(currentMonth);
      const data = await expenseService.getExpensesByDateRange(startDate, endDate, user.uid);
      setExpenses(data);
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadExpenses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, user]);

  const handleAddExpense = async (
    category: ExpenseCategory,
    amount: number,
    title?: string,
    description?: string,
    subCategory?: SubCategory
  ) => {
    if (!user) {
      toast.error('No hay usuario logueado');
      return;
    }

    try {
      await expenseService.addExpense(selectedDate, category, amount, user.uid, title, description, subCategory);
      await loadExpenses();
      setShowExpenseForm(false);
      toast.success('Gasto agregado correctamente');
    } catch (error) {
      console.error('Error adding expense:', error);
      toast.error('Error al agregar el gasto');
    }
  };

  const handleDeleteExpense = async (id: string) => {
    // For a better UX, we could use a custom dialog, but native confirm is acceptable for now.
    // Alternatively, we could delete immediately and offer an "Undo" toast.
    // Using native confirm for simplicity as per plan, but replacing alerts with toast.
    if (confirm('¿Estás seguro de que quieres eliminar este gasto?')) {
      try {
        await expenseService.deleteExpense(id);
        await loadExpenses();
        toast.success('Gasto eliminado');
      } catch (error) {
        console.error('Error deleting expense:', error);
        toast.error('Error al eliminar el gasto');
      }
    }
  };

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Cargando...</div>
      </div>
    );
  }

  const dayExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getDate() === selectedDate.getDate() &&
      expenseDate.getMonth() === selectedDate.getMonth() &&
      expenseDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const monthRange = getMonthDateRange(currentMonth);
  const summary = calculateExpenseSummary(expenses, monthRange.start, monthRange.end);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-lg">
                <Wallet className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h1 className="text-xl md:text-3xl font-bold tracking-tight">Control de Gastos</h1>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-4">
              <span className="text-sm opacity-90 font-medium">Hola, {user.displayName?.split(' ')[0]}</span>
              <button
                onClick={handleLogout}
                className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all duration-200 backdrop-blur-sm font-medium border border-white/10"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 md:px-4 py-6 md:py-8 pb-24 md:pb-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <CalendarView
                expenses={expenses}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                onMonthChange={handleMonthChange}
                currentMonth={currentMonth}
              />

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-800">
                    <span className="block text-sm font-normal text-gray-500 mb-1">Gastos del día</span>
                    {selectedDate.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </h2>
                  <button
                    onClick={() => setShowExpenseForm(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all shadow-sm hover:shadow-md"
                  >
                    <Plus size={20} />
                    <span className="font-medium">Agregar Gasto</span>
                  </button>
                </div>
                <ExpenseList expenses={dayExpenses} onDelete={handleDeleteExpense} />
              </div>
            </div>

            <div className="order-first lg:order-last">
              <SummaryPanel summary={summary} />
            </div>
          </div>
        )}
      </main>

      {showExpenseForm && (
        <ExpenseForm
          date={selectedDate}
          onSubmit={handleAddExpense}
          onClose={() => setShowExpenseForm(false)}
        />
      )}
    </div>
  );
}
