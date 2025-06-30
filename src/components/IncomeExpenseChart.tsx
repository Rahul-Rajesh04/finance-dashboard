import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useFinance } from '../context/FinanceContext';
import { generateChartData } from '../data/mockData';
import { formatCurrency } from '../utils/currency';

const IncomeExpenseChart: React.FC = () => {
  const { transactions } = useFinance();
  const [timeRange, setTimeRange] = useState<'7days' | '30days'>('7days');
  
const chartData = generateChartData(transactions);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-dark-surface p-4 rounded-lg shadow-lg border border-gray-200 dark:border-dark-border"
        >
          <p className="text-sm font-medium text-gray-900 dark:text-dark-text mb-2">
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              className={`text-sm ${
                entry.dataKey === 'income' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {entry.dataKey === 'income' ? 'Income: ' : 'Expense: '}
              {formatCurrency(entry.value)}
            </p>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-lg border border-gray-200 dark:border-dark-border"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
          Income vs Expenses
        </h3>
        <div className="flex space-x-2">
          {(['7days', '30days'] as const).map((range) => (
            <motion.button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                timeRange === range
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'text-gray-600 dark:text-dark-muted hover:text-gray-900 dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-border/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {range === '7days' ? 'Last 7 Days' : 'Last Month'}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              className="opacity-30 dark:opacity-20" 
            />
            <XAxis 
              dataKey="date" 
              className="text-gray-600 dark:text-dark-muted"
              fontSize={12}
            />
            <YAxis 
              className="text-gray-600 dark:text-dark-muted"
              fontSize={12}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ 
                color: 'var(--text-color)',
                fontSize: '14px'
              }}
            />
            <Bar 
              dataKey="income" 
              fill="#10b981" 
              name="Income"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="expense" 
              fill="#ef4444" 
              name="Expense"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default IncomeExpenseChart;