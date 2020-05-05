import React from 'react';
import quoteBookContext from '.';
import { IUseQuoteBook, IBestBidBuy } from './types';
import { processBestBidBuy } from './utils';

export const useQuotebook = (): IUseQuoteBook => {
  const {
    socket,
    lookupTables,
    quoteBook,
  } = React.useContext(quoteBookContext.context)

  const updateQuoteBook = (): void => {
    socket.emit('quoteBook.snapshot');
  }
  
  const bestBidBuy: IBestBidBuy = React.useMemo(() => {
    if ( !quoteBook.length ||
         !lookupTables.bonds.length ||
         !lookupTables.accounts.length
       ) return {};
    return processBestBidBuy(quoteBook, lookupTables);
  }, [quoteBook, lookupTables]);

  return {
    lookupTables,
    updateQuoteBook,
    quoteBook,
    bestBidBuy,
  }
}

export default { useQuotebook };
