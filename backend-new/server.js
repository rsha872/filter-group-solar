const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* Health Check */
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Filter Group Solar API is running"
  });
});

/* Quote Request */
app.post("/api/quote", (req, res) => {
  const {
    name,
    phone,
    email,
    city,
    systemSize,
    message
  } = req.body;

  console.log("New Quote Request:");
  console.log(req.body);

  if (!name || !phone || !city) {
    return res.status(400).json({
      success: false,
      message: "Name, phone and city are required"
    });
  }

  res.status(201).json({
    success: true,
    message: "Thank you! We will contact you soon."
  });
});

/* Start Server */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Filter Group Solar backend running on port ${PORT}`);
});