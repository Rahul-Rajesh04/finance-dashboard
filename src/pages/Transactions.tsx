import React from 'react';
import { motion } from 'framer-motion';
import TransactionFilters from '../components/TransactionFilters';
import TransactionList from '../components/TransactionList';
import { useTransactionFilters } from '../hooks/useTransactionFilters';

const Transactions: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedType,
    setSelectedType,
    filteredTransactions,
  } = useTransactionFilters();

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
            All Transactions
          </h1>
          <p className="text-gray-600 dark:text-dark-muted mt-2">
            View and manage your transaction history
          </p>
        </motion.div>

        <TransactionFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        <TransactionList transactionsToShow={filteredTransactions} />
      </div>
    </motion.div>
  );
};

export default Transactions;