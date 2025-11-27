import { useEffect, useState } from "react";
import axios from "../api/axios";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack,
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Fab,
} from "@mui/material";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import useCategories from "../api/useCategories";

export default function ProductTable() {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = useCategories();
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get("/products", {
        params: {
          search,
          category: categoryId,
        },
      });
      setRows(res.data);
    } catch (err) {
      alert("Failed to load products" + (err.response?.data?.message || ""));
    } finally {
      setLoading(false);
    }
  }, [search, categoryId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
        <Stack
          direction="row"
          spacing={0.5}
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleEditOpen(params.row)}
            sx={{ p: 0.5 }}
          >
            <EditIcon sx={{ fontSize: 18, verticalAlign: "middle" }} />
          </IconButton>

          <IconButton
            color="error"
            size="small"
            onClick={() => handleDeleteConfirmOpen(params.row)}
            sx={{ p: 0.5 }}
          >
            <DeleteIcon sx={{ fontSize: 18, verticalAlign: "middle" }} />
          </IconButton>
        </Stack>
      ),
    },
  ];

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  const handleAdd = async () => {
    if (!name || !stock || !price || !categoryId) {
      return toast.error("All fields are required!");
    }

    try {
      await axios.post("/products", {
        name,
        stock: Number(stock),
        price: Number(price),
        category_id: Number(categoryId),
      });
      toast.success("Product added successfully");
      setOpen(false);
      fetchProducts(); // refresh table
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    }
  };

  const handleEditOpen = (row) => {
    setEditId(row.id);
    setName(row.name);
    setStock(row.stock);
    setPrice(row.price);
    setCategoryId(row.category_id); // IMPORTANT: make sure queries return category_id
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!name || !stock || !price || !categoryId) {
      return toast.error("All fields are required!");
    }

    try {
      await axios.put(`/products/${editId}`, {
        name,
        stock: Number(stock),
        price: Number(price),
        category_id: Number(categoryId),
      });
      toast.success("Product updated successfully");
      setEditOpen(false);
      fetchProducts();
    } catch (err) {
      setEditOpen(true);
      toast.error(err.response?.data?.message || "Failed to update product");
    }
  };

  const handleDeleteConfirmOpen = (row) => {
    setDeleteId(row.id);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/products/${deleteId}`);
      setDeleteOpen(false);
      fetchProducts();
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          sx={{ mb: 2 }}
        >
          <TextField
            label="Search product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={fetchProducts}
            size="small"
            sx={{
              width: isMobile ? "100%" : 220,
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "white",
              borderRadius: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.4)"
                    : "#919191",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",
              },
              "& .MuiInputBase-input": {
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
              "& .MuiInputLabel-root": {
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.7)"
                    : "#666",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
              "& input::placeholder": {
                opacity: 1,
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.6)"
                    : "#666",
              },
              "& svg": {
                // icon drop down
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
            }}
          />

          <TextField
            label="Category"
            select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              fetchProducts();
            }}
            size="small"
            sx={{
              width: isMobile ? "100%" : 220,
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "white",
              borderRadius: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.4)"
                    : "#919191",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",
              },
              "& .MuiInputBase-input": {
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
              "& .MuiInputLabel-root": {
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.7)"
                    : "#666",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
              "& input::placeholder": {
                opacity: 1,
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.6)"
                    : "#666",
              },
              "& svg": {
                // icon drop down
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Button
          onClick={() => {
            setName("");
            setStock("");
            setPrice("");
            setCategoryId("");
            setOpen(true);
          }}
          sx={{
            display: isMobile ? "none" : "inline-flex",
            textTransform: "none",
            fontWeight: 600,
            paddingY: isMobile ? 0.7 : 1,
            paddingX: isMobile ? 1.5 : 2.5, // 👉 otomatis mengecil di mobile
            minWidth: isMobile ? "auto" : 140, // 👉 tidak pecah di mobile
            borderRadius: "30px",
            fontSize: isMobile ? 0 : 15, // 👉 tulisannya hilang di mobile
            transition: "0.3s",
            color: "#fff",
            gap: 1,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(90deg, #0058d1 0%, #0084ff 100%)"
                : "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0px 4px 12px rgba(0, 136, 255, 0.5)"
                  : "0px 4px 12px rgba(25, 118, 210, 0.4)",
            },
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: 18 }}>+</span>
          Add Product
        </Button>
      </Box>

      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 80,
          right: 20,
          display: isMobile ? "flex" : "none",
        }}
        onClick={() => {
          setName("");
          setStock("");
          setPrice("");
          setCategoryId("");
          setOpen(true);
        }}
      >
        <AddIcon />
      </Fab>

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

          /* HEADER STYLE */
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

          /* ROW STYLE */
          "& .MuiDataGrid-row": {
            borderBottom: "none",
            transition: "0.2s",
          },

          /* ROW HOVER EFFECT */
          "& .MuiDataGrid-row:hover": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.04)",
            transform: "scale(1.002)",
          },

          "& .MuiDataGrid-cell": {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: isMobile ? 90 : "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            overflowX: isMobile ? "auto !important" : "hidden",
          },

          /* PAGINATION STYLE */
          "& .MuiTablePagination-root": {
            borderTop: "none",
          },

          /* LOW STOCK ROW STYLE */
          "& .low-stock": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255,0,0,0.08)"
                : "rgba(255,0,0,0.06)",
            color: theme.palette.mode === "dark" ? "#ffb3b3" : "#b30000",
            fontWeight: 600,
          },

          /* KEEP HOVER ELEGANT EVEN IF LOW STOCK */
          "& .low-stock:hover": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255,0,0,0.15)"
                : "rgba(255,0,0,0.12)",
            transform: "scale(1.002)",
          },
        }}
      />

      {/* Add Product Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <TextField
            label="Category"
            select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent
          dividers
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1,
            minWidth: 350,
          }}
        >
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <TextField
            fullWidth
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <TextField
            fullWidth
            label="Category"
            select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
