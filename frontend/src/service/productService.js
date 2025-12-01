import axios from '../api/axios';

export const fetchProductsApi = async (search, category) => {
  const res = await axios.get('/products', {
    params: { search, category },
  });
  return res.data.data;
};

export const addProductApi = async (product) => {
  await axios.post('/products', product);
};

export const updateProductApi = async (id, product) => {
  await axios.put(`/products/${id}`, product);
};

export const deleteProductApi = async (id) => {
  await axios.delete(`/products/${id}`);
};
