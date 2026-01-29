import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({
  data,
  title,
  height = 300,
  showLegend = true,
  showTooltip = true,
  donut = false,
  className = '',
  colors = [
    '#3b82f6', // blue-500
    '#10b981', // green-500
    '#f59e0b', // yellow-500
    '#ef4444', // red-500
    '#8b5cf6', // violet-500
    '#ec4899', // pink-500
    '#06b6d4', // cyan-500
    '#84cc16', // lime-500
  ],
}) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: colors.slice(0, data.labels.length),
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 15,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: donut ? '60%' : 0,
    plugins: {
      legend: {
        display: showLegend,
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            family: 'Inter, sans-serif',
            size: 12,
          },
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => ({
                text: `${label} (${data.datasets[0].data[i]})`,
                fillStyle: data.datasets[0].backgroundColor[i],
                strokeStyle: data.datasets[0].borderColor[i],
                lineWidth: data.datasets[0].borderWidth,
                hidden: false,
                index: i,
              }));
            }
            return [];
          },
        },
      },
      tooltip: {
        enabled: showTooltip,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#374151',
        bodyColor: '#374151',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className={clsx('bg-white rounded-xl shadow-sm border border-gray-200 p-6', className)}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      )}
      
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        <div style={{ height: `${height}px`, width: '100%', maxWidth: '300px' }}>
          {data && data.labels && data.labels.length > 0 ? (
            <Pie data={chartData} options={options} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">No chart data available</p>
            </div>
          )}
        </div>
        
        {showLegend && data && data.labels && data.labels.length > 0 && (
          <div className="flex-1">
            <div className="space-y-4">
              {data.labels.map((label, index) => {
                const value = data.values[index];
                const total = data.values.reduce((sum, val) => sum + val, 0);
                const percentage = Math.round((value / total) * 100);
                
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: colors[index] }}
                      />
                      <span className="text-sm font-medium text-gray-700">{label}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{value}</p>
                      <p className="text-xs text-gray-500">{percentage}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

PieChart.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.array.isRequired,
    values: PropTypes.array.isRequired,
  }).isRequired,
  title: PropTypes.string,
  height: PropTypes.number,
  showLegend: PropTypes.bool,
  showTooltip: PropTypes.bool,
  donut: PropTypes.bool,
  className: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default PieChart;
EOF