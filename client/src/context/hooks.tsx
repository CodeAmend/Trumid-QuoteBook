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

  const createQuote = (request: CreateQuote): void => {
    const requestId = keyGen();
    console.log("Outgoing: quote.create", request, { requestId });
    socket.emit('quote.create', { ...request, requestId });
  }

  const replaceQuote = ({ quoteId, price, qty }: ReplaceQuote): void => {
    const request: ReplaceQuote = {
      requestId: keyGen(),
      quoteId,
      price,
      qty,
    };
    console.log("Outgoing: quote.replace", request);
    socket.emit('quote.replace', request);
  }

  const cancelQuote = (quoteId: string): void => {
    const request: CancelQuote = {
      requestId: keyGen(),
      quoteId,
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
