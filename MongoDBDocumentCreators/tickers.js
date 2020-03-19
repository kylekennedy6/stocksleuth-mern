const csv = require('csv-parser');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;


let tickers = [];

fs.createReadStream('Tickers/tickers.csv')
  .pipe(csv())
  .on('data', (row) => {
    const ticker = `${row["Ticker"]}`
    const company = `${row["Company"]}`
    tickers.push({
      "tickerText": ticker,
      "company": company,
      "transcripts": [],
      "eventReports": []
    })
  })
  .on('end', () => {
  })

const client = new MongoClient("*** YOUR MONGO CONNECT URL HERE ***", { useUnifiedTopology: true });

(async () => {
  await client.connect();
  const database = client.db("stocksleuth")
  const collection = database.collection("tickers");
  const insertMany = await collection.insertMany(tickers)
  client.close();
  })();
