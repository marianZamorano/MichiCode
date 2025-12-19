import React, { useState } from "react";
import { Container, Stack, Typography, Box, Grid } from "@mui/material";
import UrlShortener from "../components/UrlShortener";
import QRGenerator from "../components/QRGenerator";
import UrlList from "../components/UrlList";
import QRList from "../components/QRList";

const Home: React.FC = () => {
  const [urlRefetchTrigger, setUrlRefetchTrigger] = useState(0);
  const [qrRefetchTrigger, setQrRefetchTrigger] = useState(0);

  const handleUrlGenerated = () => {
    setUrlRefetchTrigger((prev) => prev + 1);
  };

  const handleQrGenerated = () => {
    setQrRefetchTrigger((prev) => prev + 1);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" mb={8}>
          <Typography
            variant="h1"
            component="h1"
            fontWeight="900"
            fontSize={{ xs: "3.5rem", sm: "5rem", md: "6rem" }}
            textAlign="center"
            color="primary"
            sx={{
              background: "linear-gradient(90deg, #7c3aed, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
            }}
          >
            MichiCode hola
          </Typography>
                   {" "}
          <Typography
            variant="h5"
            color="text.secondary"
            textAlign="center"
            maxWidth="600px"
          >
            Acorta URLs al instante y genera códigos QR profesionales en segundos
          </Typography>
        </Stack>
        <Grid container spacing={4}>
          <Grid size={{xs:12, md:6}}>
            <QRGenerator onQrGenerated={handleQrGenerated} />       
          </Grid>

          <Grid size={{xs:12, md:6}}>
            <UrlShortener onUrlGenerated={handleUrlGenerated} />   
          </Grid>
        </Grid>
        <Box sx={{ mt: { xs: 6, md: 10 } }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            color="text.primary"
            mb={4}
          >
            Historial
          </Typography>
          <Grid container spacing={4}>
            {/* Historial QR (Izquierda) */}
            <Grid size={{xs:12, md:6}}>
              <QRList refetchTrigger={qrRefetchTrigger} />
            </Grid>
            {/* Historial URLs (Derecha) */}
            <Grid size={{xs:12, md:6}}>
              <UrlList refetchTrigger={urlRefetchTrigger} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;