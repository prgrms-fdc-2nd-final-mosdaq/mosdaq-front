import dayjs from 'dayjs';

export const formatPriceByCountryCode = (
  price: number,
  countryCode: string,
): string => {
  if (countryCode.trim().toUpperCase() === 'KO') {
    // 원화는 소수점 버림
    return `₩${price.toLocaleString()}`;
  } else if (countryCode.trim().toUpperCase() === 'US') {
    // 달러는 소수점 두 자리
    return `$${price.toFixed(2).toLocaleString()}`;
  } else {
    return price.toLocaleString();
  }
};

export const calculateStockReturnRate = (
  initialPrice: number,
  finalPrice: number,
): string => {
  // 두 가격 중 하나가 0원일 가능성?
  // 없어질 과정
  const numPrice1 =
    typeof initialPrice === 'string' ? parseFloat(initialPrice) : initialPrice;
  const numPrice2 =
    typeof finalPrice === 'string' ? parseFloat(finalPrice) : finalPrice;

  const returnRate = ((numPrice2 - numPrice1) / numPrice1) * 100;

  return returnRate >= 0
    ? `+${returnRate.toFixed(2)}%`
    : `${returnRate.toFixed(2)}%`;
};

export function formatNoYear(dateString: string) {
  const dateParts = dateString.split('-');
  const month = parseInt(dateParts[1], 10);
  const day = parseInt(dateParts[2], 10);
  return `${month}/${day}`;
}
