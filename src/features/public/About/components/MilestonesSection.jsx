import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Timeline as TimelineIcon,
  RocketLaunch as LaunchIcon,
  TrendingUp as GrowthIcon,
  Diversity3 as TeamIcon,
  Award as AwardIcon,
  Public as GlobalIcon,
} from '@mui/icons-material';

const MilestonesSection = () => {
  const milestones = [
    {
      year: '2008',
      title: 'Foundation',
      description: 'Infinity ArthVishva founded with a vision to democratize wealth management.',
      icon: <TimelineIcon />,
      achievements: [
        'Registered with SEBI as Investment Advisor',
        'Initial team of 5 financial experts',
        'First 100 clients onboarded',
      ],
      color: '#4CAF50',
    },
    {
      year: '2012',
      title: 'Technology Integration',
      description: 'Launched our first online investment platform.',
      icon: <LaunchIcon />,
      achievements: [
        'Proprietary portfolio management system',
        'Real-time tracking dashboard',
        'Mobile app launch (iOS & Android)',
      ],
      color: '#2196F3',
    },
    {
      year: '2015',
      title: 'Growth Phase',
      description: 'Expanded services to include mutual fund distribution.',
      icon: <GrowthIcon />,
      achievements: [
        '10,000+ active investors',
        '₹500 Cr assets under advice',
        'PAN India presence established',
      ],
      color: '#9C27B0',
    },
    {
      year: '2018',
      title: 'Team Expansion',
      description: 'Built a robust team of financial experts and advisors.',
      icon: <TeamIcon />,
      achievements: [
        '50+ financial advisors onboarded',
        'Research department established',
        'Client education initiatives launched',
      ],
      color: '#FF9800',
    },
    {
      year: '2020',
      title: 'Awards & Recognition',
      description: 'Received multiple industry awards for excellence.',
      icon: <AwardIcon />,
      achievements: [
        'Best Investment Platform Award 2020',
        'Fintech Innovation Award',
        'SEBI compliance excellence certificate',
      ],
      color: '#F44336',
    },
    {
      year: '2023',
      title: 'Market Leadership',
      description: 'Became one of the leading investment platforms in India.',
      icon: <GlobalIcon />,
      achievements: [
        '₹5,000+ Cr assets under management',
        '50,000+ happy investors',
        'Expanding to international markets',
      ],
      color: '#607D8B',
    },
  ];

  const achievementsList = [
    {
      icon: '🏆',
      title: 'Industry Awards',
      count: '25+',
      description: 'National & international recognition',
    },
    {
      icon: '📈',
      title: 'Portfolio Growth',
      count: '35% CAGR',
      description: 'Average annual portfolio growth',
    },
    {
      icon: '🤝',
      title: 'Client Retention',
      count: '95%',
      description: 'Client satisfaction rate',
    },
    {
      icon: '👥',
      title: 'Team Size',
      count: '150+',
      description: 'Financial experts & support staff',
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
              label="Our Journey"
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
              Milestones & Achievements
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto' }}
            >
              From humble beginnings to becoming a trusted name in wealth management, 
              our journey has been marked by consistent growth and innovation.
            </Typography>
          </motion.div>
        </Box>

        {/* Timeline */}
        <Box sx={{ mb: 12 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <Stepper orientation="vertical">
              {milestones.map((milestone, index) => (
                <Step key={index} active={true}>
                  <StepLabel
                    StepIconComponent={() => (
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            bgcolor: milestone.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            boxShadow: 3,
                          }}
                        >
                          {milestone.icon}
                        </Box>
                      </motion.div>
                    )}
                  >
                    <Typography variant="h5" fontWeight={600} color={milestone.color}>
                      {milestone.year}
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      {milestone.title}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      variants={fadeInUp}
                      viewport={{ once: true }}
                    >
                      <Card
                        sx={{
                          mt: 2,
                          borderLeft: `4px solid ${milestone.color}`,
                          boxShadow: 2,
                        }}
                      >
                        <CardContent>
                          <Typography variant="body1" paragraph>
                            {milestone.description}
                          </Typography>
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                              Key Achievements:
                            </Typography>
                            <ul style={{ margin: 0, paddingLeft: 20 }}>
                              {milestone.achievements.map((achievement, idx) => (
                                <li key={idx}>
                                  <Typography variant="body2" color="text.secondary">
                                    {achievement}
                                  </Typography>
                                </li>
                              ))}
                            </ul>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </motion.div>
        </Box>

        {/* Achievements Stats */}
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
            By The Numbers
          </Typography>
          
          <Grid container spacing={3}>
            {achievementsList.map((achievement, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div variants={fadeInUp}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: 3,
                      height: '100%',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 8,
                      },
                    }}
                  >
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: '3rem',
                        mb: 1,
                        lineHeight: 1,
                      }}
                    >
                      {achievement.icon}
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 800,
                        mb: 1,
                        color: 'primary.main',
                      }}
                    >
                      {achievement.count}
                    </Typography>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {achievement.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {achievement.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Future Vision */}
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
                Our Vision for 2030
              </Typography>
              
              <Grid container spacing={4}>
                {[
                  {
                    title: 'Global Presence',
                    description: 'Expand to 10+ international markets',
                  },
                  {
                    title: 'Tech Innovation',
                    description: 'AI-driven personalized investment solutions',
                  },
                  {
                    title: 'Client Growth',
                    description: 'Serve 1 million+ investors worldwide',
                  },
                  {
                    title: 'Sustainable Investing',
                    description: '₹10,000+ Cr in ESG-focused portfolios',
                  },
                ].map((vision, index) => (
                  <Grid item xs={12} sm={6} key={index}>
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
                        sx={{ fontWeight: 600, mb: 1, opacity: 0.9 }}
                      >
                        {vision.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {vision.description}
                      </Typography>
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

export default MilestonesSection;