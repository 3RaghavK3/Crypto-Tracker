
export default async function  handler(req,res) {
     if(req.method=='GET'){
         const { page, perPage } = req.query;
          try {
            const response = await fetch(
              `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&precision=2`
            );
             const data=await response.json()
              res.status(200).json(data)
          } catch (err) {
            console.error('Backend Error:', err.message);
            res.status(500).json({ error: 'failed to fetch data' });
          }
        };
     }
    
