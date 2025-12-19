import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Alert,
  Box,
  CircularProgress,
  Typography,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { apiService } from "../services/api";

interface UrlShortenerProps {
  onUrlGenerated: () => void;
}

const UrlShortener: React.FC<UrlShortenerProps> = ({ onUrlGenerated }) => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await apiService.shortenUrl(url);
      setResult(response.data.shortUrl);

      onUrlGenerated();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Error al acortar la URL. Revisa la URL y la conexión al servidor."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      alert("¡URL copiada al portapapeles!");
    }
  };

  return (
    <Paper
      elevation={10}
      sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, maxWidth: 700, mx: "auto" }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        color="primary"
      >
        Acortador de URLs
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <TextField
          fullWidth
          label="Pega tu URL larga aquí"
          placeholder="https://..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          type="url"
          variant="outlined"
          size="medium"
          sx={{ mb: 3 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={loading}
          sx={{ py: 2, fontSize: "1.2rem" }}
        >
          {loading ? (
            <CircularProgress size={28} color="inherit" />
          ) : (
            "Acortar URL"
          )}
        </Button>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}
      {result && (
        <Alert severity="success" sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            ¡Listo! Tu URL acortada:
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="body1"
              component="a"
              href={result}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "success.main",
                fontWeight: "bold",
                wordBreak: "break-all",
              }}
            >
              {result}
              <OpenInNewIcon
                fontSize="small"
                sx={{ ml: 0.5, verticalAlign: "middle" }}
              />
            </Typography>
            <IconButton color="success" onClick={copyToClipboard}>
            <ContentCopyIcon />
            </IconButton>
          </Box>
        </Alert>
      )}
    </Paper>
  );
};

export default UrlShortener;