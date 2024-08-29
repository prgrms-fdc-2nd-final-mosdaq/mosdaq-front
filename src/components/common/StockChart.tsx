import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { StockPriceList } from '@/models/movie.model';
import { ApexOptions } from 'apexcharts';
import colors from '@/constants/colors';
import dayjs from 'dayjs';

interface Props {
  stockPriceList: StockPriceList[];
  movieOpenDate: string;
  width?: number;
  height?: number;
}

const StockChart = ({
  stockPriceList,
  movieOpenDate,
  width = 410,
  height = 380,
}: Props) => {
  const dates = stockPriceList.map((stock) => stock.date);
  const prices = stockPriceList.map((stock) => stock.price);
  const openDateStockPrice = stockPriceList.find(
    (stock) => stock.date === dayjs(movieOpenDate).format('YYYY-MM-DD'),
  )?.price;
  const [color, setColor] = useState<string>('black');

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
          if (value === `${movieOpenDate}`) {
            return `개봉일 ${value}`;
          }
          return '';
        },
      },
      crosshairs: {
        show: true,
      },
    },
    annotations: {
      xaxis: [
        {
          x: `개봉일 ${movieOpenDate}`,
          borderColor: 'black',
        },
      ],
      points: [
        {
          x: `개봉일 ${movieOpenDate}`,
          y: openDateStockPrice,
          marker: {
            size: 8,
            fillColor: '#fff',
            strokeColor: 'black',
            cssClass: 'apexcharts-custom-class',
          },
        },
      ],
    },
    tooltip: {
      enabled: true,
      x: {
        formatter: function (value: any, { dataPointIndex }: any) {
          // 마우스 위치에 해당하는 날짜 표시
          return dates[dataPointIndex] === movieOpenDate
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
  // TODO : reflow repaint
  return (
    <Chart
      options={options}
      series={series}
      type="line"
      width={width}
      height={height}
    />
  );
};

export default StockChart;
