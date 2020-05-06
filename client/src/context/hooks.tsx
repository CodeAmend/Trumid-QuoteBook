import React from 'react';
import quoteBookContext from '.';
import {
  IUseQuoteBook,
  ReplaceQuote,
  CreateQuote,
  CancelQuote,
} from './types';


export const useQuotebook = (): IUseQuoteBook => {
  const {
    socket,
    bondsBy,
    accountMaster,
    bondMaster,
  } = React.useContext(quoteBookContext.context)

  // console.log({ bondsBy })

  // const bondsBy = React.useMemo(() => {
  //   if (accountMaster.length && bondMaster.length) {
  //     const bondsByName = reduceBondQuotes({ accountMaster, bondMaster, quotes: quoteBook });
  //     const bestBids = getBestBidsFromReducedBonds(bondsByName);
  //     return { nameKeys: bondsByName, bids: bestBids };
  //   }
  //   return {
  //     nameKeys: {},
  //     bids: [],
  //   }
  // }, [accountMaster, bondMaster]);

  const updateQuoteBook = (): void => {
    // TODO: an embarrising hack until I find a simple solution for guided async calls
    setTimeout(() => {
      socket.emit('quoteBook.snapshot');
    }, 500);
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
    updateQuoteBook,
    bondsBy,
    subscribeToQuotes,
    unsubscribeFromQuotes,
    createQuote,
    replaceQuote,
    cancelQuote,
    masterAreReady: !!(accountMaster.length && bondMaster.length),
  }
}

export default { useQuotebook };
