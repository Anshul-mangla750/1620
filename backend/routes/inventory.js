const express = require('express');
const router = express.Router();
const { Inventory } = require('../models/inventory.js');

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    const totalItems = inventory.length;
    const lowStockItems = inventory.filter(i => i.status === 'Low Stock').length;
    const outOfStockItems = inventory.filter(i => i.status === 'Out of Stock').length;
    const recentAdditions = inventory.filter(i => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return i.createdAt >= sevenDaysAgo;
    }).length;
    res.render('inventory.ejs', {
      inventory,
      totalItems,
      lowStockItems,
      outOfStockItems,
      recentAdditions,
      title: "Inventory management"
    });
  } catch (err) {
    console.error("Error fetching inventory:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Render Add New Item form
router.get('/new', (req, res) => {
  res.render('newInventory.ejs',{title: "Inventory management"});
});

// Add New Item
router.post('/', async (req, res) => {
  try {
    const { itemId, name, category, stock, status, unit } = req.body;
    const newItem = new Inventory({
      itemId,
      name,
      category,
      stock,
      status,
      unit,
      last_updated: new Date(),
      createdAt: new Date()
    });
    await newItem.save();
    res.redirect('/inventory');
  } catch (err) {
    console.error("Error adding inventory item:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Render Edit Item form
router.get('/:id/edit', async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).send("Item not found");
    res.render('editInventory.ejs', { item });
  } catch (err) {
    console.error("Error fetching inventory item:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Update Item
router.put('/:id', async (req, res) => {
  try {
    const { itemId, name, category, stock, status, unit } = req.body;
    await Inventory.findByIdAndUpdate(req.params.id, {
      itemId,
      name,
      category,
      stock,
      status,
      unit,
      last_updated: new Date()
    });
    res.redirect('/inventory');
  } catch (err) {
    console.error("Error updating inventory item:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Item
router.delete('/:id', async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.redirect('/inventory');
  } catch (err) {
    console.error("Error deleting inventory item:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
