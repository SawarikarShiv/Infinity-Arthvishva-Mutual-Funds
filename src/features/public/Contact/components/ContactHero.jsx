import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

const ContactHero = () => {
  const contactHighlights = [
    {
      icon: <PhoneIcon sx={{ fontSize: 32 }} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service',
      color: '#4CAF50',
    },
    {
      icon: <EmailIcon sx={{ fontSize: 32 }} />,
      title: 'Quick Response',
      description: 'Response within 2 hours',
      color: '#2196F3',
    },
    {
      icon: <LocationIcon sx={{ fontSize: 32 }} />,
      title: 'Multiple Locations',
      description: 'Pan-India presence',
      color: '#9C27B0',
    },
    {
      icon: <ScheduleIcon sx={{ fontSize: 32 }} />,
      title: 'Scheduled Calls',
      description: 'Book expert consultation',
      color: '#FF9800',
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
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
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

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <Chip
                label="Get in Touch"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  mb: 3,
                  fontSize: '0.875rem',
                  py: 1,
                }}
              />
              
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                We're Here to Help You Grow
              </Typography>
              
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontWeight: 300,
                }}
              >
                Have questions about investments? Need portfolio advice? 
                Our team of experts is ready to guide you on your financial journey.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mt: 4, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' },
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Schedule a Call
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': { borderColor: 'grey.300', bgcolor: 'rgba(255,255,255,0.1)' },
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Quick Inquiry
                </Button>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card
                sx={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  p: 4,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                  Why Contact Us?
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                  {[
                    'Personalized investment consultation',
                    'Portfolio review and optimization',
                    'Tax-saving investment strategies',
                    'Retirement planning guidance',
                    'Education fund planning',
                    'Insurance and risk management',
                  ].map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Typography variant="caption" sx={{ color: 'white' }}>
                          {index + 1}
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Contact Highlights */}
        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <Grid container spacing={3}>
              {contactHighlights.map((highlight, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <motion.div variants={fadeInUp}>
                    <Card
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        height: '100%',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          bgcolor: 'rgba(255, 255, 255, 0.15)',
                        },
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center', p: 3 }}>
                        <Box sx={{ color: 'white', mb: 2 }}>
                          {highlight.icon}
                        </Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            mb: 1,
                            color: 'white',
                          }}
                        >
                          {highlight.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                        >
                          {highlight.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactHero;