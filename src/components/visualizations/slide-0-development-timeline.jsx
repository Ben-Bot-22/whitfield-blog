import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

// Slide 0: Improved Development Timeline
// Shows months on x-axis, hours as bars, colored by tool era
// Phase labels annotated below

export default function DevelopmentTimelineV2() {
  // Monthly hours data with tool era and phase info
  const monthlyData = [
    { month: 'Jan 24', hours: 80, era: 'gpt', phase: 'Voice Training' },
    { month: 'Feb 24', hours: 60, era: 'gpt', phase: 'Voice Training' },
    { month: 'Mar 24', hours: 60, era: 'gpt', phase: 'Voice Training' },
    { month: 'Apr 24', hours: 60, era: 'gpt', phase: 'Stripe + Voice' },
    { month: 'May 24', hours: 120, era: 'gpt', phase: 'Container Deploy' },
    { month: 'Jun 24', hours: 90, era: 'gpt', phase: 'Extension MVP' },
    { month: 'Jul 24', hours: 120, era: 'gpt', phase: 'Extension MVP' },
    { month: 'Aug 24', hours: 95, era: 'gpt', phase: 'Extension MVP' },
    { month: 'Sep 24', hours: 100, era: 'gpt', phase: 'Web App' },
    { month: 'Oct 24', hours: 110, era: 'gpt', phase: 'Web App' },
    { month: 'Nov 24', hours: 100, era: 'cursor', phase: 'Auth + Infra' },
    { month: 'Dec 24', hours: 90, era: 'cursor', phase: 'Lazy Loading' },
    { month: 'Jan 25', hours: 80, era: 'cursor', phase: 'Documents' },
    { month: 'Feb 25', hours: 85, era: 'windsurf', phase: 'TanStack Virtual' },
    { month: 'Mar 25', hours: 75, era: 'windsurf', phase: 'Import Web Page' },
    { month: 'Apr 25', hours: 90, era: 'windsurf', phase: 'Stripe v2' },
    { month: 'May 25', hours: 80, era: 'windsurf', phase: 'Reader UX' },
    { month: 'Jun 25', hours: 85, era: 'windsurf', phase: 'Reader UX' },
    { month: 'Jul 25', hours: 120, era: 'claude', phase: 'Mobile + Capacitor' },
    { month: 'Aug 25', hours: 95, era: 'claude', phase: 'Voice Training v2' },
    { month: 'Sep 25', hours: 90, era: 'claude', phase: 'Reader Polish' },
    { month: 'Oct 25', hours: 110, era: 'claude', phase: 'Search' },
    { month: 'Nov 25', hours: 105, era: 'claude', phase: 'Search + Scroll' },
  ];

  const getColor = (era) => {
    switch(era) {
      case 'gpt': return '#6B7280';
      case 'cursor': return '#06B6D4';  // Teal
      case 'windsurf': return '#EC4899'; // Pink
      case 'claude': return '#F97316';
      default: return '#6B7280';
    }
  };

  // Calculate totals by era
  const totals = {
    gpt: monthlyData.filter(d => d.era === 'gpt').reduce((a, b) => a + b.hours, 0),
    cursor: monthlyData.filter(d => d.era === 'cursor').reduce((a, b) => a + b.hours, 0),
    windsurf: monthlyData.filter(d => d.era === 'windsurf').reduce((a, b) => a + b.hours, 0),
    claude: monthlyData.filter(d => d.era === 'claude').reduce((a, b) => a + b.hours, 0),
  };

  const totalHours = Object.values(totals).reduce((a, b) => a + b, 0);

  // Phase annotations for below the chart
  const phases = [
    { label: 'Voice Training', start: 0, end: 3, color: '#6B7280' },
    { label: 'Extension MVP', start: 5, end: 8, color: '#6B7280' },
    { label: 'Web App', start: 8, end: 10, color: '#6B7280' },
    { label: 'Auth/Docs', start: 10, end: 13, color: '#3B82F6' },
    { label: 'Reader UX', start: 13, end: 18, color: '#8B5CF6' },
    { label: 'Mobile + Search', start: 18, end: 23, color: '#F97316' },
  ];

  return (
    <div className="bg-slate-900 text-white p-8 rounded-xl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Development Timeline</h2>
          <p className="text-slate-400">22 months • {totalHours.toLocaleString()} hours tracked • 4 AI tools</p>
        </div>

        {/* Era Summary Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-3 h-3 rounded bg-gray-500"></div>
              <span className="text-sm text-slate-400">GPT Era</span>
            </div>
            <div className="text-xl font-bold">{totals.gpt}h</div>
            <div className="text-xs text-slate-500">Jan-Oct '24</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-3 h-3 rounded bg-cyan-500"></div>
              <span className="text-sm text-slate-400">Cursor</span>
            </div>
            <div className="text-xl font-bold">{totals.cursor}h</div>
            <div className="text-xs text-slate-500">Nov '24-Jan '25</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-3 h-3 rounded bg-pink-500"></div>
              <span className="text-sm text-slate-400">Windsurf</span>
            </div>
            <div className="text-xl font-bold">{totals.windsurf}h</div>
            <div className="text-xs text-slate-500">Feb-Jun '25</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 text-center border border-orange-500/30">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-3 h-3 rounded bg-orange-500"></div>
              <span className="text-sm text-orange-400">Claude Code</span>
            </div>
            <div className="text-xl font-bold text-orange-400">{totals.claude}h</div>
            <div className="text-xs text-slate-500">Jul-Nov '25</div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="bg-slate-800 rounded-lg p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData} margin={{ top: 20, right: 20, bottom: 60, left: 40 }}>
              <XAxis 
                dataKey="month" 
                stroke="#94a3b8" 
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8' }}
                tickFormatter={(v) => `${v}h`}
                domain={[0, 140]}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                formatter={(value, name, props) => [
                  <div key="tt" className="text-white">
                    <div className="font-bold text-white">{value} hours</div>
                    <div className="text-sm text-slate-400">{props.payload.phase}</div>
                  </div>,
                  ''
                ]}
                labelStyle={{ color: '#f8fafc' }}
                labelFormatter={(label) => label}
              />
              <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                {monthlyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.era)} />
                ))}
              </Bar>
              {/* Claude Code adoption line */}
              <ReferenceLine 
                x="Jul 25" 
                stroke="#22C55E" 
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Phase Labels Below Chart */}
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="text-xs text-slate-500 mb-2">Major Phases:</div>
            <div className="flex flex-wrap gap-2">
              {[
                { phase: 'Voice Training', era: 'gpt' },
                { phase: 'Extension MVP', era: 'gpt' },
                { phase: 'Web App', era: 'gpt' },
                { phase: 'Auth + Lazy Loading', era: 'cursor' },
                { phase: 'TanStack + Reader UX', era: 'windsurf' },
                { phase: 'Mobile + Capacitor', era: 'claude' },
                { phase: 'Voice Training v2', era: 'claude' },
                { phase: 'Search + Polish', era: 'claude' },
              ].map((p) => (
                <div 
                  key={p.phase}
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded"
                  style={{ backgroundColor: `${getColor(p.era)}20` }}
                >
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getColor(p.era) }}
                  ></div>
                  <span style={{ color: getColor(p.era) }}>{p.phase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Claude Code callout */}
        <div className="mt-4 bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 text-orange-400 font-medium mb-1">
            <span className="text-green-400">↑</span> Claude Code Adopted July 2025
          </div>
          <div className="text-slate-400 text-sm">
            Mobile optimization, Capacitor integration, voice training automation, search feature, scroll coordinator, and ongoing polish.
          </div>
        </div>
      </div>
    </div>
  );
}
