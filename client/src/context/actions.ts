import { QuoteBookPayload } from './types';


export const actionTypes = {
  QUOTE_SUBSCRIBE: 'QUOTE_SUBSCRIBE',
  QUOTE_UNSUBSCRIBE: 'QUOTE_UNSUBSCRIBE',
  PROCESS_BOND_QUOTES: 'PROCESS_BOND_QUOTES',

  QUOTE_CREATE: 'QUOTE_CREATE',
  QUOTE_REPLACE: 'QUOTE_REPLACE',
  QUOTE_UPDATE: 'QUOTE_UPDATE',
}

export const quoteSubscribe = () => ({ type: actionTypes.QUOTE_SUBSCRIBE });
export const quoteUnsubscribe = () => ({ type: actionTypes.QUOTE_UNSUBSCRIBE });

export const processBondQuotes = (payload: QuoteBookPayload) =>
  ({ type: actionTypes.PROCESS_BOND_QUOTES, payload });

export default {
  actionTypes,
  actions: {
    quoteSubscribe,
    quoteUnsubscribe,
    processBondQuotes,
  }
}
