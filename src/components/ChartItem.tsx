import { FC } from 'react';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { ChartDataType } from '../features/timeline/types';

ChartJS.register(LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController);

const ChartItem: FC<ChartDataType> = (props) => {
  const { date, weight } = props;
  const labels = date;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: "推移状況",
      },
    },
  };


  const graphData = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: "重量(kg)",
        borderColor: '#fedd00',
        borderWidth: 2,
        fill: false,
        data: weight,
      }
    ],
  };
  return <Chart options={options} type="bar" height={400} data={graphData} />;
};

export default ChartItem;