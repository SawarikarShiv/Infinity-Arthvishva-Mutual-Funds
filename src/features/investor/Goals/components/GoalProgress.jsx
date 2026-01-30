import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/common/Card';
import { Badge } from '../../../components/common/UI';
import { Progress } from '../../../components/common/UI';
import { LineChart, PieChart } from '../../../components/common/Charts';
import { Target, TrendingUp, TrendingDown, Calendar, Award } from 'lucide-react';
import { format } from 'date-fns';

const GoalProgress = () => {
  const [timeframe, setTimeframe] = useState('year');

  // Sample goals with progress data
  const goals = [
    {
      id: 1,
      name: 'Child Education',
      targetAmount: 2500000,
      currentAmount: 850000,
      targetDate: '2030-06-15',
      category: 'Education',
      progress: 34,
      monthlySIP: 15000,
      historicalProgress: [
        { month: 'Jan', progress: 25 },
        { month: 'Feb', progress: 26 },
        { month: 'Mar', progress: 27 },
        { month: 'Apr', progress: 28 },
        { month: 'May', progress: 30 },
        { month: 'Jun', progress: 31 },
        { month: 'Jul', progress: 32 },
        { month: 'Aug', progress: 33 },
        { month: 'Sep', progress: 34 },
      ],
    },
    {
      id: 2,
      name: 'Retirement',
      targetAmount: 5000000,
      currentAmount: 1250000,
      targetDate: '2045-12-31',
      category: 'Retirement',
      progress: 25,
      monthlySIP: 20000,
      historicalProgress: [
        { month: 'Jan', progress: 22 },
        { month: 'Feb', progress: 22.5 },
        { month: 'Mar', progress: 23 },
        { month: 'Apr', progress: 23.5 },
        { month: 'May', progress: 24 },
        { month: 'Jun', progress: 24.2 },
        { month: 'Jul', progress: 24.5 },
        { month: 'Aug', progress: 24.8 },
        { month: 'Sep', progress: 25 },
      ],
    },
    {
      id: 3,
      name: 'House Down Payment',
      targetAmount: 1000000,
      currentAmount: 350000,
      targetDate: '2026-03-01',
      category: 'Housing',
      progress: 35,
      monthlySIP: 25000,
      historicalProgress: [
        { month: 'Jan', progress: 30 },
        { month: 'Feb', progress: 31 },
        { month: 'Mar', progress: 32 },
        { month: 'Apr', progress: 32.5 },
        { month: 'May', progress: 33 },
        { month: 'Jun', progress: 33.5 },
        { month: 'Jul', progress: 34 },
        { month: 'Aug', progress: 34.5 },
        { month: 'Sep', progress: 35 },
      ],
    },
  ];

  const overallProgress = goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length;
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrent = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);

  const getProgressStatus = (progress) => {
    if (progress >= 100) return { text: 'Achieved', color: 'text-green-600', bg: 'bg-green-100' };
    if (progress >= 75) return { text: 'On Track', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (progress >= 50) return { text: 'Needs Attention', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'At Risk', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Prepare data for charts
  const categoryData = goals.reduce((acc, goal) => {
    const existing = acc.find(item => item.name === goal.category);
    if (existing) {
      existing.value += goal.currentAmount;
    } else {
      acc.push({ name: goal.category, value: goal.currentAmount });
    }
    return acc;
  }, []);

  const progressTrend = goals[0]?.historicalProgress || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Goal Progress Dashboard</h1>
          <p className="text-gray-600">Track your progress towards financial goals</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="month">Monthly</option>
            <option value="quarter">Quarterly</option>
            <option value="year">Yearly</option>
          </select>
        </div>
      </div>

      {/* Overall Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {overallProgress.toFixed(1)}%
              </div>
              <p className="text-gray-600 mt-2">Overall Progress</p>
              <Progress value={overallProgress} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {formatCurrency(totalTarget)}
              </div>
              <p className="text-gray-600 mt-2">Total Target Amount</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {formatCurrency(totalCurrent)}
              </div>
              <p className="text-gray-600 mt-2">Total Amount Saved</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {goals.length}
              </div>
              <p className="text-gray-600 mt-2">Active Goals</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={progressTrend}
              xKey="month"
              yKeys={['progress']}
              height={250}
              colors={['#10b981']}
            />
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Savings by Goal Category</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={categoryData}
              height={250}
              showLegend={true}
            />
          </CardContent>
        </Card>
      </div>

      {/* Individual Goal Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Goal-wise Progress Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {goals.map((goal) => {
              const status = getProgressStatus(goal.progress);
              const monthsRemaining = Math.ceil((new Date(goal.targetDate) - new Date()) / (1000 * 60 * 60 * 24 * 30));
              
              return (
                <div key={goal.id} className="border rounded-lg p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-blue-100">
                            <Target size={20} className="text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{goal.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="blue">{goal.category}</Badge>
                              <Badge className={status.bg}>
                                <span className={status.color}>{status.text}</span>
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{goal.progress}%</div>
                          <p className="text-sm text-gray-600">Progress</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <Progress value={goal.progress} />
                        <div className="flex justify-between text-sm mt-1">
                          <span>{formatCurrency(goal.currentAmount)} saved</span>
                          <span>{formatCurrency(goal.targetAmount)} target</span>
                        </div>
                      </div>

                      {/* Goal Details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Target Date</p>
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1 text-gray-500" />
                            <span className="font-medium">
                              {format(new Date(goal.targetDate), 'MMM yyyy')}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{monthsRemaining} months left</p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">Monthly SIP</p>
                          <p className="font-medium">{formatCurrency(goal.monthlySIP)}</p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">Amount Needed</p>
                          <p className="font-medium text-blue-600">
                            {formatCurrency(goal.targetAmount - goal.currentAmount)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">On Track?</p>
                          <div className="flex items-center">
                            {goal.progress >= 75 ? (
                              <>
                                <TrendingUp size={14} className="mr-1 text-green-500" />
                                <span className="font-medium text-green-600">Yes</span>
                              </>
                            ) : (
                              <>
                                <TrendingDown size={14} className="mr-1 text-red-500" />
                                <span className="font-medium text-red-600">No</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Achievements & Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award size={20} className="mr-2" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">🎯</div>
              <p className="font-medium mt-2">1 Goal Ahead of Schedule</p>
              <p className="text-sm text-gray-600">Retirement goal is 5% ahead</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">💰</div>
              <p className="font-medium mt-2">₹1,25,000 Saved This Year</p>
              <p className="text-sm text-gray-600">Keep up the good work!</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">📈</div>
              <p className="font-medium mt-2">15% Average Return</p>
              <p className="text-sm text-gray-600">Above your 12% target</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="font-medium text-yellow-800">⚠️ House Down Payment Goal</p>
              <p className="text-sm text-yellow-700">
                You're behind schedule by 3 months. Consider increasing your monthly SIP by ₹5,000
              </p>
            </div>
            
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-medium text-green-800">✅ Emergency Fund Goal</p>
              <p className="text-sm text-green-700">
                Congratulations! You've completed 50% of your emergency fund goal
              </p>
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-medium text-blue-800">💡 Smart Tip</p>
              <p className="text-sm text-blue-700">
                Consider investing your annual bonus in your retirement goal for faster progress
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalProgress;