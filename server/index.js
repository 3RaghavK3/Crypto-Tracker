import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

import { Redis } from '@upstash/redis'
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());


app.get('/api/global', async (req, res) => { //10 min ttl
  try {
    const cache_key = "global_data"
    const cached = await redis.get(cache_key)
    if (cached) return res.json(cached)

    const response = await fetch(`https://api.coingecko.com/api/v3/global?x_cg_demo_api_key=${process.env.CRYPTO_API_KEY}`);
    const data = await response.json();

    await redis.set(cache_key, data, { ex: 600 })
    res.status(200).json(data);
  } catch (err) {
    console.error('Backend Error:', err.message);
    res.status(500).json({ error: 'failed to fetch data' });
  }
});


app.get('/api/market', async (req, res) => { //5 min ttl
  const { page } = req.query;

  try {
    const cache_key = `market_data_${page}`
    const cached = await redis.get(cache_key)
    if (cached) return res.json(cached)

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&precision=2&x_cg_demo_api_key=${process.env.CRYPTO_API_KEY}`
    );
    const data = await response.json();
    await redis.set(cache_key, data, { ex: 300 })
    res.status(200).json(data);
  } catch (err) {
    console.error('Backend Error:', err.message);
    res.status(500).json({ error: 'failed to fetch data' });
  }
});


app.get('/api/trending', async (req, res) => { //10 min ttl
  try {
    const cache_key = "trending_data"
    const cached = await redis.get(cache_key)
    if (cached) return res.json(cached)
    const response = await fetch(`https://api.coingecko.com/api/v3/search/trending?x_cg_demo_api_key=${process.env.CRYPTO_API_KEY}`);
    const data = await response.json();
    await redis.set(cache_key, data, { ex: 600 });
    res.status(200).json(data);
  } catch (err) {
    console.error('Backend Error: ', err.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


app.get('/api/coindetail', async (req, res) => { //4min ttl
  const { id } = req.query;

  try {
    const cache_key = `coin_detail_${id}`
    const cached = await redis.get(cache_key)
    if (cached) return res.json(cached)

    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=${process.env.CRYPTO_API_KEY}`);

    const data = await response.json();
    await redis.set(cache_key, data, { ex: 300 });
    res.status(200).json(data);
  } catch (err) {
    console.log('Backend Error: ', err.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});