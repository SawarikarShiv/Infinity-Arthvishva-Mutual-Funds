import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Chip,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  Help as HelpIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqCategories = [
    { id: 'general', label: 'General', color: '#4CAF50' },
    { id: 'account', label: 'Account', color: '#2196F3' },
    { id: 'investment', label: 'Investment', color: '#9C27B0' },
    { id: 'technical', label: 'Technical', color: '#FF9800' },
    { id: 'fees', label: 'Fees & Charges', color: '#F44336' },
    { id: 'security', label: 'Security', color: '#607D8B' },
  ];

  const allFAQs = [
    {
      id: 'panel1',
      category: 'general',
      question: 'How do I get started with Infinity ArthVishva?',
      answer: 'Getting started is simple! 1) Visit our website and click "Sign Up" 2) Complete the online registration form 3) Upload required KYC documents 4) Complete e-KYC verification 5) Fund your account and start investing. The entire process takes less than 15 minutes.',
    },
    {
      id: 'panel2',
      category: 'account',
      question: 'What documents are required for account opening?',
      answer: 'For individual accounts: PAN card, Aadhaar card, bank proof (cancelled cheque or bank statement), passport size photograph, and address proof if current address differs from Aadhaar. For NRI accounts: PAN card, passport, visa, overseas address proof, and PIS permission letter from bank.',
    },
    {
      id: 'panel3',
      category: 'investment',
      question: 'What is the minimum investment amount?',
      answer: 'The minimum investment varies by fund type: 1) Equity funds: ₹500 2) Debt funds: ₹1,000 3) Hybrid funds: ₹1,000 4) SIP: ₹100 per month 5) ELSS: ₹500. Some funds may have higher minimums based on scheme specifications.',
    },
    {
      id: 'panel4',
      category: 'technical',
      question: 'How do I track my portfolio performance?',
      answer: 'You can track your portfolio: 1) Login to your dashboard 2) View real-time portfolio value 3) Check daily/weekly/monthly performance 4) Download detailed reports 5) Set up performance alerts 6) Compare with benchmarks. Our mobile app also provides push notifications for significant changes.',
    },
    {
      id: 'panel5',
      category: 'fees',
      question: 'What are the fees and charges?',
      answer: 'Our fee structure: 1) Account opening: Free 2) Transaction charges: ₹0 for online transactions 3) AMC charges: As per fund scheme (typically 0.5-2.5%) 4) Exit loads: Varies by fund holding period 5) Advisory fees: 0.25-1% based on portfolio size. No hidden charges.',
    },
    {
      id: 'panel6',
      category: 'security',
      question: 'How secure is my personal and financial information?',
      answer: 'We implement bank-level security: 1) 256-bit SSL encryption 2) Two-factor authentication 3) Regular security audits 4) SEBI compliant data protection 5) Secure servers with firewalls 6) Regular penetration testing 7) GDPR compliance for data privacy.',
    },
    {
      id: 'panel7',
      category: 'account',
      question: 'How do I update my contact information?',
      answer: 'To update contact details: 1) Login to your account 2) Go to Profile Settings 3) Update email/phone 4) Verify through OTP 5) For address change, upload new address proof. Some changes may require re-KYC verification.',
    },
    {
      id: 'panel8',
      category: 'investment',
      question: 'Can I change my SIP amount or frequency?',
      answer: 'Yes, you can modify SIP: 1) Login to your account 2) Navigate to SIP Management 3) Select the SIP to modify 4) Change amount/frequency/date 5) Submit changes. Modifications take effect from the next billing cycle.',
    },
    {
      id: 'panel9',
      category: 'technical',
      question: 'What if I forget my login password?',
      answer: 'Reset password: 1) Click "Forgot Password" on login page 2) Enter registered email 3) Receive reset link 4) Create new password 5) Login with new credentials. For security, the link expires in 15 minutes.',
    },
    {
      id: 'panel10',
      category: 'general',
      question: 'How do I contact customer support?',
      answer: 'Multiple support channels: 1) Phone: 1800-123-4567 (24/7) 2) Email: support@infinityarthvishva.com 3) Live Chat: Available on website/app 4) WhatsApp: +91-9876543210 5) In-person: Visit any of our branches.',
    },
  ];

  const filteredFAQs = allFAQs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularQuestions = [
    'How to start SIP investment?',
    'What is the tax saving options?',
    'How to withdraw funds?',
    'Portfolio rebalancing process',
    'NRI investment guidelines',
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box textAlign="center" mb={8}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <HelpIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                Frequently Asked Questions
              </Typography>
            </Box>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto' }}
            >
              Find quick answers to common questions about our services, 
              processes, and policies.
            </Typography>
          </motion.div>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 6 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <TextField
              fullWidth
              placeholder="Search for questions or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                sx: { height: 56, fontSize: '1.1rem' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  boxShadow: 2,
                },
              }}
            />
          </motion.div>
        </Box>

        {/* Category Filters */}
        <Box sx={{ mb: 6 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Browse by Category
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {faqCategories.map((category) => (
                <motion.div key={category.id} variants={fadeInUp}>
                  <Chip
                    label={category.label}
                    sx={{
                      bgcolor: category.color,
                      color: 'white',
                      fontWeight: 600,
                      '&:hover': { opacity: 0.9 },
                    }}
                    onClick={() => setSearchTerm(category.label)}
                  />
                </motion.div>
              ))}
              <Button
                variant="outlined"
                onClick={() => setSearchTerm('')}
                size="small"
              >
                Clear Filter
              </Button>
            </Box>
          </motion.div>
        </Box>

        {/* Popular Questions */}
        <Box sx={{ mb: 6 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Popular Questions
            </Typography>
            <Grid container spacing={2}>
              {popularQuestions.map((question, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                        bgcolor: 'primary.50',
                      },
                    }}
                    onClick={() => setSearchTerm(question.split('?')[0])}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <HelpIcon color="primary" fontSize="small" />
                      <Typography variant="body2" fontWeight={500}>
                        {question}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* FAQ Accordions */}
        <Box sx={{ mb: 8 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <motion.div key={faq.id} variants={fadeInUp}>
                  <Accordion
                    expanded={expanded === faq.id}
                    onChange={handleChange(faq.id)}
                    sx={{
                      mb: 2,
                      borderRadius: 2,
                      boxShadow: 2,
                      '&:before': { display: 'none' },
                      borderLeft: `4px solid ${faqCategories.find(c => c.id === faq.category)?.color || '#9E9E9E'}`,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        bgcolor: expanded === faq.id ? 'primary.50' : 'transparent',
                        borderRadius: expanded === faq.id ? '8px 8px 0 0' : '8px',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Chip
                          label={faqCategories.find(c => c.id === faq.category)?.label}
                          size="small"
                          sx={{
                            bgcolor: faqCategories.find(c => c.id === faq.category)?.color,
                            color: 'white',
                            fontWeight: 600,
                          }}
                        />
                        <Typography variant="h6" fontWeight={600}>
                          {faq.question}
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography color="text.secondary">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </motion.div>
              ))
            ) : (
              <Box textAlign="center" py={6}>
                <HelpIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  No questions found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try searching with different keywords or browse by category
                </Typography>
              </Box>
            )}
          </motion.div>
        </Box>

        {/* Still Have Questions */}
        <Box>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <Card
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  pointerEvents: 'none',
                }}
              />
              
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant="h3" gutterBottom fontWeight={800}>
                    Still Have Questions?
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                    Can't find what you're looking for? Our support team is here to help.
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<PhoneIcon />}
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'grey.100' },
                      }}
                    >
                      Call Now
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<EmailIcon />}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': { borderColor: 'grey.300', bgcolor: 'rgba(255,255,255,0.1)' },
                      }}
                    >
                      Send Email
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<ChatIcon />}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': { borderColor: 'grey.300', bgcolor: 'rgba(255,255,255,0.1)' },
                      }}
                    >
                      Live Chat
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </motion.div>
        </Box>

        {/* Help Resources */}
        <Grid container spacing={4} sx={{ mt: 8 }}>
          <Grid item xs={12} md={4}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true }}
            >
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: '100%',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: 'primary.50',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      color: 'primary.main',
                    }}
                  >
                    <HelpIcon sx={{ fontSize: 32 }} />
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Knowledge Base
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Browse our comprehensive library of articles, guides, and tutorials.
                  </Typography>
                  <Button variant="text" color="primary">
                    Visit Knowledge Base
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true }}
            >
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: '100%',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: 'warning.50',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      color: 'warning.main',
                    }}
                  >
                    <ChatIcon sx={{ fontSize: 32 }} />
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Community Forum
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Connect with other investors and share experiences.
                  </Typography>
                  <Button variant="text" color="warning">
                    Join Community
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true }}
            >
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: '100%',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: 'success.50',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      color: 'success.main',
                    }}
                  >
                    <PhoneIcon sx={{ fontSize: 32 }} />
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Video Tutorials
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Watch step-by-step guides for common tasks and features.
                  </Typography>
                  <Button variant="text" color="success">
                    Watch Tutorials
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FAQs;