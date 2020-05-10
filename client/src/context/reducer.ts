import { ReducerState, DepthOfBook, BondMaster, BondQuote } from './types';
import { actionTypes } from './actions';
import {
  addNewQuoteToBook,
  updateQuoteOnBook,
  removeQuoteFromBook,
} from './utils';


export const quoteBookReducer = (state: ReducerState, action: any): any => {
  const { payload } = action;

  switch (action.type) {
    case actionTypes.QUOTE_CREATE:
      addNewQuoteToBook(state, payload);
      return { ...state, latestBondId: payload.bondId }

    case actionTypes.QUOTE_UPDATE:
      updateQuoteOnBook(state, payload);
      return { ...state, latestBondId: payload.bondId }

    case actionTypes.QUOTE_CANCEL:
      removeQuoteFromBook(state, payload);
      return { ...state, latestBondId: payload.bondId }

    case actionTypes.INITIALIZE_ACCOUNT_MASTER:
      return { ...state, accountMaster: payload }

    case actionTypes.INITIALIZE_BOND_MASTER:
      return { ...state, bondMaster: payload }

    case actionTypes.RECONCILE_QUOTEBOOK:
      payload.forEach((quote: BondQuote) => {
        addNewQuoteToBook(state, quote);
      })
      return state

    case actionTypes.INITIALIZE_DEPTH_OF_BOOK:
      const depthOfBook = payload.reduce((acc: DepthOfBook, bondItem: BondMaster) => {
        acc[bondItem.id] = {
          bondId: bondItem.id,
          bondName: bondItem.name,
          bids: [],
          offers: [],
        };
        return acc;
      }, {});
      return { ...state, depthOfBook };

    default:
      return state;
  }
}
