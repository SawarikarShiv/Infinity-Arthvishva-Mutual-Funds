import React from 'react';
import { Box } from '@mui/material';
import {
  ContactHero,
  ContactInfo,
  ContactForm,
  FAQs,
  ContactMap,
  SupportChannels,
} from '../../features/public/Contact';

const ContactPage = () => {
  return (
    <Box>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactMap />
      <SupportChannels />
      <FAQs />
    </Box>
  );
};

export default ContactPage;