import React from 'react';
import quoteBookContext from '.';
import { IUseQuoteBook, BestBidBuy } from './types';
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
  }
}

export default { useQuotebook };
