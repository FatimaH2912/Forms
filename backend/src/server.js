//Importing required modules
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const registrationRoutes = require("./routes/registration");

app.use("/api", registrationRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Form Validation API is running!"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});