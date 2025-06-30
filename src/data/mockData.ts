import { Transaction } from '../types/finance';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 75000,
    description: 'Salary',
    category: 'Salary',
    date: '2024-01-15',
  },
  {
    id: '2',
    type: 'expense',
    amount: 1200,
    description: 'Groceries',
    category: 'Food',
    date: '2024-01-14',
  },
  {
    id: '3',
    type: 'expense',
    amount: 25000,
    description: 'Rent',
    category: 'Housing',
    date: '2024-01-01',
  },
  {
    id: '4',
    type: 'income',
    amount: 5000,
    description: 'Freelance Project',
    category: 'Freelance',
    date: '2024-01-10',
  },
  {
    id: '5',
    type: 'expense',
    amount: 800,
    description: 'Electricity Bill',
    category: 'Utilities',
    date: '2024-01-05',
  },
  {
    id: '6',
    type: 'expense',
    amount: 3500,
    description: 'Internet & Phone',
    category: 'Utilities',
    date: '2024-01-03',
  },
  {
    id: '7',
    type: 'income',
    amount: 2000,
    description: 'Investment Returns',
    category: 'Investment',
    date: '2024-01-20',
  },
  {
    id: '8',
    type: 'expense',
    amount: 1500,
    description: 'Transportation',
    category: 'Transport',
    date: '2024-01-12',
  },
];

export const generateChartData = (transactions: Transaction[]) => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  return last7Days.map(date => {
    const dayTransactions = transactions.filter(t => t.date === date);
    const income = dayTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = dayTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      date: new Date(date).toLocaleDateString('en-IN', { 
        month: 'short', 
        day: 'numeric' 
      }),
      income,
      expense,
    };
  });
};