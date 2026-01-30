import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/common/Card';
import { FundCard } from '../../../components/common/Card';
import FilterPanel from './FilterPanel';
import { PrimaryButton, SecondaryButton } from '../../../components/common/Button';
import { TextInput } from '../../../components/common/Inputs';
import { Search, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { useFunds } from '../hooks/useFunds';

const FundExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    riskLevel: 'all',
    minInvestment: 0,
    returns: 'all',
  });
  const [sortBy, setSortBy] = useState('name');

  const { funds, loading, error } = useFunds();

  const filteredFunds = funds.filter(fund => {
    const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fund.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filters.category === 'all' || fund.category === filters.category;
    const matchesRisk = filters.riskLevel === 'all' || fund.riskLevel === filters.riskLevel;
    const matchesMinInvestment = fund.minInvestment >= filters.minInvestment;
    
    return matchesSearch && matchesCategory && matchesRisk && matchesMinInvestment;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'returns':
        return b.returns.oneYear - a.returns.oneYear;
      case 'aum':
        return b.aum - a.aum;
      case 'risk':
        return a.riskLevel === 'High' ? 1 : -1;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const fundCategories = [
    'Equity',
    'Debt',
    'Hybrid',
    'ELSS',
    'Sectoral',
    'Index',
    'International',
  ];

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-red-600">Error loading funds: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fund Explorer</h1>
          <p className="text-gray-600">Discover and explore mutual funds</p>
        </div>
        <div className="flex space-x-3">
          <SecondaryButton icon={<Filter size={18} />}>
            Compare Funds
          </SecondaryButton>
          <PrimaryButton>Recommended Funds</PrimaryButton>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            categories={fundCategories}
          />
        </div>

        <div className="lg:col-span-3">
          {/* Search and Sort */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <TextInput
                    placeholder="Search funds by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={<Search size={18} />}
                  />
                </div>
                <select
                  className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Sort by Name</option>
                  <option value="returns">Sort by Returns</option>
                  <option value="aum">Sort by AUM</option>
                  <option value="risk">Sort by Risk</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Funds Grid */}
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFunds.length > 0 ? (
                filteredFunds.map((fund) => (
                  <FundCard
                    key={fund.id}
                    fund={fund}
                    onInvest={() => console.log('Invest in', fund.name)}
                    onCompare={() => console.log('Compare', fund.name)}
                  />
                ))
              ) : (
                <div className="col-span-3">
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-gray-500">No funds found matching your criteria</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Stats */}
            {filteredFunds.length > 0 && (
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{filteredFunds.length}</div>
                      <p className="text-gray-600">Funds Found</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {Math.max(...filteredFunds.map(f => f.returns.oneYear)).toFixed(1)}%
                      </div>
                      <p className="text-gray-600">Best 1Y Return</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        ₹{Math.min(...filteredFunds.map(f => f.minInvestment)).toLocaleString('en-IN')}
                      </div>
                      <p className="text-gray-600">Min. Investment</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {fundCategories.length}
                      </div>
                      <p className="text-gray-600">Categories</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundExplorer;