import { ReducerState, DepthOfBook, BondMaster } from './types';
import { actionTypes } from './actions';
import {
  // combineSnapshotsToBondIdKeyValues,
  // getBestBidsFromBondIdKeyValues,
  addNewQuoteToBook,
  updateQuoteOnBook,
} from './utils';


export const quoteBookReducer = (state: ReducerState, action: any): any => {
  let depthOfBook: DepthOfBook = state.depthOfBook;


  switch (action.type) {
    case actionTypes.QUOTE_CREATE:
      depthOfBook = addNewQuoteToBook(state, action.payload);
      return { ...state, depthOfBook }

    case actionTypes.QUOTE_UPDATE:
      // console.log(depthOfBook[action.payload.bondId])
      depthOfBook = updateQuoteOnBook(state, action.payload);
      // console.log(depthOfBook[action.payload.bondId])
      return { ...state }

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
