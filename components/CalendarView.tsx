'use client';

import { useState } from 'react';
import { Expense } from '@/types/expense';
import { formatCurrency } from '@/lib/utils';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarViewProps {
  expenses: Expense[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onMonthChange: (date: Date) => void;
}

export function CalendarView({
  expenses,
  selectedDate,
  onDateSelect,
  onMonthChange,
}: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dateFormat = 'MMMM yyyy';
  const days = [];
  let day = startDate;

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const getExpensesForDay = (date: Date) => {
    return expenses.filter((expense) => isSameDay(expense.date, date));
  };

  const getDayTotal = (date: Date) => {
    const dayExpenses = getExpensesForDay(date);
    return dayExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  };

  const handlePrevMonth = () => {
    const newMonth = subMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    onMonthChange(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    onMonthChange(newMonth);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    onDateSelect(today);
    onMonthChange(today);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold capitalize">
          {format(currentMonth, dateFormat, { locale: es })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleToday}
            className="px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
          >
            <CalendarIcon size={16} />
            Hoy
          </button>
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-gray-700 py-2 text-sm"
          >
            {day}
          </div>
        ))}

        {days.map((day, index) => {
          const dayExpenses = getExpensesForDay(day);
          const dayTotal = getDayTotal(day);
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isToday = isSameDay(day, new Date());

          return (
            <button
              key={index}
              onClick={() => onDateSelect(day)}
              className={`
                min-h-[80px] p-2 border border-gray-200 rounded-lg
                transition-all hover:shadow-md
                ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
                ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
                ${isToday && !isSelected ? 'ring-2 ring-green-500' : ''}
              `}
            >
              <div className="text-sm font-semibold mb-1">
                {format(day, 'd')}
              </div>
              {dayExpenses.length > 0 && isCurrentMonth && (
                <div className="space-y-1">
                  <div className="text-xs font-medium text-blue-600">
                    {formatCurrency(dayTotal)}
                  </div>
                  <div className="flex gap-1 justify-center flex-wrap">
                    {dayExpenses.some((e) => e.category === 'food') && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                    {dayExpenses.some((e) => e.category === 'transport') && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                    {dayExpenses.some((e) => e.category === 'other') && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
