import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';

const AwardsSection = () => {
  const awards = [
    {
      year: '2023',
      title: 'Best Investment Platform',
      organization: 'Financial Express Awards',
      image: '/assets/images/awards/financial-express.jpg',
      description: 'Recognized for innovative technology and user experience',
      category: 'Technology',
    },
    {
      year: '2023',
      title: 'Fintech Innovation Award',
      organization: 'CNBC TV18',
      image: '/assets/images/awards/cnbc.jpg',
      description: 'For AI-powered portfolio management system',
      category: 'Innovation',
    },
    {
      year: '2022',
      title: 'Best Customer Service',
      organization: 'Business Today',
      image: '/assets/images/awards/business-today.jpg',
      description: 'Highest customer satisfaction ratings',
      category: 'Service',
    },
    {
      year: '2022',
      title: 'Top Wealth Manager',
      organization: 'Forbes India',
      image: '/assets/images/awards/forbes.jpg',
      description: 'Ranked among top 10 wealth management firms',
      category: 'Wealth Management',
    },
    {
      year: '2021',
      title: 'Digital Excellence Award',
      organization: 'ET Now',
      image: '/assets/images/awards/et-now.jpg',
      description: 'Excellence in digital transformation',
      category: 'Digital',
    },
    {
      year: '2021',
      title: 'Most Trusted Brand',
      organization: 'Brand Trust Report',
      image: '/assets/images/awards/brand-trust.jpg',
      description: 'Voted most trusted investment platform',
      category: 'Trust',
    },
    {
      year: '2020',
      title: 'Startup of the Year',
      organization: 'Economic Times',
      image: '/assets/images/awards/economic-times.jpg',
      description: 'Fastest growing fintech startup',
      category: 'Growth',
    },
    {
      year: '2020',
      title: 'SEBI Compliance Excellence',
      organization: 'SEBI',
      image: '/assets/images/awards/sebi.jpg',
      description: 'Perfect compliance record for 5 consecutive years',
      category: 'Compliance',
    },
  ];

  const certifications = [
    {
      title: 'SEBI Registered',
      description: 'Investment Advisor Registration No. INA000015123',
      icon: <VerifiedIcon />,
    },
    {
      title: 'AMFI Certified',
      description: 'Mutual Fund Distributor ARN-12345',
      icon: <VerifiedIcon />,
    },
    {
      title: 'ISO 27001 Certified',
      description: 'Information Security Management System',
      icon: <VerifiedIcon />,
    },
    {
      title: 'GDPR Compliant',
      description: 'Data Protection & Privacy Standards',
      icon: <VerifiedIcon />,
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

  const getCategoryColor = (category) => {
    const colors = {
      Technology: '#4CAF50',
      Innovation: '#2196F3',
      Service: '#9C27B0',
      'Wealth Management': '#FF9800',
      Digital: '#F44336',
      Trust: '#607D8B',
      Growth: '#795548',
      Compliance: '#009688',
    };
    return colors[category] || '#9E9E9E';
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <TrophyIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                Awards & Recognition
              </Typography>
            </Box>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto' }}
            >
              Our commitment to excellence has been recognized by industry leaders 
              and prestigious organizations worldwide.
            </Typography>
          </motion.div>
        </Box>

        {/* Awards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
        >
          <Grid container spacing={4}>
            {awards.map((award, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
                    <CardMedia
                      component="img"
                      height="140"
                      image={award.image}
                      alt={award.title}
                      sx={{
                        objectFit: 'cover',
                        bgcolor: 'grey.100',
                      }}
                    />
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Chip
                          label={award.year}
                          size="small"
                          color="primary"
                          sx={{ fontWeight: 600 }}
                        />
                        <Chip
                          label={award.category}
                          size="small"
                          sx={{
                            bgcolor: getCategoryColor(award.category),
                            color: 'white',
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        {award.title}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        color="primary"
                        gutterBottom
                        fontWeight={500}
                      >
                        {award.organization}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary">
                        {award.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <StarIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                        <StarIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                        <StarIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                        <StarIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                        <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Certifications */}
        <Box sx={{ mt: 12 }}>
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
              Certifications & Compliance
            </Typography>
            
            <Grid container spacing={3} justifyContent="center">
              {certifications.map((cert, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: 3,
                      height: '100%',
                      bgcolor: 'background.default',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'primary.50',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'primary.100',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        color: 'primary.main',
                      }}
                    >
                      {cert.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {cert.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cert.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* Industry Recognition */}
        <Box sx={{ mt: 12 }}>
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
                  mb: 3,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                Industry Recognition
              </Typography>
              
              <Grid container spacing={4}>
                {[
                  {
                    title: 'Featured In',
                    items: [
                      'Economic Times',
                      'Business Standard',
                      'Money Control',
                      'Bloomberg Quint',
                    ],
                  },
                  {
                    title: 'Media Coverage',
                    items: [
                      'CNBC TV18 Interview',
                      'NDTV Profit Feature',
                      'ET Now Startup Series',
                      'Forbes India Cover',
                    ],
                  },
                  {
                    title: 'Speaking Engagements',
                    items: [
                      'NASSCOM Fintech Summit',
                      'SEBI Investor Conference',
                      'IIM Investment Symposium',
                      'Global Fintech Festival',
                    ],
                  },
                ].map((recognition, index) => (
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
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 2, opacity: 0.9 }}
                      >
                        {recognition.title}
                      </Typography>
                      <Stack spacing={1}>
                        {recognition.items.map((item, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: 'white',
                                opacity: 0.8,
                              }}
                            />
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                              {item}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default AwardsSection;