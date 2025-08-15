const mongoose = require('mongoose');
// queue and department models
const { Queue, Department } = require('./models/queue');
const { queueData, departments, beds, inventoryData } = require('./data');
// bed model

const { Bed } = require('./models/bed');

const { Inventory } = require('./models/inventory'); 
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Medicure');

    console.log("Connected to MongoDB");
}




async function initDatabase() {
    await Queue.deleteMany({});
    await Department.deleteMany({});
    await Bed.deleteMany({});
       await Inventory.deleteMany({});
 
   
    
    await Queue.insertMany(queueData);
    await Department.insertMany(departments);
    await Bed.insertMany(beds);
    await Inventory.insertMany(inventoryData);
   
   
    
   
    }

initDatabase().then(() => {
    console.log("Initialization complete");
   
}
).catch(err => {
    console.error("Error initializing database:", err);
  
});



