// src/features/public/Home/components/OffersSection.jsx
import React from 'react';

const OffersSection = () => {
  const offers = {
    finance: {
      title: 'Finance',
      description: 'Comprehensive loan solutions for all your financial needs.',
      items: [
        '✓ Home Loan', '✓ Personal Loan', '✓ Business Loan', '✓ SME Loan',
        '✓ Auto Loan', '✓ Mortgage Loan', '✓ Education Loan', '✓ Vehicle Loan',
        '✓ Loan Against Securities'
      ]
    },
    protection: {
      title: 'Protection',
      description: 'Insurance solutions to safeguard your future and assets.',
      items: [
        '✓ Life Insurance', '✓ Health Insurance', '✓ Motor Insurance',
        '✓ Property Insurance', '✓ Travel Insurance', '✓ Cattle Insurance',
        '✓ Marine Insurance', '✓ Corporate Insurance'
      ]
    },
    investment: {
      title: 'Investment',
      description: 'Strategic investment options to grow your wealth.',
      items: [
        '✓ Mutual Funds', '✓ Wealth Management', '✓ Demat Account',
        '✓ Real Estate Investments', '✓ Portfolio Management Service',
        '✓ Alternative Investment Fund', '✓ Fixed Deposit', '✓ Bonds',
        '✓ Unlisted Shares'
      ]
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Offers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Exclusive financial offers tailored to your unique needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(offers).map(([key, offer]) => (
            <div key={key} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {offer.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {offer.description}
              </p>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-3">
                  Available Offers:
                </h4>
                <ul className="space-y-2">
                  {offer.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;