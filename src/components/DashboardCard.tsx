import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

interface DashboardCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  color: string;
  index: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  amount, 
  icon: Icon, 
  color, 
  index 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}
      className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-lg border border-gray-200 dark:border-dark-border transition-all duration-200 hover:shadow-xl"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-dark-muted mb-1">
            {title}
          </p>
          <motion.p 
            className={`text-2xl font-bold ${color}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            {formatCurrency(amount)}
          </motion.p>
        </div>
        <motion.div
          className={`p-3 rounded-full ${color.includes('green') ? 'bg-green-100 dark:bg-green-900/30' : 
            color.includes('red') ? 'bg-red-100 dark:bg-red-900/30' : 
            'bg-blue-100 dark:bg-blue-900/30'}`}
          whileHover={{ rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className={`h-6 w-6 ${color}`} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardCard;