import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  IconButton,
} from '@mui/material';
import {
  DatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  Download as DownloadIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { usePortfolio } from '../hooks/usePortfolio';
import { formatCurrency } from '../../../utils/helpers/numberFormatter';
import { formatDate } from '../../../utils/helpers/dateFormatter';
import { transactionTypes } from '../../../utils/constants/transactionTypes';

const TransactionHistory = () => {
  const {
    transactions,
    transactionFilters,
    setTransactionFilters,
    isLoading,
  } = usePortfolio();

  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (field, value) => {
    setTransactionFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Export transactions');
  };

  const getTypeColor = (type) => {
    const colors = {
      purchase: 'success',
      redemption: 'error',
      dividend: 'info',
      switch: 'warning',
      sip: 'primary',
    };
    return colors[type] || 'default';
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (transactionFilters.type !== 'all' && transaction.type !== transactionFilters.type) {
      return false;
    }
    if (transactionFilters.startDate && new Date(transaction.date) < transactionFilters.startDate) {
      return false;
    }
    if (transactionFilters.endDate && new Date(transaction.date) > transactionFilters.endDate) {
      return false;
    }
    return true;
  });

  if (isLoading && transactions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <Typography>Loading transactions...</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" component="h2">
          Transaction History
        </Typography>
        
        <Box display="flex" gap={2}>
          <IconButton onClick={() => setShowFilters(!showFilters)}>
            <FilterListIcon />
          </IconButton>
          
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
          >
            Export
          </Button>
        </Box>
      </Box>

      {showFilters && (
        <Box mb={3} p={2} bgcolor="action.hover" borderRadius={1}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <DatePicker
                  label="Start Date"
                  value={transactionFilters.startDate}
                  onChange={(date) => handleFilterChange('startDate', date)}
                  renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DatePicker
                  label="End Date"
                  value={transactionFilters.endDate}
                  onChange={(date) => handleFilterChange('endDate', date)}
                  renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Transaction Type"
                  value={transactionFilters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  {Object.entries(transactionTypes).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Box>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Fund Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Units</TableCell>
              <TableCell align="right">NAV</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id} hover>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle2">{transaction.fundName}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {transaction.schemeCode}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={transactionTypes[transaction.type] || transaction.type}
                    size="small"
                    color={getTypeColor(transaction.type)}
                  />
                </TableCell>
                <TableCell align="right">
                  {transaction.units.toFixed(4)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(transaction.nav)}
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight="medium">
                    {formatCurrency(transaction.amount)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={transaction.status}
                    size="small"
                    color={
                      transaction.status === 'completed' ? 'success' :
                      transaction.status === 'pending' ? 'warning' :
                      transaction.status === 'failed' ? 'error' : 'default'
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredTransactions.length === 0 && !isLoading && (
        <Box textAlign="center" py={4}>
          <Typography color="text.secondary">
            No transactions found for the selected filters.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default TransactionHistory;