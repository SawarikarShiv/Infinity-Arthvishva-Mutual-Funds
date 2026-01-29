import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({
  data,
  title,
  subtitle,
  height = 300,
  showLegend = true,
  showTooltip = true,
  fillArea = true,
  tension = 0.4,
  className = '',
  tooltipFormat = 'currency',
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('1y');

  const periodOptions = [
    { value: '1m', label: '1M' },
    { value: '3m', label: '3M' },
    { value: '6m', label: '6M' },
    { value: '1y', label: '1Y' },
    { value: '3y', label: '3Y' },
    { value: '5y', label: '5Y' },
  ];

  const chartData = useMemo(() => {
    if (!data || !data.labels || !data.datasets) {
      return {
        labels: [],
        datasets: [],
      };
    }

    return {
      labels: data.labels,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        fill: fillArea,
        tension: tension,
        backgroundColor: fillArea ? `${dataset.borderColor}20` : 'transparent',
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: dataset.borderColor,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      })),
    };
  }, [data, fillArea, tension]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            family: 'Inter, sans-serif',
          },
        },
      },
      tooltip: {
        enabled: showTooltip,
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#374151',
        bodyColor: '#374151',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            let value = context.parsed.y;
            let label = context.dataset.label || '';
            
            if (tooltipFormat === 'currency') {
              value = `₹${value.toLocaleString('en-IN')}`;
            } else if (tooltipFormat === 'percentage') {
              value = `${value}%`;
            }
            
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
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
        grid: {
          color: '#f3f4f6',
          borderDash: [5, 5],
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif',
          },
          color: '#6b7280',
          callback: (value) => {
            if (tooltipFormat === 'currency') {
              return `₹${value.toLocaleString('en-IN')}`;
            } else if (tooltipFormat === 'percentage') {
              return `${value}%`;
            }
            return value;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    elements: {
      line: {
        tension: tension,
      },
    },
  };

  return (
    <div className={clsx('bg-white rounded-xl shadow-sm border border-gray-200 p-6', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {periodOptions.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={clsx(
                  'px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200',
                  selectedPeriod === period.value
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {period.label}
              </button>
            ))}
          </div>
          
          <button
            type="button"
            className="p-1.5 text-gray-400 hover:text-gray-500"
            aria-label="Chart information"
          >
            <InformationCircleIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div style={{ height: `${height}px` }}>
        {data && data.labels && data.labels.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">No chart data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

LineChart.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.array.isRequired,
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,
        borderColor: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  height: PropTypes.number,
  showLegend: PropTypes.bool,
  showTooltip: PropTypes.bool,
  fillArea: PropTypes.bool,
  tension: PropTypes.number,
  className: PropTypes.string,
  tooltipFormat: PropTypes.oneOf(['currency', 'percentage', 'number']),
};

LineChart.defaultProps = {
  tooltipFormat: 'currency',
};

export default LineChart;
EOF