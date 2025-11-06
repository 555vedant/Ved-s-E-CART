import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 🏠 Home page */}
        <Route path="/" element={<Home />} />

        {/* 🛒 Cart component page */}
        <Route path="/cart" element={<Cart />} />

        {/* 💳 Checkout component page */}
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
};

export default App;
