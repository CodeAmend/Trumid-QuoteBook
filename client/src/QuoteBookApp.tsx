import React from 'react';
import AllView from './AllView';
import styled from 'styled-components';
import { useQuotebook } from './context/hooks';
import BondView from './BondView';


const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuoteBookApp = () => {
  const { selectedBond } = useQuotebook();
  return (
    <Container>
      <h1>Trumid - QuoteBook</h1>
      {selectedBond ? <BondView /> : <AllView />}
    </Container>
  );
}

export default QuoteBookApp;
