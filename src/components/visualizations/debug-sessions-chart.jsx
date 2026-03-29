import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

// Chart-only component for Debug Sessions
export default function DebugSessionsChart() {
  const debugSessions = [
    { name: 'Lazy Loading Text', hours: 59, days: 10, tool: 'Cursor', outcome: 'Restart after 30h', era: 'pre' },
    { name: 'Firebase Bundle (2x)', hours: 52, days: 'Multiple', tool: 'Cursor/Windsurf', outcome: 'Happened TWICE', era: 'pre' },
    { name: 'Web App Auth', hours: 50, days: 11, tool: 'Cursor', outcome: '3 approaches tried', era: 'pre' },
    { name: 'TanStack Virtual', hours: 40, days: 12, tool: 'Windsurf', outcome: 'Context drift → restart', era: 'windsurf' },
    { name: 'Mobile + Capacitor', hours: 40, days: 7, tool: 'Claude', outcome: 'Shipped + documented', era: 'claude' },
    { name: 'Search + Virtualization', hours: 35, days: 7, tool: 'Claude', outcome: 'Fixed + 1,600 lines docs', era: 'claude' },
    { name: 'Scroll Coordinator', hours: 15, days: 3, tool: 'Claude', outcome: 'Fixed + docs', era: 'claude' },
  ].sort((a, b) => b.hours - a.hours);

  const getColor = (era) => {
    switch(era) {
      case 'pre': return '#6B7280';
      case 'windsurf': return '#EC4899';
      case 'claude': return '#F97316';
      default: return '#6B7280';
    }
  };

  const getOutcomeColor = (outcome) => {
    if (outcome.includes('FAILED') || outcome.includes('TWICE')) return '#EF4444';
    if (outcome.includes('FIXED') || outcome.includes('Fixed')) return '#22C55E';
    return '#94A3B8';
  };

  const preClaudeAvg = debugSessions.filter(d => d.era === 'pre').reduce((a, b) => a + b.hours, 0) / debugSessions.filter(d => d.era === 'pre').length;
  const claudeAvg = debugSessions.filter(d => d.era === 'claude').reduce((a, b) => a + b.hours, 0) / debugSessions.filter(d => d.era === 'claude').length;

  return (
    <div className="bg-slate-800 rounded-lg p-4 md:p-6">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={debugSessions} layout="vertical" margin={{ left: 20, right: 20, top: 30, bottom: 10 }}>
          <XAxis
            type="number"
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
            domain={[0, 65]}
            tickFormatter={(v) => `${v}h`}
          />
          <YAxis
            dataKey="name"
            type="category"
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            width={120}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
            labelStyle={{ color: '#f8fafc' }}
            formatter={(value, name, props) => [
              <div key="tooltip">
                <div><strong>{value} hours</strong> over {props.payload.days} days</div>
                <div className="text-sm text-slate-400">Tool: {props.payload.tool}</div>
                <div className="text-sm" style={{ color: getOutcomeColor(props.payload.outcome) }}>
                  {props.payload.outcome}
                </div>
              </div>,
              ''
            ]}
          />
          <ReferenceLine x={preClaudeAvg} stroke="#6B7280" strokeDasharray="5 5" label={{ value: 'Pre-Claude Avg', fill: '#6B7280', fontSize: 10, position: 'top' }} />
          <ReferenceLine x={claudeAvg} stroke="#F97316" strokeDasharray="5 5" label={{ value: 'Claude Avg', fill: '#F97316', fontSize: 10, position: 'top' }} />
          <Bar dataKey="hours" radius={[0, 4, 4, 0]}>
            {debugSessions.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.era)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-500 rounded"></div>
          <span className="text-slate-400">Cursor (Pre-Claude)</span>
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
