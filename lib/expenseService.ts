import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  Timestamp,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';
import { Expense, ExpenseCategory } from '@/types/expense';

const EXPENSES_COLLECTION = 'expenses';

export const expenseService = {
  async addExpense(
    date: Date,
    category: ExpenseCategory,
    amount: number,
    description?: string
  ): Promise<string> {
    const now = new Date();
    const docRef = await addDoc(collection(db, EXPENSES_COLLECTION), {
      date: Timestamp.fromDate(date),
      category,
      amount,
      description: description || '',
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now),
    });
    return docRef.id;
  },

  async updateExpense(
    id: string,
    updates: Partial<Omit<Expense, 'id' | 'createdAt'>>
  ): Promise<void> {
    const docRef = doc(db, EXPENSES_COLLECTION, id);
    const updateData: Record<string, unknown> = {
      ...updates,
      updatedAt: Timestamp.fromDate(new Date()),
    };
    
    if (updates.date) {
      updateData.date = Timestamp.fromDate(updates.date);
    }
    
    await updateDoc(docRef, updateData);
  },

  async deleteExpense(id: string): Promise<void> {
    const docRef = doc(db, EXPENSES_COLLECTION, id);
    await deleteDoc(docRef);
  },

  async getExpensesByDateRange(startDate: Date, endDate: Date): Promise<Expense[]> {
    const q = query(
      collection(db, EXPENSES_COLLECTION),
      where('date', '>=', Timestamp.fromDate(startDate)),
      where('date', '<=', Timestamp.fromDate(endDate)),
      orderBy('date', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const expenses: Expense[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      expenses.push({
        id: doc.id,
        date: data.date.toDate(),
        category: data.category as ExpenseCategory,
        amount: data.amount,
        description: data.description,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      });
    });

    return expenses;
  },

  async getExpensesByDate(date: Date): Promise<Expense[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.getExpensesByDateRange(startOfDay, endOfDay);
  },
};
