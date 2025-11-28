import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import ProductSelectCategory from "../atoms/ProductSelectCategory";

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
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(25, 118, 210, 0.18)",
          background: "#fff",
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
          mb: 1,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 1,
          minWidth: { xs: 240, md: 350 },
        }}
      >
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          sx={{
            borderRadius: 2,
            background: "#fff",
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
          }}
        />
        <TextField
          label="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          variant="outlined"
          sx={{
            borderRadius: 2,
            background: "#fff",
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
          }}
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          variant="outlined"
          sx={{
            borderRadius: 2,
            background: "#fff",
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
          }}
        />
        <ProductSelectCategory
          categories={categories}
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          sx={{
            borderRadius: 2,
            background: "#fff",
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
          }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            px: 2,
            color: "#1976d2",
            background: "transparent",
            "&:hover": { background: "rgba(25,118,210,0.08)" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            background: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.12)",
            color: "#fff",
            "&:hover": {
              background: "linear-gradient(90deg, #1565c0 60%, #1976d2 100%)",
            },
          }}
        >
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
