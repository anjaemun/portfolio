'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

// 화면에서 날짜, 매출액, 주문 건수를 받아 DB에 저장하는 함수입니다.
export async function addMetricsAction(formData: FormData) {
  const date = formData.get('date') as string;
  const revenue = Number(formData.get('revenue'));
  const orders = Number(formData.get('orders'));

  // 빈 값이 있으면 저장하지 않고 종료
  if (!date || isNaN(revenue) || isNaN(orders)) {
    return { success: false, message: '모든 값을 올바르게 입력해 주세요.' };
  }

  // Supabase DB에 한 줄 추가(INSERT)
  const { error } = await supabase
    .from('dashboard_metrics')
    .insert([{ date, revenue, orders }]);

  if (error) {
    console.error('DB 저장 에러:', error);
    return { success: false, message: '데이터 저장에 실패했습니다.' };
  }

  // 대시보드 화면의 데이터를 최신 상태로 새로고침(Revalidate) 해줍니다.
  revalidatePath('/dashboard');
  return { success: true, message: '성공적으로 저장되었습니다!' };
}