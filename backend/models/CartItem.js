const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },   
  price: { type: Number, required: true },  
  image: { type: String },                  
  qty: { type: Number, required: true, default: 1 }
});

module.exports = mongoose.model("CartItem", cartItemSchema);
