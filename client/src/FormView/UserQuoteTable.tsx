import React from 'react';
import { priceFormat, qtyFormat } from '../context/utils';

import { useQuotebook } from '../context/hooks';


const UserQuoteTable = () => {
  const {
    userQuotes,
    cancelQuote,
  } = useQuotebook();

  return (
    <table>
      <thead>
        <tr>
          <td>Bond Name</td>
          <td>Type</td>
          <td>Qty</td>
          <td>Price</td>
          <td>Client</td>
          <td>Cancel</td>
        </tr>
      </thead>
      <tbody>
      {userQuotes.map(({ clientName, requestId, bondName, side, qty, price, quoteId }) => {
        return (
          <tr key={requestId}>
            <td>{bondName}</td>
            <td>{side === 'B' ? 'Buy' : 'Sell'}</td>
            <td>{qtyFormat(qty)}</td>
            <td>{priceFormat(price)}</td>
            <td>{clientName}</td>
            <td>
              <button onClick={() => cancelQuote(quoteId)} type="button">
              Cancel
              </button>
            </td>
          </tr>
        )
      })}
      </tbody>
    </table>
  )

}

export default UserQuoteTable;
