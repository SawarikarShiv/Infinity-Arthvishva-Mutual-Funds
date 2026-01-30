import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Security as SecurityIcon,
  EmojiObjects as InnovationIcon,
  People as PeopleIcon,
  TrendingUp as GrowthIcon,
  Gavel as IntegrityIcon,
  School as EducationIcon,
} from '@mui/icons-material';

const ValuesSection = () => {
  const values = [
    {
      icon: <SecurityIcon sx={{ fontSize: 48 }} />,
      title: 'Trust & Security',
      description: 'We prioritize the safety of your investments with robust security measures and transparent operations.',
      color: '#4CAF50',
      points: [
        'SEBI registered & regulated',
        'Bank-level security protocols',
        'Regular audits & compliance checks',
      ],
    },
    {
      icon: <IntegrityIcon sx={{ fontSize: 48 }} />,
      title: 'Integrity',
      description: 'Honest communication and ethical practices form the foundation of all our relationships.',
      color: '#2196F3',
      points: [
        'Transparent fee structure',
        'No hidden charges',
        'Conflict-free advice',
      ],
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 48 }} />,
      title: 'Client First',
      description: 'Your financial goals drive our decisions and innovations.',
      color: '#9C27B0',
      points: [
        'Personalized investment plans',
        '24/7 dedicated support',
        'Regular portfolio reviews',
      ],
    },
    {
      icon: <InnovationIcon sx={{ fontSize: 48 }} />,
      title: 'Innovation',
      description: 'Leveraging cutting-edge technology to deliver smarter investment solutions.',
      color: '#FF9800',
      points: [
        'AI-powered portfolio analysis',
        'Real-time monitoring tools',
        'Advanced risk assessment',
      ],
    },
    {
      icon: <GrowthIcon sx={{ fontSize: 48 }} />,
      title: 'Sustainable Growth',
      description: 'Focusing on long-term wealth creation through disciplined investing.',
      color: '#F44336',
      points: [
        'Research-backed strategies',
        'Diversified portfolios',
        'Risk-adjusted returns',
      ],
    },
    {
      icon: <EducationIcon sx={{ fontSize: 48 }} />,
      title: 'Financial Literacy',
      description: 'Empowering investors with knowledge for informed decision making.',
      color: '#607D8B',
      points: [
        'Free educational resources',
        'Regular webinars & workshops',
        'Personalized guidance',
      ],
    },
  ];

  const principles = [
    {
      title: 'Transparency',
      description: 'Clear communication about fees, risks, and performance.',
    },
    {
      title: 'Excellence',
      description: 'Commitment to delivering exceptional service and results.',
    },
    {
      title: 'Responsibility',
      description: 'Socially responsible investing and ethical business practices.',
    },
    {
      title: 'Collaboration',
      description: 'Working together with clients to achieve their financial goals.',
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
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box textAlign="center" mb={8}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <Typography
              variant="overline"
              color="primary"
              sx={{ fontSize: '1rem', fontWeight: 600, letterSpacing: 2 }}
            >
              OUR CORE VALUES
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              What We Stand For
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto' }}
            >
              Our values define who we are and guide everything we do. They are the 
              foundation of our commitment to helping you achieve financial success.
            </Typography>
          </motion.div>
        </Box>

        {/* Core Values Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
        >
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div variants={fadeInUp}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px ${alpha(value.color, 0.1)}`,
                        borderTop: `4px solid ${value.color}`,
                      },
                      borderTop: '4px solid transparent',
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          bgcolor: alpha(value.color, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                          color: value.color,
                        }}
                      >
                        {value.icon}
                      </Box>
                      
                      <Typography variant="h5" gutterBottom fontWeight={600}>
                        {value.title}
                      </Typography>
                      
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 3 }}
                      >
                        {value.description}
                      </Typography>
                      
                      <Stack spacing={1} textAlign="left">
                        {value.points.map((point, idx) => (
                          <Box
                            key={idx}
                            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                          >
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: value.color,
                              }}
                            />
                            <Typography variant="body2">{point}</Typography>
                          </Box>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Guiding Principles */}
        <Box sx={{ mt: 12 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <Box textAlign="center" mb={6}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 800, mb: 2 }}
              >
                Our Guiding Principles
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 800, mx: 'auto' }}
              >
                These principles shape our approach to investment management and 
                client relationships.
              </Typography>
            </Box>
            
            <Box
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: 4,
                p: { xs: 4, md: 6 },
                color: 'white',
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
                  backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  pointerEvents: 'none',
                }}
              />
              
              <Grid container spacing={4}>
                {principles.map((principle, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                        p: 3,
                        height: '100%',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          bgcolor: 'rgba(255, 255, 255, 0.15)',
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: 600, opacity: 0.9 }}
                      >
                        {principle.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {principle.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
                  Our Commitment to You
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', opacity: 0.9 }}>
                  We are committed to providing you with transparent, personalized, 
                  and effective investment solutions that help you achieve your 
                  financial goals while maintaining the highest standards of 
                  integrity and professionalism.
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Box>

        {/* Testimonial/Quote Section */}
        <Box sx={{ mt: 12 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                bgcolor: 'primary.50',
                borderRadius: 4,
                p: { xs: 4, md: 6 },
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -100,
                  right: -100,
                  width: 300,
                  height: 300,
                  borderRadius: '50%',
                  bgcolor: 'primary.100',
                  opacity: 0.3,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -100,
                  left: -100,
                  width: 300,
                  height: 300,
                  borderRadius: '50%',
                  bgcolor: 'primary.100',
                  opacity: 0.3,
                }}
              />
              
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 300,
                  fontStyle: 'italic',
                  mb: 3,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                "Our success is measured by the financial success of our clients. 
                When you achieve your dreams, we achieve our purpose."
              </Typography>
              
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, position: 'relative', zIndex: 1 }}
              >
                Rajesh Kumar
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ position: 'relative', zIndex: 1 }}
              >
                Founder & CEO, Infinity ArthVishva
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default ValuesSection;