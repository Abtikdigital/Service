const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config(); // For API key from .env

const app = express();
const PORT = 5000;

app.use(cors());

// Endpoint to get news
app.get("/api/news", async (req, res) => {
  console.log("data fetchingg");
  const category = req.query.category || "general";
  const page = req.query.page || 1;

  const apiKey = process.env.NEWS_API_KEY;
  const url = ` https://newsdata.io/api/1/latest?apikey=pub_840941268a9ce0df0cc7275ad85e1bb3e302f&country=in&category=business`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching news", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
