import { BondQuote, AccountMaster, BondMaster } from './types';


export const actionTypes = {
  QUOTE_SUBSCRIBE: 'QUOTE_SUBSCRIBE',
  QUOTE_UNSUBSCRIBE: 'QUOTE_UNSUBSCRIBE',
  PROCESS_BOND_QUOTES: 'PROCESS_BOND_QUOTES',
  UPDATE_QUOTE_BOOK: 'UPDATE_QUOTE_BOOK',
  UPDATE_BOND_MASTER_WITH: 'UPDATE_BOND_MASTER_WITH',
  UPDATE_ACCOUNT_MASTER_WITH: 'UPDATE_ACCOUNT_MASTER_WITH',

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

export const updateAccountMasterWith =
  (payload: AccountMaster[]) => ({ type: actionTypes.UPDATE_ACCOUNT_MASTER_WITH, payload })

export const updateBondMasterWith =
  (payload: BondMaster[]) => ({ type: actionTypes.UPDATE_BOND_MASTER_WITH, payload })

export const processBondQuotes = (payload: BondQuote[]) =>
  ({ type: actionTypes.PROCESS_BOND_QUOTES, payload });

export const actions = {
  quoteSubscribe,
  quoteUnsubscribe,
  processBondQuotes,
  createQuoteWith,
  updateQuoteWith,
  cancelQuoteWith,
  updateAccountMasterWith,
  updateBondMasterWith,
}

export default {
  actionTypes,
}
