import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '@components/layouts/MainLayout';
import { 
  HeroSection, 
  StatsSection, 
  FundsSection, 
  TestimonialsSection, 
  InvestmentCalculator, 
  CTASection 
} from '@features/public/Home';
import { fetchHomeStats, fetchFeaturedFunds, fetchTestimonials } from '@features/public/Home/homeSlice';
import Loader from '@components/common/Loader/Spinner';

const HomePage = () => {
  const dispatch = useDispatch();
  const { stats, featuredFunds, testimonials, isLoading, error } = useSelector(state => state.home);

  useEffect(() => {
    dispatch(fetchHomeStats());
    dispatch(fetchFeaturedFunds());
    dispatch(fetchTestimonials());
  }, [dispatch]);

  if (isLoading && !stats) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader size="lg" />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-2xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Stats Section */}
      <StatsSection stats={stats} />
      
      {/* Funds Section */}
      <FundsSection funds={featuredFunds} />
      
      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} />
      
      {/* Investment Calculator */}
      <InvestmentCalculator />
      
      {/* CTA Section */}
      <CTASection />
    </MainLayout>
  );
};

export default HomePage;
EOF
