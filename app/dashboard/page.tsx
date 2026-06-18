import LineChart from '@/components/charts/line-chart';
import { formatCurrency } from '@/lib/data-formatter';
import { supabase } from '@/lib/supabase';
import { addMetricsAction } from './action'; // 💡 방금 만든 서버 액션 가져오기

// DB에서 데이터를 가져오는 함수
async function getSupabaseMetrics() {
  const { data, error } = await supabase
    .from('dashboard_metrics')
    .select('date, revenue, orders')
    .order('id', { ascending: true });

  if (error) {
    console.error('DB 데이터를 가져오는 데 실패했습니다:', error);
    return [];
  }
  
  return data.map(item => ({
    date: item.date,
    revenue: Number(item.revenue),
    orders: Number(item.orders)
  }));
}

export default async function DashboardPage() {
  const chartData = await getSupabaseMetrics();

  // 대시보드 상단 요약용 데이터 계산
  const latestData = chartData[chartData.length - 1]?.revenue || 0;
  const previousData = chartData[0]?.revenue || 0;
  const changeRate = previousData !== 0 
    ? (((latestData - previousData) / previousData) * 100).toFixed(1) 
    : '0.0';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">나의 전용 매출 대시보드</h1>
            <p className="text-slate-400 mt-2">클라우드 데이터베이스(Supabase) 실시간 연동 완료</p>
          </div>
        </header>

        {/* ✍️ 실시간 데이터 입력 폼 섹션 */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">📊 신규 데이터 직접 입력하기</h2>
          <form action={async (formData) => { 'use server'; await addMetricsAction(formData); }} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">날짜 (예: 6/19)</label>
              <input 
                type="text" 
                name="date" 
                placeholder="6/19"
                required 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">매출액 (원 단위 숫자만)</label>
              <input 
                type="number" 
                name="revenue" 
                placeholder="3000000"
                required 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">주문 건수 (숫자만)</label>
              <input 
                type="number" 
                name="orders" 
                placeholder="25"
                required 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-lg shadow-emerald-900/20"
            >
              데이터 등록하기
            </button>
          </form>
        </div>

        {/* KPI 카드 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <p className="text-sm text-slate-400 font-medium">최근 매출액</p>
            <p className="text-2xl font-bold text-white mt-2">{formatCurrency(latestData)}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <p className="text-sm text-slate-400 font-medium">기간 내 성장률</p>
            <p className={`text-2xl font-bold mt-2 ${Number(changeRate) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {Number(changeRate) >= 0 ? `+${changeRate}%` : `${changeRate}%`}
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <p className="text-sm text-slate-400 font-medium">오늘의 주문 건수</p>
            <p className="text-2xl font-bold text-emerald-400 mt-2">
              {chartData[chartData.length - 1]?.orders || 0} 건
            </p>
          </div>
        </div>

        {/* 차트 섹션 */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <LineChart data={chartData} />
        </div>

      </div>
    </div>
  );
}