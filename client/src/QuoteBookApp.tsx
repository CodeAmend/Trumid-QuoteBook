import React from 'react';
import { Container } from '@material-ui/core';
// import { useQuotebook } from './context/hooks'

function QuoteBookApp() {
  // const { lookupTables } = useQuotebook();
  console.count('count')

  return (
    <Container data-test="component-quotebookapp">
      <h1>Trumid - QuoteBook</h1>
    </Container>
  );
}

export default QuoteBookApp;
