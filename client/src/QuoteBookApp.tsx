import React from 'react';
import { Container } from '@material-ui/core';
import { useQuotebook } from './context/hooks'


function QuoteBookApp() {
  const { updateQuoteBook, quoteBook } = useQuotebook();

  React.useEffect(() => {
    updateQuoteBook();
  }, [])


  // TODO: just for testing
  React.useEffect(() => {
    console.log(quoteBook)
  }, [quoteBook])

  return (
    <Container data-test="component-quotebookapp">
      <h1>Trumid - QuoteBook</h1>
    </Container>
  );
}

export default QuoteBookApp;
