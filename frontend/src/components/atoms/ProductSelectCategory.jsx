import { TextField, MenuItem } from "@mui/material";

export default function ProductSelectCategory({
  categories,
  value,
  onChange,
  label,
  ...props
}) {
  const safeCategories = Array.isArray(categories) ? categories : [];
  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={onChange}
      {...props}
    >
      <MenuItem value="">All</MenuItem>
      {safeCategories.map((c) => (
        <MenuItem key={c.id} value={c.id}>
          {c.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
