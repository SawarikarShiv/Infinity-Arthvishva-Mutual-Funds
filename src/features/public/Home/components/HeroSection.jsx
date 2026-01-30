import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '@components/common/Button/PrimaryButton';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      <div className="relative container mx-auto px-4 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Brand */}
          <div className="mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm mb-6">
              <span className="text-3xl">📈</span>
            </div>
            
            {/* Main Heading - Matches Infinity Arthvishva website */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Financial Success is{' '}
              <span className="bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                Our True Achievement
              </span>
            </h1>
            
            {/* Subtitle - Matches their exact message */}
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
              One-stop financial advisory for loans, investments, insurance, and wealth management
            </p>
          </div>

          {/* Stats - Updated to match their partner metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">2600+</div>
              <div className="text-blue-200">Active Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">500Cr+</div>
              <div className="text-blue-200">Assets Managed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">20+</div>
              <div className="text-blue-200">Branches India</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">4.8★</div>
              <div className="text-blue-200">Customer Rating</div>
            </div>
          </div>

          {/* CTA Buttons - More prominent like their website */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/register">
              <PrimaryButton 
                className="px-10 py-4 text-lg bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Your Journey
              </PrimaryButton>
            </Link>
            <Link to="/contact">
              <button className="px-10 py-4 text-lg border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 hover:border-white/80 transition-all duration-300">
                Book Free Consultation
              </button>
            </Link>
          </div>

          {/* Trust Indicators - Updated with their credentials */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-blue-200">
            <div className="flex items-center bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm md:text-base">SEBI Registered</span>
            </div>
            <div className="flex items-center bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm md:text-base">AMFI Certified</span>
            </div>
            <div className="flex items-center bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm md:text-base">ET Award 2025</span>
            </div>
            <div className="flex items-center bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm md:text-base">ISO Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Decoration - Updated for better visual */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24 md:h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".15" fill="white"/>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".25" fill="white"/>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            opacity=".35" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;