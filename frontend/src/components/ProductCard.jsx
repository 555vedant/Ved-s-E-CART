import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="card">
      <div className="image-container">
        <img src={product.image} alt={product.name} className="card-img" />
      </div>

      <div className="card-details">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-price">₹{product.price}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
