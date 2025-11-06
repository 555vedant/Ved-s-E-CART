const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const Product = require("./models/Product");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Seed products if database is empty
// Seed products if database is empty
async function seedProducts() {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany([
        {
          name: "T-Shirt",
          price: 199,
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrxhCU8b5THYZ3KUgl-qAqV-AQBQ4NiOS3nA&s"
        },
        {
          name: "Sneakers",
          price: 2999,
          image: "https://img.freepik.com/free-photo/fashion-shoes-sneakers_1203-7529.jpg"
        },
        {
          name: "Hoodie",
          price: 999,
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9yPbFBXrz0w2AH4Jr1vCP_dSFhpjByXNHWg&s"
        },
        {
          name: "Cap",
          price: 249,
          image: "https://media.istockphoto.com/id/1451763647/photo/blue-baseball-cap.jpg?s=612x612&w=0&k=20&c=OhaJCq02EKoc0G11ULclrVj8UwS0DyK2AY6l56I3NUw="
        },
        {
          name: "Backpack",
          price: 1599,
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBF9y7p7g3zexicmFR3JabKkDeuuVogYgeQQ&s"
        }
      ]);
      console.log("Default products seeded successfully with online images");
    }
  } catch (err) {
    console.error("Error seeding products:", err);
  }
}

seedProducts();

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Root route
app.get("/", (req, res) => res.send("🛒 Vibe Commerce API is running!"));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
