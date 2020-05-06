import { actionTypes } from './actions';
import {
  combineSnapshotsToBondIdKeyValues,
  getBestBidsFromBondIdKeyValues,
} from './utils';


export const quoteBookReducer = (state: any, action: any): any => {
  switch (action.type) {
    case actionTypes.CONVERT_SNAPSHOTS:
      const { accountMaster, bondMaster, quoteBook } = action.payload;
      const bondsByBondId = combineSnapshotsToBondIdKeyValues({
        quoteBook,
        bondMaster,
        accountMaster,
      })
      return { ...state, bondsByBondId }

    case actionTypes.BEST_BIDS:
      const bestBids = getBestBidsFromBondIdKeyValues(action.payload);
      return { ...state, bestBids }

    default:
      return state;
  }
}
