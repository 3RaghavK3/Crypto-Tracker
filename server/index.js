import express from 'express';
import cors from 'cors';
import fetchData from './fetchdata.js'


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/market', async (req, res) => {
  const page = req.query.page;
  const perPage = req.query.perPage;

  try {
    const data = await fetchData(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&precision=2`
    );
    res.json(data);
  } catch (err) {
    console.error('Backend Error:', err.message);
    res.status(500).json({ error: 'failed to fetch data' });
  }
});

app.get('/pingcg', async (req, res) => {
  try {
    const r = await fetch('https://api.coingecko.com/api/v3/ping');
    const txt = await r.text();
    res.send(txt); // 
  } catch (err) {
    res.send('Error: ' + err.message);
  }
});


app.get('/coindetail/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const data = await fetchData(`https://api.coingecko.com/api/v3/coins/${id}`);
    res.json(data);
  } catch (err) {
    console.error('Backend Error: ', err.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});
const links = {
  trending: 'https://api.coingecko.com/api/v3/search/trending',
  global: 'https://api.coingecko.com/api/v3/global',
};

app.get('/get/:id', async (req, res) => {
  const path = req.params.id;
  try {
      console.log("🔍 Fetching from URL:", links[path]); 
    const data = await fetchData(links[path]);
    res.json(data);
  } catch (err) {
    console.error('Backend Error:', err.message);
    res.status(500).json({ error: 'failed to fetch data' });
  }
})

app.get('/coinchart/:coin', async (req, res) => {
  const coin = req.params.coin;
  try {
    const data = await fetchData(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`
    );
    res.json(data);
  } catch (err) {
    console.error('Chart Fetch Error:', coin, err.message);
    res.status(500).json({ error: 'Chart fetch failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
