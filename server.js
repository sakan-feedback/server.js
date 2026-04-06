const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());



app.post("/feedback", async (req, res) => {
  const { name, location, comments } = req.body;

  await pool.query(
    "INSERT INTO feedback (name, location, comments) VALUES ($1, $2, $3)",
    [name, location, comments]
  );

  res.json({ message: "Saved" });
});

});

app.get("/feedback", async (req, res) => {
  const result = await pool.query("SELECT * FROM feedback ORDER BY id DESC");
  res.json(result.rows);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
