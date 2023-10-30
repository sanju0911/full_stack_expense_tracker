const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (like HTML views)
//app.use(express.static("views"));

// Define your routes
app.use("/users", userRoutes);

app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
