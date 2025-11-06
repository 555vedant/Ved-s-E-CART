const express = require("express");
const router = express.Router();
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

// @POST /api/cart
router.post("/", async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // Check if the product already exists in the cart
    let existingItem = await CartItem.findOne({ product: productId });

    if (existingItem) {
      existingItem.qty += qty;
      await existingItem.save();
      return res.status(200).json(existingItem);
    }

    // Create a new item if not exists
    const newItem = new CartItem({
      product: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      qty,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding to cart" });
  }
});


// @GET /api/cart
router.get("/", async (req, res) => {
  try {
    const items = await CartItem.find().populate("product");
    const total = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
    res.json({ items, total });
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// @DELETE /api/cart/:id
router.delete("/:id", async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: "Error removing item" });
  }
});

// @POST /api/cart/checkout
router.post("/checkout", async (req, res) => {
  try {
    const { cartItems } = req.body;
    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);

    await CartItem.deleteMany(); // clear cart after checkout

    res.json({
      message: "Checkout successful",
      total,
      timestamp: new Date(),
    });
  } catch (err) {
    res.status(500).json({ message: "Error during checkout" });
  }
});

module.exports = router;
