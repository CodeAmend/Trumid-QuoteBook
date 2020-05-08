import {
  BondQuote,
  SnapshotProps,
  AccountMaster,
  BondMaster,
} from './types';


export const actionTypes = {
  QUOTE_SUBSCRIBE: 'QUOTE_SUBSCRIBE',
  QUOTE_UNSUBSCRIBE: 'QUOTE_UNSUBSCRIBE',
  PROCESS_BOND_QUOTES: 'PROCESS_BOND_QUOTES',

  CONVERT_SNAPSHOTS: 'CONVERT_SNAPSHOTS',
  BEST_BIDS: 'BEST_BIDS',
  INITIALIZE_DEPTH_OF_BOOK: 'INITIALIZE_DEPTH_OF_BOOK',
  INITIALIZE_ACCOUNT_MASTER: 'INITIALIZE_ACCOUNT_MASTER',
  INITIALIZE_BOND_MASTER: 'INITIALIZE_BOND_MASTER',
  RECONCILE_QUOTEBOOK: 'RECONCILE_QUOTEBOOK',

  QUOTE_CREATE: 'QUOTE_CREATE',
  QUOTE_CANCEL: 'QUOTE_CANCEL',
  QUOTE_UPDATE: 'QUOTE_UPDATE',
}

export const quoteSubscribe = () => ({ type: actionTypes.QUOTE_SUBSCRIBE });
export const quoteUnsubscribe = () => ({ type: actionTypes.QUOTE_UNSUBSCRIBE });


export const createQuoteWith =
  (payload: BondQuote) => ({ type: actionTypes.QUOTE_CREATE, payload })

export const updateQuoteWith =
  (payload: BondQuote) => ({ type: actionTypes.QUOTE_UPDATE, payload })

export const cancelQuoteWith =
  (payload: BondQuote) => ({ type: actionTypes.QUOTE_CANCEL, payload })

export const initializeDepthOfBookWith =
  (payload: BondMaster[]) => ({ type: actionTypes.INITIALIZE_DEPTH_OF_BOOK, payload});

export const reconcileQuotebookWith =
  (payload: BondQuote[]) => ({ type: actionTypes.RECONCILE_QUOTEBOOK , payload })

export const initializeAccountMasterWith =
  (payload: AccountMaster[]) => ({ type: actionTypes.INITIALIZE_ACCOUNT_MASTER, payload});

export const initializeBondsMasterWith =
  (payload: BondMaster[]) => ({ type: actionTypes.INITIALIZE_BOND_MASTER, payload});

export const convertAndMarrySnapshotsToBondIdKeysWith =
  (payload: SnapshotProps) => ({ type: actionTypes.CONVERT_SNAPSHOTS, payload });


export const actions = {
  quoteSubscribe,
  quoteUnsubscribe,

  createQuoteWith,
  updateQuoteWith,
  cancelQuoteWith,

  convertAndMarrySnapshotsToBondIdKeysWith,
  initializeDepthOfBookWith,
  initializeAccountMasterWith,
  initializeBondsMasterWith,
  reconcileQuotebookWith,
}
