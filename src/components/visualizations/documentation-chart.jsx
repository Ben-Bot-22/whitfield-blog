import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Chart-only component for Documentation
export default function DocumentationChart() {
  const docs = [
    { name: 'search-virtualization-deep-dive.md', lines: 1600, category: 'Debug Session' },
    { name: 'search-feature-architecture.md', lines: 500, category: 'Architecture' },
    { name: 'scroll-coordinator-guide.md', lines: 500, category: 'Patterns' },
    { name: 'firebase-architecture.md', lines: 375, category: 'Architecture' },
    { name: 'senja-testimonial-rewards.md', lines: 200, category: 'Integration' },
    { name: 'Other ai_docs/', lines: 500, category: 'Various' },
  ];

  return (
    <div className="bg-slate-800 rounded-lg p-4 md:p-6">
      <h3 className="text-lg font-semibold mb-4">Documentation by File</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={docs} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
          <XAxis
            type="number"
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
            tickFormatter={(v) => `${v}`}
            domain={[0, 1800]}
            label={{ value: 'Lines', position: 'insideBottom', offset: -5, fill: '#94a3b8', fontSize: 12 }}
          />
          <YAxis
            dataKey="name"
            type="category"
            stroke="#94a3b8"
            width={180}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
            labelStyle={{ color: '#f8fafc' }}
            itemStyle={{ color: '#f8fafc' }}
            formatter={(value, name, props) => [`${value} lines`, props.payload.category]}
          />
          <Bar dataKey="lines" fill="#F97316" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
