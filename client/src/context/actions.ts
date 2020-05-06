import { BondQuote, AccountMaster, BondMaster } from './types';


export const actionTypes = {
  QUOTE_SUBSCRIBE: 'QUOTE_SUBSCRIBE',
  QUOTE_UNSUBSCRIBE: 'QUOTE_UNSUBSCRIBE',
  PROCESS_BOND_QUOTES: 'PROCESS_BOND_QUOTES',
  UPDATE_QUOTE_BOOK: 'UPDATE_QUOTE_BOOK',
  UPDATE_BOND_MASTER_WITH: 'UPDATE_BOND_MASTER_WITH',
  UPDATE_ACCOUNT_MASTER_WITH: 'UPDATE_ACCOUNT_MASTER_WITH',

  QUOTE_CREATE: 'QUOTE_CREATE',
  QUOTE_REPLACE: 'QUOTE_REPLACE',
  QUOTE_UPDATE: 'QUOTE_UPDATE',
}

export const quoteSubscribe = () => ({ type: actionTypes.QUOTE_SUBSCRIBE });
export const quoteUnsubscribe = () => ({ type: actionTypes.QUOTE_UNSUBSCRIBE });

export const updateQuoteBook =
  (payload: BondQuote[]) => ({ type: actionTypes.UPDATE_QUOTE_BOOK, payload })

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
  updateQuoteBook,
  updateAccountMasterWith,
  updateBondMasterWith,
}

export default {
  actionTypes,
}
