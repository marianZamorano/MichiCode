import React, { useState } from "react";
import {
  Paper,
  TextField,
  Box,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import QRCode from "react-qr-code";
import { apiService } from "../services/api";

interface QRGeneratorProps {
  onQrGenerated: () => void;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ onQrGenerated }) => {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const downloadQrCode = async () => {
    if (!text) return;

    setLoading(true);

    try {
      await apiService.saveQrHistory(text);
      onQrGenerated();

      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=${encodeURIComponent(
        text
      )}`;
      const filename = `qr-michicode-${Date.now()}.png`;

      const response = await fetch(qrApiUrl);
      const blob = await response.blob();

      const urlObject = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlObject;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(urlObject);
    } catch (error) {
      console.error("Error al guardar o descargar QR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={10}
      sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, maxWidth: 600, mx: "auto" }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        color="primary"
      >
        Generador de Códigos QR
      </Typography>
           {" "}
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
            bgcolor: "white",
            p: 4,
            borderRadius: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 300,
            boxShadow: 3,
          }}
        >
          {text ? (
            <QRCode value={text} style={{ width: 256, height: 256 }} />
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
            onClick={downloadQrCode}
            disabled={loading}
            fullWidth
            sx={{ py: 2, fontSize: "1.1rem" }}
          >
            {loading
              ? "Guardando y Descargando..."
              : "Descargar y Guardar Historial"}
          </Button>
        )}
      </Stack>
    </Paper>
  );
};

export default QRGenerator;