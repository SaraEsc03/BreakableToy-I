import axios from 'axios';
axios.defaults.baseURL = "http://localhost:9090"; 


export async function getProducts(params: {
  name?: string;
  category?: string;  // <- change from string[] to string
  inStock?: boolean;
  sort1?: string;
  sort2?: string;
  page?: number;
}) {
  const response = await axios.get("/product", { params });
  return response.data;
}

export const toggleStock = async (id: number, inStock: boolean) => {
  if (inStock) {
    // Currently in stock → mark out of stock
    const res = await axios.post(`/product/${id}/markoutofstock`);
    return res.data;
  } else {
    // Currently out of stock → restore last stock
    const res = await axios.put(`/product/${id}/instock`);
    return res.data;
  }
};

export async function createProduct(product: any) {
  try {
    const response = await axios.post("/product", product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}