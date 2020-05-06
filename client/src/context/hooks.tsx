import React from 'react';
import { actions } from './actions';
import quoteBookContext from '.';
import {
  QuoteBookHooks,
  ReplaceQuote,
  CreateQuote,
  CancelQuote,
} from './types';


export const useQuotebook = (): QuoteBookHooks => {
  const {
    socket,
    dispatch,
  } = React.useContext(quoteBookContext.context)

  const subscribeToQuotes = (): void => {
    socket.emit('quoteBook.subscribe');
  }

  const unsubscribeFromQuotes = (): void => {
    socket.emit('quoteBook.unsubscribe');
  }

  const createQuote = (request: CreateQuote) => {
    request =  {
      requestId: Math.random().toString(36).substr(2, 5),
      accountId: 0,
      bondId: 'sdfd', // lookupTables.bonds[0].id,
      side: 'B',
      price: 99.975,
      qty: 1000000
    };
    console.log("Outgoing: quote.create", request);
    socket.emit('quote.create', request);
  }

  const replaceQuote = (request: ReplaceQuote) => {
    request = {
      requestId: Math.random().toString(36).substr(2, 5),
      quoteId: 'dsafwr', // currentQuote.id,
      price: 99.975,
      qty: 1000000
    };
    console.log("Outgoing: quote.replace", request);
    socket.emit('quote.replace', request);
  }

  const cancelQuote = () => {
    const request: CancelQuote = {
      requestId: Math.random().toString(36).substr(2, 5),
      quoteId: 'fsfsd', // currentQuote.id
    };
    socket.emit('quote.cancel', request);
  }

  return {
    subscribeToQuotes,
    unsubscribeFromQuotes,
    createQuote,
    replaceQuote,
    cancelQuote,
  }
}

export default { useQuotebook };
