import { ReducerState, DepthOfBook, BondMaster, BondQuote } from './types';
import { actionTypes } from './actions';
import {
  addNewQuoteToBook,
  updateQuoteOnBook,
  removeQuoteFromBook,
} from './utils';


export const quoteBookReducer = (state: ReducerState, action: any): any => {
  let depthOfBook: DepthOfBook = state.depthOfBook;

  switch (action.type) {
    case actionTypes.QUOTE_CREATE:
      addNewQuoteToBook(state, action.payload);
      return { ...state }

    case actionTypes.QUOTE_UPDATE:
      updateQuoteOnBook(state, action.payload);
      return { ...state }

    case actionTypes.QUOTE_CANCEL:
      removeQuoteFromBook(state, action.payload);
      return { ...state }

    case actionTypes.INITIALIZE_ACCOUNT_MASTER:
      return { ...state, accountMaster: action.payload }

    case actionTypes.INITIALIZE_BOND_MASTER:
      return { ...state, bondMaster: action.payload }

    case actionTypes.INITIALIZE_DEPTH_OF_BOOK:
      depthOfBook = action.payload.reduce((acc: DepthOfBook, bondItem: BondMaster) => {
        acc[bondItem.id] = {
          bondId: bondItem.id,
          bondName: bondItem.name,
          bids: [],
          offers: [],
        };

        return acc;
      }, {});
      return { ...state, depthOfBook };

    case actionTypes.RECONCILE_QUOTEBOOK:
      action.payload.forEach((quote: BondQuote) => {
        addNewQuoteToBook(state, quote);
      })
      return { ...state, }

    default:
      return state;
  }
}
