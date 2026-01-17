import {
  UtensilsCrossed,
  Bus,
  Package,
  Car,
  Bike,
  ShoppingBag,
  Home,
  Store
} from 'lucide-react';
import { ExpenseCategory, SubCategory } from '@/types/expense';

export const CATEGORY_CONFIG: Record<ExpenseCategory, {
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
  icon: any;
}> = {
  food: {
    label: 'Comida',
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    icon: UtensilsCrossed
  },
  transport: {
    label: 'Transporte',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    icon: Bus
  },
  other: {
    label: 'Otros',
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    icon: Package
  }
};

export const SUB_CATEGORY_CONFIG: Record<SubCategory, {
  label: string;
  color: string; // Tailwind class for text/icon color
  bgColor: string; // Tailwind class for background
  icon: any;
}> = {
  // Transport
  saeta: {
    label: 'Saeta',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    icon: Bus
  },
  didi: {
    label: 'DiDi',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    icon: Car
  },
  uber: {
    label: 'Uber',
    color: 'text-gray-800',
    bgColor: 'bg-gray-200',
    icon: Car
  },

  // Food
  pedidos_ya: {
    label: 'Pedidos Ya',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    icon: Bike
  },
  rappi: {
    label: 'Rappi',
    color: 'text-orange-500',
    bgColor: 'bg-orange-100',
    icon: Bike
  },
  homemade: {
    label: 'De casa',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    icon: Home
  },
  bought: {
    label: 'Comprado',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    icon: Store
  }
};

export const CATEGORY_SUB_CATEGORIES: Partial<Record<ExpenseCategory, SubCategory[]>> = {
  transport: ['saeta', 'didi', 'uber'],
  food: ['pedidos_ya', 'rappi', 'homemade', 'bought']
};

export const EXPENSES_COLLECTION = 'expenses';
