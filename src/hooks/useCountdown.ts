import { useEffect, useState } from 'react';

interface CountdownTime {
  days: string;
  hours: string;
  minutes: string;
}

const useCountdown = (targetDate: string): CountdownTime => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: '00',
    hours: '00',
    minutes: '00',
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = target - now + 2000;

      if (difference <= 0) {
        return {
          days: '00',
          hours: '00',
          minutes: '00',
        };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      return {
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
      };
    };

    const updateTimer = () => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === '00' &&
        newTimeLeft.hours === '00' &&
        newTimeLeft.minutes === '00'
      ) {
        clearInterval(timer);
      }
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer(); // 초기 값 설정

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

export default useCountdown;
