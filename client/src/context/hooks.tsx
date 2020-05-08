import React from 'react';
import quoteBookContext from '.';
import { getingSingleBondWithQuotes, getBondsWithBestQuotes } from './utils';
import {
  QuoteBookHooks,
  ReplaceQuote,
  CreateQuote,
  CancelQuote,
} from './types';


export const useQuotebook = (): QuoteBookHooks => {
  const {
    socket,
    depthOfBook,
    selectedBond,
    setSelectedBond,
    bondMaster,
    accountMaster,
    // bestBidOfferUpdate,
  } = React.useContext(quoteBookContext.context)

  const createQuote = (request: CreateQuote) => {
    request =  {
      ...request,
      requestId: Math.random().toString(36).substr(2, 5),
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
    createQuote,
    replaceQuote,
    cancelQuote,
    depthOfBook,
    selectedBond,
    setSelectedBond,
    bondMaster,
    accountMaster,
    selectedBondData: getingSingleBondWithQuotes(depthOfBook, selectedBond),
    bestBidOffer: getBondsWithBestQuotes(depthOfBook)
    // bestBidOfferUpdate,
  }
}

export default { useQuotebook };
