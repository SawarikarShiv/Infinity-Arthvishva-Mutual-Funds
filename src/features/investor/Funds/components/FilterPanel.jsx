import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/common/Card';
import { SecondaryButton } from '../../../components/common/Button';
import { Filter, X } from 'lucide-react';

const FilterPanel = ({ filters, onFilterChange, categories }) => {
  const riskLevels = [
    { value: 'all', label: 'All Risk Levels' },
    { value: 'Low', label: 'Low Risk' },
    { value: 'Medium', label: 'Medium Risk' },
    { value: 'High', label: 'High Risk' },
  ];

  const returnsOptions = [
    { value: 'all', label: 'All Returns' },
    { value: '10+', label: '10%+ Returns' },
    { value: '15+', label: '15%+ Returns' },
    { value: '20+', label: '20%+ Returns' },
  ];

  const minInvestmentOptions = [
    { value: 0, label: 'Any Amount' },
    { value: 100, label: '₹100+' },
    { value: 500, label: '₹500+' },
    { value: 1000, label: '₹1000+' },
    { value: 5000, label: '₹5000+' },
  ];

  const handleClearFilters = () => {
    onFilterChange({
      category: 'all',
      riskLevel: 'all',
      minInvestment: 0,
      returns: 'all',
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Filter size={18} className="mr-2" />
            Filters
          </CardTitle>
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear All
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Category</h3>
            <div className="space-y-2">
              <button
                className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                  filters.category === 'all'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
                onClick={() => onFilterChange({ category: 'all' })}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                    filters.category === category
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                  onClick={() => onFilterChange({ category })}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Risk Level Filter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Risk Level</h3>
            <div className="space-y-2">
              {riskLevels.map((risk) => (
                <button
                  key={risk.value}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                    filters.riskLevel === risk.value
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                  onClick={() => onFilterChange({ riskLevel: risk.value })}
                >
                  {risk.label}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Investment */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Min. Investment</h3>
            <div className="space-y-2">
              {minInvestmentOptions.map((option) => (
                <button
                  key={option.value}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                    filters.minInvestment === option.value
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                  onClick={() => onFilterChange({ minInvestment: option.value })}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Returns Filter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Minimum Returns</h3>
            <div className="space-y-2">
              {returnsOptions.map((option) => (
                <button
                  key={option.value}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                    filters.returns === option.value
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                  onClick={() => onFilterChange({ returns: option.value })}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.category !== 'all' || filters.riskLevel !== 'all' || 
            filters.minInvestment !== 0 || filters.returns !== 'all') && (
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {filters.category !== 'all' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {categories.find(c => c === filters.category) || filters.category}
                    <button
                      onClick={() => onFilterChange({ category: 'all' })}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {filters.riskLevel !== 'all' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {riskLevels.find(r => r.value === filters.riskLevel)?.label || filters.riskLevel}
                    <button
                      onClick={() => onFilterChange({ riskLevel: 'all' })}
                      className="ml-1 text-green-600 hover:text-green-800"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {filters.minInvestment !== 0 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Min: ₹{filters.minInvestment}+
                    <button
                      onClick={() => onFilterChange({ minInvestment: 0 })}
                      className="ml-1 text-purple-600 hover:text-purple-800"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {filters.returns !== 'all' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {returnsOptions.find(r => r.value === filters.returns)?.label || filters.returns}
                    <button
                      onClick={() => onFilterChange({ returns: 'all' })}
                      className="ml-1 text-yellow-600 hover:text-yellow-800"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;