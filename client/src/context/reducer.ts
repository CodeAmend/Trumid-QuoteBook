import { ReducerState, BondMaster, BondMasterKeyBook } from './types';
import { actionTypes } from './actions';
import {
  addNewQuoteToBook,
  updateQuoteOnBook,
  removeQuoteFromBook,
  createDepthOfBookTemplate,
  reconcileQuotebook,
} from './utils';


export const initialReducerState = {
  depthOfBook: [],
  accountMaster: [],
  bondMaster: [],
  latestBondId: '',
};

export const quoteBookReducer = (state: ReducerState, action: any): any => {
  const { payload } = action;

  switch (action.type) {
    case actionTypes.INITIALIZE_ACCOUNT_MASTER:
      return { ...state, accountMaster: payload }

    case actionTypes.INITIALIZE_BOND_MASTER:
      const bondMasterKeyBook = payload
        .reduce((acc: BondMasterKeyBook, item: BondMaster, index: number) => {
          acc[item.id] = index;
          return acc;
        }, {});
      return { ...state, bondMaster: payload, bondMasterKeyBook }

    case actionTypes.INITIALIZE_DEPTH_OF_BOOK:
      const depthOfBook = createDepthOfBookTemplate(action.payload);
      return { ...state, depthOfBook };

    case actionTypes.RECONCILE_QUOTEBOOK:
      return {
        ...state,
        depthOfBook: reconcileQuotebook(state, payload),
      }

    case actionTypes.QUOTE_CREATE:
      addNewQuoteToBook(state, payload);
      return { ...state, latestBondId: payload.bondId }

    case actionTypes.QUOTE_UPDATE:
      updateQuoteOnBook(state, payload);
      return { ...state, latestBondId: payload.bondId }

    case actionTypes.QUOTE_CANCEL:
      removeQuoteFromBook(state, payload);
      return { ...state, latestBondId: payload.bondId }

    default:
      return state;
  }
}
