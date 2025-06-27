import express from "express";
import cors from "cors";
import Bottleneck from "bottleneck";
import { fetchData } from "../api/fetchdata.js";

const app = express();
const port = 3000;

app.use(cors());

const links = {
  trending: "https://api.coingecko.com/api/v3/search/trending",
  global: "https://api.coingecko.com/api/v3/global",
};

app.get("/market", async (req, res) => {
  const page = req.query.page;
  const perPage = req.query.perPage;

  try {
    const data = await fetchData(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&precision=2`
    );
    res.json(data);
  } catch (err) {
    console.error("Backend Error:", err.message);
    res.status(500).json({ error: "failed to fetch data" });
  }
});

app.get("/get/:id", async (req, res) => {
  const path = req.params.id;
  try {
    const data = await fetchData(links[path]);
    res.json(data);
  } catch (err) {
    console.error("Backend Error:", err.message);
    res.status(500).json({ error: "failed to fetch data" });
  }
});

app.get("/coinchart/:coin", async (req, res) => {
  const coin = req.params.coin;
  try {
    const data = await fetchData(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`);
    res.json(data);
  } catch (err) {
    console.error("Chart Fetch Error:", coin, err.message);
    res.status(500).json({ error: "chart fetch failed" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
