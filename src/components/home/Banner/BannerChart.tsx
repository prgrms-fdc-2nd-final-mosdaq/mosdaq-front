import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { StockPriceList } from '@/models/movie.model';
import { ApexOptions } from 'apexcharts';
import colors from '@/constants/colors';
import dayjs from 'dayjs';

interface Props {
  stockPriceList: StockPriceList[];
  movieOpenDate: Date;
}

const BannerChart = ({ stockPriceList, movieOpenDate }: Props) => {
  const dates = stockPriceList.map((stock) => stock.date);
  const prices = stockPriceList.map((stock) => stock.price);
  /*
  TODO : 차트 컴포넌트에서 state가 바뀌지 않으면 차트 렌더링 시에 위로 튕기는 현상이 있음
  왜 그런지는 잘 모르겠음
  해결 가능하다면 color state와 useEffect는 걷어낼 예정
  const color =
    prices[0] > prices[prices.length - 1] ? colors.antiWatcha3 : colors.watcha;
  */
  const [color, setColor] = useState<string>('black');

  /*
  useEffect로 상태가 한 번 변해야 차트 크기(width, height 100%)가 반영된다
   -> 크기 고정했음 
  배너 돌아갈 때 차트가 튀는거는 왜 그런거지?
  */
  useEffect(() => {
    setColor(
      prices[0] > prices[prices.length - 1]
        ? colors.antiWatcha3
        : colors.watcha,
    );
  }, [stockPriceList]);

  const options: ApexOptions = {
    chart: {
      id: 'basic-line',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      width: '100%',
      height: '100%',
    },
    colors: [color],
    xaxis: {
      categories: dates,
      labels: {
        show: true,
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
        formatter: function (value: string) {
          if (value === dayjs(movieOpenDate).format('YYYY-MM-DD')) {
            return `개봉일 ${value}`;
          }
          return '';
        },
      },
      crosshairs: {
        show: true,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        formatter: function (value: number, { dataPointIndex }: any) {
          // 마우스 위치에 해당하는 날짜 표시
          return dates[dataPointIndex] ===
            dayjs(movieOpenDate).format('YYYY-MM-DD')
            ? `개봉일 ${dates[dataPointIndex]}`
            : dates[dataPointIndex];
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: '가격',
      data: prices,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      width="430px"
      height="400px"
    />
  );
};

export default BannerChart;
