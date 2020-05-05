import React from 'react';
import { Container } from '@material-ui/core';
import { useQuotebook } from './context/hooks'


function QuoteBookApp() {
  const { updateQuoteBook, bestBidBuy } = useQuotebook();

  React.useEffect(() => {
    updateQuoteBook();
  }, [])

  // TODO: just for testing
  React.useEffect(() => {
    console.log(bestBidBuy)
  }, [bestBidBuy])

  return (
    <Container data-test="component-quotebookapp">
      <h1>Trumid - QuoteBook</h1>
    </Container>
  );
}

export default QuoteBookApp;
