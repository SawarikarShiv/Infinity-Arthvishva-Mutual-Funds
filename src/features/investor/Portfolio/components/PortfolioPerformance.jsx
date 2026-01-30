import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { usePortfolio } from '../hooks/usePortfolio';

const PortfolioPerformance = () => {
  const { performance } = usePortfolio();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Performance Metrics
        </Typography>
        
        <Box>
          {/* Add performance metrics visualization */}
          {/* This can be expanded based on specific requirements */}
          <Typography variant="body2" color="text.secondary">
            Performance metrics visualization
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PortfolioPerformance;