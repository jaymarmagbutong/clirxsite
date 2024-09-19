import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChartComponent = () => {
  const options = {
    chart: {
      id: 'pie-chart'
    },
    labels: ['Apples', 'Oranges', 'Bananas', 'Pears']
  };

  const series = [30, 40, 35, 50];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Pie Chart</h2>
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        height={350}
      />
    </div>
  );
};

export default PieChartComponent;
