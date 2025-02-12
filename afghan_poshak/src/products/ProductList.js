import React, { useEffect, useState } from "react";
import "./ProductList.css";

function ProductCard({ name, price, image }) {
  return (
    <div className="product-card">
      <div className="image-container">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <div className="product-price">${price}</div>
        <div className="button-group">
          <button className="btn">Add to Cart</button>
          <button className="btn">Save for Later</button>
        </div>
      </div>
    </div>
  );
}

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://127.0.0.1:8000/products/products/");
        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const shoes = filteredProducts.filter((product) => product.category === "shoes");
  const clothing = filteredProducts.filter((product) => product.category === "clothing");

  return (
    <div className="product-container">
      <input
        type="text"
        placeholder="Search products..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="section">
        <h2 className="section-title">Shoes</h2>
        <div className="scroll-container">
          {shoes.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Clothing</h2>
        <div className="scroll-container">
          {clothing.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
