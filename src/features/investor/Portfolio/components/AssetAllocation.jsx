import React, { useMemo } from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { usePortfolio } from '../hooks/usePortfolio';
import { formatPercentage } from '../../../utils/helpers/numberFormatter';

const AssetAllocation = () => {
  const { assetAllocation, isLoading } = usePortfolio();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const chartData = useMemo(() => {
    return assetAllocation.map(item => ({
      name: item.category,
      value: item.percentage,
      amount: item.amount,
    }));
  }, [assetAllocation]);

  const totalAmount = useMemo(() => {
    return assetAllocation.reduce((sum, item) => sum + item.amount, 0);
  }, [assetAllocation]);

  if (isLoading && assetAllocation.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 3, height: 400 }}>
        <Typography>Loading asset allocation...</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Asset Allocation
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${formatPercentage(entry.value)}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    `${formatPercentage(value)} (₹${props.payload.amount.toLocaleString()})`,
                    name,
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Allocation Details
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              {assetAllocation.map((item, index) => (
                <Box key={item.category}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box
                        width={12}
                        height={12}
                        borderRadius="50%"
                        bgcolor={COLORS[index % COLORS.length]}
                      />
                      <Typography variant="body1">{item.category}</Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {formatPercentage(item.percentage)}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    ₹{item.amount.toLocaleString()} • {item.count} fund(s)
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box mt={3} pt={2} borderTop={1} borderColor="divider">
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" fontWeight="medium">
                  Total Portfolio Value:
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  ₹{totalAmount.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AssetAllocation;