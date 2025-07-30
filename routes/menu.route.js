const express = require("express");
const { getMenu } = require("../controllers/menu.controller");
const router = express.Router();

router.get("/menu", getMenu);

module.exports = router;
