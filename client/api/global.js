
export default async function  handler(req,res) {
     if(req.method=='GET'){
            try {
              const response = await fetch(`https://api.coingecko.com/api/v3/global`);
              const data=await response.json()
              res.status(200).json(data)
            } catch (err) {
              console.error('Backend Error:', err.message);
              res.status(500).json({ error: 'failed to fetch data' });
            }
        };
     }
    
