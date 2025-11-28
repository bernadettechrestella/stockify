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
          background: "linear-gradient(120deg, #fff 60%, #ffe3e3 100%)",
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
        <WarningAmberIcon
          sx={{
            fontSize: 100,
            color: "#c62828",
            mb: 1,
            filter: "drop-shadow(0 2px 8px #c6282833)",
          }}
        />
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ minWidth: { xs: 240, md: 350 }, width: "100%" }}>
          <DialogContent
            sx={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: 600,
              color: "#333",
              py: 2,
              mb: 1,
            }}
          >
            Are you sure you want to delete this product?
          </DialogContent>
        </Box>
      </Box>
      <DialogActions
        sx={{ flexDirection: "column", gap: 1, pb: 2, width: "100%" }}
      >
        <Box
          sx={{
            minWidth: { xs: 240, md: 350 },
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignSelf: "center",
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={onDelete}
            fullWidth
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              py: 1.2,
              background: "linear-gradient(90deg, #c62828 60%, #ef5350 100%)",
              boxShadow: "0 2px 8px rgba(198, 40, 40, 0.12)",
              color: "#fff",
              width: "100%",
              "&:hover": {
                background: "linear-gradient(90deg, #b71c1c 60%, #c62828 100%)",
              },
            }}
          >
            Delete
          </Button>
          <Button
            onClick={onClose}
            fullWidth
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              py: 1.2,
              color: "#c62828",
              background: "transparent",
              width: "100%",
              "&:hover": { background: "rgba(198,40,40,0.08)" },
            }}
          >
            Cancel
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
