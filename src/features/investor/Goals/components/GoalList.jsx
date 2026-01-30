import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/common/Card';
import { PrimaryButton, SecondaryButton } from '../../../components/common/Button';
import { Badge } from '../../../components/common/UI';
import { Progress } from '../../../components/common/UI';
import { Plus, Target, Calendar, TrendingUp, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const GoalList = ({ goals = [] }) => {
  const [sortBy, setSortBy] = useState('priority');

  const sampleGoals = [
    {
      id: 1,
      name: 'Child Education',
      targetAmount: 2500000,
      currentAmount: 850000,
      targetDate: '2030-06-15',
      priority: 'High',
      category: 'Education',
      progress: 34,
      monthlyContribution: 15000,
      expectedReturn: 12,
    },
    {
      id: 2,
      name: 'Retirement',
      targetAmount: 5000000,
      currentAmount: 1250000,
      targetDate: '2045-12-31',
      priority: 'High',
      category: 'Retirement',
      progress: 25,
      monthlyContribution: 20000,
      expectedReturn: 10,
    },
    {
      id: 3,
      name: 'House Down Payment',
      targetAmount: 1000000,
      currentAmount: 350000,
      targetDate: '2026-03-01',
      priority: 'Medium',
      category: 'Housing',
      progress: 35,
      monthlyContribution: 25000,
      expectedReturn: 8,
    },
    {
      id: 4,
      name: 'Europe Vacation',
      targetAmount: 500000,
      currentAmount: 125000,
      targetDate: '2025-08-15',
      priority: 'Low',
      category: 'Travel',
      progress: 25,
      monthlyContribution: 10000,
      expectedReturn: 7,
    },
    {
      id: 5,
      name: 'Emergency Fund',
      targetAmount: 600000,
      currentAmount: 300000,
      targetDate: '2024-12-31',
      priority: 'High',
      category: 'Emergency',
      progress: 50,
      monthlyContribution: 15000,
      expectedReturn: 6,
    },
  ];

  const sortedGoals = [...sampleGoals].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case 'progress':
        return b.progress - a.progress;
      case 'targetDate':
        return new Date(a.targetDate) - new Date(b.targetDate);
      case 'amount':
        return b.targetAmount - a.targetAmount;
      default:
        return 0;
    }
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'red';
      case 'Medium': return 'yellow';
      case 'Low': return 'green';
      default: return 'gray';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Education': return 'blue';
      case 'Retirement': return 'purple';
      case 'Housing': return 'green';
      case 'Travel': return 'orange';
      case 'Emergency': return 'red';
      default: return 'gray';
    }
  };

  const calculateMonthsRemaining = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return Math.max(0, diffMonths);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Goals</h1>
          <p className="text-gray-600">Track and manage your financial objectives</p>
        </div>
        <PrimaryButton icon={<Plus size={18} />}>
          Add New Goal
        </PrimaryButton>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {sampleGoals.length}
              </div>
              <p className="text-gray-600">Total Goals</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(sampleGoals.reduce((sum, goal) => sum + goal.targetAmount, 0))}
              </div>
              <p className="text-gray-600">Total Target Amount</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(sampleGoals.reduce((sum, goal) => sum + goal.currentAmount, 0))}
              </div>
              <p className="text-gray-600">Total Saved</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(sampleGoals.reduce((sum, goal) => sum + goal.progress, 0) / sampleGoals.length)}%
              </div>
              <p className="text-gray-600">Average Progress</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>Your Goals ({sortedGoals.length})</CardTitle>
            <div className="flex items-center space-x-4">
              <select
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="priority">Sort by Priority</option>
                <option value="progress">Sort by Progress</option>
                <option value="targetDate">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sortedGoals.map((goal) => {
              const monthsRemaining = calculateMonthsRemaining(goal.targetDate);
              const monthlyRequired = (goal.targetAmount - goal.currentAmount) / monthsRemaining;
              
              return (
                <div key={goal.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-blue-100">
                            <Target size={20} className="text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{goal.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={getPriorityColor(goal.priority)}>
                                {goal.priority} Priority
                              </Badge>
                              <Badge variant={getCategoryColor(goal.category)}>
                                {goal.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <SecondaryButton size="sm" icon={<Edit size={14} />}>
                            Edit
                          </SecondaryButton>
                          <SecondaryButton 
                            size="sm" 
                            icon={<Trash2 size={14} />}
                            variant="error"
                          >
                            Delete
                          </SecondaryButton>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress: {goal.progress}%</span>
                          <span>{formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}</span>
                        </div>
                        <Progress value={goal.progress} />
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
                          <p className="text-xs text-gray-500">{monthsRemaining} months remaining</p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">Monthly SIP</p>
                          <p className="font-medium">
                            {formatCurrency(goal.monthlyContribution)}
                          </p>
                          <p className="text-xs text-gray-500">
                            Required: {formatCurrency(monthlyRequired)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">Expected Return</p>
                          <div className="flex items-center">
                            <TrendingUp size={14} className="mr-1 text-green-500" />
                            <span className="font-medium">{goal.expectedReturn}%</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">Status</p>
                          <p className={`font-medium ${
                            goal.progress >= 100 ? 'text-green-600' :
                            goal.progress >= 75 ? 'text-blue-600' :
                            goal.progress >= 50 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {goal.progress >= 100 ? 'Achieved' :
                             goal.progress >= 75 ? 'On Track' :
                             goal.progress >= 50 ? 'Needs Attention' : 'At Risk'}
                          </p>
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

      {/* Empty State */}
      {sortedGoals.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <Target size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No goals created yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start by creating your first financial goal
            </p>
            <PrimaryButton icon={<Plus size={18} />}>
              Create Your First Goal
            </PrimaryButton>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GoalList;