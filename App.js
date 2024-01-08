import "./styles.css";
import React, { useState } from "react";
import data from "./data.json";

interface Token {
  name: string;
  decimals: number;
  address: string;
  img: string;
  ticker: string;
}
interface Pair {
  tokenOne: Token;
  tokenTwo: Token;
}
interface Exchange {
  [exhange: string]: Pair[];
}

interface Network {
  [chainID: number]: Exchange[];
}
export default function App() {
  const [selectedChain, setSelectedChain] = useState("");
  const [selectedExchange, setSelectedExchange] = useState("");
  const [selectedPair, setSelectedPair] = useState("");
  const set = new Set();

  const handleChainChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setSelectedChain(event.target.value);
    setSelectedExchange("");
    setSelectedPair("");
  };

  const handleExchangeChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setSelectedExchange(event.target.value);
    setSelectedPair("");
  };

  const handlePairChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
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
            data[selectedChain][selectedExchange].map(
              (pair: Pair, index: number) => {
                const pairKey = `${pair.tokenOne.address}-${pair.tokenTwo.address}`;
                const pairKey2 = `${pair.tokenTwo.address}-${pair.tokenOne.address}`;
                if (!set.has(pairKey) && !set.has(pairKey2)) {
                  set.add(pairKey);
                  return (
                    <option key={index} value={index}>
                      {pair.tokenOne.ticker}/{pair.tokenTwo.ticker}
                    </option>
                  );
                }
                return null;
              }
            )}
        </select>
      )}

      {selectedPair && (
        <div>
          <p>
            {data[selectedChain][selectedExchange][selectedPair].tokenOne.name}
          </p>
          <p>
            {data[selectedChain][selectedExchange][selectedPair].tokenTwo.name}
          </p>
          {/* Add other details as needed */}
        </div>
      )}
    </div>
  );
}
