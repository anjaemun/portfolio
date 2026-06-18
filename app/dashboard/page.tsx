import fs from 'fs';
import path from 'path';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/data-formatter';
import LineChart from '@/components/charts/line-chart';

function getAnalyticsData() {
  const filePath = path.join(process.cwd(), 'data', 'mock-analytics.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
}

export default function DashboardPage() {
  const data = getAnalyticsData();
  const latestData = data[data.length - 1];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">데이터 분석 대시보드</h1>
        <p className="text-slate-400">기준 일자: {latestData.date}</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <p className="text-sm font-medium text-slate-400">일일 매출</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">{formatCurrency(latestData.revenue)}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <p className="text-sm font-medium text-slate-400">일일 방문자수</p>
          <p className="text-3xl font-bold text-emerald-400 mt-2">{formatNumber(latestData.visitors)} 명</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <p className="text-sm font-medium text-slate-400">구매 전환율</p>
          <p className="text-3xl font-bold text-amber-400 mt-2">{formatPercent(latestData.conversionRate)}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <LineChart data={data} />
      </div>
    </div>
  );
}