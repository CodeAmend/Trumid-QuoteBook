import { DepthOfBook, BondMaster } from './types';
import { actionTypes } from './actions';
import {
  combineSnapshotsToBondIdKeyValues,
  getBestBidsFromBondIdKeyValues,
} from './utils';


export const quoteBookReducer = (state: any, action: any): any => {
  switch (action.type) {
    case actionTypes.INITIALIZE_DOB:
      // Create book of bidId keys with bid and offer empty template 
      const depthOfBook = action.payload.reduce((acc: DepthOfBook, bondItem: BondMaster) => {
        const name = bondItem.id;

        // BondId with blank attibs
        acc[name] = {
          bondId: name,
          bondName: null,
          bids: [],
          offers: [],
        };

        return acc;
      }, {});
      return { depthOfBook };

    // ADD SNAPSHOT TO BOND LIST
    case actionTypes.CONVERT_SNAPSHOTS:
      const { accountMaster, bondMaster, quoteBook } = action.payload;
      const bondsByBondId = combineSnapshotsToBondIdKeyValues({
        quoteBook,
        bondMaster,
        accountMaster,
      })
      return { ...state, bondsByBondId }

    // TODO: TOP_OF_BOOK
    case actionTypes.BEST_BIDS:
      const bestBids = getBestBidsFromBondIdKeyValues(action.payload);
      return { ...state, bestBids }

    default:
      return state;
  }
}
