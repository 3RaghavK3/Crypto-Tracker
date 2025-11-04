import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


app.get('/api/global', async (req, res) => {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/global`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Backend Error:', err.message);
    res.status(500).json({ error: 'failed to fetch data' });
  }
});


app.get('/api/market', async (req, res) => {
  const { page, perPage } = req.query;
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&precision=2`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Backend Error:', err.message);
    res.status(500).json({ error: 'failed to fetch data' });
  }
});


app.get('/api/trending', async (req, res) => {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/search/trending`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Backend Error: ', err.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


app.get('/api/coindetail', async (req, res) => {
  const { id } = req.query;
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    const data = await response.json();
    console.log(data);
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