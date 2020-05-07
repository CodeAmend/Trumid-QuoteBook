import React from 'react';
import QuoteTable from './QuoteTable';
import styled from 'styled-components';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const QuoteBookApp = () => {
  return (
    <Container>
      <h1>Trumid - QuoteBook</h1>
      <QuoteTable />
    </Container>
  );
}

export default QuoteBookApp;
