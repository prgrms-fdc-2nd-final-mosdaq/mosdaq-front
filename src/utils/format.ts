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

export function dateDifference(startDate: string) {
  const start = dayjs(startDate);
  const end = dayjs(); // 현재 날짜와 시간

  const diffInDays = start.diff(end, 'day');
  const diffInHours = start.diff(end, 'hour') % 24;
  const diffInMinutes = start.diff(end, 'minute') % 60;

  // 차이가 없는 경우
  if (diffInDays === 0 && diffInHours === 0 && diffInMinutes === 0) {
    return '0분';
  }

  // 일 차이가 있을 경우
  if (diffInDays > 0) {
    return `${diffInDays}일 ${diffInHours}시간 ${diffInMinutes}분`;
  }

  // 일 차이가 없고 시간 차이가 있을 경우
  if (diffInHours > 0) {
    return `${diffInHours}시간 ${diffInMinutes}분`;
  }

  // 시간 차이가 없고 분 차이가 있을 경우
  if (diffInMinutes > 0) {
    return `${diffInMinutes}분`;
  }

  return '0분';
}

export function formatNoYear(dateString: string) {
  const dateParts = dateString.split('-');
  const month = parseInt(dateParts[1], 10);
  const day = parseInt(dateParts[2], 10);
  return `${month}/${day}`;
}
