import React from "react";

const Navbar = ({ cartCount }) => (
  <nav className="navbar">
    <h1 className="logo">🛒 Vibe Commerce</h1>
    <div className="cart-indicator">Cart: {cartCount}</div>
  </nav>
);

export default Navbar;
