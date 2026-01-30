import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckIcon,
  Timeline as TimelineIcon,
  Balance as BalanceIcon,
  Diversity3 as DiversityIcon,
  Psychology as PsychologyIcon,
  AutoGraph as StrategyIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

const InvestmentPhilosophy = () => {
  const principles = [
    {
      icon: <TimelineIcon />,
      title: 'Long-term Focus',
      description: 'We believe in the power of compounding and patient capital for sustainable wealth creation.',
      details: [
        'Minimum 5+ year investment horizon',
        'Focus on quality over quick returns',
        'Regular portfolio rebalancing',
      ],
    },
    {
      icon: <BalanceIcon />,
      title: 'Risk-Adjusted Returns',
      description: 'Every investment decision considers the risk-reward trade-off suitable for your profile.',
      details: [
        'Personalized risk assessment',
        'Diversification across assets',
        'Regular stress testing',
      ],
    },
    {
      icon: <DiversityIcon />,
      title: 'Diversification',
      description: 'Spreading investments across asset classes, sectors, and geographies to mitigate risk.',
      details: [
        'Multi-asset allocation',
        'Sector rotation strategy',
        'Global market exposure',
      ],
    },
    {
      icon: <PsychologyIcon />,
      title: 'Behavioral Finance',
      description: 'Helping investors avoid emotional decisions through education and discipline.',
      details: [
        'Emotional bias awareness',
        'Systematic investment approach',
        'Regular investor education',
      ],
    },
    {
      icon: <StrategyIcon />,
      title: 'Research-Driven',
      description: 'Investment decisions based on thorough research and data analysis.',
      details: [
        'Proprietary research models',
        'Fundamental analysis',
        'Technical indicators',
      ],
    },
    {
      icon: <SecurityIcon />,
      title: 'Capital Preservation',
      description: 'Protecting your capital is as important as growing it.',
      details: [
        'Risk management protocols',
        'Quality investment selection',
        'Regular portfolio review',
      ],
    },
  ];

  const investmentApproach = [
    {
      step: '01',
      title: 'Goal Identification',
      description: 'Understanding your financial objectives, risk tolerance, and time horizon.',
    },
    {
      step: '02',
      title: 'Risk Assessment',
      description: 'Comprehensive evaluation of your risk profile using advanced analytics.',
    },
    {
      step: '03',
      title: 'Portfolio Construction',
      description: 'Creating a diversified portfolio aligned with your goals and risk profile.',
    },
    {
      step: '04',
      title: 'Implementation',
      description: 'Executing the investment plan through systematic and disciplined approach.',
    },
    {
      step: '05',
      title: 'Monitoring & Review',
      description: 'Regular tracking and rebalancing to ensure alignment with goals.',
    },
    {
      step: '06',
      title: 'Communication',
      description: 'Transparent reporting and regular updates on portfolio performance.',
    },
  ];

  const faqs = [
    {
      question: 'What makes your investment philosophy different?',
      answer: 'Our philosophy combines traditional wisdom with modern technology. We focus on behavioral finance to help investors avoid emotional decisions, use AI for better risk assessment, and maintain complete transparency in all dealings.',
    },
    {
      question: 'How do you handle market volatility?',
      answer: 'We view volatility as an opportunity rather than a threat. Our systematic investment approach helps investors stay disciplined during market fluctuations, and our diversified portfolios are designed to weather different market conditions.',
    },
    {
      question: 'What is your approach to risk management?',
      answer: 'We employ a multi-layered risk management framework including diversification, regular stress testing, stop-loss mechanisms, and continuous monitoring. Each portfolio undergoes rigorous risk assessment before implementation.',
    },
    {
      question: 'How often do you review portfolios?',
      answer: 'We conduct quarterly comprehensive reviews and monthly health checks. However, our automated systems monitor portfolios daily for any significant changes that require immediate attention.',
    },
    {
      question: 'Do you recommend timing the market?',
      answer: 'We believe time in the market is more important than timing the market. Our approach focuses on systematic investing and long-term wealth creation rather than speculative short-term gains.',
    },
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
            <Chip
              label="Investment Philosophy"
              color="primary"
              sx={{ mb: 2, fontSize: '0.875rem', py: 1 }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Our Investment Approach
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto' }}
            >
              A disciplined, research-driven approach focused on long-term wealth 
              creation through intelligent diversification and risk management.
            </Typography>
          </motion.div>
        </Box>

        {/* Core Principles */}
        <Box sx={{ mb: 12 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              sx={{ mb: 4, fontWeight: 800, textAlign: 'center' }}
            >
              Core Investment Principles
            </Typography>
            
            <Grid container spacing={4}>
              {principles.map((principle, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div variants={fadeInUp}>
                    <Card
                      sx={{
                        height: '100%',
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: 8,
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4, textAlign: 'center' }}>
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
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
                          {principle.icon}
                        </Box>
                        
                        <Typography variant="h5" gutterBottom fontWeight={600}>
                          {principle.title}
                        </Typography>
                        
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ mb: 3 }}
                        >
                          {principle.description}
                        </Typography>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <List dense>
                          {principle.details.map((detail, idx) => (
                            <ListItem key={idx} disableGutters>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <CheckIcon color="primary" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={detail} />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* Investment Process */}
        <Box sx={{ mb: 12 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              sx={{ mb: 6, fontWeight: 800, textAlign: 'center' }}
            >
              Our 6-Step Investment Process
            </Typography>
            
            <Grid container spacing={4}>
              {investmentApproach.map((step, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      p: 3,
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        bgcolor: 'primary.50',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '1.2rem',
                      }}
                    >
                      {step.step}
                    </Box>
                    
                    <Box sx={{ pl: 6 }}>
                      <Typography variant="h5" gutterBottom fontWeight={600}>
                        {step.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step.description}
                      </Typography>
                    </Box>
                    
                    {index < investmentApproach.length - 1 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          right: -24,
                          top: '50%',
                          width: 48,
                          height: 2,
                          bgcolor: 'primary.main',
                          display: { xs: 'none', md: 'block' },
                        }}
                      />
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* Key Differentiators */}
        <Box sx={{ mb: 12 }}>
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
              
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 4,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                What Sets Us Apart
              </Typography>
              
              <Grid container spacing={4}>
                {[
                  {
                    title: 'Technology Edge',
                    items: [
                      'AI-powered portfolio optimization',
                      'Real-time risk monitoring',
                      'Automated rebalancing',
                    ],
                  },
                  {
                    title: 'Research Depth',
                    items: [
                      'Proprietary analysis models',
                      'Access to premium research',
                      'In-house expert team',
                    ],
                  },
                  {
                    title: 'Client Experience',
                    items: [
                      'Personalized advisory',
                      'Transparent communication',
                      '24/7 support access',
                    ],
                  },
                ].map((differentiator, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Box
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                        p: 3,
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        height: '100%',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 600, mb: 2, opacity: 0.9 }}
                      >
                        {differentiator.title}
                      </Typography>
                      <List dense disablePadding>
                        {differentiator.items.map((item, idx) => (
                          <ListItem key={idx} disableGutters sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckIcon sx={{ color: 'white', opacity: 0.9 }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{ sx: { opacity: 0.9 } }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </motion.div>
        </Box>

        {/* FAQs */}
        <Box>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              sx={{ mb: 4, fontWeight: 800, textAlign: 'center' }}
            >
              Frequently Asked Questions
            </Typography>
            
            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
              {faqs.map((faq, index) => (
                <Accordion key={index} sx={{ mb: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" fontWeight={600}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </motion.div>
        </Box>

        {/* CTA Section */}
        <Box sx={{ mt: 12, textAlign: 'center' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <Card
              sx={{
                background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
                color: 'white',
                p: { xs: 4, md: 6 },
                borderRadius: 4,
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontWeight: 800, mb: 3 }}
              >
                Ready to Start Your Investment Journey?
              </Typography>
              <Typography
                variant="h6"
                sx={{ mb: 4, opacity: 0.9 }}
              >
                Join thousands of investors who trust us with their financial future.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Chip
                  label="₹0 Account Opening"
                  sx={{ bgcolor: 'white', color: 'success.main', fontWeight: 600 }}
                />
                <Chip
                  label="No Hidden Charges"
                  sx={{ bgcolor: 'white', color: 'success.main', fontWeight: 600 }}
                />
                <Chip
                  label="Expert Guidance"
                  sx={{ bgcolor: 'white', color: 'success.main', fontWeight: 600 }}
                />
              </Box>
            </Card>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default InvestmentPhilosophy;