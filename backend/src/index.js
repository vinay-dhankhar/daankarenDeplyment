const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authController = require("./controllers/authController");

const app = express();
const port = 4000;
const bodyParser = require('body-parser');

const mongoURI = "mongodb+srv://12212109:ln1RzqZA38DYPyaC@daankaren.v2slarc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  socketTimeoutMS: 30000
})
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.error('MongoDB connection error:', error));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({ limit: '500mb' }));
// app.use(express.static(path.join(__dirname, "public")));

// Routes
app.post('/signup', authController.signup);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
