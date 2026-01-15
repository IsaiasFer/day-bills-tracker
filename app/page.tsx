'use client';

import { useState, useEffect } from 'react';
import { Expense, ExpenseCategory } from '@/types/expense';
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
    description?: string
  ) => {
    if (!user) return;
    try {
      await expenseService.addExpense(selectedDate, category, amount, user.uid, title, description);
      await loadExpenses();
      setShowExpenseForm(false);
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Error al agregar el gasto. Por favor, intenta de nuevo.');
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este gasto?')) {
      try {
        await expenseService.deleteExpense(id);
        await loadExpenses();
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Error al eliminar el gasto. Por favor, intenta de nuevo.');
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
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet size={32} />
              <h1 className="text-3xl font-bold">Control de Gastos Diarios</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm opacity-90">Hola, {user.displayName}</span>
              <button
                onClick={handleLogout}
                className="text-sm bg-blue-700 hover:bg-blue-800 px-3 py-1.5 rounded transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600">Cargando gastos...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <CalendarView
                expenses={expenses}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                onMonthChange={handleMonthChange}
                currentMonth={currentMonth}
              />

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    Gastos del {selectedDate.toLocaleDateString('es-AR')}
                  </h2>
                  <button
                    onClick={() => setShowExpenseForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    <Plus size={20} />
                    Agregar Gasto
                  </button>
                </div>
                <ExpenseList expenses={dayExpenses} onDelete={handleDeleteExpense} />
              </div>
            </div>

            <div>
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
