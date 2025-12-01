import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  InputAdornment,
  IconButton,
  Avatar,
  Fade,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", { email, password });
      const accessToken = res.data.data.accessToken;
      login(accessToken);
      navigate("/", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(120deg, #1976d2 0%, #90caf9 100%)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Fade in>
        <Paper
          elevation={8}
          sx={{
            padding: 5,
            width: { xs: 320, sm: 380 },
            textAlign: "center",
            borderRadius: 4,
            boxShadow: "0 8px 32px rgba(25, 118, 210, 0.2)",
            backdropFilter: "blur(2px)",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 56,
              height: 56,
              margin: "0 auto",
              mb: 2,
              boxShadow: 2,
            }}
          >
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography variant="h5" mb={2} fontWeight="bold" color="primary">
            Stockify Login
          </Typography>
          <Typography variant="body2" mb={3} color="text.secondary">
            Masuk untuk mengelola stok produk Anda
          </Typography>

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
            autoComplete="email"
            variant="outlined"
          />

          <TextField
            label="Password"
            type={showPass ? "text" : "password"}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPass((v) => !v)}
                    edge="end"
                  >
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            autoComplete="current-password"
            variant="outlined"
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              fontSize: 18,
              letterSpacing: 1,
              boxShadow: 2,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.04)",
                background: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
              },
            }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "LOADING..." : "LOGIN"}
          </Button>
        </Paper>
      </Fade>
    </Box>
  );
}
