import React, { useState } from 'react';
import InvestorLayout from '@components/layouts/InvestorLayout';
import { GoalList, GoalForm, GoalCalculator, GoalProgress } from '@features/investor/Goals';

const GoalsPage = () => {
  const [activeView, setActiveView] = useState('list');
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [goals, setGoals] = useState([
    {
      id: 'G001',
      name: 'Child Education',
      targetAmount: 5000000,
      currentAmount: 1250000,
      targetDate: '2035-06-15',
      monthlyContribution: 25000,
      progress: 25,
      priority: 'high',
      category: 'Education'
    },
    {
      id: 'G002',
      name: 'Retirement Fund',
      targetAmount: 20000000,
      currentAmount: 4500000,
      targetDate: '2045-12-31',
      monthlyContribution: 50000,
      progress: 22.5,
      priority: 'medium',
      category: 'Retirement'
    },
    {
      id: 'G003',
      name: 'Dream Home',
      targetAmount: 10000000,
      currentAmount: 2000000,
      targetDate: '2030-03-30',
      monthlyContribution: 40000,
      progress: 20,
      priority: 'high',
      category: 'Property'
    },
    {
      id: 'G004',
      name: 'World Tour',
      targetAmount: 2000000,
      currentAmount: 500000,
      targetDate: '2028-12-01',
      monthlyContribution: 15000,
      progress: 25,
      priority: 'low',
      category: 'Travel'
    }
  ]);

  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
    setActiveView('progress');
  };

  const handleAddGoal = (newGoal) => {
    const goalWithId = {
      ...newGoal,
      id: `G${String(goals.length + 1).padStart(3, '0')}`,
      progress: 0,
      currentAmount: 0
    };
    setGoals([...goals, goalWithId]);
    setActiveView('list');
  };

  const handleUpdateGoal = (updatedGoal) => {
    setGoals(goals.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
    setSelectedGoal(updatedGoal);
  };

  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
    if (selectedGoal && selectedGoal.id === goalId) {
      setSelectedGoal(null);
      setActiveView('list');
    }
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'list':
        return (
          <GoalList 
            goals={goals} 
            onGoalSelect={handleGoalSelect}
            onAddGoal={() => setActiveView('form')}
          />
        );
      case 'form':
        return (
          <GoalForm 
            onSubmit={handleAddGoal}
            onCancel={() => setActiveView('list')}
          />
        );
      case 'progress':
        return selectedGoal && (
          <GoalProgress 
            goal={selectedGoal}
            onUpdate={handleUpdateGoal}
            onDelete={() => handleDeleteGoal(selectedGoal.id)}
            onBack={() => setActiveView('list')}
          />
        );
      case 'calculator':
        return <GoalCalculator />;
      default:
        return <GoalList goals={goals} onGoalSelect={handleGoalSelect} />;
    }
  };

  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrent = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalMonthly = goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0);
  const overallProgress = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;

  return (
    <InvestorLayout>
      {/* Goals Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-b-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Financial Goals</h1>
            <p className="text-blue-100">
              Plan, track, and achieve your financial dreams
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-3">
              <button 
                onClick={() => setActiveView('calculator')}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
              >
                Goal Calculator
              </button>
              <button 
                onClick={() => setActiveView('form')}
                className="px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition font-medium"
              >
                + New Goal
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Overall Progress */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Overall Progress</h2>
            <span className="text-2xl font-bold text-blue-600">{overallProgress.toFixed(1)}%</span>
          </div>
          
          <div className="mb-6">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(totalTarget)}
              </div>
              <div className="text-sm text-gray-600">Total Target</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(totalCurrent)}
              </div>
              <div className="text-sm text-gray-600">Achieved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(totalMonthly)}
              </div>
              <div className="text-sm text-gray-600">Monthly Investment</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveView('list')}
            className={`px-4 py-2 rounded-lg transition ${
              activeView === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Goals
          </button>
          <button
            onClick={() => setActiveView('form')}
            className={`px-4 py-2 rounded-lg transition ${
              activeView === 'form'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            New Goal
          </button>
          <button
            onClick={() => setActiveView('calculator')}
            className={`px-4 py-2 rounded-lg transition ${
              activeView === 'calculator'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Calculator
          </button>
        </div>

        {/* Active View */}
        {renderActiveView()}

        {/* Goal Categories */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Goal Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
              <div className="text-2xl mb-2">🏠</div>
              <div className="font-medium">Property</div>
              <div className="text-sm text-gray-600">Home, Land, Renovation</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
              <div className="text-2xl mb-2">🎓</div>
              <div className="font-medium">Education</div>
              <div className="text-sm text-gray-600">Child Education, Courses</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
              <div className="text-2xl mb-2">✈️</div>
              <div className="font-medium">Travel</div>
              <div className="text-sm text-gray-600">Vacation, World Tour</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl">
              <div className="text-2xl mb-2">👵</div>
              <div className="font-medium">Retirement</div>
              <div className="text-sm text-gray-600">Peaceful Retirement</div>
            </div>
          </div>
        </div>
      </div>
    </InvestorLayout>
  );
};

export default GoalsPage;
EOF
