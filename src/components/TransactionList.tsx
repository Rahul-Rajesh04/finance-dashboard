import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/currency';
import { Transaction } from '../types/finance';

interface TransactionListProps {
  limit?: number;
  transactionsToShow?: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ limit, transactionsToShow }) => {
  const { transactions, deleteTransaction } = useFinance();
  
  const displayTransactions = transactionsToShow || transactions;
  const finalTransactions = limit 
    ? displayTransactions.slice(0, limit) 
    : displayTransactions;

  const handleDelete = (id: string) => {
    deleteTransaction(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-dark-surface rounded-xl shadow-lg border border-gray-200 dark:border-dark-border overflow-hidden"
    >
      <div className="p-6 border-b border-gray-200 dark:border-dark-border">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
          Recent Transactions
        </h3>
      </div>

      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence>
          {finalTransactions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 text-center text-gray-500 dark:text-dark-muted"
            >
              No transactions found
            </motion.div>
          ) : (
            finalTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                className="p-4 border-b border-gray-100 dark:border-dark-border/50 last:border-b-0 hover:bg-gray-50 dark:hover:bg-dark-border/20 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className={`p-2 rounded-full ${
                        transaction.type === 'income'
                          ? 'bg-green-100 dark:bg-green-900/30'
                          : 'bg-red-100 dark:bg-red-900/30'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {transaction.type === 'income' ? (
                        <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                      )}
                    </motion.div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-dark-text">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-dark-muted">
                        {transaction.category} • {new Date(transaction.date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`font-semibold ${
                        transaction.type === 'income'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>
                    <motion.button
                      onClick={() => handleDelete(transaction.id)}
                      className="p-1 text-gray-400 dark:text-dark-muted hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TransactionList;