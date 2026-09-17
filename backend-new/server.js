require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT || 5432),
});

// Test database connection
pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("PostgreSQL connected successfully");
  })
  .catch((error) => {
    console.error("PostgreSQL connection failed:", error.message);
  });

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Filter Group Solar API is running",
  });
});

// Create quote
app.post("/api/quote", async (req, res) => {
  const {
    name,
    phone,
    email,
    city,
    systemSize,
    message,
  } = req.body;

  if (!name || !phone || !city) {
    return res.status(400).json({
      success: false,
      message: "Name, phone and city are required",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO quotes
       (name, phone, email, city, system_size, message)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        name,
        phone,
        email || null,
        city,
        systemSize || null,
        message || null,
      ]
    );

    console.log("New quote saved:", result.rows[0]);

    res.status(201).json({
      success: true,
      message: "Thank you! We will contact you soon.",
      quote: result.rows[0],
    });
  } catch (error) {
    console.error("Database error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to save quote request",
    });
  }
});

// Get all quotes
app.get("/api/quotes", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM quotes ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      count: result.rows.length,
      quotes: result.rows,
    });
  } catch (error) {
    console.error("Error fetching quotes:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch quotes",
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Filter Group Solar backend running on port ${PORT}`);
});
