import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import IncomeExpenseChart from '../components/IncomeExpenseChart';
import TransactionList from '../components/TransactionList';
import { useFinance } from '../context/FinanceContext';

const Dashboard: React.FC = () => {
  const { totalIncome, totalExpense, balance } = useFinance();

  const cards = [
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Total Expenses',
      amount: totalExpense,
      icon: TrendingDown,
      color: 'text-red-600 dark:text-red-400',
    },
    {
      title: 'Balance',
      amount: balance,
      icon: Wallet,
      color: balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text">
            Financial Dashboard
          </h1>
          <p className="text-gray-600 dark:text-dark-muted mt-2">
            Track your income and expenses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cards.map((card, index) => (
            <DashboardCard
              key={card.title}
              title={card.title}
              amount={card.amount}
              icon={card.icon}
              color={card.color}
              index={index}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <IncomeExpenseChart />
          <TransactionList limit={5} />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;