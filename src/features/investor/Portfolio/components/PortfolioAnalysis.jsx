import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  ButtonGroup,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Timeline as TimelineIcon,
  PieChart as PieChartIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePortfolio } from '../hooks/usePortfolio';
import {
  formatCurrency,
  formatPercentage,
  formatNumber,
} from '../../../utils/helpers/numberFormatter';

const PortfolioAnalysis = () => {
  const {
    performance,
    totalValue,
    totalInvestment,
    totalReturns,
    returnsPercentage,
    topPerformers,
    underperformers,
    loadPerformanceData,
  } = usePortfolio();

  const [timeframe, setTimeframe] = useState('1y');
  const [viewMode, setViewMode] = useState('chart');

  const timeframes = [
    { value: '1m', label: '1M' },
    { value: '3m', label: '3M' },
    { value: '6m', label: '6M' },
    { value: '1y', label: '1Y' },
    { value: '3y', label: '3Y' },
    { value: '5y', label: '5Y' },
  ];

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    loadPerformanceData(newTimeframe);
  };

  const performanceData = performance[timeframe] || [];

  const calculateMetrics = () => {
    const metrics = {
      sharpeRatio: 1.25,
      alpha: 2.3,
      beta: 0.98,
      standardDeviation: 12.5,
      maxDrawdown: -8.7,
    };
    return metrics;
  };

  const metrics = calculateMetrics();

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Portfolio Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Portfolio Value
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                {formatCurrency(totalValue)}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                {returnsPercentage >= 0 ? (
                  <TrendingUpIcon color="success" />
                ) : (
                  <TrendingDownIcon color="error" />
                )}
                <Typography
                  ml={1}
                  color={returnsPercentage >= 0 ? 'success.main' : 'error.main'}
                >
                  {formatPercentage(returnsPercentage)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Investment
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                {formatCurrency(totalInvestment)}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Principal Amount
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Returns
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                {formatCurrency(totalReturns)}
              </Typography>
              <Typography
                variant="body2"
                color={returnsPercentage >= 0 ? 'success.main' : 'error.main'}
                mt={1}
              >
                {formatPercentage(returnsPercentage)} returns
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                CAGR
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                {formatPercentage(14.2)}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Since inception
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Chart */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" component="h2">
                Performance Analysis
              </Typography>
              
              <Box display="flex" gap={2}>
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(e, newMode) => newMode && setViewMode(newMode)}
                  size="small"
                >
                  <ToggleButton value="chart">
                    <TimelineIcon />
                  </ToggleButton>
                  <ToggleButton value="details">
                    <AssessmentIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
                
                <ButtonGroup size="small" variant="outlined">
                  {timeframes.map((tf) => (
                    <Button
                      key={tf.value}
                      onClick={() => handleTimeframeChange(tf.value)}
                      variant={timeframe === tf.value ? 'contained' : 'outlined'}
                    >
                      {tf.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </Box>
            </Box>

            {viewMode === 'chart' ? (
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => formatNumber(value)} />
                    <Tooltip
                      formatter={(value) => [formatCurrency(value), 'Value']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box mb={3}>
                    <Typography variant="h6" gutterBottom>
                      Top Performers
                    </Typography>
                    {topPerformers.map((fund, index) => (
                      <Box key={fund.id} mb={2}>
                        <Box display="flex" justifyContent="space-between" mb={0.5}>
                          <Typography variant="body2">{fund.name}</Typography>
                          <Typography
                            variant="body2"
                            color="success.main"
                            fontWeight="medium"
                          >
                            {formatPercentage(fund.returnsPercentage)}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(fund.returnsPercentage * 2, 100)}
                          color="success"
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box mb={3}>
                    <Typography variant="h6" gutterBottom>
                      Underperformers
                    </Typography>
                    {underperformers.map((fund, index) => (
                      <Box key={fund.id} mb={2}>
                        <Box display="flex" justifyContent="space-between" mb={0.5}>
                          <Typography variant="body2">{fund.name}</Typography>
                          <Typography
                            variant="body2"
                            color="error.main"
                            fontWeight="medium"
                          >
                            {formatPercentage(fund.returnsPercentage)}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(Math.abs(fund.returnsPercentage) * 2, 100)}
                          color="error"
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            )}
          </Paper>
        </Grid>

        {/* Risk Metrics */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Risk & Performance Metrics
            </Typography>
            
            <Grid container spacing={3}>
              {Object.entries(metrics).map(([key, value]) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={key}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography color="text.secondary" gutterBottom variant="body2">
                        {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                      </Typography>
                      <Typography variant="h6" component="div">
                        {typeof value === 'number' ? value.toFixed(2) : value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {key === 'sharpeRatio' && '>1.0 is good'}
                        {key === 'alpha' && 'Positive is good'}
                        {key === 'beta' && '1.0 is market'}
                        {key === 'standardDeviation' && 'Lower is better'}
                        {key === 'maxDrawdown' && 'Lower is better'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PortfolioAnalysis;