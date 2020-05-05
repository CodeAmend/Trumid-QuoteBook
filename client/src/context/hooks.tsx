import React from 'react';
import quoteBookContext from '.';
import { IUseQuoteBook, QuoteAction } from './types';

export const useQuotebook = (): IUseQuoteBook => {
  const { socket, lookupTables } = React.useContext(quoteBookContext.context)

  // Websocket Listeners
  React.useEffect(() => {
    socket.on('quoteAction', (quoteAction: QuoteAction) => {
      console.log(quoteAction)
    });
  }, [])

  return {
    lookupTables,
  }
}

export default { useQuotebook };
