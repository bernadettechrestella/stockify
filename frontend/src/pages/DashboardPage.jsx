import Navbar from "../components/Navbar";
import { Container, Typography, Paper, Box, useTheme } from "@mui/material";
import ProductTable from "../components/ProductTable";
import StatsCards from "../components/StatsCards";

export default function DashboardPage() {
  const theme = useTheme();

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 10 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: theme.palette.mode === "dark" ? "#121212" : "white",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              fontWeight: 700,
              color: theme.palette.mode === "dark" ? "white" : "black",
            }}
          >
            📦 Product Management
          </Typography>

          <StatsCards />
          <ProductTable />
        </Paper>
      </Container>
    </>
  );
}
