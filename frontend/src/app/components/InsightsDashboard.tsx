import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3, Zap } from 'lucide-react';

const platformData = [
  { name: 'Facebook', value: 3200 },
  { name: 'Instagram', value: 4500 },
  { name: 'Twitter', value: 5800 },
];

const postTypeData = [
  { name: 'Poll', value: 5200 },
  { name: 'Video', value: 4800 },
  { name: 'Carousel', value: 3900 },
  { name: 'Image', value: 3400 },
  { name: 'Text', value: 2100 },
];

const sentimentData = [
  { name: 'Negative', value: 5500 },
  { name: 'Positive', value: 4200 },
  { name: 'Neutral', value: 2800 },
];

const driversData = [
  { name: 'Twitter Platform', value: 92 },
  { name: 'Time of Day', value: 78 },
  { name: 'Day of Week', value: 65 },
  { name: 'Facebook Images', value: 54 },
];

const colors = ['#d6834f', '#f59e0b', '#f97316', '#fbbf24', '#fdba74'];

interface ChartCardProps {
  title: string;
  icon: React.ReactNode;
  data: any[];
  dataKey: string;
  horizontal?: boolean;
  delay: number;
  chartId: string;
}

function ChartCard({ title, icon, data, dataKey, horizontal = false, delay, chartId }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative backdrop-blur-xl bg-white rounded-3xl p-6 border border-orange-100 shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 rounded-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          {icon}
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            id={chartId}
            data={data}
            layout={horizontal ? 'vertical' : 'horizontal'}
            margin={{ top: 5, right: 30, left: horizontal ? 20 : 0, bottom: 5 }}
          >
            <CartesianGrid key={`grid-${chartId}`} strokeDasharray="3 3" stroke="#e5e7eb" />
            {horizontal ? <XAxis key={`x-axis-num-${chartId}`} type="number" stroke="#6b7280" /> : <XAxis key={`x-axis-cat-${chartId}`} dataKey="name" stroke="#6b7280" />}
            {horizontal ? <YAxis key={`y-axis-cat-${chartId}`} type="category" dataKey="name" stroke="#6b7280" width={120} /> : <YAxis key={`y-axis-num-${chartId}`} stroke="#6b7280" />}
            <Tooltip key={`tooltip-${chartId}`}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(214, 131, 79, 0.2)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              labelStyle={{ color: '#1f2937', fontWeight: 600 }}
              itemStyle={{ color: '#d6834f', fontWeight: 500 }}
            />
            <Bar
              key={`bar-${chartId}`}
              dataKey={dataKey}
              radius={horizontal ? [0, 8, 8, 0] : [8, 8, 0, 0]}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`${chartId}-${entry.name}-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default function InsightsDashboard() {
  return (
    <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#d6834f] to-amber-500">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#d6834f] to-amber-500 bg-clip-text text-transparent">
            Historical Insights
          </h2>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Engagement by Platform"
          icon={<BarChart3 className="w-5 h-5 text-[#d6834f]" />}
          data={platformData}
          dataKey="value"
          delay={0.4}
          chartId="platform"
        />

        <ChartCard
          title="Engagement by Post Type"
          icon={<BarChart3 className="w-5 h-5 text-amber-500" />}
          data={postTypeData}
          dataKey="value"
          delay={0.5}
          chartId="posttype"
        />

        <ChartCard
          title="Engagement by Sentiment"
          icon={<Zap className="w-5 h-5 text-orange-500" />}
          data={sentimentData}
          dataKey="value"
          delay={0.6}
          chartId="sentiment"
        />

        <ChartCard
          title="Top Engagement Drivers"
          icon={<Zap className="w-5 h-5 text-[#d6834f]" />}
          data={driversData}
          dataKey="value"
          horizontal={true}
          delay={0.7}
          chartId="drivers"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="backdrop-blur-xl bg-orange-50 rounded-2xl p-4 border border-orange-100"
      >
        <p className="text-sm text-gray-600 text-center">
          <span className="text-[#d6834f] font-semibold">Insight:</span> Timing and platform-specific content optimization drives the highest engagement rates
        </p>
      </motion.div>
    </div>
  );
}
