import { useState, useEffect } from "react";
import { updateProduct } from "../services/productService";

interface Props {
  product: any; // product object to edit
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditProductForm({ product, onClose, onUpdated }: Props) {
  const [name, setName] = useState(product.name || "");
  const [category, setCategory] = useState(product.category || "");
  const [price, setPrice] = useState(product.price?.toString() || "");
  const [quantityInStock, setQuantityInStock] = useState(product.quantityInStock?.toString() || "");
  const [expirationDate, setExpirationDate] = useState(product.expirationDate || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct = {
      name,
      category,
      price: parseFloat(price),
      quantityInStock: parseInt(quantityInStock),
      expirationDate: expirationDate || null,
    };

    try {
      await updateProduct(product.id, updatedProduct);
      onUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error updating product");
    }
  };

  return (
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
        <h3>Edit Product</h3>
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
