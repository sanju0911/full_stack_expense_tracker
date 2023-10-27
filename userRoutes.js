const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const User = require("../models/User");

// Define a new route for user signup
router.post("/insert", async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const result = await User.createUser(name, email, phone, password); // Assuming you have a createUser function in your User model
    res.json({ success: true, userId: result });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/", async (req, res) => {
  try {
    const reviews = await User.listAllReviews(); // Implement this method in your Review model
    res.json({ data: reviews });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Replace this with your actual authentication logic
  try {
    const result = await User.loginUser(username, password);
    res.json({ success: true, userId: result });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
