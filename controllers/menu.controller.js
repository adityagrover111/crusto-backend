const Menu = require("../models/menu.model");
const getMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json({ data: menuItems });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getMenu };
