import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';

// Chart-only component for Commit Behavior
export default function CommitBehaviorChart() {
  const monthlyData = [
    { month: 'Jan 24', commits: 15, era: 'gpt' },
    { month: 'Feb 24', commits: 25, era: 'gpt' },
    { month: 'Mar 24', commits: 28, era: 'gpt' },
    { month: 'Apr 24', commits: 35, era: 'gpt' },
    { month: 'May 24', commits: 35, era: 'gpt' },
    { month: 'Jun 24', commits: 40, era: 'gpt' },
    { month: 'Jul 24', commits: 55, era: 'cursor' },
    { month: 'Aug 24', commits: 45, era: 'cursor' },
    { month: 'Sep 24', commits: 30, era: 'cursor' },
    { month: 'Oct 24', commits: 32, era: 'cursor' },
    { month: 'Nov 24', commits: 38, era: 'windsurf' },
    { month: 'Dec 24', commits: 28, era: 'windsurf' },
    { month: 'Jan 25', commits: 25, era: 'windsurf' },
    { month: 'Feb 25', commits: 30, era: 'windsurf' },
    { month: 'Mar 25', commits: 28, era: 'windsurf' },
    { month: 'Apr 25', commits: 32, era: 'windsurf' },
    { month: 'May 25', commits: 35, era: 'windsurf' },
    { month: 'Jun 25', commits: 40, era: 'windsurf' },
    { month: 'Jul 25', commits: 75, era: 'claude' },
    { month: 'Aug 25', commits: 80, era: 'claude' },
    { month: 'Sep 25', commits: 85, era: 'claude' },
    { month: 'Oct 25', commits: 90, era: 'claude' },
    { month: 'Nov 25', commits: 83, era: 'claude' },
  ];

  const getColor = (era) => {
    switch(era) {
      case 'gpt': return '#6B7280';
      case 'cursor': return '#06B6D4';
      case 'windsurf': return '#EC4899';
      case 'claude': return '#F97316';
      default: return '#6B7280';
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4 md:p-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData} margin={{ left: 10, right: 10, top: 30, bottom: 10 }}>
          <XAxis
            dataKey="month"
            stroke="#94a3b8"
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            interval={2}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
            domain={[0, 100]}
            label={{ value: 'Commits', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
            labelStyle={{ color: '#f8fafc' }}
            itemStyle={{ color: '#f8fafc' }}
            formatter={(value) => [`${value} commits`, 'Commits']}
          />
          <Bar dataKey="commits" radius={[4, 4, 0, 0]}>
            {monthlyData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.era)} />
            ))}
          </Bar>
          <ReferenceLine x="Jul 25" stroke="#22C55E" strokeDasharray="5 5" label={{ value: 'Claude Code', position: 'top', fill: '#22C55E', fontSize: 12 }} />
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex justify-center gap-4 md:gap-6 mt-4 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-500 rounded"></div>
          <span className="text-slate-400">GPT Era</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-cyan-500 rounded"></div>
          <span className="text-slate-400">Cursor</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-pink-500 rounded"></div>
          <span className="text-slate-400">Windsurf</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span className="text-slate-400">Claude Code</span>
        </div>
      </div>
    </div>
  );
}
