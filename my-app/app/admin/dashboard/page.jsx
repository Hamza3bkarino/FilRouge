import { FiTrendingUp, FiMinus, FiAlertCircle, FiActivity, FiPlus, FiStar } from 'react-icons/fi';

export default function Dashboard() {
  const stats = [
    {
      title: 'Active Programs',
      value: '24',
      trend: '+12% this month',
      trendIcon: FiTrendingUp,
      trendColor: 'text-green-200',
      iconBg: 'text-emerald-500',
      icon: <FiActivity />,
    },
    {
      title: 'Total Products',
      value: '1,208',
      trend: 'Stable',
      trendIcon: FiMinus,
      trendColor: 'text-gray-500',
      iconBg: 'text-blue-400',
      icon: <FiStar />,
    },
    {
      title: 'Low Stock Alerts',
      value: '5',
      trend: 'Action needed',
      trendIcon: FiAlertCircle,
      trendColor: 'text-red-400',
      iconBg: 'text-yellow-400',
      icon: <FiAlertCircle />,
    },
    {
      title: 'AI Gens Today',
      value: '142',
      trend: '+45% usage',
      trendIcon: FiTrendingUp,
      trendColor: 'text-green-500',
      iconBg: 'text-purple-400',
      icon: <FiStar />,
    },
  ];

  return (
    <main className="max-w-7xl mx-auto w-full px-4 md:px-6 py-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">
              Dashboard Overview
            </h1>
            <p className="text-gray-400 text-sm font-medium mt-1">
              Manage your sports ecosystem efficiently.
            </p>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-gray-900 border border-white/10 hover:border-emerald-500/50 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all">
              <FiStar className="w-4 h-4 text-emerald-500" />
              AI Insights
            </button>

            <button className="flex items-center gap-2 bg-emerald-500 text-black px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-emerald-400 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <FiPlus className="w-4 h-4" />
              New Item
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {stats.map((stat, index) => {
            const TrendIcon = stat.trendIcon;
            return (
              <div
                key={index}
                className="bg-green-950/80  border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-white/10 transition-all"
              >
                {/* Background Icon */}
                <div className={`absolute right-0 top-0 p-4  transition-opacity text-6xl text-green-600/50`}>
                  {stat.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <p className="text-xs text-gray-400 font-bold uppercase mb-2">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-black text-white mb-3">
                    {stat.value}
                  </p>
                  <div className={`flex items-center gap-1 text-xs ${stat.trendColor} font-bold`}>
                    <TrendIcon className="w-3 h-3" />
                    {stat.trend}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
