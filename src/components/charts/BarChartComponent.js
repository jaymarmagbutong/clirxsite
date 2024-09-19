import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChartComponent = () => {
  const options = {
    chart: {
      id: 'bar-chart'
    },
    xaxis: {
      categories: ['Apples', 'Oranges', 'Bananas', 'Pears']
    }
  };

  const series = [
    {
      name: 'Sales',
      data: [30, 40, 35, 50]
    }
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Bar Chart</h2>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarChartComponent;
