const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const menuRoute = require("./routes/menu.route");
const orderRoutes = require("./routes/order.routes");
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://crusto.vercel.app" && "http://localhost:5173/",
  })
);

//routes
app.use("/api", menuRoute);
app.use("/api", orderRoutes);
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed MongoDB connection", err.message);
  });
