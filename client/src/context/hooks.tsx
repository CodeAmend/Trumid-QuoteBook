import React from 'react';
import quoteBookContext from '.';
import { IUseQuoteBook } from './types';

export const useQuotebook = (): IUseQuoteBook => {
  const {
    socket,
    lookupTables,
    quoteBook,
  } = React.useContext(quoteBookContext.context)

  const updateQuoteBook = (): void => {
    socket.emit('quoteBook.snapshot');
  }

  return {
    lookupTables,
    updateQuoteBook,
    quoteBook,
  }
}

export default { useQuotebook };
