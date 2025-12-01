import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  Slide,
  useScrollTrigger,
  Avatar,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
} from "@mui/material";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useContext, useState } from "react";
import ColorModeContext from "../context/ColorModeContext,js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { logout } = useAuth();
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  // Ambil data produk dari store dan filter stok rendah
  const products = useSelector((state) => state.products.items) || [];
  const lowStockProducts = Array.isArray(products)
    ? products.filter((p) => Number(p.stock) <= 5)
    : [];

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };
  const handleNotifOpen = () => setNotifOpen(true);
  const handleNotifClose = () => setNotifOpen(false);

  return (
    <Slide appear={false} direction="down" in={true}>
      <AppBar
        elevation={trigger ? 8 : 0}
        position="fixed"
        sx={{
          backdropFilter: "blur(12px)",
          background:
            theme.palette.mode === "light"
              ? "linear-gradient(90deg, #1976d2 0%, #90caf9 100%)"
              : "linear-gradient(90deg, #23272f 0%, #1976d2 100%)",
          borderBottom: `1px solid ${
            theme.palette.mode === "light"
              ? "rgba(0,0,0,0.08)"
              : "rgba(255,255,255,0.1)"
          }`,
          transition: "0.3s ease",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
            p: { xs: 1, md: 2 },
            minHeight: 64,
          }}
        >
          {/* LOGO */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Avatar
              sx={{
                width: 44,
                height: 44,
                boxShadow: 3,
                border: "2.5px solid #fff",
                background:
                  theme.palette.mode === "light"
                    ? "linear-gradient(135deg, #1976d2 60%, #42a5f5 100%)"
                    : "linear-gradient(135deg, #23272f 60%, #1976d2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 0.5,
              }}
            >
              <Inventory2Icon
                sx={{
                  fontSize: 28,
                  color: theme.palette.mode === "light" ? "#fff" : "#90caf9",
                  filter:
                    theme.palette.mode === "light"
                      ? "drop-shadow(0 2px 8px #1976d2)"
                      : "drop-shadow(0 2px 8px #23272f)",
                }}
              />
            </Avatar>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                fontFamily: "Montserrat, Poppins, Arial",
                userSelect: "none",
                letterSpacing: 2.5,
                fontSize: { xs: 22, md: 32 },
                lineHeight: 1.1,
                textShadow:
                  theme.palette.mode === "light"
                    ? "0 2px 16px #1976d2, 0 1px 0 #fff, 0 0 2px #42a5f5"
                    : "0 2px 12px #42a5f5, 0 1px 0 #90caf9, 0 0 2px #e3f2fd",
                background:
                  theme.palette.mode === "light"
                    ? "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)"
                    : "linear-gradient(90deg, #42a5f5 60%, #90caf9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                mb: 0.5,
                px: 0.5,
              }}
            >
              Stockify
            </Typography>
          </Box>

          {/* RIGHT BUTTONS */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={colorMode.toggleColorMode}
              sx={{
                color: theme.palette.mode === "dark" ? "#ffeb3b" : "#fff",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.15)",
                  background: "rgba(255,255,255,0.12)",
                },
              }}
            >
              {theme.palette.mode === "dark" ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>
            <IconButton
              onClick={handleNotifOpen}
              sx={{
                color: theme.palette.mode === "dark" ? "#fff" : "#1976d2",
                transition: "0.3s",
                mr: 0.5,
                position: "relative",
                p: 0.8,
                boxShadow: 0,
                background: "none",
                borderRadius: 0,
                "&:hover": {
                  transform: "scale(1.15)",
                  background: "rgba(255,255,255,0.12)",
                },
              }}
              aria-label="Notifikasi Stok Rendah"
            >
              <Badge
                badgeContent={lowStockProducts.length}
                color="error"
                invisible={lowStockProducts.length === 0}
                sx={{
                  "& .MuiBadge-badge": {
                    right: 2,
                    top: 2,
                    fontSize: 12,
                    minWidth: 18,
                    height: 18,
                    boxShadow: 0,
                    background:
                      theme.palette.mode === "dark" ? "#c62828" : "#d32f2f",
                  },
                }}
              >
                <NotificationsIcon
                  sx={{
                    fontSize: 26,
                    color: theme.palette.mode === "dark" ? "#fff" : "#fff",
                  }}
                />
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleLogout}
              sx={{
                color: "#fff",
                p: 1.2,
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.15)",
                  background: "rgba(255,255,255,0.12)",
                },
              }}
            >
              <LogoutIcon sx={{ fontSize: 26 }} />
            </IconButton>
          </Box>

          {/* SIDEBAR NOTIFIKASI */}
          <Drawer
            anchor="right"
            open={notifOpen}
            onClose={handleNotifClose}
            PaperProps={{
              sx: {
                width: { xs: 280, sm: 340 },
                borderRadius: "16px 0 0 16px",
                boxShadow: 8,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(120deg, #23272f 60%, #1976d2 100%)"
                    : "linear-gradient(120deg, #fff 60%, #e3f2fd 100%)",
                p: 2,
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: theme.palette.mode === "dark" ? "#1ED760" : "#1976d2",
                textAlign: "center",
                mb: 2,
                letterSpacing: 1,
              }}
            >
              Notification
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {lowStockProducts.length === 0 ? (
                <ListItem>
                  <ListItemText primary="Tidak ada produk stok rendah." />
                </ListItem>
              ) : (
                lowStockProducts.map((prod) => (
                  <ListItem key={prod.id} sx={{ mb: 1 }}>
                    <ListItemIcon>
                      <NotificationsIcon sx={{ color: "#c62828" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={prod.name}
                      secondary={`Stok: ${prod.stock}`}
                      sx={{
                        color: theme.palette.mode === "dark" ? "#fff" : "#222",
                      }}
                    />
                  </ListItem>
                ))
              )}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
