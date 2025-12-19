import React, { useEffect } from "react";
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
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import useFetch from "../hooks/useFetch";

interface UrlItem {
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
}

interface UrlListProps {
  refetchTrigger: number;
}

const UrlList: React.FC<UrlListProps> = ({ refetchTrigger }) => {
  const {
    data: urls,
    loading,
    error,
    refetch,
  } = useFetch<UrlItem[]>("/urls", { skip: true });
  useEffect(() => {
    refetch();
  }, [refetchTrigger, refetch]);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
          <CircularProgress size={60} />
        <Typography variant="h6" mt={2}>
          Cargando historial...
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
        color="primary"
      >
        Historial de URLs Acortadas
      </Typography>
      {!urls || urls.length === 0 ? (
        <Typography
          textAlign="center"
          color="text.secondary"
          variant="h6"
          mt={4}
        >
          Aún no has acortado ninguna URL
        </Typography>
      ) : (
        <List>
          {urls.map((item, index) => (
            <React.Fragment key={item.shortCode}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        component="a"
                        href={item.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: "primary.main", fontWeight: "bold" }}
                      >
                        {item.shortUrl}
                        <OpenInNewIcon
                          fontSize="small"
                          sx={{ ml: 0.5, verticalAlign: "middle" }}
                        />
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {item.originalUrl}
                      </Typography>
                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        <Chip
                          label={`${item.clicks} clicks`}
                          color="primary"
                          size="small"
                        />
                        <Chip
                          label={new Date(item.createdAt).toLocaleDateString(
                            "es-ES"
                          )}
                          color="default"
                          size="small"
                        />
                      </Box>
                    </React.Fragment>
                  }
                  secondaryTypographyProps={{ component: "div" }}
                />
              </ListItem>
              {index < urls.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default UrlList;