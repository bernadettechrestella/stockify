import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import ProductActionButtons from "../atoms/ProductActionButtons";

export default function ProductTableGrid({ rows, onEdit, onDelete, isMobile }) {
  const theme = useTheme();

  const columns = [
    {
      field: "no",
      headerName: "No",
      headerAlign: "center",
      align: "center",
      flex: 0.3,
    },
    {
      field: "name",
      headerName: "Product",
      headerAlign: "center",
      align: "center",
      flex: 1.5,
    },
    {
      field: "category",
      headerName: "Category",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 0.7,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <ProductActionButtons
          onEdit={() => onEdit(params.row)}
          onDelete={() => onDelete(params.row)}
        />
      ),
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={6}
      disableSelectionOnClick
      autoHeight
      getRowClassName={(params) => {
        return params.row.stock <= 5 ? "low-stock" : "";
      }}
      sx={{
        width: "100%",
        overflowX: "auto",
        borderRadius: 3,
        overflow: "hidden",
        border: "none",
        background: theme.palette.mode === "dark" ? "#23272f" : "#fff",
        "& .MuiDataGrid-columnHeaders": {
          background:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.05)"
              : "rgba(0,0,0,0.02)",
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.12)"
              : "rgba(0,0,0,0.1)"
          }`,
          fontWeight: 700,
          fontSize: { xs: "0.75rem", sm: "0.9rem" },
        },
        "& .MuiDataGrid-row": {
          borderBottom: "none",
          transition: "0.2s",
          background: "transparent",
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.06)"
              : "rgba(0,0,0,0.04)",
          transform: "scale(1.002)",
        },
        "& .MuiDataGrid-cell": {
          background: "transparent",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: isMobile ? 90 : "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          overflowX: isMobile ? "auto !important" : "hidden",
        },
        "& .MuiTablePagination-root": {
          borderTop: "none",
        },
        "& .low-stock": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255,0,0,0.08)"
              : "rgba(255,0,0,0.06)",
          color: theme.palette.mode === "dark" ? "#ffb3b3" : "#b30000",
          fontWeight: 600,
        },
        "& .low-stock:hover": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255,0,0,0.15)"
              : "rgba(255,0,0,0.12)",
          transform: "scale(1.002)",
        },
      }}
    />
  );
}
