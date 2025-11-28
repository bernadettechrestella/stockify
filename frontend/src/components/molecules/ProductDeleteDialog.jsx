import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function ProductDeleteDialog({ open, onClose, onDelete }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(198, 40, 40, 0.18)",
          background: "#fff",
          p: { xs: 1.5, md: 3 },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        <WarningAmberIcon sx={{ fontSize: 48, color: "#c62828", mb: 1 }} />
      </Box>
      <DialogTitle
        sx={{
          fontWeight: 700,
          color: "#c62828",
          letterSpacing: 1,
          textAlign: "center",
          mb: 1,
        }}
      >
        Delete Product
      </DialogTitle>
      <DialogContent
        sx={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: 500,
          color: "#c62828",
          py: 2,
        }}
      >
        Are you sure you want to delete this product?
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            px: 2,
            color: "#c62828",
            background: "transparent",
            "&:hover": { background: "rgba(198,40,40,0.08)" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onDelete}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            background: "linear-gradient(90deg, #c62828 60%, #ef5350 100%)",
            boxShadow: "0 2px 8px rgba(198, 40, 40, 0.12)",
            color: "#fff",
            "&:hover": {
              background: "linear-gradient(90deg, #b71c1c 60%, #c62828 100%)",
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
