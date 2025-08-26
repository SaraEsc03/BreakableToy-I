import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import ProductForm from "./ProductForm";
import DataTableComponent from "../components/DataTable";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const result = await getProducts({ page });
      setProducts(result.products || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div>
      <h2>Products Inventory</h2>
      <button onClick={() => {
  setShowForm(true);
  console.log("ShowForm set to true");
}}>Add Product</button>


      {showForm && (
        <ProductForm
          onClose={() => setShowForm(false)}
          onCreated={fetchProducts}
        />
      )}

      <DataTableComponent
        data={products}
        loading={loading}
        totalRows={products.length || 0}
        page={page}
        onPageChange={setPage}
        onEdit={(id) => console.log("Edit", id)}
        onDelete={(id) => console.log("Delete", id)}
      />

    </div>
  );
}
