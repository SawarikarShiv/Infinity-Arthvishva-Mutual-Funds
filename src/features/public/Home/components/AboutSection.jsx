// src/features/public/Home/components/AboutSection.jsx
import React from 'react';

const AboutSection = () => {
  const strategies = [
    {
      number: '1',
      title: 'Strategic Approach',
      description: 'We deliver innovative loan and investment solutions that align with your goals.'
    },
    {
      number: '2',
      title: 'Long-Term Strategy',
      description: 'Our plans focus on sustainable financial growth and lasting security.'
    },
    {
      number: '3',
      title: 'Growth-Oriented Vision',
      description: 'We create tailored strategies that help you expand your financial horizon.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            About Us
          </h2>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-gray-700 mb-6">
            At Infinity Arthvishva, we believe that your financial success is our true achievement. 
            We are a one-stop financial advisory firm offering end-to-end solutions in loans, 
            investments, insurance, and wealth management. With a strong foundation of trust, 
            expertise, and innovation, we strive to simplify finance and empower individuals 
            and businesses to achieve their goals with confidence.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            At Infinity Arthvishva, we don't just manage finances — we build lasting relationships 
            and craft infinite possibilities for your financial future.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">GST Number</div>
                <div className="font-medium text-gray-800">27AAICI0723K1ZJ</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">CIN Number</div>
                <div className="font-medium text-gray-800">U66190PN2025PTC238981</div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Our Vision
          </h3>
          <p className="text-lg text-gray-700 mb-8">
            At Infinity Arthvishva, our vision is to seamlessly integrate advanced 
            financial intelligence into everyday life — empowering families across 
            India to achieve stability, growth, and prosperity.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {strategies.map((strategy) => (
              <div key={strategy.number} className="bg-white p-6 rounded-xl">
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  {strategy.number}
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-3">
                  {strategy.title}
                </h4>
                <p className="text-gray-600">{strategy.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Award */}
        <div className="flex items-center justify-center bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-md mx-auto">
          <div className="text-yellow-600 text-2xl mr-4">🏆</div>
          <div>
            <div className="font-bold text-yellow-800">Winner at ET Business Awards 2025 – Pune</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;