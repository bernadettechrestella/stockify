import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  useMediaQuery,
} from "@mui/material";

export default function StatsCards() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    lowStock: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/products/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const isMobile = useMediaQuery("(max-width:768px)");

  const cards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      gradient: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
    },
    {
      label: "Total Categories",
      value: stats.totalCategories,
      gradient: "linear-gradient(90deg, #2e7d32 0%, #66bb6a 100%)",
    },
    {
      label: "Low Stock",
      value: stats.lowStock,
      gradient: "linear-gradient(90deg, #c62828 0%, #ef5350 100%)",
    },
  ];

  return (
    <Grid container spacing={isMobile ? 1.5 : 3} sx={{ mb: 2, mt: 1 }}>
      {cards.map((c) => (
        <Grid item xs={12} sm={6} md={4} key={c.label}>
          <Card
            sx={{
              borderRadius: 3,
              color: "white",
              background: c.gradient,
              boxShadow: "0px 3px 8px rgba(0,0,0,0.25)",
              transition: "0.3s",
              ...(!isMobile && {
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0px 5px 12px rgba(0,0,0,0.35)",
                },
              }),
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                p: isMobile ? 1.8 : 3,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  opacity: 0.9,
                  fontWeight: 600,
                  fontSize: isMobile ? 14 : 17,
                }}
              >
                {c.label}
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  fontSize: isMobile ? 28 : 36,
                  mt: isMobile ? 0.5 : 1,
                }}
              >
                {c.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
