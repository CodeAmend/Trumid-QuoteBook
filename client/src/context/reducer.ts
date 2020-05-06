import { actionTypes } from './actions';
import { reduceBondQuotes, getBestBidsFromReducedBonds } from './utils';
import { BondsByBondIdKey, BondQuote, AccountMaster, BondMaster } from './types';


interface GlobalState {
  bondIdKeyValues: BondsByBondIdKey;
  bestBids: [];
  currentQuote: BondQuote;
  quoteBook: BondQuote[];
  accountMaster: AccountMaster[];
  bondMaster: BondMaster[];
}

export const quoteBookReducer = (state: GlobalState, action: any): any => {
  // console.log(action.type, action.payload)

  switch (action.type) {
    // case actionTypes.QUOTE_CREATE:
    //   console.log(action.type)
    //   return {};

    // case actionTypes.QUOTE_UPDATE:
    //   console.log(action.type)
    //   break;

    // case actionTypes.QUOTE_CANCEL:
    //   console.log(action.type)
    //   break;

    case actionTypes.UPDATE_ACCOUNT_MASTER_WITH:
      return { ...state, accountMaster: action.payload};

    case actionTypes.UPDATE_BOND_MASTER_WITH:
      return { ...state, bondMaster: action.payload};

    case actionTypes.UPDATE_QUOTE_BOOK:
      return { ...state, quoteBook: action.payload};

    case actionTypes.PROCESS_BOND_QUOTES:
      const { accountMaster, bondMaster } = state;

      // Creates object with bonds names as keys AND marries the master tables data
      const bondsByName = reduceBondQuotes({
        quotes: action.payload,
        bondMaster,
        accountMaster,
      });

      const bestBids = getBestBidsFromReducedBonds(bondsByName);
      const bondsBy = { nameKeys: bondsByName, bids: bestBids };
      return { ...state, bondsBy };
    default:
      return state;
  }

  return state;
}
