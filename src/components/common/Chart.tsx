import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { StockPriceList } from '@/models/movie.model';
import { ApexOptions } from 'apexcharts';
import colors from '@/constants/colors';

interface Props {
  stockPriceList: StockPriceList[];
}

const MyChart = ({ stockPriceList }: Props) => {
  const dates = stockPriceList?.map((stock) => stock.date);
  const prices = stockPriceList.map((stock) => stock.price);
  const [color, setColor] = useState<string>('');

  /*
  useEffect로 상태가 한 번 변해야 차트 크기(width, height 100%)가 반영된다
  이유는 잘 모르겠음
  */
  useEffect(() => {
    setColor(
      prices[0] > prices[prices.length - 1]
        ? colors.antiWatcha3
        : colors.watcha,
    );
  }, [prices]);

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
        show: false,
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
          return dates[dataPointIndex];
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
      width="100%"
      height="100%"
    />
  );
};

export default MyChart;
