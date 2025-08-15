const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemId: String,
  name: String,
  category: String,
  stock: Number,
  status: { 
        type: String, 
        enum: ['In Stock', 'Low Stock', 'Out of Stock'], 
        default: 'In Stock' },
  unit: String,
  last_updated: { type: Date, default: Date.now },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = { Inventory };