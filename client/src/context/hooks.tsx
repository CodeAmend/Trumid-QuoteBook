import React from 'react';
import quoteBookContext from '.';
import { keyGen } from './utils';
import {
  QuoteBookHooks,
  ReplaceQuote,
  CreateQuote,
  CancelQuote,
  DepthOfBook,
} from './types';


export const useQuotebook = (): QuoteBookHooks => {
  const {
    socket,
    depthOfBook,
    selectedBond,
    setSelectedBond,
    bondMaster,
    bondMasterKeyBook,
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

  const getBookItemByBondId = (bondId: string): DepthOfBook => {
    const bookItemIndex = bondMasterKeyBook[bondId];
    return depthOfBook[bookItemIndex];
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
    getBookItemByBondId,
    // selectedBondData: getingSingleBondWithQuotes(depthOfBook, selectedBond),
    // bestBidOffer: getBondsWithBestQuotes(depthOfBook),
    latestBondId,
    userQuotes,
  }
}

export default { useQuotebook };
