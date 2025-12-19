import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import useFetch from "../hooks/useFetch";

interface QrItem {
  _id: string;
  content: string;
  createdAt: string;
}

interface QRListProps {
  refetchTrigger: number;
}

const QRList: React.FC<QRListProps> = ({ refetchTrigger }) => {
  const {
    data: qrs,
    loading,
    error,
    refetch,
  } = useFetch<QrItem[]>("/qr/history", {
    skip: true,
  });

  React.useEffect(() => {
    refetch();
  }, [refetchTrigger]);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <CircularProgress size={60} />
        <Typography variant="h6" mt={2}>
            Cargando historial de QR...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography textAlign="center" color="error" variant="h6" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Paper
      elevation={10}
      sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, maxWidth: 900, mx: "auto" }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        color="secondary"
      >
        Historial de Códigos QR Generados
      </Typography>
      {!qrs || qrs.length === 0 ? (
        <Typography
          textAlign="center"
          color="text.secondary"
          variant="h6"
          mt={4}
        >
            Aún no has generado ningún código QR
        </Typography>
      ) : (
        <List>
          {qrs.map((item, index) => (
            <React.Fragment key={item._id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography component="span" fontWeight="bold">
                        Contenido:
                      </Typography>
                      <Typography
                        component="span"
                        sx={{ wordBreak: "break-all" }}
                      >
                        {item.content}                 
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Chip
                        label={new Date(item.createdAt).toLocaleDateString(
                          "es-ES"
                        )}
                        color="default"
                        size="small"
                      />
                    </Box>
                  }
                  secondaryTypographyProps={{ component: "div" }}
                />
              </ListItem>
              {index < qrs.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default QRList;