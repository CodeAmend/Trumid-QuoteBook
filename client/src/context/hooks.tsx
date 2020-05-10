import React from 'react';
import quoteBookContext from '.';
import { keyGen, getingSingleBondWithQuotes, getBondsWithBestQuotes } from './utils';
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
    latestBondId,
    userQuotes,
  } = React.useContext(quoteBookContext.context);

  const createQuote = (request: CreateQuote) => {
    const requestId = keyGen();
    console.log("Outgoing: quote.create", request, { requestId });
    socket.emit('quote.create', { ...request, requestId });
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
    bestBidOffer: getBondsWithBestQuotes(depthOfBook),
    latestBondId,
    userQuotes,
  }
}

export default { useQuotebook };
