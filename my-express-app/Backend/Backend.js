const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'your_database'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});


// Replace with your Alpha Vantage API key
const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

// Endpoint to fetch stock data
app.get('/api/stock/:symbol', async (req, res) => {
  const { symbol } = req.params;
  try {
    const response = await axios.get(
      `${BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}.NS&interval=5min&apikey=${API_KEY}`
    );
    const data = response.data['Time Series (5min)'];
    if (!data) throw new Error('No data found');
    const latestTime = Object.keys(data)[0];
    const latestPrice = data[latestTime]['4. close'];
    res.json({ symbol, price: latestPrice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to manage portfolio (mock storage for simplicity)
let portfolio = [];
app.get('/api/portfolio', (req, res) => res.json(portfolio));
app.post('/api/portfolio', (req, res) => {
  const { symbol, quantity, purchasePrice } = req.body;
  portfolio.push({ symbol, quantity, purchasePrice });
  res.status(201).json(portfolio);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));