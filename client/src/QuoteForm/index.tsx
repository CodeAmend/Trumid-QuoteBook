import React from "react"
import styled from 'styled-components'

const InputGroup = styled.section`
  display: flex;
  flex-direction: columns;
`;

function VoiceTraderQuoteForm(){
  return(
    <InputGroup data-test='component-quoteform'>
      <p>Quote Form</p>
      <input data-test="input-bondid" />
      <input data-test="input-accountid" />
      <input data-test="input-qty" />
      <input data-test="input-side" />
      <input data-test="input-price" />
    </InputGroup>
  );
}

export default VoiceTraderQuoteForm
