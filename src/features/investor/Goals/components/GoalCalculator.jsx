import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../../../components/common/Card';
import { PrimaryButton, SecondaryButton } from '../../../components/common/Button';
import { TextInput, SelectInput } from '../../../components/common/Inputs';
import { LineChart, PieChart } from '../../../components/common/Charts';
import { Target, Calculator, TrendingUp, Calendar, Download } from 'lucide-react';

const GoalCalculator = () => {
  const [goalType, setGoalType] = useState('retirement');
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [inflationRate, setInflationRate] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [results, setResults] = useState(null);

  const goalTypes = [
    { value: 'retirement', label: 'Retirement Planning' },
    { value: 'education', label: 'Child Education' },
    { value: 'house', label: 'House Purchase' },
    { value: 'travel', label: 'Travel Goal' },
    { value: 'emergency', label: 'Emergency Fund' },
  ];

  const calculateGoal = () => {
    let targetAmount = 0;
    let workingYears = retirementAge - currentAge;
    let retirementYears = lifeExpectancy - retirementAge;

    // Calculate retirement corpus
    const monthlyExpensesFuture = monthlyExpenses * Math.pow(1 + inflationRate/100, workingYears);
    const annualExpensesFuture = monthlyExpensesFuture * 12;
    const retirementCorpus = annualExpensesFuture * retirementYears;

    // Adjust for investment returns during retirement
    const adjustedCorpus = retirementCorpus / Math.pow(1 + expectedReturn/100, retirementYears/2);

    targetAmount = Math.max(adjustedCorpus, 0);

    // Calculate monthly SIP required
    const monthlyRate = expectedReturn / 12 / 100;
    const months = workingYears * 12;
    const futureValueNeeded = targetAmount - currentSavings * Math.pow(1 + expectedReturn/100, workingYears);
    
    const monthlySIP = futureValueNeeded / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    
    // Generate projection data
    const projectionData = [];
    let accumulated = currentSavings;
    
    for (let year = 1; year <= workingYears; year++) {
      // Add yearly contributions
      const yearlyContribution = monthlySIP * 12;
      accumulated = (accumulated + yearlyContribution) * (1 + expectedReturn/100);
      
      projectionData.push({
        year: `Year ${year}`,
        age: currentAge + year,
        corpus: Math.round(accumulated),
        contributions: yearlyContribution * year,
      });
    }

    setResults({
      targetAmount: Math.round(targetAmount),
      monthlySIP: Math.round(Math.max(monthlySIP, 0)),
      workingYears,
      retirementYears,
      projectionData,
      retirementCorpus: Math.round(adjustedCorpus),
    });
  };

  useEffect(() => {
    calculateGoal();
  }, [goalType, currentAge, retirementAge, lifeExpectancy, currentSavings, monthlyExpenses, inflationRate, expectedReturn]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getGoalSpecificParams = () => {
    switch (goalType) {
      case 'education':
        return {
          title: 'Child Education Planning',
          description: 'Plan for your child\'s higher education expenses',
        };
      case 'house':
        return {
          title: 'House Purchase Planning',
          description: 'Calculate your home down payment and EMI planning',
        };
      case 'travel':
        return {
          title: 'Travel Goal Planning',
          description: 'Plan your dream vacation',
        };
      case 'emergency':
        return {
          title: 'Emergency Fund Planning',
          description: 'Build your financial safety net',
        };
      default:
        return {
          title: 'Retirement Planning',
          description: 'Calculate your retirement corpus needs',
        };
    }
  };

  const goalParams = getGoalSpecificParams();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{goalParams.title}</h1>
          <p className="text-gray-600">{goalParams.description}</p>
        </div>
        <div className="flex space-x-3">
          <SecondaryButton icon={<Download size={18} />}>
            Export Plan
          </SecondaryButton>
          <PrimaryButton icon={<Calculator size={18} />}>
            Save Calculation
          </PrimaryButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Goal Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <SelectInput
                  label="Goal Type"
                  value={goalType}
                  onChange={setGoalType}
                  options={goalTypes}
                />

                <div className="grid grid-cols-2 gap-4">
                  <TextInput
                    label="Current Age"
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    min="18"
                    max="70"
                  />
                  
                  <TextInput
                    label="Retirement Age"
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                    min={currentAge + 1}
                    max="75"
                  />
                </div>

                <TextInput
                  label="Life Expectancy"
                  type="number"
                  value={lifeExpectancy}
                  onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                  min={retirementAge + 1}
                  max="100"
                />

                <TextInput
                  label="Current Savings (₹)"
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  min="0"
                />

                <TextInput
                  label="Monthly Expenses (₹)"
                  type="number"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                  min="0"
                />

                <div className="grid grid-cols-2 gap-4">
                  <TextInput
                    label="Inflation Rate (%)"
                    type="number"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(Number(e.target.value))}
                    min="0"
                    max="15"
                    step="0.1"
                  />
                  
                  <TextInput
                    label="Expected Return (%)"
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    min="1"
                    max="30"
                    step="0.1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <TrendingUp size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Start early to benefit from compounding</span>
                </li>
                <li className="flex items-start">
                  <Calendar size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Review your plan annually</span>
                </li>
                <li className="flex items-start">
                  <Target size={16} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Increase SIP with salary increments</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
          {results && (
            <>
              {/* Key Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(results.targetAmount)}
                    </div>
                    <p className="text-gray-600 text-sm">Target Corpus</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(results.monthlySIP)}
                    </div>
                    <p className="text-gray-600 text-sm">Monthly SIP Required</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {results.workingYears} years
                    </div>
                    <p className="text-gray-600 text-sm">Working Years Left</p>
                  </CardContent>
                </Card>
              </div>

              {/* Projection Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Corpus Growth Projection</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={results.projectionData}
                    xKey="year"
                    yKeys={['corpus']}
                    height={300}
                    colors={['#10b981']}
                  />
                </CardContent>
              </Card>

              {/* Detailed Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-4">Yearly Progress</h4>
                      <div className="space-y-3">
                        {results.projectionData.slice(0, 5).map((data, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{data.year} (Age {data.age})</span>
                            <span className="font-medium">{formatCurrency(data.corpus)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-4">Summary</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Investment Period</span>
                          <span className="font-medium">{results.workingYears} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Retirement Years</span>
                          <span className="font-medium">{results.retirementYears} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Contributions</span>
                          <span className="font-medium">
                            {formatCurrency(results.monthlySIP * 12 * results.workingYears)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Expected Returns</span>
                          <span className="font-medium text-green-600">
                            {formatCurrency(results.targetAmount - (results.monthlySIP * 12 * results.workingYears + currentSavings))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Action Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-800">Immediate Action:</p>
                      <p className="text-sm text-blue-700">
                        Start a monthly SIP of {formatCurrency(results.monthlySIP)} in equity mutual funds
                      </p>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-green-800">Medium Term (5 years):</p>
                      <p className="text-sm text-green-700">
                        Increase SIP by 10% annually to keep up with inflation
                      </p>
                    </div>
                    
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="font-medium text-purple-800">Long Term (10+ years):</p>
                      <p className="text-sm text-purple-700">
                        Consider shifting to more conservative funds 5 years before retirement
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalCalculator;