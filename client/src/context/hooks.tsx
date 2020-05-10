import React from 'react';
import quoteBookContext from '.';
import {
  QuoteBookHooks,
  ReplaceQuote,
  CreateQuote,
  CancelQuote,
  DepthOfBook,
} from './types';

import { actions } from './actions';
import { keyGen } from './utils';


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
    bondViewData,
    dispatch,
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

  const initBondView = () => {
    dispatch(actions.updateBondView(selectedBond));
  }

  const selectedBondName = React.useMemo(() => {
    if (!selectedBond) {
      return '';
    }
    const bondIndex = bondMasterKeyBook[selectedBond]
    const bondName = bondMaster[bondIndex].name;
    return bondName;
  }, [selectedBond])

  return {
    bondViewData,
    createQuote,
    replaceQuote,
    cancelQuote,
    depthOfBook,
    selectedBond,
    setSelectedBond,
    bondMaster,
    accountMaster,
    getBookItemByBondId,
    latestBondId,
    userQuotes,
    bondMasterKeyBook,
    initBondView,
    selectedBondName,
  }
}

export default { useQuotebook };
