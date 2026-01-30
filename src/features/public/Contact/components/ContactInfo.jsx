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
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Business as OfficeIcon,
  Language as WebsiteIcon,
  Fax as FaxIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';

const ContactInfo = () => {
  const offices = [
    {
      city: 'Mumbai',
      address: 'Infinity Tower, Bandra Kurla Complex, Mumbai - 400051',
      phone: '+91 22 1234 5678',
      email: 'mumbai@infinityarthvishva.com',
      timings: 'Mon-Sat: 9:00 AM - 7:00 PM',
      isHeadquarter: true,
    },
    {
      city: 'Delhi',
      address: 'Connaught Place, Block B, New Delhi - 110001',
      phone: '+91 11 2345 6789',
      email: 'delhi@infinityarthvishva.com',
      timings: 'Mon-Sat: 9:00 AM - 7:00 PM',
      isHeadquarter: false,
    },
    {
      city: 'Bangalore',
      address: 'MG Road, Brigade Road Junction, Bangalore - 560001',
      phone: '+91 80 3456 7890',
      email: 'bangalore@infinityarthvishva.com',
      timings: 'Mon-Sat: 9:00 AM - 7:00 PM',
      isHeadquarter: false,
    },
    {
      city: 'Chennai',
      address: 'Anna Salai, Teynampet, Chennai - 600018',
      phone: '+91 44 4567 8901',
      email: 'chennai@infinityarthvishva.com',
      timings: 'Mon-Sat: 9:30 AM - 6:30 PM',
      isHeadquarter: false,
    },
  ];

  const departments = [
    {
      name: 'Customer Support',
      phone: '1800-123-4567',
      email: 'support@infinityarthvishva.com',
      hours: '24/7',
    },
    {
      name: 'Investment Advisory',
      phone: '1800-234-5678',
      email: 'advisory@infinityarthvishva.com',
      hours: '9 AM - 7 PM',
    },
    {
      name: 'Technical Support',
      phone: '1800-345-6789',
      email: 'tech@infinityarthvishva.com',
      hours: '8 AM - 10 PM',
    },
    {
      name: 'Compliance & Grievances',
      phone: '1800-456-7890',
      email: 'compliance@infinityarthvishva.com',
      hours: '10 AM - 6 PM',
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
              CONTACT INFORMATION
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Reach Out to Us
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto' }}
            >
              Multiple ways to connect with our team. Choose what works best for you.
            </Typography>
          </motion.div>
        </Box>

        {/* Corporate Office */}
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
              Corporate Headquarters
            </Typography>
            
            <Card
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                boxShadow: 8,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'primary.50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        color: 'primary.main',
                      }}
                    >
                      <LocationIcon sx={{ fontSize: 32 }} />
                    </Box>
                    <Box>
                      <Typography variant="h5" fontWeight={600} gutterBottom>
                        Registered Office
                      </Typography>
                      <Typography variant="body1" paragraph>
                        Infinity ArthVishva Financial Services Pvt. Ltd.
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        SEBI Registration No.: INA000015123
                      </Typography>
                    </Box>
                  </Box>
                  
                  <List disablePadding>
                    <ListItem disableGutters sx={{ mb: 2 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <LocationIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Address"
                        secondary={
                          <>
                            Infinity Tower, 24th Floor
                            <br />
                            Bandra Kurla Complex
                            <br />
                            Mumbai - 400051, Maharashtra, India
                          </>
                        }
                      />
                    </ListItem>
                    
                    <ListItem disableGutters sx={{ mb: 2 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <PhoneIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Telephone"
                        secondary={
                          <>
                            +91 22 1234 5678 (Main)
                            <br />
                            +91 22 1234 5679 (Fax)
                          </>
                        }
                      />
                    </ListItem>
                    
                    <ListItem disableGutters sx={{ mb: 2 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <EmailIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        secondary="info@infinityarthvishva.com"
                      />
                    </ListItem>
                    
                    <ListItem disableGutters>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <TimeIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Working Hours"
                        secondary="Monday to Friday: 9:00 AM - 7:00 PM"
                      />
                    </ListItem>
                  </List>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      overflow: 'hidden',
                      position: 'relative',
                      minHeight: 300,
                      bgcolor: 'grey.100',
                    }}
                  >
                    {/* Replace with actual map or office image */}
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'primary.50',
                      }}
                    >
                      <Typography variant="h6" color="primary">
                        Office Location Map
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </motion.div>
        </Box>

        {/* Regional Offices */}
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
              Regional Offices
            </Typography>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              <Grid container spacing={4}>
                {offices.map((office, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <motion.div variants={fadeInUp}>
                      <Card
                        sx={{
                          height: '100%',
                          transition: 'all 0.3s',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: 8,
                          },
                          position: 'relative',
                        }}
                      >
                        {office.isHeadquarter && (
                          <Chip
                            label="Headquarter"
                            color="primary"
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              zIndex: 1,
                            }}
                          />
                        )}
                        
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box
                              sx={{
                                width: 50,
                                height: 50,
                                borderRadius: '50%',
                                bgcolor: 'primary.50',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'primary.main',
                              }}
                            >
                              <OfficeIcon />
                            </Box>
                            <Box>
                              <Typography variant="h6" fontWeight={600}>
                                {office.city}
                              </Typography>
                              {office.isHeadquarter && (
                                <Typography variant="caption" color="primary">
                                  Corporate Office
                                </Typography>
                              )}
                            </Box>
                          </Box>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <List dense disablePadding>
                            <ListItem disableGutters sx={{ mb: 1 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <LocationIcon fontSize="small" color="action" />
                              </ListItemIcon>
                              <ListItemText
                                primary={office.address}
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                            
                            <ListItem disableGutters sx={{ mb: 1 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <PhoneIcon fontSize="small" color="action" />
                              </ListItemIcon>
                              <ListItemText
                                primary={office.phone}
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                            
                            <ListItem disableGutters sx={{ mb: 1 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <EmailIcon fontSize="small" color="action" />
                              </ListItemIcon>
                              <ListItemText
                                primary={office.email}
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                            
                            <ListItem disableGutters>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <TimeIcon fontSize="small" color="action" />
                              </ListItemIcon>
                              <ListItemText
                                primary={office.timings}
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                          </List>
                          
                          <Button
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{ mt: 3 }}
                          >
                            Get Directions
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </motion.div>
        </Box>

        {/* Department Contacts */}
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
              Department-wise Contacts
            </Typography>
            
            <Card
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                boxShadow: 2,
                bgcolor: 'background.default',
              }}
            >
              <Grid container spacing={4}>
                {departments.map((dept, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                        height: '100%',
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'all 0.3s',
                        '&:hover': {
                          borderColor: 'primary.main',
                          bgcolor: 'primary.50',
                        },
                      }}
                    >
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {dept.name}
                      </Typography>
                      
                      <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <PhoneIcon fontSize="small" color="action" />
                          <Typography variant="body2">
                            {dept.phone}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <EmailIcon fontSize="small" color="action" />
                          <Typography variant="body2">
                            {dept.email}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <TimeIcon fontSize="small" color="action" />
                          <Typography variant="body2">
                            {dept.hours}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Button
                        variant="text"
                        size="small"
                        sx={{ mt: 2 }}
                        startIcon={<PhoneIcon fontSize="small" />}
                      >
                        Call Now
                      </Button>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </motion.div>
        </Box>

        {/* Additional Information */}
        <Box sx={{ mt: 8 }}>
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
                variant="h4"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                Additional Information
              </Typography>
              
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
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
                    <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
                      <WebsiteIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Website & Social
                    </Typography>
                    <List dense disablePadding>
                      <ListItem disableGutters sx={{ mb: 1 }}>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          • Website: www.infinityarthvishva.com
                        </Typography>
                      </ListItem>
                      <ListItem disableGutters sx={{ mb: 1 }}>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          • LinkedIn: linkedin.com/company/infinityarthvishva
                        </Typography>
                      </ListItem>
                      <ListItem disableGutters sx={{ mb: 1 }}>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          • Twitter: @InfinityArthVishva
                        </Typography>
                      </ListItem>
                      <ListItem disableGutters>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          • Facebook: facebook.com/InfinityArthVishva
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
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
                    <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
                      <FaxIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Business Information
                    </Typography>
                    <List dense disablePadding>
                      <ListItem disableGutters sx={{ mb: 1 }}>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          • CIN: U67190MH2008PTC123456
                        </Typography>
                      </ListItem>
                      <ListItem disableGutters sx={{ mb: 1 }}>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          • GST: 27AABCU1234A1Z5
                        </Typography>
                      </ListItem>
                      <ListItem disableGutters sx={{ mb: 1 }}>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          • PAN: AABCU1234A
                        </Typography>
                      </ListItem>
                      <ListItem disableGutters>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          • Compliance Officer: compliance@infinityarthvishva.com
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactInfo;