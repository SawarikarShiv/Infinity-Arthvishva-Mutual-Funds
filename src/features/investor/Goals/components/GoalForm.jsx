import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../../../components/common/Card';
import { PrimaryButton, SecondaryButton } from '../../../components/common/Button';
import { TextInput, SelectInput } from '../../../components/common/Inputs';
import { Target, Calendar, TrendingUp } from 'lucide-react';

const GoalForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    category: initialData.category || 'General',
    targetAmount: initialData.targetAmount || 0,
    currentAmount: initialData.currentAmount || 0,
    targetDate: initialData.targetDate || '',
    priority: initialData.priority || 'Medium',
    monthlyContribution: initialData.monthlyContribution || 0,
    expectedReturn: initialData.expectedReturn || 10,
  });

  const categories = [
    { value: 'Education', label: 'Education' },
    { value: 'Retirement', label: 'Retirement' },
    { value: 'Housing', label: 'Housing' },
    { value: 'Vehicle', label: 'Vehicle' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Emergency', label: 'Emergency Fund' },
    { value: 'Marriage', label: 'Marriage' },
    { value: 'Business', label: 'Business Investment' },
    { value: 'General', label: 'General Savings' },
  ];

  const priorities = [
    { value: 'Low', label: 'Low Priority' },
    { value: 'Medium', label: 'Medium Priority' },
    { value: 'High', label: 'High Priority' },
  ];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const calculateMonthlyRequired = () => {
    const target = formData.targetAmount;
    const current = formData.currentAmount;
    const today = new Date();
    const targetDate = new Date(formData.targetDate);
    
    if (!formData.targetDate || targetDate <= today) return 0;
    
    const monthsRemaining = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24 * 30));
    if (monthsRemaining <= 0) return 0;
    
    const amountNeeded = target - current;
    const monthlyRate = formData.expectedReturn / 12 / 100;
    
    // Calculate monthly SIP required using future value of annuity formula
    const monthlyRequired = amountNeeded / (((Math.pow(1 + monthlyRate, monthsRemaining) - 1) / monthlyRate) * (1 + monthlyRate));
    
    return isNaN(monthlyRequired) ? 0 : Math.max(0, monthlyRequired);
  };

  const monthlyRequired = calculateMonthlyRequired();
  const isOnTrack = formData.monthlyContribution >= monthlyRequired;

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target size={24} className="mr-2" />
            {initialData.id ? 'Edit Goal' : 'Create New Goal'}
          </CardTitle>
          <CardDescription>
            Plan your financial goals with detailed parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                label="Goal Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Child Education, Retirement"
                required
                icon={<Target size={18} />}
              />
              
              <SelectInput
                label="Category"
                value={formData.category}
                onChange={(value) => handleChange('category', value)}
                options={categories}
                required
              />
            </div>

            {/* Financial Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TextInput
                label="Target Amount (₹)"
                type="number"
                value={formData.targetAmount}
                onChange={(e) => handleChange('targetAmount', Number(e.target.value))}
                required
                min="0"
              />
              
              <TextInput
                label="Amount Already Saved (₹)"
                type="number"
                value={formData.currentAmount}
                onChange={(e) => handleChange('currentAmount', Number(e.target.value))}
                required
                min="0"
                max={formData.targetAmount}
              />
              
              <TextInput
                label="Target Date"
                type="date"
                value={formData.targetDate}
                onChange={(e) => handleChange('targetDate', e.target.value)}
                required
                icon={<Calendar size={18} />}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Investment Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TextInput
                label="Monthly Contribution (₹)"
                type="number"
                value={formData.monthlyContribution}
                onChange={(e) => handleChange('monthlyContribution', Number(e.target.value))}
                required
                min="0"
              />
              
              <TextInput
                label="Expected Annual Return (%)"
                type="number"
                value={formData.expectedReturn}
                onChange={(e) => handleChange('expectedReturn', Number(e.target.value))}
                required
                min="1"
                max="30"
                step="0.1"
                icon={<TrendingUp size={18} />}
              />
              
              <SelectInput
                label="Priority"
                value={formData.priority}
                onChange={(value) => handleChange('priority', value)}
                options={priorities}
                required
              />
            </div>

            {/* Calculation Results */}
            <Card>
              <CardHeader>
                <CardTitle>Goal Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Amount Needed</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{(formData.targetAmount - formData.currentAmount).toLocaleString('en-IN')}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Required Monthly Contribution</p>
                    <p className={`text-2xl font-bold ${isOnTrack ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{monthlyRequired.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Your Monthly Contribution</p>
                    <p className="text-xl font-medium">
                      ₹{formData.monthlyContribution.toLocaleString('en-IN')}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className={`text-xl font-bold ${isOnTrack ? 'text-green-600' : 'text-red-600'}`}>
                      {isOnTrack ? 'On Track 🎯' : 'Needs Adjustment ⚠️'}
                    </p>
                  </div>
                </div>
                
                {!isOnTrack && monthlyRequired > 0 && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      To achieve your goal, you need to increase your monthly contribution by{' '}
                      <span className="font-bold">
                        ₹{(monthlyRequired - formData.monthlyContribution).toLocaleString('en-IN')}
                      </span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <SecondaryButton type="button" onClick={onCancel}>
                Cancel
              </SecondaryButton>
              <PrimaryButton type="submit">
                {initialData.id ? 'Update Goal' : 'Create Goal'}
              </PrimaryButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalForm;