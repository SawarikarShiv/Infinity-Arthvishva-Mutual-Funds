import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  Chat as ChatIcon,
  WhatsApp as WhatsAppIcon,
  VideoCall as VideoIcon,
  Forum as ForumIcon,
  Schedule as ScheduleIcon,
  Description as DocumentIcon,
} from '@mui/icons-material';

const SupportChannels = () => {
  const supportChannels = [
    {
      icon: <PhoneIcon sx={{ fontSize: 40 }} />,
      title: 'Phone Support',
      description: 'Call our toll-free number for immediate assistance',
      details: '1800-123-4567',
      availability: '24/7',
      responseTime: 'Instant',
      color: '#4CAF50',
      action: 'call',
    },
    {
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      title: 'Email Support',
      description: 'Send detailed queries via email',
      details: 'support@infinityarthvishva.com',
      availability: '24/7',
      responseTime: 'Within 2 hours',
      color: '#2196F3',
      action: 'email',
    },
    {
      icon: <ChatIcon sx={{ fontSize: 40 }} />,
      title: 'Live Chat',
      description: 'Real-time chat with support agents',
      details: 'Available on website and mobile app',
      availability: '9 AM - 10 PM',
      responseTime: 'Within 2 minutes',
      color: '#9C27B0',
      action: 'chat',
    },
    {
      icon: <WhatsAppIcon sx={{ fontSize: 40 }} />,
      title: 'WhatsApp Business',
      description: 'Quick support via WhatsApp',
      details: '+91-9876543210',
      availability: '10 AM - 8 PM',
      responseTime: 'Within 15 minutes',
      color: '#25D366',
      action: 'whatsapp',
    },
    {
      icon: <VideoIcon sx={{ fontSize: 40 }} />,
      title: 'Video Consultation',
      description: 'Face-to-face virtual meetings',
      details: 'Schedule via portal',
      availability: 'By appointment',
      responseTime: 'Scheduled',
      color: '#FF9800',
      action: 'video',
    },
    {
      icon: <ForumIcon sx={{ fontSize: 40 }} />,
      title: 'Community Forum',
      description: 'Connect with other investors',
      details: 'forum.infinityarthvishva.com',
      availability: '24/7',
      responseTime: 'Community based',
      color: '#F44336',
      action: 'forum',
    },
  ];

  const responseTimes = [
    { type: 'Emergency', time: 'Instant', color: '#F44336' },
    { type: 'High Priority', time: '15 minutes', color: '#FF9800' },
    { type: 'Standard', time: '2 hours', color: '#4CAF50' },
    { type: 'General', time: '24 hours', color: '#2196F3' },
  ];

  const supportTopics = [
    {
      category: 'Account Management',
      issues: ['Login issues', 'KYC updates', 'Password reset', 'Profile updates'],
    },
    {
      category: 'Investment',
      issues: ['Portfolio review', 'SIP management', 'Redemption', 'Switch requests'],
    },
    {
      category: 'Technical',
      issues: ['App issues', 'Website problems', 'Transaction errors', 'Report generation'],
    },
    {
      category: 'Compliance',
      issues: ['Grievances', 'Dispute resolution', 'Document requests', 'Legal queries'],
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

  const handleAction = (action, details) => {
    switch (action) {
      case 'call':
        window.location.href = `tel:${details}`;
        break;
      case 'email':
        window.location.href = `mailto:${details}`;
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${details.replace(/\D/g, '')}`, '_blank');
        break;
      default:
        console.log(`Action: ${action}`);
    }
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
            <Typography
              variant="overline"
              color="primary"
              sx={{ fontSize: '1rem', fontWeight: 600, letterSpacing: 2 }}
            >
              MULTIPLE SUPPORT OPTIONS
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Support Channels
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto' }}
            >
              Choose from multiple support options based on your preference and urgency.
              Our team is always ready to assist you.
            </Typography>
          </motion.div>
        </Box>

        {/* Support Channels Grid */}
        <Box sx={{ mb: 12 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <Grid container spacing={4}>
              {supportChannels.map((channel, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div variants={fadeInUp}>
                    <Card
                      sx={{
                        height: '100%',
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: `0 20px 40px ${alpha(channel.color, 0.1)}`,
                          borderTop: `4px solid ${channel.color}`,
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
                            bgcolor: alpha(channel.color, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 3,
                            color: channel.color,
                          }}
                        >
                          {channel.icon}
                        </Box>
                        
                        <Typography variant="h5" gutterBottom fontWeight={600}>
                          {channel.title}
                        </Typography>
                        
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 3, minHeight: 40 }}
                        >
                          {channel.description}
                        </Typography>
                        
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                            {channel.details}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
                            <Chip
                              label={`${channel.availability}`}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              label={`Response: ${channel.responseTime}`}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                        
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            bgcolor: channel.color,
                            '&:hover': { bgcolor: channel.color, opacity: 0.9 },
                          }}
                          onClick={() => handleAction(channel.action, channel.details)}
                        >
                          Connect Now
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* Response Time Guidelines */}
        <Box sx={{ mb: 12 }}>
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
              Response Time Guidelines
            </Typography>
            
            <Card
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                boxShadow: 2,
                bgcolor: 'background.paper',
              }}
            >
              <Grid container spacing={4}>
                {responseTimes.map((item, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        p: 3,
                        borderRadius: 2,
                        bgcolor: alpha(item.color, 0.1),
                        border: '1px solid',
                        borderColor: alpha(item.color, 0.3),
                        height: '100%',
                      }}
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          fontWeight: 800,
                          color: item.color,
                          mb: 1,
                        }}
                      >
                        {item.time}
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        {item.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Average response time
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              
              <Divider sx={{ my: 4 }} />
              
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Priority Guidelines
              </Typography>
              <List disablePadding>
                <ListItem disableGutters sx={{ mb: 2 }}>
                  <ListItemIcon>
                    <Chip label="P1" size="small" sx={{ bgcolor: '#F44336', color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Emergency: Transaction failures, security issues"
                    secondary="Instant response via phone or live chat"
                  />
                </ListItem>
                <ListItem disableGutters sx={{ mb: 2 }}>
                  <ListItemIcon>
                    <Chip label="P2" size="small" sx={{ bgcolor: '#FF9800', color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="High Priority: Account access, investment decisions"
                    secondary="Response within 15 minutes"
                  />
                </ListItem>
                <ListItem disableGutters sx={{ mb: 2 }}>
                  <ListItemIcon>
                    <Chip label="P3" size="small" sx={{ bgcolor: '#4CAF50', color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Standard: General queries, portfolio reviews"
                    secondary="Response within 2 business hours"
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon>
                    <Chip label="P4" size="small" sx={{ bgcolor: '#2196F3', color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="General: Feedback, feature requests"
                    secondary="Response within 24 hours"
                  />
                </ListItem>
              </List>
            </Card>
          </motion.div>
        </Box>

        {/* Common Support Topics */}
        <Box sx={{ mb: 12 }}>
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
              Common Support Topics
            </Typography>
            
            <Grid container spacing={4}>
              {supportTopics.map((topic, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      p: 3,
                      borderRadius: 3,
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 8,
                      },
                    }}
                  >
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {topic.category}
                    </Typography>
                    <List dense disablePadding>
                      {topic.issues.map((issue, idx) => (
                        <ListItem key={idx} disableGutters sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <DocumentIcon color="action" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={issue} />
                        </ListItem>
                      ))}
                    </List>
                    <Button
                      variant="text"
                      size="small"
                      sx={{ mt: 2 }}
                      startIcon={<ChatIcon fontSize="small" />}
                    >
                      Get Help
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        {/* Support Process */}
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
              
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 4,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                Our Support Process
              </Typography>
              
              <Grid container spacing={4}>
                {[
                  {
                    step: '01',
                    title: 'Raise Request',
                    description: 'Contact us through any channel with your query',
                  },
                  {
                    step: '02',
                    title: 'Ticket Creation',
                    description: 'We create a support ticket with unique ID',
                  },
                  {
                    step: '03',
                    title: 'Expert Assignment',
                    description: 'Your query is assigned to the most relevant expert',
                  },
                  {
                    step: '04',
                    title: 'Resolution',
                    description: 'We work on resolving your issue efficiently',
                  },
                  {
                    step: '05',
                    title: 'Confirmation',
                    description: 'We confirm resolution and seek your feedback',
                  },
                  {
                    step: '06',
                    title: 'Follow-up',
                    description: 'We follow up to ensure complete satisfaction',
                  },
                ].map((process, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                    <Box
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                        p: 3,
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        height: '100%',
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          fontWeight: 800,
                          mb: 2,
                          color: 'white',
                          opacity: 0.5,
                        }}
                      >
                        {process.step}
                      </Typography>
                      <Typography variant="h6" sx={{ mb: 1, opacity: 0.9 }}>
                        {process.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {process.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
                  Support Statistics
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={6} md={3}>
                    <Box textAlign="center">
                      <Typography variant="h2" sx={{ fontWeight: 800 }}>
                        99.5%
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Resolution Rate
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box textAlign="center">
                      <Typography variant="h2" sx={{ fontWeight: 800 }}>
                        4.8/5
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Customer Rating
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box textAlign="center">
                      <Typography variant="h2" sx={{ fontWeight: 800 }}>
                        15 min
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Avg. Response Time
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box textAlign="center">
                      <Typography variant="h2" sx={{ fontWeight: 800 }}>
                        50K+
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Queries Resolved
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default SupportChannels;