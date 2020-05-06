import { actionTypes } from './actions';
import { reduceBondQuotes, getBestBidsFromReducedBonds } from './utils';
// import { BondsBy, QuoteBookPayload } from './types';


export const quoteBookReducer = (state: any, action: any): any => {
  // console.log(action.type, action.payload)
  switch (action.type) {
    case actionTypes.UPDATE_ACCOUNT_MASTER_WITH:
      return { ...state, accountMaster: action.payload};

    case actionTypes.UPDATE_BOND_MASTER_WITH:
      return { ...state, bondMaster: action.payload};

    case actionTypes.UPDATE_QUOTE_BOOK:
      return { ...state, quoteBook: action.payload};

    case actionTypes.PROCESS_BOND_QUOTES:
      const quotes = action.payload;
      const { accountMaster, bondMaster } = state;
      const bondsByName = reduceBondQuotes({ accountMaster, bondMaster, quotes });
      const bestBids = getBestBidsFromReducedBonds(bondsByName);
      const bondsBy = { nameKeys: bondsByName, bids: bestBids };
      return { ...state, bondsBy };
    default:
      return state;
  }
}
