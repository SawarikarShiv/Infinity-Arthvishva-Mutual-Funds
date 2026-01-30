// src/features/public/Home/components/PartnerSection.jsx
import React from 'react';

const PartnerSection = () => {
  const stats = [
    {
      value: '2600+',
      label: 'Active DSA & Partners',
      description: 'Trusted Partnerships'
    },
    {
      value: '20+',
      label: 'Branches Across India',
      description: 'Pan India Presence'
    },
    {
      value: '500Cr+',
      label: 'in Total Loan Book',
      description: 'Assets Managed'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Become Our Partner
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join our growing network and unlock success with powerful tools, 
            expert support, and a nationwide platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-xl font-medium mb-2">
                {stat.label}
              </div>
              <div className="text-blue-200">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;