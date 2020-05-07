import { QuoteFigures, DepthOfBook, AccountMaster, BondMaster, BondQuote } from './types';
import { actionTypes } from './actions';
import {
  // combineSnapshotsToBondIdKeyValues,
  // getBestBidsFromBondIdKeyValues,
  priceFormat,
  qtyFormat,
  byPrice,
} from './utils';


type ReducerState = {
  depthOfBook: DepthOfBook;
  accountMaster: AccountMaster[];
  bondMaster: BondMaster[];
}

const setupNewQuoteField = (state: ReducerState, quote: BondQuote): DepthOfBook => {
  const { accountMaster, depthOfBook: book } = state;
  const { qty, price, bondId, accountId } = quote;

  const client = accountMaster[accountId].name;

  const item = book[bondId];

  const figures: QuoteFigures = { client, qty: qtyFormat(qty), price: priceFormat(price) };

  if (quote.side === 'B') {
    item.bids.push(figures)
    item.bids = item.bids.sort(byPrice)
  } else {
    item.offers.push(figures);
  }
  
  return book;
}

export const quoteBookReducer = (state: any, action: any): any => {
  let depthOfBook: DepthOfBook = state.depthBook;


  switch (action.type) {
    case actionTypes.QUOTE_CREATE:
      depthOfBook = setupNewQuoteField(state, action.payload);
      return { ...state, depthOfBook }

    case actionTypes.QUOTE_UPDATE:
      console.log(action.type);
      break;

    case actionTypes.QUOTE_CANCEL:
      console.log(action.type);
      break;

    case actionTypes.INITIALIZE_ACCOUNT_MASTER:
      return { ...state, accountMaster: action.payload }

    case actionTypes.INITIALIZE_BOND_MASTER:
      return { ...state, bondMaster: action.payload }

    case actionTypes.INITIALIZE_DEPTH_OF_BOOK:
      // Create book of bidId keys with bid and offer empty template 
      depthOfBook = action.payload.reduce((acc: DepthOfBook, bondItem: BondMaster) => {
        // BondId with blank attibs
        acc[bondItem.id] = {
          bondId: bondItem.id,
          bondName: bondItem.name,
          bids: [],
          offers: [],
        };

        return acc;
      }, {});
      return { ...state, depthOfBook };

    // // ADD SNAPSHOT TO BOND LIST
    // case actionTypes.CONVERT_SNAPSHOTS:
    //   const { accountMaster, bondMaster, quoteBook } = action.payload;
    //   const bondsByBondId = combineSnapshotsToBondIdKeyValues({
    //     quoteBook,
    //     bondMaster,
    //     accountMaster,
    //   })
    //   return { ...state, bondsByBondId }

    // // TODO: TOP_OF_BOOK
    // case actionTypes.BEST_BIDS:
    //   const bestBids = getBestBidsFromBondIdKeyValues(action.payload);
    //   return { ...state, bestBids }

    default:
      return state;
  }
}
