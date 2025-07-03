
export default async function  handler(req,res) {
     if(req.method=='GET'){
          const { id } = req.query;
            try {
              const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
              const data=await response.json()
              console.log(data)
              res.status(200).json(data)
            } catch (err) {
              console.log('Backend Error: ', err.message);
              res.status(500).json({ error: 'Failed to fetch data' });
            }
        };
     }
    
