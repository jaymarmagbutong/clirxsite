import React from 'react';
import ReactApexChart from 'react-apexcharts';

const RadarChartComponent = () => {
  const options = {
    chart: {
      id: 'radar-chart'
    },
    xaxis: {
      categories: ['Strength', 'Speed', 'Endurance', 'Agility']
    }
  };

  const series = [
    {
      name: 'Player 1',
      data: [80, 90, 70, 85]
    }
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Radar Chart</h2>
      <ReactApexChart
        options={options}
        series={series}
        type="radar"
        height={350}
      />
    </div>
  );
};

export default RadarChartComponent;
