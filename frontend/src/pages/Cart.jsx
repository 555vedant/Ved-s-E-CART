import React, { useEffect, useState } from "react";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/cart");
        const data = await res.json();
        // Ensure items is always a valid array
        setCartItems(Array.isArray(data.items) ? data.items : []);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);
  function goToCheckout() {
    window.location.href = "/checkout";
  }

  const removeItem = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/cart/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCartItems((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 1),
    0
  );

  const totalCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);

  if (loading) return <p className="loading">Loading your cart...</p>;

  return (
    <div className="cart-page">
      <h2>🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cartItems.map((item) => (
              <div className="cart-card" key={item._id}>
                <img src={item.image} alt={item.name} className="cart-img" />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p className="price">Price: ₹{item.price}</p>
                  <p className="qty">Quantity: {item.qty || 1}</p>
                  <p className="subtotal">
                    Subtotal: ₹{(item.price || 0) * (item.qty || 1)}
                  </p>
                  <button onClick={() => removeItem(item._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h3>Total Items: {totalCount}</h3>
            <h2>Total Amount: ₹{total}</h2>
            <button className="checkout-btn" onClick={goToCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
