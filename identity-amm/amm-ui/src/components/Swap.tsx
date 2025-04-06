import React, { useState } from 'react';
import './Swap.css'; // We'll create this file for component-specific styles

// Hardcoded token options for now
const TOKENS = ['ETH', 'USDC', 'MID'];

function Swap() {
  const [amountIn, setAmountIn] = useState('');
  const [amountOut, setAmountOut] = useState('');
  const [tokenIn, setTokenIn] = useState(TOKENS[0]); // Default to first token
  const [tokenOut, setTokenOut] = useState(TOKENS[1]); // Default to second token

  // Placeholder handlers - TODO: Implement actual logic
  const handleAmountInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmountIn = event.target.value;
    setAmountIn(newAmountIn);
    // TODO: Calculate estimated amountOut based on pool reserves, amountIn, tokenIn, tokenOut
    console.log(`Calculating output for ${newAmountIn} ${tokenIn} -> ${tokenOut}`);
    setAmountOut('...'); // Placeholder calculation
  };

  const handleTokenInChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTokenIn = event.target.value;
    setTokenIn(newTokenIn);
    // If the new input token is the same as the output token, swap the output token
    if (newTokenIn === tokenOut) {
      setTokenOut(TOKENS.find(t => t !== newTokenIn) || TOKENS[0]); // Find a different token
    }
    // TODO: Recalculate output amount based on new token
    console.log(`TokenIn changed to ${newTokenIn}. Recalculating...`);
    setAmountOut('...'); // Placeholder calculation
  };

  const handleTokenOutChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTokenOut = event.target.value;
    setTokenOut(newTokenOut);
    // If the new output token is the same as the input token, swap the input token
    if (newTokenOut === tokenIn) {
      setTokenIn(TOKENS.find(t => t !== newTokenOut) || TOKENS[0]); // Find a different token
    }
    // TODO: Recalculate output amount based on new token
    console.log(`TokenOut changed to ${newTokenOut}. Recalculating...`);
    setAmountOut('...'); // Placeholder calculation
  };

  const handleSwap = () => {
    console.log('Swapping:', { amountIn, tokenIn, tokenOut });
    // TODO: Call the API to perform the swap
    alert('Swap functionality not implemented yet.');
  };

  return (
    <div className="swap-container">
      <h2>Swap Tokens</h2>
      <div className="swap-input-group">
        <label>
          Input:
          <select value={tokenIn} onChange={handleTokenInChange}>
            {TOKENS.map(token => (
              <option key={token} value={token}>{token}</option>
            ))}
          </select>
          <input
            type="number"
            value={amountIn}
            onChange={handleAmountInChange}
            placeholder="0.0"
            min="0" // Ensure non-negative input
          />
        </label>
      </div>
      <div className="swap-input-group">
        <label>
          Output (Estimated):
          <select value={tokenOut} onChange={handleTokenOutChange}>
            {TOKENS.map(token => (
              <option key={token} value={token}>{token}</option>
            ))}
          </select>
          <input
            type="number"
            value={amountOut}
            readOnly // Output amount is usually calculated
            placeholder="0.0"
          />
        </label>
      </div>
      {/* Basic check to prevent swapping the same token */}
      <button onClick={handleSwap} disabled={!amountIn || tokenIn === tokenOut}>
        {tokenIn === tokenOut ? 'Select different tokens' : 'Swap'}
      </button>
    </div>
  );
}

export default Swap; 