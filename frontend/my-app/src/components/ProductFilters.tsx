import { useState } from "react";

interface Props {
  onSearch: (filters: { name?: string; category?: string; inStock?: boolean }) => void;
  categories: string[];
}

export default function ProductFilters({ onSearch, categories }: Props) {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | "">("");
  const [stockStatus, setStockStatus] = useState<"all" | "in" | "out">("all");

  const handleSearch = () => {
    onSearch({
      name: name.trim() || undefined,
      category: selectedCategory || undefined, 
      inStock:
        stockStatus === "all" ? undefined : stockStatus === "in" ? true : false,
    });
  };

  return (
    <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <input
        style={{fontSize:'14px'}}
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        style={{fontSize:'20px'}}
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
      style={{fontSize:'20px'}}
        value={stockStatus}
        onChange={(e) => setStockStatus(e.target.value as "all" | "in" | "out")}
      >
        <option value="all">All</option>
        <option value="in">In Stock</option>
        <option value="out">Out of Stock</option>
      </select>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
}



