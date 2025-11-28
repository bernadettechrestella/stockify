import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  useTheme,
  Slide,
  useScrollTrigger,
  Avatar,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { useContext } from "react";
import ColorModeContext from "../context/ColorModeContext,js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { logout } = useAuth();
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 40,
                height: 40,
                boxShadow: 2,
              }}
            >
              <Inventory2Icon sx={{ fontSize: 26, color: "#fff" }} />
            </Avatar>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: theme.palette.mode === "light" ? "#fff" : "#e3f2fd",
                userSelect: "none",
                letterSpacing: 1,
                fontSize: { xs: 18, md: 22 },
                textShadow:
                  theme.palette.mode === "light"
                    ? "0 2px 8px #1976d2"
                    : "0 2px 8px #23272f",
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

            <Button
              variant="contained"
              endIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                borderRadius: "20px",
                paddingX: 2.5,
                fontWeight: 600,
                fontSize: 16,
                color: "#fff",
                background: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
                boxShadow: 2,
                letterSpacing: 1,
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #1565c0 60%, #1976d2 100%)",
                  transform: "scale(1.04)",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
