import { BondQuote, SnapshotProps } from './types';


export const actionTypes = {
  QUOTE_SUBSCRIBE: 'QUOTE_SUBSCRIBE',
  QUOTE_UNSUBSCRIBE: 'QUOTE_UNSUBSCRIBE',
  PROCESS_BOND_QUOTES: 'PROCESS_BOND_QUOTES',

  CONVERT_SNAPSHOTS: 'CONVERT_SNAPSHOTS',

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


export const convertAndMarrySnapshotsToBondIdKeysWith =
  (payload: SnapshotProps) => ({ type: actionTypes.CONVERT_SNAPSHOTS, payload });


export const actions = {
  quoteSubscribe,
  quoteUnsubscribe,

  createQuoteWith,
  updateQuoteWith,
  cancelQuoteWith,
}

export default {
  actionTypes,
  convertAndMarrySnapshotsToBondIdKeysWith,
}
