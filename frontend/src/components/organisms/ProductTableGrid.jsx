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
      headerAlign: "center",
      align: "center",
      flex: 0.7,
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: "center",
      align: "right",
      flex: 1,
      renderCell: (params) => {
        const value = Number(params.value);
        if (isNaN(value)) return params.value;
        return `Rp${value.toLocaleString("id-ID")}`;
      },
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
      hideFooterSelectedRowCount
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
        "& .Mui-selected": {
          background: "transparent !important",
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
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(90deg, #ffb3b3 0%, #ff80ab 100%)"
              : "linear-gradient(90deg, #ffe3ec 0%, #ffd6e0 100%)",
          color: theme.palette.mode === "dark" ? "#d32f2f" : "#ad1457",
          fontWeight: 600,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 2px 8px #ff80ab33"
              : "0 2px 8px #ffd6e033",
        },
        "& .low-stock:hover": {
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(90deg, #ff80ab 0%, #ffb3b3 100%)"
              : "linear-gradient(90deg, #ffd6e0 0%, #ffe3ec 100%)",
          transform: "scale(1.002)",
        },
      }}
    />
  );
}
