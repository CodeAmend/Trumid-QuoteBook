import React from 'react';
import { Container } from '@material-ui/core';
import { useQuotebook } from './context/hooks';
import { BestBidBuy } from './context/types';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%; 
  border-collapse: collapse; 

  tr:nth-of-type(odd) { 
    background: #eee; 
  }
  th { 
    background: #333; 
    color: white; 
    font-weight: bold; 
  }
  td, th { 
    padding: 6px; 
    border: 1px solid #ccc; 
    text-align: left; 
  }
}
`;


function QuoteBookApp() {
  const { updateQuoteBook, bestBidBuy } = useQuotebook();

  React.useEffect(() => {
    updateQuoteBook();
  }, [])

  // TODO: just for testing
  React.useEffect(() => {
    if (bestBidBuy) {
    }
  }, [bestBidBuy])

  return (
    <Container data-test="component-quotebookapp">
      <h1>Trumid - QuoteBook</h1>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Bid</th>
            <th></th>
            <th></th>
            <th>Offer</th>
            <th></th>
          </tr>
          <tr>
            <th>Bond</th>
            <th>Client</th>
            <th>Qty</th>
            <th>Bid</th>
            <th>Offer</th>
            <th>Qty</th>
            <th>Client</th>
          </tr>
        </thead>
        <tbody>
        {/* TODO: Why do I need to add this Interface here??? Bug?? */}
          {bestBidBuy && bestBidBuy.map(({ bondName, bid, offer }: BestBidBuy) => (
            <tr key={bondName}>
              <td>{bondName}</td>
              <td>{bid?.client}</td>
              <td>{bid?.qty}</td>
              <td>{bid?.price}</td>
              <td>{offer?.price}</td>
              <td>{offer?.qty}</td>
              <td>{offer?.client}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default QuoteBookApp;
