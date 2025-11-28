import Navbar from "../components/Navbar";
import { Container, Typography, Paper, Box, useTheme } from "@mui/material";
import ProductTable from "../components/ProductTable";
import StatsCards from "../components/StatsCards";

export default function DashboardPage() {
  const theme = useTheme();

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background:
            theme.palette.mode === "light"
              ? "linear-gradient(120deg, #e3f2fd 0%, #90caf9 100%)"
              : "linear-gradient(120deg, #23272f 0%, #1976d2 100%)",
          pt: 10,
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          {/* StatsCards di atas, lebar penuh */}
          <StatsCards />

          {/* Section Product Management */}
          <Paper
            elevation={6}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 4,
              bgcolor: theme.palette.mode === "dark" ? "#23272f" : "#fff",
              mt: 4,
              boxShadow: "0 8px 32px rgba(25, 118, 210, 0.10)",
              backdropFilter: "blur(2px)",
              transition: "0.3s",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                fontWeight: 700,
                color: theme.palette.mode === "dark" ? "#e3f2fd" : "#1976d2",
                mb: 2,
                letterSpacing: 1,
                textShadow:
                  theme.palette.mode === "dark"
                    ? "0 2px 8px #1976d2"
                    : "0 2px 8px #90caf9",
              }}
            >
              📦 Product Management
            </Typography>
            <ProductTable />
          </Paper>
        </Container>
      </Box>
    </>
  );
}
