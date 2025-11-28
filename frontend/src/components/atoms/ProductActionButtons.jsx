import { Stack, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductActionButtons({ onEdit, onDelete }) {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      justifyContent="center"
      alignItems="center"
    >
      <IconButton
        color="primary"
        size="small"
        onClick={onEdit}
        sx={{
          p: 0.5,
          bgcolor: "rgba(25, 118, 210, 0.08)",
          borderRadius: 2,
          "&:hover": {
            bgcolor: "primary.main",
            color: "#fff",
            transform: "scale(1.1)",
          },
        }}
      >
        <EditIcon sx={{ fontSize: 18, verticalAlign: "middle" }} />
      </IconButton>
      <IconButton
        color="error"
        size="small"
        onClick={onDelete}
        sx={{
          p: 0.5,
          bgcolor: "rgba(198, 40, 40, 0.08)",
          borderRadius: 2,
          "&:hover": {
            bgcolor: "error.main",
            color: "#fff",
            transform: "scale(1.1)",
          },
        }}
      >
        <DeleteIcon sx={{ fontSize: 18, verticalAlign: "middle" }} />
      </IconButton>
    </Stack>
  );
}
