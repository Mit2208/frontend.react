import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../public/header/header';
import FooterPage from '../public/footer/footer';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "bootstrap-icons/font/bootstrap-icons.css";

import './App.css';

function App() {
  const [portfolio, setPortfolio] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [stockData, setStockData] = useState({});

  // Fetch portfolio on mount
  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    const response = await axios.get('http://localhost:5000/api/portfolio');
    setPortfolio(response.data);
    updateStockPrices(response.data);
  };

  const updateStockPrices = async (portfolioItems) => {
    const updatedData = {};
    for (const item of portfolioItems) {
      const response = await axios.get(`http://localhost:5000/api/stock/${item.symbol}`);
      updatedData[item.symbol] = response.data.price;
    }
    setStockData(updatedData);
  };

  const addStock = async (e) => {
    e.preventDefault();
    const newStock = { symbol, quantity: Number(quantity), purchasePrice: Number(purchasePrice) };
    await axios.post('http://localhost:5000/api/portfolio', newStock);
    setPortfolio([...portfolio, newStock]);
    setSymbol('');
    setQuantity('');
    setPurchasePrice('');
    updateStockPrices([...portfolio, newStock]);
  };

  const calculateProfitLoss = (stock) => {
    const currentPrice = stockData[stock.symbol] || stock.purchasePrice;
    const value = stock.quantity * currentPrice;
    const cost = stock.quantity * stock.purchasePrice;
    return (value - cost).toFixed(2);
  };

  return (
    <> 
    <Header/>
    <div className="d-flex flex-column">
    {/* <h1 className="text-center mt-0">Welcome to My Website</h1> */}
    </div>
    <main className="flex-grow-1">
        {/* Your main content goes here */}
        <div className="container">
          <h1 className='text-center my-2'>Welcome to My App</h1>
        </div>
      </main>

    <div className="App">
    <h1>Indian Stock Portfolio Tracker</h1>
    <form onSubmit={addStock}>
      <input
        type="text"
        placeholder="Stock Symbol (e.g., RELIANCE)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="number"
        placeholder="Purchase Price"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
      />
      <button type="submit">Add Stock</button>
    </form>

    <h2>Your Portfolio</h2>
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Quantity</th>
          <th>Purchase Price</th>
          <th>Current Price</th>
          <th>Profit/Loss</th>z
          <th>Action</th>
          <th>Delete</th>
          <th>Edit</th>
          <th>chart</th>
        </tr>
      </thead>
      <tbody>
        {portfolio.map((stock, index) => (
          <tr key={index}>
            <td>{stock.symbol}</td>
            <td>{stock.quantity}</td>
            <td>₹{stock.purchasePrice}</td>
            <td>₹{stockData[stock.symbol] || 'Loading...'}</td>
            <td>{calculateProfitLoss(stock) >= 0 ? '+' : ''}₹{calculateProfitLoss(stock)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <FooterPage/>

  </>
)
}  
  
export default App;