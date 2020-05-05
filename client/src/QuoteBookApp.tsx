import React from 'react';
import QuoteForm from './QuoteForm'
import { Container } from '@material-ui/core';

function QuoteBookApp() {
  return (
    <Container data-test="component-quotebookapp">
      <h1>Trumid - QuoteBook</h1>
      <QuoteForm />
    </Container>
  );
}

export default QuoteBookApp;
