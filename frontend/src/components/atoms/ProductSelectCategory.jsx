import { TextField, MenuItem } from "@mui/material";

export default function ProductSelectCategory({
  categories,
  value,
  onChange,
  ...props
}) {
  return (
    <TextField
      select
      label="Category"
      value={value}
      onChange={onChange}
      {...props}
    >
      <MenuItem value="">All</MenuItem>
      {categories.map((c) => (
        <MenuItem key={c.id} value={c.id}>
          {c.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
