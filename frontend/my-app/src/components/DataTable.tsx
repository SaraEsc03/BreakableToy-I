import { toggleStock } from "../services/productService"; // <-- import

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  expirationDate?: string;
  quantityInStock: number;
}

interface Props {
  data: Product[];
  loading: boolean;
  sort1?: string;
  sort2?: string;
  onSort: (column: { name: string }) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  page: number;
  totalRows: number;
  onPageChange: (page: number) => void;
  onUpdateStock: () => void; // <-- callback to refresh products after toggle
}

const columns = [
  { name: "name", label: "Name" },
  { name: "category", label: "Category" },
  { name: "price", label: "Price" },
  { name: "expirationDate", label: "Expiration Date" },
  { name: "quantityInStock", label: "Stock" },
];

export default function CustomTable({
  data,
  loading,
  sort1,
  sort2,
  onSort,
  onEdit,
  onDelete,
  page,
  totalRows,
  onPageChange,
  onUpdateStock,
}: Props) {
  const handleToggleStock = async (row: Product) => {
    try {
      await toggleStock(row.id, row.quantityInStock > 0);
      onUpdateStock(); // Refresh products & metrics after toggle
    } catch (err) {
      console.error(err);
      alert("Error toggling stock");
    }
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.name}
              style={{
                cursor: "pointer",
                background:
                  sort1 === col.name || sort2 === col.name ? "#e0e0e0" : "#f5f5f5",
                border: "1px solid #ccc",
                padding: "8px",
              }}
              onClick={() => onSort({ name: col.name })}
              title="Ordenar"
            >
              {col.label}
            </th>
          ))}
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={columns.length + 1} style={{ textAlign: "center" }}>
              Loading...
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + 1} style={{ textAlign: "center" }}>
              No products found.
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={row.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{row.name}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{row.category}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>${row.price}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {row.expirationDate || "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{row.quantityInStock}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {/* Toggle Stock Button */}
                <button
                  onClick={() => handleToggleStock(row)}
                  style={{
                    background: row.quantityInStock > 0 ? "red" : "green",
                    color: "white",
                    marginRight: "5px",
                  }}
                >
                  {row.quantityInStock > 0 ? "Out of Stock" : "Restore Stock"}
                </button>

                {/* Existing actions */}
                <button onClick={() => onEdit(row.id)} style={{ marginRight: "5px" }}>
                  Edit
                </button>
                <button onClick={() => onDelete(row.id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={columns.length + 1} style={{ textAlign: "center" }}>
            <button disabled={page === 0} onClick={() => onPageChange(page - 1)}>
              Previous
            </button>
            <span style={{ margin: "0 10px" }}>Page {page + 1}</span>
            <button
              disabled={page >= Math.ceil(totalRows / 10) - 1}
              onClick={() => onPageChange(page + 1)}
            >
              Next
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
