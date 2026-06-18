'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function addMetricsAction(formData: FormData) {
  const date = formData.get('date') as string;
  const revenue = Number(formData.get('revenue'));
  const orders = Number(formData.get('orders'));

  // 빈 값이 있으면 저장하지 않고 종료
  if (!date || isNaN(revenue) || isNaN(orders)) {
    return; // 💡 객체 리턴 대신 깔끔하게 return으로 종료!
  }

  // Supabase DB에 한 줄 추가(INSERT)
  const { error } = await supabase
    .from('dashboard_metrics')
    .insert([{ date, revenue, orders }]);

  if (error) {
    console.error('DB 저장 에러:', error);
    return; // 💡 에러 시에도 그냥 return!
  }

  // 대시보드 화면의 데이터를 최신 상태로 새로고침
  revalidatePath('/dashboard');
  return; // 💡 성공 시에도 그냥 return!
}