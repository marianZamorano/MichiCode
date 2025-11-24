import React from 'react';
import { Container, Stack, Typography, Box } from '@mui/material';
import UrlShortener from '../components/UrlShortener';
import QRGenerator from '../components/QRGenerator';
import UrlList from '../components/UrlList';

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" mb={8}>
          <Typography
            variant="h1"
            component="h1"
            fontWeight="900"
            fontSize={{ xs: '3.5rem', sm: '5rem', md: '6rem' }}
            textAlign="center"
            color="primary"
            sx={{
              background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
            }}
          >
            MichiCode
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            textAlign="center"
            maxWidth="600px"
          >
            Acorta URLs al instante y genera códigos QR profesionales en segundos
          </Typography>
        </Stack>
        <Stack
          spacing={{ xs: 6, md: 10 }}
          alignItems="center"
        >
          <UrlShortener />
          <QRGenerator />
          <UrlList />
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;