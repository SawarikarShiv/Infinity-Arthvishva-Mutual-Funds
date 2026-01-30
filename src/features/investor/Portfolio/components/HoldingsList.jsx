import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Chip,
  IconButton,
  Typography,
  Box,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import { usePortfolio } from '../hooks/usePortfolio';
import { formatCurrency, formatPercentage } from '../../../utils/helpers/numberFormatter';
import { fundCategories } from '../../../utils/constants/fundCategories';

const HoldingsList = ({ onViewDetails }) => {
  const {
    holdings,
    filters,
    updateFilters,
    isLoading,
    getTopPerformers,
    getUnderperformers,
  } = usePortfolio();

  const [sortConfig, setSortConfig] = useState({
    field: 'currentValue',
    direction: 'desc',
  });

  const handleSort = (field) => {
    setSortConfig({
      field,
      direction: sortConfig.field === field && sortConfig.direction === 'desc' ? 'asc' : 'desc',
    });
  };

  const sortedHoldings = [...holdings].sort((a, b) => {
    const multiplier = sortConfig.direction === 'desc' ? -1 : 1;
    if (a[sortConfig.field] < b[sortConfig.field]) return -1 * multiplier;
    if (a[sortConfig.field] > b[sortConfig.field]) return 1 * multiplier;
    return 0;
  });

  const handleFilterChange = (e) => {
    updateFilters({ [e.target.name]: e.target.value });
  };

  const getCategoryColor = (category) => {
    const colors = {
      equity: '#4CAF50',
      debt: '#2196F3',
      hybrid: '#9C27B0',
      solution: '#FF9800',
      other: '#607D8B',
    };
    return colors[category] || colors.other;
  };

  if (isLoading && holdings.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <Typography>Loading holdings...</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" component="h2">
          Your Holdings
        </Typography>
        
        <Box display="flex" gap={2}>
          <TextField
            select
            size="small"
            label="Category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {Object.entries(fundCategories).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </TextField>
          
          <TextField
            select
            size="small"
            label="Sort By"
            name="sortBy"
            value={sortConfig.field}
            onChange={(e) => handleSort(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="currentValue">Current Value</MenuItem>
            <MenuItem value="investedAmount">Invested Amount</MenuItem>
            <MenuItem value="returns">Returns</MenuItem>
            <MenuItem value="returnsPercentage">Returns %</MenuItem>
          </TextField>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === 'name'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('name')}
                >
                  Fund Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={sortConfig.field === 'investedAmount'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('investedAmount')}
                >
                  Invested
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={sortConfig.field === 'currentValue'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('currentValue')}
                >
                  Current Value
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={sortConfig.field === 'returns'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('returns')}
                >
                  Returns
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={sortConfig.field === 'returnsPercentage'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('returnsPercentage')}
                >
                  Returns %
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedHoldings.map((holding) => (
              <TableRow key={holding.id} hover>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle2">{holding.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {holding.schemeCode}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={fundCategories[holding.category] || holding.category}
                    size="small"
                    sx={{
                      backgroundColor: getCategoryColor(holding.category),
                      color: 'white',
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(holding.investedAmount)}
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight="medium">
                    {formatCurrency(holding.currentValue)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
                    {holding.returns >= 0 ? (
                      <TrendingUpIcon color="success" fontSize="small" />
                    ) : (
                      <TrendingDownIcon color="error" fontSize="small" />
                    )}
                    <Typography
                      color={holding.returns >= 0 ? 'success.main' : 'error.main'}
                    >
                      {formatCurrency(holding.returns)}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    color={holding.returnsPercentage >= 0 ? 'success.main' : 'error.main'}
                    fontWeight="medium"
                  >
                    {formatPercentage(holding.returnsPercentage)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => onViewDetails && onViewDetails(holding)}
                    title="View Details"
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {holdings.length === 0 && !isLoading && (
        <Box textAlign="center" py={4}>
          <Typography color="text.secondary">
            No holdings found. Start investing to build your portfolio.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default HoldingsList;