import React, { useState, useEffect } from 'react';

interface PerformanceData {
  method: string;
  milestoneScore: number;
  successRate: number;
  time: number;
  steps: number;
  tokens: number;
  costs: number | string;
  category: 'browser' | 'computer';
  setting: 'zero-shot' | 'demonstration';
}

const performanceData: PerformanceData[] = [
  // Zero-shot Browser-Use Agents
  { method: 'GPT-5', milestoneScore: 0.73, successRate: 51.33, time: 19.31, steps: 22.9, tokens: 245.24, costs: 0.55, category: 'browser', setting: 'zero-shot' },
  { method: 'o3', milestoneScore: 0.65, successRate: 45.67, time: 21.37, steps: 26.74, tokens: 237.16, costs: 0.56, category: 'browser', setting: 'zero-shot' },
  { method: 'Gemini-2.5-Pro', milestoneScore: 0.47, successRate: 31.00, time: 7.27, steps: 15.61, tokens: 134.94, costs: 0.24, category: 'browser', setting: 'zero-shot' },
  { method: 'Claude-4-sonnet', milestoneScore: 0.56, successRate: 34.67, time: 11.25, steps: 24.12, tokens: 353.47, costs: 1.16, category: 'browser', setting: 'zero-shot' },
  
  // Zero-shot Computer-Use Agents
  { method: 'UI-TARS-1.5-7B', milestoneScore: 0.10, successRate: 2.67, time: 6.14, steps: 35.43, tokens: 183.69, costs: '*', category: 'computer', setting: 'zero-shot' },
  { method: 'OpenCUA-7B', milestoneScore: 0.05, successRate: 0.67, time: 20.48, steps: 31.21, tokens: 133.88, costs: '*', category: 'computer', setting: 'zero-shot' },
  { method: 'OpenAI-CUA', milestoneScore: 0.29, successRate: 16.00, time: 5.80, steps: 31.32, tokens: 193.83, costs: 0.59, category: 'computer', setting: 'zero-shot' },
  { method: 'Claude-4-sonnet (computer)', milestoneScore: 0.48, successRate: 27.00, time: 8.02, steps: 35.24, tokens: 457.77, costs: 1.44, category: 'computer', setting: 'zero-shot' },
  { method: 'Agent-S2.5(w/GPT-5)', milestoneScore: 0.58, successRate: 39.00, time: 25.13, steps: 34.23, tokens: 597.92, costs: '1.17**', category: 'computer', setting: 'zero-shot' },
  
  // Demonstration-Augmented Browser-Use Agents
  { method: 'GPT-5', milestoneScore: 0.75, successRate: 53.85, time: 17.76, steps: 21.33, tokens: 232.76, costs: 0.51, category: 'browser', setting: 'demonstration' },
  { method: 'o3', milestoneScore: 0.69, successRate: 50.00, time: 17.05, steps: 25.33, tokens: 236.63, costs: 0.55, category: 'browser', setting: 'demonstration' },
  { method: 'Gemini-2.5-Pro', milestoneScore: 0.71, successRate: 46.15, time: 10.02, steps: 19.48, tokens: 177.13, costs: 0.31, category: 'browser', setting: 'demonstration' },
  { method: 'Claude-4-sonnet', milestoneScore: 0.68, successRate: 46.15, time: 11.21, steps: 23.92, tokens: 364.10, costs: 1.19, category: 'browser', setting: 'demonstration' },
  
  // Demonstration-Augmented Computer-Use Agents
  { method: 'UI-TARS-1.5-7B', milestoneScore: 0.24, successRate: 9.16, time: 6.52, steps: 37.65, tokens: 213.07, costs: '*', category: 'computer', setting: 'demonstration' },
  { method: 'OpenCUA-7B', milestoneScore: 0.12, successRate: 5.38, time: 18.86, steps: 33.57, tokens: 159.11, costs: '*', category: 'computer', setting: 'demonstration' },
  { method: 'OpenAI-CUA', milestoneScore: 0.50, successRate: 28.85, time: 5.29, steps: 27.29, tokens: 171.93, costs: 0.52, category: 'computer', setting: 'demonstration' },
  { method: 'Claude-4-sonnet (computer)', milestoneScore: 0.67, successRate: 47.69, time: 7.33, steps: 32.05, tokens: 424.90, costs: 1.34, category: 'computer', setting: 'demonstration' },
  { method: 'Agent-S2.5(w/GPT-5)', milestoneScore: 0.57, successRate: 40.38, time: 24.63, steps: 34.43, tokens: 626.26, costs: '1.19**', category: 'computer', setting: 'demonstration' },
];

export default function PerformanceTable() {
  const [selectedSetting, setSelectedSetting] = useState<'zero-shot' | 'demonstration'>('zero-shot');
  const [selectedCategory, setSelectedCategory] = useState<'browser' | 'computer' | 'all'>('all');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredData = performanceData.filter(item => {
    const settingMatch = item.setting === selectedSetting;
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    return settingMatch && categoryMatch;
  });


  const formatValue = (value: number | string, type: string) => {
    if (typeof value === 'string') return value;
    
    switch (type) {
      case 'milestoneScore':
      case 'successRate':
        return value.toFixed(2);
      case 'time':
        return value.toFixed(2);
      case 'steps':
        return value.toFixed(2);
      case 'tokens':
        return value.toFixed(2);
      case 'costs':
        return typeof value === 'number' ? value.toFixed(2) : value;
      default:
        return value.toString();
    }
  };

  const getRowStyle = (category: string, setting: string) => {
    if (setting === 'zero-shot') {
      return 'bg-orange-50 dark:bg-orange-900/20';
    } else {
      return 'bg-green-50 dark:bg-green-900/20';
    }
  };

  if (!isClient) {
    return (
      <div className="w-full">
        <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm">
          Loading performance table...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Filter Controls */}
      <div className="mb-6 flex gap-6 items-center flex-wrap">
        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Setting:</label>
          <select
            value={selectedSetting}
            onChange={(e) => {
              const value = e.target.value as 'zero-shot' | 'demonstration';
              setSelectedSetting(value);
            }}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="zero-shot">Zero-shot</option>
            <option value="demonstration">Demonstration-Augmented</option>
          </select>
        </div>
        
        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              const value = e.target.value as 'browser' | 'computer' | 'all';
              setSelectedCategory(value);
            }}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="browser">Browser-Use Agents</option>
            <option value="computer">Computer-Use Agents</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Method Name
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                Milestone Score ↑
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                Success Rate ↑
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                Time (min) ↓
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                Steps ↓
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                Tokens (k) ↓
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                Costs ($) ↓
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={7} className="border border-gray-300 dark:border-gray-600 px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  No data found for the selected filters.
                </td>
              </tr>
            ) : (
              filteredData.map((row, index) => (
                <tr key={index} className={getRowStyle(row.category, row.setting)}>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {row.method}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300">
                    {formatValue(row.milestoneScore, 'milestoneScore')}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300">
                    {formatValue(row.successRate, 'successRate')}%
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300">
                    {formatValue(row.time, 'time')}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300">
                    {formatValue(row.steps, 'steps')}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300">
                    {formatValue(row.tokens, 'tokens')}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300">
                    {formatValue(row.costs, 'costs')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footnotes */}
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p><strong>*</strong>: We do not report the inference prices for the self-hosted models.</p>
        <p><strong>**</strong>: This does not include the costs of serving UI-TARS-1.5-7B as the grounder used in Agent-S2.5.</p>
      </div>
    </div>
  );
}
