interface CategoryMetrics {
  totalProducts: number;
  totalStock: number;
  totalValue: number;
  averagePrice: number;
}

interface Metrics {
  overallMetrics: CategoryMetrics;
  categoryMetrics: Record<string, CategoryMetrics>;
}

interface Props {
  metrics: Metrics;
}

export default function MetricsTable({ metrics }: Props) {
  const { overallMetrics, categoryMetrics } = metrics;

  return (
    <div style={{ marginBottom: "20px", marginTop: "60px", border: "1px solid #ccc", padding: "15px"}}>
      <h3>Inventory Metrics</h3>

      {/* Overall metrics */}
      <div style={{ marginBottom: "15px" }}>
        <h4>Overall</h4>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Total Products</th>
              <th>Total Stock</th>
              <th>Total Value</th>
              <th>Average Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{overallMetrics.totalProducts}</td>
              <td>{overallMetrics.totalStock}</td>
              <td>${overallMetrics.totalValue.toFixed(2)}</td>
              <td>${overallMetrics.averagePrice.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Metrics by category */}
      <div>
        <h4>By Category</h4>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Total Products</th>
              <th>Total Stock</th>
              <th>Total Value</th>
              <th>Average Price</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(categoryMetrics).map(([category, data]) => (
              <tr key={category}>
                <td>{category}</td>
                <td>{data.totalProducts}</td>
                <td>{data.totalStock}</td>
                <td>${data.totalValue.toFixed(2)}</td>
                <td>${data.averagePrice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
