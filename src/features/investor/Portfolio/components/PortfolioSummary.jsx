import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Divider } from '@mui/material';
import { usePortfolio } from '../hooks/usePortfolio';
import { formatCurrency, formatPercentage } from '../../../utils/helpers/numberFormatter';

const PortfolioSummary = () => {
  const {
    totalValue,
    totalInvestment,
    totalReturns,
    returnsPercentage,
  } = usePortfolio();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Portfolio Summary
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Current Value
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {formatCurrency(totalValue)}
            </Typography>
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Total Investment
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {formatCurrency(totalInvestment)}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Absolute Returns
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              color={totalReturns >= 0 ? 'success.main' : 'error.main'}
            >
              {formatCurrency(totalReturns)}
            </Typography>
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Returns %
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              color={returnsPercentage >= 0 ? 'success.main' : 'error.main'}
            >
              {formatPercentage(returnsPercentage)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;