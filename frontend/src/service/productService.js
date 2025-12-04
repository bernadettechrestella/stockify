import axios from '../api/axios';

export class ProductService {
  async fetchProducts(search, category) {
    const res = await axios.get('/products', {
      params: { search, category },
    });
    return res.data.data;
  }

  async addProduct(product) {
    await axios.post('/products', product);
  }

  async updateProduct(id, product) {
    await axios.put(`/products/${id}`, product);
  }

  async deleteProduct(id) {
    await axios.delete(`/products/${id}`);
  }
}
