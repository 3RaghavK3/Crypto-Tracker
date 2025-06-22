import e from "express";
import cors from "cors";
import { fetchData } from "../api/fetchdata.js";

const app=e();
const port=3000;


const links={
     market:"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
     trending:"https://api.coingecko.com/api/v3/search/trending",
     global:"https://api.coingecko.com/api/v3/global",

}

app.use(cors());


app.get("/get/:id", async (req, res) => {
  const path=req.params.id;
  try {
    const data = await fetchData(links[path]);
    res.json(data);
  } catch (err) {
    console.error("Backend Error:", err.message);
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})