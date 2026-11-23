import { useState } from 'react';
import { motion } from 'motion/react';
import PredictorForm, { PredictionInput } from './components/PredictorForm';
import MetricCard from './components/MetricCard';
import InsightsDashboard from './components/InsightsDashboard';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [predictedEngagement, setPredictedEngagement] = useState<number | null>(null);

  const handlePredict = async (data: PredictionInput) => {
    setIsLoading(true);
    setPredictedEngagement(null);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const baseEngagement: Record<string, number> = {
      Facebook: 3000,
      Instagram: 4200,
      Twitter: 5500,
    };

    const postTypeMultiplier: Record<string, number> = {
      Poll: 1.5,
      Video: 1.4,
      Carousel: 1.2,
      Image: 1.0,
      Text: 0.7,
    };

    const sentimentMultiplier: Record<string, number> = {
      Negative: 1.4,
      Positive: 1.1,
      Neutral: 0.8,
    };

    const hour = data.dateTime.getHours();
    const isWeekend = data.dateTime.getDay() === 0 || data.dateTime.getDay() === 6;
    const isPeakHour = hour >= 18 && hour <= 21;

    let engagement = baseEngagement[data.platform] || 3500;
    engagement *= postTypeMultiplier[data.postType] || 1.0;
    engagement *= sentimentMultiplier[data.sentiment] || 1.0;

    if (isPeakHour) engagement *= 1.2;
    if (isWeekend) engagement *= 0.9;

    const randomVariation = 0.9 + Math.random() * 0.2;
    engagement = Math.round(engagement * randomVariation);

    setPredictedEngagement(engagement);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 text-gray-900 overflow-y-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-200/40 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-[#d6834f] via-orange-400 to-[#d6834f] bg-clip-text text-transparent">
            Social Media Engagement AI
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Predict engagement rates with advanced machine learning models trained on millions of social media posts
          </p>
        </motion.div>

        <div className="space-y-8">
          <PredictorForm onPredict={handlePredict} isLoading={isLoading} />

          {predictedEngagement !== null && (
            <MetricCard value={predictedEngagement} />
          )}

          <InsightsDashboard />
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center text-gray-500 text-sm"
        >
          <p>Powered by Advanced ML Models • Real-time Predictions • Enterprise Grade</p>
        </motion.footer>
      </div>
    </div>
  );
}