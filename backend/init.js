const mongoose = require('mongoose');
// queue and department models
const { Queue, Department } = require('./models/queue');
const { queueData} = require('./data');
const {departments} = require('./data');
// bed model

const { Bed } = require('./models/bed');

const { beds } = require('./data');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Medicure');

    console.log("Connected to MongoDB");
}




async function initDatabase() {
    await Queue.deleteMany({});
    await Department.deleteMany({});
    await Bed.deleteMany({});
    
    await Queue.insertMany(queueData);
    await Department.insertMany(departments);
    await Bed.insertMany(beds);
    
   
    }

initDatabase().then(() => {
    console.log("Initialization complete");
   
}
).catch(err => {
    console.error("Error initializing database:", err);
  
});

