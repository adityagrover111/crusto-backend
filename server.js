const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const menuRoute = require("./routes/menu.route");
const orderRoutes = require("./routes/order.routes");
const cors = require("cors");
const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api", menuRoute);
app.use("/api", orderRoutes);
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Failed MongoDB connection", err.message);
  });
