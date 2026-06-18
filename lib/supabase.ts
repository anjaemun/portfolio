import { createClient } from '@supabase/supabase-js';

// 아까 .env.local 금고에 넣어둔 주소와 열쇠를 꺼내옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Next.js 전용 수파베이스 연결 클라이언트를 생성합니다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);