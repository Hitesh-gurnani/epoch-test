import { useState } from 'react';
import './App.css';
import data from './data.json';

function App() {
  const [selectedChain, setSelectedChain] = useState('');
  const [selectedExchange, setSelectedExchange] = useState('');
  const [selectedPair, setSelectedPair] = useState('');
  
  const handleChainChange = (event) => {
    setSelectedChain(event.target.value);
    setSelectedExchange('');
    setSelectedPair('');
  };

  const handleExchangeChange = (event) => {
    setSelectedExchange(event.target.value);
    setSelectedPair('');
  };

  const handlePairChange = (event) => {
    setSelectedPair(event.target.value);
  };

  return (
    <div className="App">
      <select onChange={handleChainChange} value={selectedChain}>
      <option value="">Select Chain</option>
        {Object.keys(data).map((chain) => (
          <option key={chain} value={chain}>
            {chain}
          </option>
        ))}
      </select>

      {selectedChain && (
        <select onChange={handleExchangeChange} value={selectedExchange}>
          <option value="">Select Exchange</option>
          {data[selectedChain] &&
            Object.keys(data[selectedChain]).map((exchange) => (
              <option key={exchange} value={exchange}>
                {exchange}
              </option>
            ))}
        </select>
      )}

      {selectedExchange && (
        <select onChange={handlePairChange} value={selectedPair}>
          <option value="">Select Pair</option>
          {data[selectedChain][selectedExchange] &&
            data[selectedChain][selectedExchange].map((pair, index) => (
              <option key={index} value={index}>
                {pair.tokenOne.ticker}/{pair.tokenTwo.ticker}
              </option>
            ))}
        </select>
      )}

      {selectedPair && (
        <div>
          <p>{data[selectedChain][selectedExchange][selectedPair].tokenOne.name}</p>
          <p>{data[selectedChain][selectedExchange][selectedPair].tokenTwo.name}</p>
          {/* Add other details as needed */}
        </div>
      )}
    </div>
  );
}

export default App;
