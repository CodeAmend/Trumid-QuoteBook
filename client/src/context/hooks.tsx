import React from 'react';
import quoteBookContext from '.';
import {
  IUseQuoteBook,
  BestBidBuy,
  ReplaceQuote,
  CreateQuote,
  CancelQuote,
} from './types';
import { reduceBondQuotes, getBestBidsFromReducedBonds } from './utils';

export const useQuotebook = (): IUseQuoteBook => {
  const {
    socket,
    lookupTables,
    quoteBook,
  } = React.useContext(quoteBookContext.context)

  const updateQuoteBook = (): void => {
    socket.emit('quoteBook.snapshot');
  }

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
      bondId: lookupTables.bonds[0].id,
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


  const bestBidBuy: BestBidBuy[] = React.useMemo(() => {
    
    if ( !quoteBook.length || !lookupTables.bonds.length || !lookupTables.accounts.length) {
     return [];
    }

    // Reduce by BOND NAME keys
    const reducedBonds = reduceBondQuotes(quoteBook, lookupTables);
    // Reduce by best bids / buys
    const bestBids = getBestBidsFromReducedBonds(reducedBonds);

    return bestBids;
  }, [quoteBook, lookupTables]);

  return {
    lookupTables,
    updateQuoteBook,
    quoteBook,
    bestBidBuy,
    subscribeToQuotes,
    unsubscribeFromQuotes,
    createQuote,
    replaceQuote,
    cancelQuote,
  }
}

export default { useQuotebook };
