import { Transaction } from '../types/finance';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 75000,
    description: 'Salary',
    category: 'Salary',
    date: '2025-06-24',
  },
  {
    id: '2',
    type: 'expense',
    amount: 1200,
    description: 'Groceries',
    category: 'Food',
    date: '2025-06-26',
  },
  {
    id: '3',
    type: 'expense',
    amount: 30000,
    description: 'Rent',
    category: 'Housing',
    date: '2025-06-27',
  },
  {
    id: '4',
    type: 'income',
    amount: 5000,
    description: 'Freelance Project',
    category: 'Freelance',
    date: '2025-06-28',
  },
  {
    id: '5',
    type: 'expense',
    amount: 800,
    description: 'Electricity Bill',
    category: 'Utilities',
    date: '2025-06-30',
  },
  {
    id: '6',
    type: 'expense',
    amount: 3500,
    description: 'Internet & Phone',
    category: 'Utilities',
    date: '2025-06-28',
  },
  {
    id: '7',
    type: 'income',
    amount: 2000,
    description: 'Investment Returns',
    category: 'Investment',
    date: '2025-06-29',
  },
  {
    id: '8',
    type: 'expense',
    amount: 1500,
    description: 'Transportation',
    category: 'Transport',
    date: '2025-06-24',
  },
  {
  id: '9',
  type: 'expense',
  amount: 600,
  description: 'Coffee and Snacks',
  category: 'Food',
  date: '2025-06-24',
},
{
  id: '10',
  type: 'income',
  amount: 1500,
  description: 'Cashback Bonus',
  category: 'Rewards',
  date: '2025-06-25',
},
{
  id: '11',
  type: 'expense',
  amount: 2500,
  description: 'Movie & Dinner',
  category: 'Entertainment',
  date: '2025-06-26',
},
{
  id: '12',
  type: 'expense',
  amount: 1200,
  description: 'Pet Supplies',
  category: 'Pets',
  date: '2025-06-26',
},
{
  id: '13',
  type: 'income',
  amount: 7000,
  description: 'Online Course Sale',
  category: 'Side Hustle',
  date: '2025-06-27',
},
{
  id: '14',
  type: 'expense',
  amount: 2200,
  description: 'Gym Membership',
  category: 'Health',
  date: '2025-06-27',
},
{
  id: '15',
  type: 'income',
  amount: 1000,
  description: 'Referral Bonus',
  category: 'Rewards',
  date: '2025-06-28',
},
{
  id: '16',
  type: 'expense',
  amount: 950,
  description: 'Cab Ride',
  category: 'Transport',
  date: '2025-06-28',
},
{
  id: '17',
  type: 'expense',
  amount: 450,
  description: 'Book Purchase',
  category: 'Education',
  date: '2025-06-29',
},
{
  id: '18',
  type: 'income',
  amount: 3000,
  description: 'Dividends',
  category: 'Investment',
  date: '2025-06-29',
},
{
  id: '19',
  type: 'expense',
  amount: 1000,
  description: 'Water Bill',
  category: 'Utilities',
  date: '2025-06-30',
},
{
  id: '20',
  type: 'expense',
  amount: 1800,
  description: 'Grocery Shopping',
  category: 'Food',
  date: '2025-06-30',
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