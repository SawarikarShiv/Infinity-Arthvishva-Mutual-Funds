import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Send as SendIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const inquiryTypes = [
    'General Inquiry',
    'Investment Advisory',
    'Portfolio Review',
    'Account Support',
    'Technical Issue',
    'Complaint',
    'Partnership Opportunity',
    'Media Inquiry',
  ];

  const contactMethods = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'video', label: 'Video Call' },
  ];

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    inquiryType: Yup.string().required('Please select inquiry type'),
    preferredContact: Yup.string().required('Please select preferred contact method'),
    message: Yup.string().required('Message is required').min(20, 'Message must be at least 20 characters'),
    agreeToTerms: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      inquiryType: '',
      preferredContact: '',
      message: '',
      agreeToTerms: false,
      portfolioValue: '',
      investmentHorizon: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Form submitted:', values);
        setSubmitted(true);
        resetForm();
        setActiveStep(0);
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const steps = ['Personal Details', 'Inquiry Type', 'Message Details'];

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate step 1
      if (!formik.values.fullName || !formik.values.email || !formik.values.phone) {
        formik.setTouched({
          fullName: true,
          email: true,
          phone: true,
        });
        return;
      }
    }
    if (activeStep === 1) {
      // Validate step 2
      if (!formik.values.inquiryType || !formik.values.preferredContact) {
        formik.setTouched({
          inquiryType: true,
          preferredContact: true,
        });
        return;
      }
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="fullName"
                name="fullName"
                label="Full Name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="portfolioValue"
                name="portfolioValue"
                label="Current Portfolio Value (Optional)"
                value={formik.values.portfolioValue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText="Helps us provide better advice"
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth required error={formik.touched.inquiryType && Boolean(formik.errors.inquiryType)}>
                <InputLabel>Type of Inquiry</InputLabel>
                <Select
                  id="inquiryType"
                  name="inquiryType"
                  value={formik.values.inquiryType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Type of Inquiry"
                >
                  {inquiryTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.inquiryType && formik.errors.inquiryType && (
                  <Typography variant="caption" color="error">
                    {formik.errors.inquiryType}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" required error={formik.touched.preferredContact && Boolean(formik.errors.preferredContact)}>
                <FormLabel component="legend">Preferred Contact Method</FormLabel>
                <RadioGroup
                  row
                  id="preferredContact"
                  name="preferredContact"
                  value={formik.values.preferredContact}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {contactMethods.map((method) => (
                    <FormControlLabel
                      key={method.value}
                      value={method.value}
                      control={<Radio />}
                      label={method.label}
                    />
                  ))}
                </RadioGroup>
                {formik.touched.preferredContact && formik.errors.preferredContact && (
                  <Typography variant="caption" color="error">
                    {formik.errors.preferredContact}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="investmentHorizon"
                name="investmentHorizon"
                label="Investment Horizon (Optional)"
                select
                value={formik.values.investmentHorizon}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="short">Short Term (1-3 years)</MenuItem>
                <MenuItem value="medium">Medium Term (3-7 years)</MenuItem>
                <MenuItem value="long">Long Term (7+ years)</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="message"
                name="message"
                label="Your Message"
                multiline
                rows={6}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={
                  formik.touched.message && formik.errors.message
                    ? formik.errors.message
                    : 'Please provide detailed information about your inquiry'
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formik.values.agreeToTerms}
                    onChange={formik.handleChange}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the{' '}
                    <Button component="a" href="/terms" size="small" sx={{ p: 0, minWidth: 0 }}>
                      Terms & Conditions
                    </Button>{' '}
                    and{' '}
                    <Button component="a" href="/privacy" size="small" sx={{ p: 0, minWidth: 0 }}>
                      Privacy Policy
                    </Button>
                  </Typography>
                }
              />
              {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
                <Typography variant="caption" color="error" display="block">
                  {formik.errors.agreeToTerms}
                </Typography>
              )}
            </Grid>
          </Grid>
        );
      default:
        return 'Unknown step';
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
              SEND US A MESSAGE
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Contact Form
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto' }}
            >
              Fill out the form below and our team will get back to you within 2 business hours.
            </Typography>
          </motion.div>
        </Box>

        {/* Success Message */}
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Alert
              severity="success"
              icon={<CheckIcon />}
              sx={{ mb: 4, borderRadius: 2 }}
              onClose={() => setSubmitted(false)}
            >
              <Typography variant="h6" gutterBottom>
                Thank You for Contacting Us!
              </Typography>
              <Typography variant="body2">
                Your message has been successfully submitted. Our team will contact you 
                within 2 business hours. You'll receive a confirmation email shortly.
              </Typography>
            </Alert>
          </motion.div>
        )}

        {/* Contact Form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
        >
          <Card
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              boxShadow: 8,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <CardContent>
              {/* Stepper */}
              <Box sx={{ mb: 6 }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              {/* Form Content */}
              <form onSubmit={formik.handleSubmit}>
                {getStepContent(activeStep)}

                {/* Navigation Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6 }}>
                  <Button
                    disabled={activeStep === 0 || formik.isSubmitting}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {activeStep === steps.length - 1 ? (
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={
                          formik.isSubmitting ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <SendIcon />
                          )
                        }
                        disabled={formik.isSubmitting}
                      >
                        {formik.isSubmitting ? 'Submitting...' : 'Submit Message'}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        size="large"
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </Box>

                {/* Form Status */}
                <Box sx={{ mt: 4 }}>
                  <Typography variant="caption" color="text.secondary">
                    {formik.isSubmitting && 'Submitting your message...'}
                    {formik.errors.submit && (
                      <Alert severity="error" sx={{ mt: 1 }}>
                        {formik.errors.submit}
                      </Alert>
                    )}
                  </Typography>
                </Box>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Information */}
        <Grid container spacing={4} sx={{ mt: 8 }}>
          <Grid item xs={12} md={6}>
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
                  bgcolor: 'primary.50',
                  border: '1px solid',
                  borderColor: 'primary.100',
                }}
              >
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  What Happens Next?
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li>
                    <Typography variant="body2" paragraph>
                      <strong>Confirmation Email:</strong> You'll receive an automated confirmation within 5 minutes
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" paragraph>
                      <strong>Expert Assignment:</strong> Your inquiry will be assigned to the most relevant expert
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" paragraph>
                      <strong>Initial Contact:</strong> Our team will contact you via your preferred method within 2 hours
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      <strong>Follow-up:</strong> We'll schedule a detailed consultation if needed
                    </Typography>
                  </li>
                </ul>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
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
                  bgcolor: 'warning.50',
                  border: '1px solid',
                  borderColor: 'warning.100',
                }}
              >
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Information to Include
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li>
                    <Typography variant="body2" paragraph>
                      <strong>Clear Subject:</strong> Briefly describe your inquiry
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" paragraph>
                      <strong>Relevant Details:</strong> Include account number if applicable
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" paragraph>
                      <strong>Timeline:</strong> Mention any deadlines or urgency
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      <strong>Documentation:</strong> Be ready to share supporting documents
                    </Typography>
                  </li>
                </ul>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Response Time Guarantee */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
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
              <Typography variant="h4" gutterBottom fontWeight={800}>
                Response Time Guarantee
              </Typography>
              <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                We guarantee a response within 2 business hours during working days
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" fontWeight={800}>
                    95%
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Response Rate
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" fontWeight={800}>
                    4.8
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Customer Rating
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" fontWeight={800}>
                    24/7
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Support Available
                  </Typography>
                </Box>
              </Box>
            </Card>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactForm;