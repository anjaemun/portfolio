'use client'; 
import { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/data-formatter';

export default function LineChart({ data }: { data: any[] }) {
  return (
    <div className="w-full h-[350px] bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">일별 매출 추이</h3>
      <ResponsiveContainer width="100%" height="90%">
        <RechartsLine data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
          <YAxis stroke="#94a3b8" fontSize={12} />
          {/* 변경된 Tooltip 코드 */}
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', borderRadius: '8px' }}
            labelStyle={{ color: '#94a3b8' }}
            formatter={(value: any) => [formatCurrency(Number(value)), '매출']}
          />
          <Line type="monotone" dataKey="revenue" stroke="#60a5fa" strokeWidth={3} />
        </RechartsLine>
      </ResponsiveContainer>
    </div>
  );
}