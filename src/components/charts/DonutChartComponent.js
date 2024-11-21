import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutChartComponent = () => {
  const options = {
    chart: {
      id: 'donut-chart'
    },
    labels: ['Apples', 'Oranges', 'Bananas', 'Pears'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%'
        }
      }
    }
  };

  const series = [30, 40, 35, 50];

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Donut Chart</h2>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height={350}
      />
    </div>
  );
};

export default DonutChartComponent;
