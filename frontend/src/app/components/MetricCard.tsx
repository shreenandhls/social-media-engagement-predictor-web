import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';

interface MetricCardProps {
  value: number | null;
}

export default function MetricCard({ value }: MetricCardProps) {
  if (value === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative backdrop-blur-xl bg-white rounded-3xl p-8 border border-orange-100 shadow-2xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-amber-500/20 to-[#d6834f]/20 animate-pulse"
           style={{ animationDuration: '3s' }} />
      <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(214,131,79,0.15)]" />

      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-[#d6834f]" />
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">
            Predicted Engagement Rate
          </p>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.4 }}
        >
          <h1 className="text-7xl font-bold bg-gradient-to-r from-orange-500 via-[#d6834f] to-amber-500 bg-clip-text text-transparent mb-2">
            {value.toLocaleString()}
          </h1>
        </motion.div>

        <p className="text-gray-500 text-sm">Expected Interactions</p>
      </div>
    </motion.div>
  );
}
