import LineChart from '@/components/charts/line-chart';
import { formatCurrency, getCryptoData } from '@/lib/data-formatter';

export default async function DashboardPage() {
  // 💥 가짜 데이터 대신 실시간 외부 API 데이터를 동기적으로 받아옵니다!
  const chartData = await getCryptoData();

  // 최신 가격 및 통계를 위해 가장 최근 데이터 추출
  const latestData = chartData[chartData.length - 1]?.revenue || 0;
  const previousData = chartData[0]?.revenue || 0;
  // 변동률 계산
  const changeRate = (((latestData - previousData) / previousData) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">실시간 크립토 대시보드</h1>
          <p className="text-slate-400 mt-2">인터넷 실시간 외부 API 연동 테스트</p>
        </header>

        {/* KPI 카드 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <p className="text-sm text-slate-400 font-medium">현재 비트코인 시세</p>
            <p className="text-2xl font-bold text-white mt-2">{formatCurrency(latestData)}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <p className="text-sm text-slate-400 font-medium">최근 7일 변동률</p>
            <p className={`text-2xl font-bold mt-2 ${Number(changeRate) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {Number(changeRate) >= 0 ? `+${changeRate}%` : `${changeRate}%`}
            </p>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <p className="text-sm text-slate-400 font-medium">데이터 출처</p>
            <p className="text-xl font-bold text-blue-400 mt-2">CoinGecko API</p>
          </div>
        </div>

        {/* 차트 섹션 */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          {/* 우리가 만들었던 차트 컴포넌트에 진짜 데이터를 쏙 넣어줍니다 */}
          <LineChart data={chartData} />
        </div>
      </div>
    </div>
  );
}