import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      const res = await fetch("http://localhost:4000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id, qty: 1 }),
      });

      if (res.ok) {
        setCartMessage(`✅ ${product.name} added to cart!`);
        setTimeout(() => setCartMessage(""), 2000);
      }
    } catch {
      alert("Failed to add item to cart!");
    }
  };

  return (
    <div className="home">
      <nav className="navbar">
        <h1 className="logo">🛒 Ved's E-Commerce</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
        </div>
      </nav>

      <section className="hero">
        <h2>Trending Products</h2>
        <p>Find your — fashion, comfort, and style in one place.</p>
        <Link to="/cart" className="view-cart-btn">View Cart</Link>
      </section>

      {cartMessage && <div className="cart-alert">{cartMessage}</div>}

      {loading ? (
        <p className="loading">Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} addToCart={addToCart} />
          ))}
        </div>
      )}

      <footer className="footer">
        <p>© {new Date().getFullYear()} Vedant E-Commerce. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
