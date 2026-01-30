import React from 'react';
import MainLayout from '@components/layouts/MainLayout';
import { AboutHero, TeamSection, ValuesSection } from '@features/public/About';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Rajesh Verma',
      role: 'CEO & Founder',
      experience: '20+ years in Finance',
      bio: 'Former Chief Investment Officer at leading financial institution. Passionate about democratizing investment knowledge.',
      image: null
    },
    {
      name: 'Priya Sharma',
      role: 'Chief Investment Officer',
      experience: '15+ years in Asset Management',
      bio: 'Expert in portfolio management and risk assessment. CFA charterholder with extensive market experience.',
      image: null
    },
    {
      name: 'Amit Patel',
      role: 'Head of Technology',
      experience: '12+ years in FinTech',
      bio: 'Built scalable financial platforms for leading banks. Focus on secure and user-friendly investment solutions.',
      image: null
    },
    {
      name: 'Sunita Reddy',
      role: 'Customer Success Head',
      experience: '10+ years in Client Relations',
      bio: 'Dedicated to ensuring every investor achieves their financial goals through personalized guidance.',
      image: null
    }
  ];

  const companyValues = [
    {
      title: 'Transparency',
      description: 'Complete visibility into fees, performance, and processes. No hidden charges or surprises.',
      icon: '🔍'
    },
    {
      title: 'Integrity',
      description: 'Ethical practices and honest advice. We put investors interests first, always.',
      icon: '🤝'
    },
    {
      title: 'Innovation',
      description: 'Leveraging technology to simplify investing while maintaining robust security.',
      icon: '💡'
    },
    {
      title: 'Excellence',
      description: 'Continuous improvement in services, research, and customer experience.',
      icon: '⭐'
    }
  ];

  const milestones = [
    { year: '2008', event: 'Founded with vision to democratize investing' },
    { year: '2012', event: 'Crossed ₹100 Crores in Assets Under Advisory' },
    { year: '2015', event: 'Launched digital platform for seamless investing' },
    { year: '2018', event: 'Received SEBI Investment Advisor registration' },
    { year: '2021', event: 'Crossed 50,000+ satisfied investors' },
    { year: '2023', event: 'Expanded to 25+ cities across India' }
  ];

  return (
    <MainLayout>
      {/* About Hero */}
      <AboutHero 
        title="About Infinity Arthvishva"
        subtitle="Your Trusted Partner in Financial Growth"
        description="Founded in 2008, Infinity Arthvishva has been at the forefront of transforming how Indians invest. We combine deep financial expertise with cutting-edge technology to make investing accessible, transparent, and rewarding for everyone."
      />

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg">
                To empower every Indian with the knowledge, tools, and confidence to make informed investment decisions and achieve their financial dreams.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg">
                To become India's most trusted and innovative investment platform, recognized for transforming lives through financial empowerment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <ValuesSection values={companyValues} />

      {/* Team Section */}
      <TeamSection team={teamMembers} />

      {/* Milestones */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Milestones that mark our growth and commitment to excellence
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Timeline point */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Investment Journey With Us?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of investors who trust Infinity Arthvishva for their financial growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition text-lg">
              Start Investing
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition text-lg">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AboutPage;
EOF