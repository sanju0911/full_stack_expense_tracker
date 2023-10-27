const User = require("../models/User");

exports.signup = (req, res) => {
  const { name, email, phone, password } = req.body;

  User.createUser(name, email, phone, password)
    .then((userId) => {
      console.log("User created with ID:", userId);
      res.json({ success: true, userId });
    })
    .catch((error) => {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "An error occurred" });
    });
};
