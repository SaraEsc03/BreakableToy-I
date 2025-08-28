import { useState } from "react";
import { createProduct } from "../services/productService";

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

export default function ProductForm({ onClose, onCreated }: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantityInStock, setQuantityInStock] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      name,
      category,
      price: parseFloat(price),
      quantityInStock: parseInt(quantityInStock),
      expirationDate: expirationDate || null,
    };

    try {
      await createProduct(newProduct);
      onCreated();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error creating product");
    }
  };

  return (
    // Overlay
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose} 
    >
      {}
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          minWidth: "300px",
          maxWidth: "500px",
        }}
        onClick={(e) => e.stopPropagation()} 
      >
        <h3>Create New Product</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required />
          <input placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
          <input placeholder="Quantity in Stock" type="number" value={quantityInStock} onChange={e => setQuantityInStock(e.target.value)} required />
          <input placeholder="Expiration Date" type="date" value={expirationDate} onChange={e => setExpirationDate(e.target.value)} />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}