'use client';

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '@/lib/data-formatter';

interface ChartData {
  date: string;
  revenue: number;
  orders: number;
}

interface LineChartProps {
  data: ChartData[];
}

export default function LineChart({ data }: LineChartProps) {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">일별 매출 및 주문 추이</h3>
      
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="date" 
              stroke="#94a3b8" 
              fontSize={12}
            />
            {/* 왼쪽 Y축: 주문 건수용 */}
            <YAxis 
              yAxisId="left"
              stroke="#38bdf8" 
              fontSize={12}
              tickFormatter={(value) => `${value}건`}
            />
            {/* 오른쪽 Y축: 매출액용 */}
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#34d399" 
              fontSize={12}
              tickFormatter={(value) => `${value / 10000}만`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569' }}
              labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
              formatter={(value: any, name: string) => {
                if (name === '매출액') return [formatCurrency(value), name];
                return [`${value} 건`, name];
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            
            {/* 🟢 초록색 선: 매출액 (오른쪽 Y축 기준) */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              name="매출액"
              stroke="#34d399"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
            
            {/* 🔵 파란색 선: 주문 건수 (왼쪽 Y축 기준) */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="orders"
              name="주문 건수"
              stroke="#38bdf8"
              strokeWidth={2}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}