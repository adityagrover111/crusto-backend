const express = require("express");
const router = express.Router();
const { getOrder, createOrder } = require("../controllers/order.controller");

router.post("/order", createOrder);
router.get("/order/:id", getOrder);

module.exports = router;
