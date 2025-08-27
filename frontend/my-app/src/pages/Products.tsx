import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import ProductForm from "./ProductForm";
import CustomTable from "../components/DataTable";
import ProductFilters from "../components/ProductFilters";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [sort1, setSort1] = useState<string | undefined>(undefined);
  const [sort2, setSort2] = useState<string | undefined>(undefined);

  const [filters, setFilters] = useState<{
    name?: string;
    category?: string;
    inStock?: boolean;
  }>({});

  // Categories for the filter dropdown
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch products from backend
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

      // Update categories from current products
      const cats: string[] = Array.from(
        new Set((result.products || []).map((p: any) => String(p.category)))
      );
      setCategories(cats);
    } finally {
      setLoading(false);
    }
  };

  // Handle search/filter from ProductFilters
  const handleSearch = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(0); // Reset page to 0 when applying new filters
  };

  // Sorting logic (double sort)
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

  // Fetch products when page, sort, or filters change
  useEffect(() => {
    fetchProducts();
  }, [page, sort1, sort2, filters]);

  return (
    <div>
      <h2>Products Inventory</h2>
      <button onClick={() => setShowForm(true)}>Add Product</button>

      {showForm && (
        <ProductForm
          onClose={() => setShowForm(false)}
          onCreated={fetchProducts} // Refresh products after creating
        />
      )}

      {/* Filter component */}
      <ProductFilters onSearch={handleSearch} categories={categories} />

      {/* Table component */}
      <CustomTable
        data={products}
        loading={loading}
        sort1={sort1 || ""}
        sort2={sort2 || ""}
        onSort={handleSort}
        onEdit={(id) => console.log("Edit", id)}
        onDelete={(id) => console.log("Delete", id)}
        page={page}
        totalRows={totalRows}
        onPageChange={setPage}
      />
    </div>
  );
}
