import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material";

export default function ProductForm({
  open,
  onClose,
  onSubmit,
  title,
  name,
  setName,
  stock,
  setStock,
  price,
  setPrice,
  categoryId,
  setCategoryId,
  categories,
  submitLabel,
}) {
  const theme = useTheme();
  const fieldBg = theme.palette.mode === "dark" ? "#23272f" : "#fff";
  const fieldBorder = theme.palette.mode === "dark" ? "#90caf9" : "#1976d2";
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(25, 118, 210, 0.18)",
          background: fieldBg,
          p: { xs: 1.5, md: 3 },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          color: "#1976d2",
          letterSpacing: 1,
          textAlign: "center",
        }}
      >
        {title}
      </DialogTitle>
      <Divider />
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 1,
          minWidth: { xs: 240, md: 350 },
        }}
      >
        <Typography
          fontWeight={500}
          color={theme.palette.mode === "dark" ? "#90caf9" : "#1976d2"}
        >
          Name
        </Typography>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          sx={{
            borderRadius: 2,
            background: fieldBg,
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: fieldBorder,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: fieldBorder,
            },
            "& .MuiInputBase-input": {
              color: theme.palette.mode === "dark" ? "#e3f2fd" : "#222",
            },
          }}
        />
        <Typography
          fontWeight={500}
          color={theme.palette.mode === "dark" ? "#90caf9" : "#1976d2"}
        >
          Stock
        </Typography>
        <TextField
          type="text"
          value={stock ? Number(stock).toLocaleString("id-ID") : ""}
          onChange={(e) => {
            // Remove non-digit chars
            const raw = e.target.value.replace(/\D/g, "");
            setStock(raw);
          }}
          variant="outlined"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          sx={{
            borderRadius: 2,
            background: fieldBg,
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: fieldBorder,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: fieldBorder,
            },
            "& .MuiInputBase-input": {
              color: theme.palette.mode === "dark" ? "#e3f2fd" : "#222",
            },
          }}
        />
        <Typography
          fontWeight={500}
          color={theme.palette.mode === "dark" ? "#90caf9" : "#1976d2"}
        >
          Price
        </Typography>
        <TextField
          type="text"
          value={
            price !== "" ? `Rp ${Number(price).toLocaleString("id-ID")}` : ""
          }
          onChange={(e) => {
            // Remove non-digit chars except comma/dot for decimals
            const raw = e.target.value
              .replace(/[^\d.,]/g, "")
              .replace(/,/g, ".");
            setPrice(raw);
          }}
          variant="outlined"
          inputProps={{ inputMode: "decimal", pattern: "[0-9.,]*" }}
          sx={{
            borderRadius: 2,
            background: fieldBg,
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: fieldBorder,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: fieldBorder,
            },
            "& .MuiInputBase-input": {
              color: theme.palette.mode === "dark" ? "#e3f2fd" : "#222",
            },
          }}
        />
        <Typography
          fontWeight={500}
          color={theme.palette.mode === "dark" ? "#90caf9" : "#1976d2"}
        >
          Category
        </Typography>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          displayEmpty
          variant="outlined"
          sx={{
            borderRadius: 2,
            background: fieldBg,
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
            minWidth: { xs: 240, md: 350 },
            width: "100%",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: fieldBorder,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: fieldBorder,
            },
            "& .MuiInputBase-input": {
              color: theme.palette.mode === "dark" ? "#e3f2fd" : "#222",
            },
          }}
        >
          <MenuItem value="" disabled>
            Pilih kategori
          </MenuItem>
          {(Array.isArray(categories) ? categories : []).map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions sx={{ p: 0, m: 0 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            onClick={onSubmit}
            fullWidth
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              py: 1.2,
              background: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.12)",
              color: "#fff",
              width: "100%",
              "&:hover": {
                background: "linear-gradient(90deg, #1565c0 60%, #1976d2 100%)",
              },
            }}
          >
            {submitLabel}
          </Button>
          <Button
            onClick={onClose}
            fullWidth
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              py: 1.2,
              color: "#1976d2",
              background: "transparent",
              width: "100%",
              "&:hover": { background: "rgba(25,118,210,0.08)" },
            }}
          >
            Cancel
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
