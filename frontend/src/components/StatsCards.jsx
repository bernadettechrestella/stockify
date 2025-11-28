import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  useMediaQuery,
  Box,
  Avatar,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useAuth } from "../context/AuthContext";

export default function StatsCards() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    lowStock: 0,
  });
  const { token, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && token) {
      const fetchStats = async () => {
        try {
          const res = await axios.get("/products/stats");
          setStats(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchStats();
    }
  }, [authLoading, token]);

  const isMobile = useMediaQuery("(max-width:768px)");

  const cards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      gradient: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
      icon: <Inventory2Icon sx={{ fontSize: 32 }} />,
    },
    {
      label: "Total Categories",
      value: stats.totalCategories,
      gradient: "linear-gradient(90deg, #2e7d32 0%, #66bb6a 100%)",
      icon: <CategoryIcon sx={{ fontSize: 32 }} />,
    },
    {
      label: "Low Stock",
      value: stats.lowStock,
      gradient: "linear-gradient(90deg, #c62828 0%, #ef5350 100%)",
      icon: <WarningAmberIcon sx={{ fontSize: 32 }} />,
    },
  ];

  return (
    <Box sx={{ px: isMobile ? 0.5 : 2, py: 2 }}>
      <Grid
        container
        spacing={isMobile ? 2 : 4}
        justifyContent="center"
        alignItems="stretch"
      >
        {cards.map((c) => (
          <Grid item xs={12} sm={4} md={4} key={c.label}>
            <Card
              sx={{
                borderRadius: 4,
                color: "white",
                background: c.gradient,
                boxShadow: "0px 6px 18px rgba(25, 118, 210, 0.18)",
                backdropFilter: "blur(6px)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-6px) scale(1.03)",
                  boxShadow: "0px 10px 24px rgba(25, 118, 210, 0.28)",
                  opacity: 0.98,
                },
              }}
            >
              <CardContent
                sx={{
                  textAlign: "center",
                  p: isMobile ? 2 : 3.5,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,0.18)",
                    color: "#fff",
                    width: 48,
                    height: 48,
                    mx: "auto",
                    mb: 1.5,
                    boxShadow: 2,
                    border: "2px solid rgba(255,255,255,0.25)",
                  }}
                >
                  {c.icon}
                </Avatar>
                <Typography
                  variant="subtitle1"
                  sx={{
                    opacity: 0.92,
                    fontWeight: 600,
                    fontSize: isMobile ? 15 : 18,
                    letterSpacing: 0.5,
                    mb: 0.5,
                    textShadow: "0 2px 8px rgba(0,0,0,0.12)",
                  }}
                >
                  {c.label}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: isMobile ? 32 : 44,
                    mt: isMobile ? 0.5 : 1,
                    textShadow: "0 2px 12px rgba(0,0,0,0.18)",
                  }}
                >
                  {c.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
