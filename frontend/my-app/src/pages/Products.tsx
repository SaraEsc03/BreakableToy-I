import { useState, useEffect } from "react";
import { deleteProduct, getProducts } from "../services/productService";
import ProductForm from "./ProductForm";
import CustomTable from "../components/DataTable";
import ProductFilters from "../components/ProductFilters";
import MetricsTable from "../components/MetricsTable"; // <-- import
import EditProductForm from "../components/EditProductForm";
import '../App.css';




export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [sort1, setSort1] = useState<string | undefined>(undefined);
  const [sort2, setSort2] = useState<string | undefined>(undefined);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
const [deleteProductId, setDeleteProductId] = useState<number | null>(null);


  const [filters, setFilters] = useState<{
    name?: string;
    category?: string;
    inStock?: boolean;
  }>({});

  const [categories, setCategories] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<any>({
    overallMetrics: { totalProducts: 0, totalStock: 0, totalValue: 0, averagePrice: 0 },
    categoryMetrics: {},
  });

  // Fetch products + metrics
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const result = await getProducts({
        page,
        sort1,
        sort2,
        ...filters,
      });

      setProducts(result.products || []);
      setTotalRows(result.total || 0);
      setMetrics(result.metrics || metrics);

      // Update categories from all products
      const cats: string[] = Array.from(
        new Set((result.products || []).map((p: any) => String(p.category)))
      );
      setCategories(cats);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(0); // reset page
  };

  const handleSort = (column: any) => {
    if (!sort1) {
      setSort1(column.name);
      setSort2(undefined);
      return;
    }
    if (column.name === sort1) {
      setSort1(undefined);
      setSort2(undefined);
      return;
    }
    if (!sort2 && column.name !== sort1) {
      setSort2(column.name);
      return;
    }
    if (column.name === sort2) {
      setSort2(undefined);
      return;
    }
    setSort1(column.name);
    setSort2(undefined);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, sort1, sort2, filters]);

  return (
  <div id="products-page">
    <h2>Products Inventory</h2>

    {showForm && (
      <ProductForm
        onClose={() => setShowForm(false)}
        onCreated={fetchProducts}
      />
    )}

    <ProductFilters onSearch={handleSearch} categories={categories} />

    <button style={{fontSize:'20px'}} onClick={() => setShowForm(true)}>Add Product</button>

    <CustomTable
      data={products}
      loading={loading}
      sort1={sort1 || ""}
      sort2={sort2 || ""}
      onSort={handleSort}
      onEdit={(id) => {
        const productToEdit = products.find(p => p.id === id);
        setEditingProduct(productToEdit);
      }}
      onDelete={(id) => setDeleteProductId(id)}
      page={page}
      totalRows={totalRows}
      onPageChange={setPage}
      onUpdateStock={fetchProducts}
    />

    <MetricsTable metrics={metrics} />


    {editingProduct && (
      <EditProductForm
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onUpdated={fetchProducts}
      />
    )}

    {deleteProductId !== null && (
      <div className="delete-overlay">
        <div
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "8px",
            minWidth: "300px",
          }}
        >
          <h3>Are you sure you want to delete this product?</h3>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
            <button onClick={() => setDeleteProductId(null)}>Cancel</button>
            <button
              onClick={async () => {
                try {
                  await deleteProduct(deleteProductId);
                  setDeleteProductId(null);
                  fetchProducts();
                } catch (err) {
                  console.error(err);
                  alert("Error deleting product");
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

}
