import React, { useState } from 'react';
import MainLayout from '@components/layouts/MainLayout';
import { ContactForm, ContactInfo, FAQs } from '@features/public/Contact';

const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const contactInfo = {
    headquarters: {
      address: 'Infinity Tower, 5th Floor, Bandra Kurla Complex, Mumbai - 400051',
      phone: '+91 22 1234 5678',
      email: 'info@infinityarthvishva.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 2:00 PM'
    },
    branches: [
      {
        city: 'Delhi',
        address: 'Connaught Place, Central Delhi',
        phone: '+91 11 2345 6789'
      },
      {
        city: 'Bangalore',
        address: 'MG Road, Bangalore',
        phone: '+91 80 3456 7890'
      },
      {
        city: 'Chennai',
        address: 'Anna Nagar, Chennai',
        phone: '+91 44 4567 8901'
      },
      {
        city: 'Hyderabad',
        address: 'Banjara Hills, Hyderabad',
        phone: '+91 40 5678 9012'
      }
    ]
  };

  const faqs = [
    {
      question: 'What is the minimum investment amount?',
      answer: 'You can start investing with as little as ₹500 per month through SIP or ₹5,000 for lump sum investments in most funds.'
    },
    {
      question: 'How do I complete my KYC?',
      answer: 'You can complete KYC online in 5 minutes using Aadhaar-based e-KYC or submit documents offline at our branches.'
    },
    {
      question: 'Are my investments safe and secure?',
      answer: 'Yes, we are SEBI-registered investment advisors. All investments are held directly with AMCs in your name. We use bank-level security and encryption.'
    },
    {
      question: 'What are the charges and fees?',
      answer: 'We charge a nominal advisory fee which is clearly disclosed upfront. There are no hidden charges or commissions on mutual fund investments.'
    },
    {
      question: 'Can I withdraw my money anytime?',
      answer: 'Yes, you can redeem your mutual fund investments anytime. However, exit loads may apply for redemptions within a specified period.'
    },
    {
      question: 'Do you provide tax-saving advice?',
      answer: 'Yes, our advisors provide comprehensive tax planning including ELSS investments, tax harvesting, and portfolio optimization for tax efficiency.'
    }
  ];

  const handleFormSubmit = async (formData) => {
    // In production, this would be an API call
    console.log('Contact form submitted:', formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFormSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Have questions about investing? Our team of experts is here to help you achieve your financial goals.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
              
              {formSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">✅</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <ContactForm onSubmit={handleFormSubmit} />
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <ContactInfo info={contactInfo} />
            
            {/* Quick Support */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-800 mb-4">Need Immediate Assistance?</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600">📞</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Call Us</div>
                    <div className="text-blue-600 font-bold">1800-123-4567</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600">💬</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Live Chat</div>
                    <div className="text-blue-600 font-bold">Available 24/7</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600">✉️</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Email Support</div>
                    <div className="text-blue-600">support@infinityarthvishva.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about investing with Infinity Arthvishva
            </p>
          </div>
          
          <FAQs items={faqs} />
        </div>

        {/* Map/Visit Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Visit Our Office</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">📍</span>
                  <div>
                    <div className="font-medium text-gray-800">Headquarters</div>
                    <p className="text-gray-600">{contactInfo.headquarters.address}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 mr-3">🕒</span>
                  <div>
                    <div className="font-medium text-gray-800">Business Hours</div>
                    <p className="text-gray-600">{contactInfo.headquarters.hours}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 mr-3">📞</span>
                  <div>
                    <div className="font-medium text-gray-800">Contact Number</div>
                    <p className="text-gray-600">{contactInfo.headquarters.phone}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Other Branches</h4>
                <div className="space-y-3">
                  {contactInfo.branches.map((branch, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">{branch.city}</div>
                        <div className="text-sm text-gray-600">{branch.phone}</div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View on Map
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-200 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl mb-4 block">🗺️</span>
                <p className="text-gray-600">Interactive Map would be here</p>
                <p className="text-sm text-gray-500 mt-2">(In production, this would show Google Maps)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
EOF
