const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { queueData, departments ,beds} = require('./data.js');
const { Queue, Department } = require('./models/queue.js');
const { Bed } = require('./models/bed.js');
const path = require('path');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const queueRoutes = require('./routes/queue.js');
const bedRoutes = require('./routes/bed.js');

main().catch(err => console.log(err));

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Medicure');
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Root route
app.get('/', (req, res) => {
  res.redirect('/queue');
});

app.use('/queue', queueRoutes);
app.use('/beds', bedRoutes);
app.use('/inventory', require('./routes/inventory.js'));




 



app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
    }
);
