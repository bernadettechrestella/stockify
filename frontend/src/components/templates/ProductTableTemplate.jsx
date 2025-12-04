import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import ProductTextField from "../atoms/ProductTextField";
import ProductSelectCategory from "../atoms/ProductSelectCategory";
import ProductForm from "../molecules/ProductForm";
import ProductDeleteDialog from "../molecules/ProductDeleteDialog";
import ProductTableGrid from "../organisms/ProductTableGrid";
import { Button } from "@mui/material";

export default function ProductTableTemplate({
  theme,
  isMobile,
  loading,
  authLoading,
  rows,
  categories,
  search,
  setSearch,
  categoryId,
  setCategoryId,
  open,
  setOpen,
  name,
  setName,
  stock,
  setStock,
  price,
  setPrice,
  handleAdd,
  editOpen,
  setEditOpen,
  handleUpdate,
  categoryFormId,
  setCategoryFormId,
  handleEditOpen,
  deleteOpen,
  setDeleteOpen,
  handleDelete,
  handleDeleteConfirmOpen,
  fetchProducts,
}) {
  if (authLoading || loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Paper
      elevation={6}
      sx={{
        borderRadius: 4,
        p: { xs: 1.5, md: 3 },
        mt: 2,
        background:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        boxShadow: "0 8px 32px rgba(25, 118, 210, 0.10)",
        backdropFilter: "blur(2px)",
        transition: "0.3s",
      }}
    >
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
          <ProductTextField
            label="Search product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={fetchProducts}
            size="small"
            sx={{
              width: isMobile ? "100%" : 220,
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "white",
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
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
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
            }}
          />

          <ProductSelectCategory
            categories={categories}
            label="Filter by Category"
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
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
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
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
            }}
          />
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
            paddingX: isMobile ? 1.5 : 2.5,
            minWidth: isMobile ? "auto" : 140,
            borderRadius: "30px",
            fontSize: isMobile ? 0 : 15,
            transition: "0.3s",
            color: "#fff",
            gap: 1,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(90deg, #0058d1 0%, #0084ff 100%)"
                : "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.12)",
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
          boxShadow: "0 4px 16px rgba(25, 118, 210, 0.18)",
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
      <ProductTableGrid
        rows={rows}
        onEdit={handleEditOpen}
        onDelete={handleDeleteConfirmOpen}
        isMobile={isMobile}
      />
      {/* Add Product Modal */}
      <ProductForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAdd}
        title="Add Product"
        name={name}
        setName={setName}
        stock={stock}
        setStock={setStock}
        price={price}
        setPrice={setPrice}
        categoryFormId={categoryFormId}
        setCategoryFormId={setCategoryFormId}
        categories={categories}
        submitLabel="Save"
      />

      {/* Edit Product Modal */}
      <ProductForm
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleUpdate}
        title="Edit Product"
        name={name}
        setName={setName}
        stock={stock}
        setStock={setStock}
        price={price}
        setPrice={setPrice}
        categoryFormId={categoryFormId}
        setCategoryFormId={setCategoryFormId}
        categories={categories}
        submitLabel="Update"
      />
      {/* Delete Confirmation Modal */}
      <ProductDeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDelete={handleDelete}
      />
    </Paper>
  );
}
