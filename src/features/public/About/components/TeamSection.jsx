import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
import {
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: '/assets/images/team/ceo.jpg',
      bio: 'Former Chief Investment Officer at leading AMC with 25+ years experience. Chartered Financial Analyst (CFA) and MBA from IIM Ahmedabad.',
      expertise: ['Portfolio Management', 'Risk Analysis', 'Strategic Planning'],
      social: {
        linkedin: 'https://linkedin.com/in/rajeshkumar',
        twitter: 'https://twitter.com/rajeshkumar',
        email: 'rajesh@infinityarthvishva.com',
      },
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Chief Investment Officer',
      image: '/assets/images/team/cio.jpg',
      bio: '15+ years in fund management. Previously headed equity research at top brokerage firm. Masters in Finance from London School of Economics.',
      expertise: ['Equity Research', 'Fund Selection', 'Market Analysis'],
      social: {
        linkedin: 'https://linkedin.com/in/priyasharma',
        twitter: 'https://twitter.com/priyasharma',
        email: 'priya@infinityarthvishva.com',
      },
    },
    {
      id: 3,
      name: 'Amit Patel',
      role: 'Head of Technology',
      image: '/assets/images/team/cto.jpg',
      bio: 'Ex-Google engineer with expertise in fintech solutions. Built trading platforms serving 1M+ users. B.Tech from IIT Bombay.',
      expertise: ['Fintech Solutions', 'AI/ML', 'System Architecture'],
      social: {
        linkedin: 'https://linkedin.com/in/amitpatel',
        twitter: 'https://twitter.com/amitpatel',
        email: 'amit@infinityarthvishva.com',
      },
    },
    {
      id: 4,
      name: 'Anjali Mehta',
      role: 'Head of Client Relations',
      image: '/assets/images/team/crm.jpg',
      bio: '15+ years in wealth management and client service. Certified Financial Planner (CFP) with expertise in personalized portfolio advisory.',
      expertise: ['Client Advisory', 'Wealth Management', 'Financial Planning'],
      social: {
        linkedin: 'https://linkedin.com/in/anjalimehta',
        twitter: 'https://twitter.com/anjalimehta',
        email: 'anjali@infinityarthvishva.com',
      },
    },
    {
      id: 5,
      name: 'Vikram Singh',
      role: 'Head of Risk Management',
      image: '/assets/images/team/risk.jpg',
      bio: 'FRM certified with 12+ years in risk assessment. Former risk manager at leading hedge fund. Ph.D. in Financial Engineering.',
      expertise: ['Risk Assessment', 'Compliance', 'Portfolio Stress Testing'],
      social: {
        linkedin: 'https://linkedin.com/in/vikramsingh',
        twitter: 'https://twitter.com/vikramsingh',
        email: 'vikram@infinityarthvishva.com',
      },
    },
    {
      id: 6,
      name: 'Sneha Reddy',
      role: 'Head of Research',
      image: '/assets/images/team/research.jpg',
      bio: '12+ years in financial research and analysis. Published author in financial journals. MBA in Finance from XLRI Jamshedpur.',
      expertise: ['Market Research', 'Economic Analysis', 'Investment Strategy'],
      social: {
        linkedin: 'https://linkedin.com/in/snehareddy',
        twitter: 'https://twitter.com/snehareddy',
        email: 'sneha@infinityarthvishva.com',
      },
    },
  ];

  const advisors = [
    {
      id: 101,
      name: 'Dr. Sanjay Gupta',
      role: 'Advisory Board Chairman',
      designation: 'Former SEBI Executive Director',
      image: '/assets/images/team/advisor1.jpg',
    },
    {
      id: 102,
      name: 'Prof. Meena Kapoor',
      role: 'Academic Advisor',
      designation: 'Professor of Finance, IIM Bangalore',
      image: '/assets/images/team/advisor2.jpg',
    },
    {
      id: 103,
      name: 'Ramesh Iyer',
      role: 'Industry Advisor',
      designation: 'Former MD, HDFC Mutual Fund',
      image: '/assets/images/team/advisor3.jpg',
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
              label="Our Team"
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
              Meet Our Leadership
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto' }}
            >
              A team of passionate professionals with decades of combined 
              experience in finance, technology, and investment management.
            </Typography>
          </motion.div>
        </Box>

        {/* Core Team */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}
          >
            Core Leadership Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={member.id}>
                <motion.div variants={fadeInUp}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 8,
                      },
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedMember(member)}
                  >
                    <CardMedia
                      component="img"
                      height="280"
                      image={member.image}
                      alt={member.name}
                      sx={{
                        objectFit: 'cover',
                        objectPosition: 'top',
                      }}
                    />
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h5" gutterBottom fontWeight={600}>
                        {member.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        gutterBottom
                      >
                        {member.role}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2, height: 60, overflow: 'hidden' }}
                      >
                        {member.bio.substring(0, 100)}...
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {member.expertise.slice(0, 2).map((skill, idx) => (
                          <Chip
                            key={idx}
                            label={skill}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.7rem' }}
                          />
                        ))}
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          href={member.social.linkedin}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <LinkedInIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          href={member.social.twitter}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <TwitterIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          href={`mailto:${member.social.email}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <EmailIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Advisory Board */}
        <Box sx={{ mt: 12 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <Typography
              variant="h4"
              sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}
            >
              Advisory Board
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {advisors.map((advisor) => (
                <Grid item xs={12} sm={6} md={4} key={advisor.id}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: 3,
                      height: '100%',
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        mx: 'auto',
                        mb: 2,
                        border: '4px solid',
                        borderColor: 'primary.main',
                      }}
                    >
                      <Box
                        component="img"
                        src={advisor.image}
                        alt={advisor.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                    <Typography variant="h6" fontWeight={600}>
                      {advisor.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      {advisor.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {advisor.designation}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* Values Section */}
        <Box sx={{ mt: 12, textAlign: 'center' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <Typography
              variant="h4"
              sx={{ mb: 4, fontWeight: 600 }}
            >
              Our Culture & Values
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  title: 'Integrity First',
                  description: 'We believe in transparency and honesty in all our dealings.',
                },
                {
                  title: 'Client Centric',
                  description: 'Your financial success is our primary focus and motivation.',
                },
                {
                  title: 'Innovation Driven',
                  description: 'Continuously evolving with technology to serve you better.',
                },
                {
                  title: 'Excellence',
                  description: 'Striving for excellence in everything we do.',
                },
              ].map((value, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      p: 3,
                      height: '100%',
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'primary.50',
                      },
                    }}
                  >
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>
      </Container>

      {/* Team Member Detail Modal */}
      <Modal
        open={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={!!selectedMember}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', md: 800 },
              maxHeight: '90vh',
              overflow: 'auto',
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: { xs: 3, md: 4 },
            }}
          >
            {selectedMember && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h4" component="h2" fontWeight={600}>
                    {selectedMember.name}
                  </Typography>
                  <IconButton onClick={() => setSelectedMember(null)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                
                <Grid container spacing={4}>
                  <Grid item xs={12} md={4}>
                    <Box
                      component="img"
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      sx={{
                        width: '100%',
                        borderRadius: 2,
                        boxShadow: 4,
                      }}
                    />
                    
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
                      <IconButton
                        href={selectedMember.social.linkedin}
                        target="_blank"
                        size="large"
                      >
                        <LinkedInIcon />
                      </IconButton>
                      <IconButton
                        href={selectedMember.social.twitter}
                        target="_blank"
                        size="large"
                      >
                        <TwitterIcon />
                      </IconButton>
                      <IconButton
                        href={`mailto:${selectedMember.social.email}`}
                        size="large"
                      >
                        <EmailIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={8}>
                    <Typography variant="h5" color="primary" gutterBottom>
                      {selectedMember.role}
                    </Typography>
                    
                    <Typography variant="body1" paragraph>
                      {selectedMember.bio}
                    </Typography>
                    
                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                      Expertise
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                      {selectedMember.expertise.map((skill, idx) => (
                        <Chip
                          key={idx}
                          label={skill}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                    
                    <Typography variant="h6" gutterBottom>
                      Professional Background
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      • 25+ years in financial services industry<br />
                      • Managed portfolios worth ₹10,000+ Crores<br />
                      • Multiple industry awards and recognition<br />
                      • Regular speaker at financial forums and conferences
                    </Typography>
                    
                    <Typography variant="h6" gutterBottom>
                      Education
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      MBA - Indian Institute of Management, Ahmedabad<br />
                      Chartered Financial Analyst (CFA)<br />
                      Bachelor of Commerce - University of Delhi
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default TeamSection;