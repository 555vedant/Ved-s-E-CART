import React, { useEffect, useState } from "react";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  const addToCart = async (productId) => {
    const res = await fetch("http://localhost:4000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, qty: 1 }),
    });

    if (res.ok) {
      setCartMessage("✅ Added to cart!");
      setTimeout(() => setCartMessage(""), 2000);
    }
  };

  return (
    <div className="product-page">
      <h1>E-Ved's Store</h1>
      <p className="subtitle">Trendy gear for your everyday vibe</p>

      {cartMessage && <div className="cart-alert">{cartMessage}</div>}

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <button onClick={() => addToCart(product._id)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
