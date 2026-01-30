// src/features/public/Home/components/LeadershipSection.jsx
import React from 'react';

const LeadershipSection = () => {
  const leaders = [
    {
      name: 'Mr. Rajesh Parkhi',
      role: 'Executive Director',
      description: 'Over 25 years of extensive experience in the retail finance sector with an MBA in Marketing. Expertise in structuring retail loan portfolios and fostering sustainable business growth.'
    },
    {
      name: 'Mr. Rahul Kangane',
      role: 'Chairman and Managing Director',
      description: '15 years of expertise in broking and wealth management, with a focus on portfolio strategy. His sharp market insights fuel the company\'s growth and success.'
    },
    {
      name: 'Mr. Pravin Marathe',
      role: 'Chief Financial Officer',
      description: 'Mr. Pravin Marathe is a Chief Financial Officer at Infinity Arthvishva with over 18 years of experience in financial markets. Known for his client-focused approach and strategic vision, he drives growth through expertise in mutual funds, PMS, and AIFs.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Leadership Team
          </h2>
          <p className="text-lg text-gray-600">
            Meet the experienced professionals leading our success
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {leader.name}
                </h3>
                <div className="text-blue-600 font-medium mb-4">
                  {leader.role}
                </div>
                <p className="text-gray-600">
                  {leader.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;