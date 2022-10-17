const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

// Serve static files from the React app & CORS & Apply middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.resolve("uploads")));

// Init very First Route for App
app.get("/", (req, res) => {
  res.sendFile(path.resolve("views/index.html"));
});

/* Listen App */
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
