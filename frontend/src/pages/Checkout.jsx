import React, { useState } from "react";
import "./Checkout.css";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    card: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(" Order placed successfully!");
    setFormData({ name: "", address: "", card: "" });
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          required
          value={formData.address}
          onChange={handleChange}
        />

        <label>Card Details</label>
        <input
          type="text"
          name="card"
          required
          placeholder="XXXX-XXXX-XXXX-XXXX"
          value={formData.card}
          onChange={handleChange}
        />

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
