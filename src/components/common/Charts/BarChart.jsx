import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({
  data,
  title,
  subtitle,
  height = 300,
  showLegend = true,
  showTooltip = true,
  stacked = false,
  horizontal = false,
  className = '',
  colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
}) => {
  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: colors[index % colors.length],
      borderRadius: 6,
      borderSkipped: false,
    })),
  };

  const options = {
    indexAxis: horizontal ? 'y' : 'x',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'rect',
          padding: 20,
          font: {
            family: 'Inter, sans-serif',
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
            const label = context.dataset.label || '';
            const value = context.parsed[horizontal ? 'x' : 'y'];
            return `${label}: ₹${value.toLocaleString('en-IN')}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: stacked,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif',
          },
          color: '#6b7280',
        },
      },
      y: {
        stacked: stacked,
        grid: {
          color: '#f3f4f6',
          borderDash: [5, 5],
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif',
          },
          color: '#6b7280',
          callback: (value) => `₹${value.toLocaleString('en-IN')}`,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className={clsx('bg-white rounded-xl shadow-sm border border-gray-200 p-6', className)}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
      
      <div style={{ height: `${height}px` }}>
        {data && data.labels && data.labels.length > 0 ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">No chart data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.array.isRequired,
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,
      })
    ).isRequired,
  }).isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  height: PropTypes.number,
  showLegend: PropTypes.bool,
  showTooltip: PropTypes.bool,
  stacked: PropTypes.bool,
  horizontal: PropTypes.bool,
  className: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default BarChart;
EOF