import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChartComponent = () => {
  const options = {
    chart: {
      id: 'line-chart'
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April']
    }
  };

  const series = [
    {
      name: 'Revenue',
      data: [30, 40, 35, 50]
    }
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Line Chart</h2>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChartComponent;
