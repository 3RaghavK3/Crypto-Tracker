import fetch from "node-fetch";
import dotenv from 'dotenv';
dotenv.config();


export default async function fetchData(url) {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0',
      'x-cg-demo-api-key': process.env.COINGECKO_API_KEY,
    
    },
  };

  
  if (!url) {
    console.error('Invalid path:', path);
    return res.status(400).json({ error: 'Invalid API endpoint requested.' });
  }
  return fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error(err));
}


