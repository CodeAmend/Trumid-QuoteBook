import React from 'react';
import styled from 'styled-components';

import AllView from './AllView';
import BondView from './BondView';
import FormView from './FormView';


const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const QuoteBookApp = () => {
  return (
    <Container>
      <AllView />
    </Container>
  );
}

export default QuoteBookApp;
      // <FormView />
      // <BondView />
