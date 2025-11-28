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
  // Detect scroll > 0
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <Slide appear={false} direction="down" in={true}>
      <AppBar
        elevation={trigger ? 6 : 0} // shadow when scroll
        position="fixed"
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(255,255,255,0.65)"
              : "rgba(20,20,20,0.65)",
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
            p: { xs: 1, md: 2 }, // responsive padding
          }}
        >
          {/* LOGO */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Inventory2Icon
              sx={{ fontSize: 28, color: theme.palette.primary.main }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                userSelect: "none",
              }}
            >
              Stockify
            </Typography>
          </Box>

          {/* RIGHT BUTTONS */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={colorMode.toggleColorMode}
              sx={{
                color: theme.palette.mode === "dark" ? "#ffeb3b" : "#000",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
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
              variant="text"
              endIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                borderRadius: "20px",
                paddingX: 2,
                fontWeight: 500,
                color: theme.palette.text.primary,
                borderColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.4)"
                    : "rgba(0,0,0,0.2)",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.04)",
                },
              }}
            ></Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
