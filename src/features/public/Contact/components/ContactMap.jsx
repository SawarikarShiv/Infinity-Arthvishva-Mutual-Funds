import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  LocationOn as LocationIcon,
  Directions as DirectionsIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as TimeIcon,
  Public as PublicIcon,
} from '@mui/icons-material';

const ContactMap = () => {
  const [viewMode, setViewMode] = useState('map');
  const [selectedLocation, setSelectedLocation] = useState('mumbai');

  const locations = {
    mumbai: {
      name: 'Mumbai Headquarters',
      address: 'Infinity Tower, Bandra Kurla Complex, Mumbai - 400051',
      coordinates: { lat: 19.0662, lng: 72.8311 },
      phone: '+91 22 1234 5678',
      email: 'mumbai@infinityarthvishva.com',
      timings: 'Mon-Sat: 9:00 AM - 7:00 PM',
      services: ['Investment Advisory', 'Portfolio Management', 'Wealth Planning'],
      isHeadquarter: true,
    },
    delhi: {
      name: 'Delhi Office',
      address: 'Connaught Place, Block B, New Delhi - 110001',
      coordinates: { lat: 28.6315, lng: 77.2167 },
      phone: '+91 11 2345 6789',
      email: 'delhi@infinityarthvishva.com',
      timings: 'Mon-Sat: 9:00 AM - 7:00 PM',
      services: ['NRI Services', 'Corporate Advisory', 'Tax Planning'],
      isHeadquarter: false,
    },
    bangalore: {
      name: 'Bangalore Office',
      address: 'MG Road, Brigade Road Junction, Bangalore - 560001',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      phone: '+91 80 3456 7890',
      email: 'bangalore@infinityarthvishva.com',
      timings: 'Mon-Sat: 9:00 AM - 7:00 PM',
      services: ['Tech Investments', 'Startup Funding', 'ESG Investing'],
      isHeadquarter: false,
    },
    chennai: {
      name: 'Chennai Office',
      address: 'Anna Salai, Teynampet, Chennai - 600018',
      coordinates: { lat: 13.0827, lng: 80.2707 },
      phone: '+91 44 4567 8901',
      email: 'chennai@infinityarthvishva.com',
      timings: 'Mon-Sat: 9:30 AM - 6:30 PM',
      services: ['Retirement Planning', 'Education Funds', 'Insurance Solutions'],
      isHeadquarter: false,
    },
  };

  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

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

  const getDirectionsUrl = () => {
    const loc = locations[selectedLocation];
    return `https://www.google.com/maps/dir/?api=1&destination=${loc.coordinates.lat},${loc.coordinates.lng}`;
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
              FIND OUR LOCATIONS
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Office Locations
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto' }}
            >
              Visit us at any of our offices across India for personalized 
              investment consultation and support.
            </Typography>
          </motion.div>
        </Box>

        {/* View Toggle */}
        <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              size="large"
              sx={{
                '& .MuiToggleButton-root': {
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                },
              }}
            >
              <ToggleButton value="map">
                <LocationIcon sx={{ mr: 1 }} />
                Map View
              </ToggleButton>
              <ToggleButton value="list">
                <PublicIcon sx={{ mr: 1 }} />
                List View
              </ToggleButton>
            </ToggleButtonGroup>
          </motion.div>
        </Box>

        <Grid container spacing={4}>
          {/* Map/Info Panel */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true }}
            >
              <Card
                sx={{
                  height: 500,
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: 8,
                }}
              >
                {/* Map Container */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: 'primary.50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Map Visualization */}
                  <Box
                    sx={{
                      width: '90%',
                      height: '90%',
                      bgcolor: 'white',
                      borderRadius: 2,
                      position: 'relative',
                      border: '2px solid',
                      borderColor: 'divider',
                    }}
                  >
                    {/* Simplified India Map with Location Markers */}
                    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                      {/* India Outline */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '80%',
                          height: '80%',
                          border: '2px solid',
                          borderColor: 'primary.main',
                          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                        }}
                      />
                      
                      {/* Location Markers */}
                      {Object.entries(locations).map(([key, location], index) => {
                        const positions = {
                          mumbai: { top: '65%', left: '45%' },
                          delhi: { top: '40%', left: '50%' },
                          bangalore: { top: '80%', left: '45%' },
                          chennai: { top: '75%', left: '55%' },
                        };
                        
                        const pos = positions[key] || { top: '50%', left: '50%' };
                        
                        return (
                          <Box
                            key={key}
                            onClick={() => handleLocationSelect(key)}
                            sx={{
                              position: 'absolute',
                              top: pos.top,
                              left: pos.left,
                              transform: 'translate(-50%, -50%)',
                              cursor: 'pointer',
                              zIndex: selectedLocation === key ? 3 : 2,
                            }}
                          >
                            <Box
                              sx={{
                                width: selectedLocation === key ? 20 : 16,
                                height: selectedLocation === key ? 20 : 16,
                                borderRadius: '50%',
                                bgcolor: selectedLocation === key ? 'error.main' : 'primary.main',
                                border: '2px solid white',
                                boxShadow: 3,
                                transition: 'all 0.3s',
                                '&:hover': {
                                  transform: 'scale(1.2)',
                                },
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{
                                position: 'absolute',
                                top: '100%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                whiteSpace: 'nowrap',
                                fontWeight: selectedLocation === key ? 700 : 400,
                                color: selectedLocation === key ? 'error.main' : 'text.primary',
                                bgcolor: 'white',
                                px: 1,
                                borderRadius: 1,
                                boxShadow: 1,
                              }}
                            >
                              {location.name.split(' ')[0]}
                            </Typography>
                          </Box>
                        );
                      })}
                      
                      {/* Legend */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 16,
                          left: 16,
                          bgcolor: 'background.paper',
                          p: 2,
                          borderRadius: 2,
                          boxShadow: 3,
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                          Legend
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'error.main' }} />
                          <Typography variant="caption">Selected</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'primary.main' }} />
                          <Typography variant="caption">Other Locations</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </motion.div>
          </Grid>

          {/* Location Details */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true }}
            >
              <Card
                sx={{
                  height: 500,
                  borderRadius: 4,
                  overflow: 'auto',
                  boxShadow: 8,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h5" fontWeight={800}>
                      {locations[selectedLocation].name}
                    </Typography>
                    {locations[selectedLocation].isHeadquarter && (
                      <Chip
                        label="Headquarter"
                        color="primary"
                        size="small"
                      />
                    )}
                  </Box>

                  {/* Contact Info */}
                  <List disablePadding>
                    <ListItem disableGutters sx={{ mb: 2 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <LocationIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Address"
                        secondary={locations[selectedLocation].address}
                        secondaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    
                    <ListItem disableGutters sx={{ mb: 2 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <PhoneIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Phone"
                        secondary={locations[selectedLocation].phone}
                        secondaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    
                    <ListItem disableGutters sx={{ mb: 2 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <EmailIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        secondary={locations[selectedLocation].email}
                        secondaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    
                    <ListItem disableGutters sx={{ mb: 3 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <TimeIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Working Hours"
                        secondary={locations[selectedLocation].timings}
                        secondaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>

                  <Divider sx={{ my: 3 }} />

                  {/* Services */}
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Services Available
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                    {locations[selectedLocation].services.map((service, index) => (
                      <Chip
                        key={index}
                        label={service}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<DirectionsIcon />}
                      href={getDirectionsUrl()}
                      target="_blank"
                    >
                      Get Directions
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<PhoneIcon />}
                      href={`tel:${locations[selectedLocation].phone}`}
                    >
                      Call Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Location Selector */}
        <Box sx={{ mt: 8 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <Typography
              variant="h4"
              sx={{ mb: 4, fontWeight: 800, textAlign: 'center' }}
            >
              All Office Locations
            </Typography>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              <Grid container spacing={3}>
                {Object.entries(locations).map(([key, location], index) => (
                  <Grid item xs={12} sm={6} md={3} key={key}>
                    <motion.div variants={fadeInUp}>
                      <Card
                        sx={{
                          height: '100%',
                          transition: 'all 0.3s',
                          cursor: 'pointer',
                          border: selectedLocation === key ? '2px solid' : '1px solid',
                          borderColor: selectedLocation === key ? 'primary.main' : 'divider',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: 8,
                          },
                        }}
                        onClick={() => handleLocationSelect(key)}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box
                              sx={{
                                width: 50,
                                height: 50,
                                borderRadius: '50%',
                                bgcolor: selectedLocation === key ? 'primary.50' : 'grey.100',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: selectedLocation === key ? 'primary.main' : 'text.secondary',
                              }}
                            >
                              <LocationIcon />
                            </Box>
                            <Box>
                              <Typography variant="h6" fontWeight={600}>
                                {location.name.split(' ')[0]}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {location.name.split('Office')[0]}
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {location.address.substring(0, 50)}...
                          </Typography>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" color="primary">
                              {location.phone}
                            </Typography>
                            {location.isHeadquarter && (
                              <Chip
                                label="HQ"
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </motion.div>
        </Box>

        {/* Visit Planning */}
        <Box sx={{ mt: 12 }}>
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
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant="h3" gutterBottom fontWeight={800}>
                    Planning to Visit?
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                    Book an appointment in advance to ensure dedicated time with our experts.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Chip
                      label="Free Consultation"
                      sx={{ bgcolor: 'white', color: 'success.main', fontWeight: 600 }}
                    />
                    <Chip
                      label="Expert Available"
                      sx={{ bgcolor: 'white', color: 'success.main', fontWeight: 600 }}
                    />
                    <Chip
                      label="Parking Available"
                      sx={{ bgcolor: 'white', color: 'success.main', fontWeight: 600 }}
                    />
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                      bgcolor: 'white',
                      color: 'success.main',
                      py: 2,
                      '&:hover': { bgcolor: 'grey.100' },
                    }}
                  >
                    Schedule Appointment
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactMap;