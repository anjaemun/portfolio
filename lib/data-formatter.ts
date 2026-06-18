export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
};
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('ko-KR').format(value);
};
export const formatPercent = (value: number): string => {
  return `${value.toFixed(1)}%`;
};
// 실시간 비트코인 시세 데이터를 가져오는 함수
export async function getCryptoData() {
  try {
    // 코인게코(CoinGecko)라는 유명한 암호화폐 무료 API를 사용합니다.
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=krw&days=7&interval=daily',
      { next: { revalidate: 3600 } } // 1시간마다 새로운 데이터로 갱신하도록 설정
    );
    const data = await res.json();

    // 가져온 데이터를 차트가 이해할 수 있는 [{ date: '...', revenue: ... }] 형태로 변환합니다.
    return data.prices.map((priceArr: [number, number]) => {
      const date = new Date(priceArr[0]);
      return {
        // 월/일 형태로 날짜 포맷팅
        date: `${date.getMonth() + 1}/${date.getDate()}`, 
        // 해당 날짜의 비트코인 가격 (소수점 버림)
        revenue: Math.floor(priceArr[1]), 
      };
    });
  } catch (error) {
    console.error("데이터를 가져오는데 실패했습니다:", error);
    return [];
  }
}