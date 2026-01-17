'use client';

import { useState, useEffect } from 'react';
import { Expense } from '@/types/expense';
import { CATEGORY_CONFIG, SUB_CATEGORY_CONFIG } from '@/lib/constants';
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
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  expenses: Expense[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onMonthChange: (date: Date) => void;
  currentMonth: Date;
}

export function CalendarView({
  expenses,
  selectedDate,
  onDateSelect,
  onMonthChange,
  currentMonth: propCurrentMonth,
}: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(propCurrentMonth);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setCurrentMonth(propCurrentMonth);
  }, [propCurrentMonth]);

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
    setDirection(-1);
    const newMonth = subMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    onMonthChange(newMonth);
  };

  const handleNextMonth = () => {
    setDirection(1);
    const newMonth = addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    onMonthChange(newMonth);
  };

  const handleToday = () => {
    setDirection(0);
    const today = new Date();
    setCurrentMonth(today);
    onDateSelect(today);
    onMonthChange(today);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold capitalize text-gray-900 bg-gray-50 px-4 py-2 rounded-lg w-full sm:w-auto text-center sm:text-left">
          {format(currentMonth, dateFormat, { locale: es })}
        </h2>
        <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={handleToday}
            className="flex-1 sm:flex-none justify-center px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 transition-colors shadow-sm"
          >
            <CalendarIcon size={16} />
            Hoy
          </button>
          <div className="flex gap-1">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900 transition-colors border border-gray-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900 transition-colors border border-gray-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center font-bold text-gray-900 py-2 text-sm uppercase tracking-wide opacity-70"
          >
            {day}
          </div>
        ))}
      </div>

      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.div
          key={currentMonth.toString()}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="grid grid-cols-7 gap-1 md:gap-2"
        >
          {days.map((day, index) => {
            const dayExpenses = getExpensesForDay(day);
            const dayTotal = getDayTotal(day);
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isToday = isSameDay(day, new Date());

            return (
              <motion.button
                key={day.toISOString()}
                onClick={() => onDateSelect(day)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "min-h-[60px] md:min-h-[100px] p-1 md:p-2 border rounded-xl transition-colors relative flex flex-col justify-start items-center gap-0.5 md:gap-1",
                  isCurrentMonth ? "bg-white border-gray-200" : "bg-gray-50/50 border-gray-100 text-gray-300",
                  isSelected && "ring-2 ring-blue-500 bg-blue-50 z-10",
                  isToday && !isSelected && "ring-2 ring-green-500",
                  !isCurrentMonth && "pointer-events-none opacity-50"
                )}
              >
                <span className={cn(
                  "text-xs md:text-sm font-semibold mb-0 md:mb-1 w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full",
                  isToday ? "bg-green-600 text-white shadow-sm" :
                    isSelected ? "bg-blue-600 text-white" :
                      isCurrentMonth ? "text-gray-700" : "text-gray-300"
                )}>
                  {format(day, 'd')}
                </span>

                {dayExpenses.length > 0 && isCurrentMonth && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full flex flex-col items-center"
                  >
                    <div className="hidden md:block text-xs font-bold text-blue-700 truncate w-full text-center px-1">
                      {formatCurrency(dayTotal)}
                    </div>

                    {/* Mobile Dots */}
                    <div className="flex md:hidden gap-0.5 justify-center mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      {dayExpenses.length > 1 && <div className="w-1.5 h-1.5 rounded-full bg-blue-300"></div>}
                    </div>

                    {/* Desktop Dots */}
                    <div className="hidden md:flex gap-1 justify-center flex-wrap w-full mt-1 px-1">
                      {/* Show category dots, but if we have specific subcategories for that day, maybe show those specific colors? 
                          Space is limited. Let's start by just keeping the main category dots but making sure we cover all bases. 
                          The user asked for 'visually represent sub-categories'. 
                          Let's try: if a day has expenses of a category, show a dot. 
                          If specific subcats are important... for now let's stick to category grouping to avoid clutter, 
                          but use the subcategory color if there's only one expense? 
                          Or maybe just iterate expenses and show up to 3-4 dots with specific colors? */}

                      {dayExpenses.slice(0, 4).map((exp, i) => {
                        const subConfig = exp.subCategory ? SUB_CATEGORY_CONFIG[exp.subCategory] : null;
                        const catConfig = CATEGORY_CONFIG[exp.category];
                        // Use subcategory color if available, else category color
                        // Extract the color part like 'bg-blue-500' or 'text-blue-700' -> we need a background color class for the dot.
                        // Category config has 'color': 'bg-green-500'
                        // Subcat config has 'bgColor': 'bg-green-100', 'color': 'text-green-700'

                        // We probably want a solid color for the dot.
                        // For SubCategory, usually we want the 'text' color as background for the dot to be visible? Or a darker shade.

                        let dotClass = '';
                        if (subConfig) {
                          // Construct a bg class from the color name (e.g. text-blue-700 -> bg-blue-600)
                          const colorName = subConfig.color.split('-')[1]; // 'blue'
                          dotClass = `bg-${colorName}-500`;
                        } else {
                          dotClass = catConfig.color; // 'bg-green-500'
                        }

                        return (
                          <div
                            key={exp.id}
                            className={`w-1.5 h-1.5 rounded-full ${dotClass}`}
                            title={exp.title || catConfig.label}
                          />
                        );
                      })}
                      {dayExpenses.length > 4 && (
                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
