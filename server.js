const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let feedbacks = []; // مؤقت (لاحقاً نربطه بقاعدة بيانات)

app.post("/feedback", (req, res) => {
  const data = req.body;
  feedbacks.push(data);
  console.log("New Feedback:", data);
  res.json({ message: "Feedback saved" });
});

app.get("/feedback", (req, res) => {
  res.json(feedbacks);
});
app.get("/", (req, res) => {
  res.send("SAKAN Feedback System is Running✅");
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
