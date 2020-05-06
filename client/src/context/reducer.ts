import { actionTypes } from './actions';
import { reduceBondQuotes, getBestBidsFromReducedBonds } from './utils';
import { BondsBy, QuoteBookPayload } from './types';


type QuoteBookActions = {
  type: string;
  payload: QuoteBookPayload;
}

export const quoteBookReducer = (state: BondsBy, action: QuoteBookActions): BondsBy => {
  switch (action.type) {
    case actionTypes.PROCESS_BOND_QUOTES:
      const { accountMaster, bondMaster, quotes } = action.payload;
      const bondsByName = reduceBondQuotes({ accountMaster, bondMaster, quotes });
      const bestBids = getBestBidsFromReducedBonds(bondsByName);
      return { nameKeys: bondsByName, bids: bestBids };

    default:
      return state;
  }
}
