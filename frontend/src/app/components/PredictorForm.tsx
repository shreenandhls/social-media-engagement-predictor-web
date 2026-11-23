import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, TrendingUp, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

interface PredictorFormProps {
  onPredict: (data: PredictionInput) => void;
  isLoading: boolean;
}

export interface PredictionInput {
  platform: string;
  postType: string;
  sentiment: string;
  dateTime: Date;
}

export default function PredictorForm({ onPredict, isLoading }: PredictorFormProps) {
  const [platform, setPlatform] = useState('Instagram');
  const [postType, setPostType] = useState('Image');
  const [sentiment, setSentiment] = useState('Positive');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict({
      platform,
      postType,
      sentiment,
      dateTime: selectedDate,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative backdrop-blur-xl bg-white rounded-3xl p-8 border border-orange-100 shadow-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/10 rounded-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#d6834f] to-amber-500">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#d6834f] to-amber-500 bg-clip-text text-transparent">
            Engagement Predictor
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-orange-50/50 border border-orange-100 text-gray-800 focus:border-[#d6834f] focus:outline-none focus:ring-2 focus:ring-[#d6834f]/20 transition-all"
              >
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="Twitter">Twitter</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Post Type</label>
              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-orange-50/50 border border-orange-100 text-gray-800 focus:border-[#d6834f] focus:outline-none focus:ring-2 focus:ring-[#d6834f]/20 transition-all"
              >
                <option value="Image">Image</option>
                <option value="Carousel">Carousel</option>
                <option value="Poll">Poll</option>
                <option value="Text">Text</option>
                <option value="Video">Video</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Sentiment Expected</label>
              <select
                value={sentiment}
                onChange={(e) => setSentiment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-orange-50/50 border border-orange-100 text-gray-800 focus:border-[#d6834f] focus:outline-none focus:ring-2 focus:ring-[#d6834f]/20 transition-all"
              >
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Post Date & Time</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="datetime-local"
                  value={format(selectedDate, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-orange-50/50 border border-orange-100 text-gray-800 focus:border-[#d6834f] focus:outline-none focus:ring-2 focus:ring-[#d6834f]/20 transition-all"
                />
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#d6834f] to-amber-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                Predicting...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Predict Engagement
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
