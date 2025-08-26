import axios from 'axios';
axios.defaults.baseURL = "http://localhost:9090"; 


export async function getProducts(params: {
  name?: string;
  category?: string[];  
  inStock?: boolean;
  sort1?: string;
  sort2?: string;
  page?: number;
}) {
  const response = await axios.get('/product', { params });
  return response.data;
}

export async function createProduct(product: any) {
  try {
    const response = await axios.post("/product", product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}