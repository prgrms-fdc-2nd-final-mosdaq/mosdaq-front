import dayjs from 'dayjs';

// isPast:true -> 4주 전, false -> 4주 후
export const shiftDateByWeeks = (movieOpenDate: string, isPast: boolean) => {
  return isPast
    ? dayjs(movieOpenDate).subtract(4, 'week').format('YYYY-MM-DD')
    : dayjs(movieOpenDate).add(4, 'week').format('YYYY-MM-DD');
};

export function getTodayYYYYMMDD() {
  return dayjs(new Date()).format('YYYY-MM-DD');
}
