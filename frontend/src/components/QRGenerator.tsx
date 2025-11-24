import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
const QRCode = require('qrcode.react').default;

const QRGenerator: React.FC = () => {
  const [text, setText] = useState<string>('');

  return (
    <Paper elevation={10} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom color="primary">
        Generador de Códigos QR
      </Typography>

      <Stack spacing={4} mt={3}>
        <TextField
          fullWidth
          label="Texto o URL para el QR"
          placeholder="https://google.com, WiFi, contacto, texto..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
          size="medium"
        />

        <Box
          sx={{
            bgcolor: 'white',
            p: 4,
            borderRadius: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 300,
            boxShadow: 3,
          }}
        >
          {text ? (
            <QRCode value={text} size={256} level="H" includeMargin />
          ) : (
            <Typography color="text.secondary" variant="h6">
              Escribe algo arriba para generar el QR
            </Typography>
          )}
        </Box>

        {text && (
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<DownloadIcon />}
            href={`https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=${encodeURIComponent(
              text
            )}`}
            download={`qr-michicode-${Date.now()}.png`}
            fullWidth
            sx={{ py: 2, fontSize: '1.1rem' }}
          >
            Descargar QR en Alta Calidad
          </Button>
        )}
      </Stack>
    </Paper>
  );
};

export default QRGenerator;