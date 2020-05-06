import { actionTypes } from './actions';
import { combineSnapshotsToBondIdKeyValues } from './utils';


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

    default:
      return state;
  }
}
