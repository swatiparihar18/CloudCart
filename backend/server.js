require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

let db;

async function startServer() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log("✅ MySQL Connected");

    app.post("/register", async (req, res) => {
      try {
        const { email, password } = req.body;

        await db.execute(
          "INSERT INTO users (email, password) VALUES (?, ?)",
          [email, password]
        );

        res.json({ message: "User registered" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
      }
    });

    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;

        const [rows] = await db.execute(
          "SELECT * FROM users WHERE email=? AND password=?",
          [email, password]
        );

        if (rows.length > 0) {
          res.json({ message: "Login successful" });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
      }
    });

    app.get("/", (req, res) => {
      res.send("CloudCart API Running");
    });

    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });

  } catch (err) {
    console.error("❌ MySQL Connection Error:", err);
  }
}

startServer();
