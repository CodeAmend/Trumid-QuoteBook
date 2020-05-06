import React, {ReactNode} from 'react';
import io from 'socket.io-client';
import { BondMaster, BondsBy, BondQuote, QuoteAction, AccountMaster } from './types'
import { actions } from './actions';
import { quoteBookReducer } from './reducer';
const socket = io('http://localhost:3000');


interface QuoteBookContext {
  socket: any;
  bondsBy: BondsBy;
  quoteBook: BondQuote[];
  accountMaster: AccountMaster[],
  bondMaster: BondMaster[],
}

// TODO: find out why I have to declare a context with typescript when I want null???
const initialQuoteBookContext = {
  socket: null,
  bondsBy: { bids: [] , bondIdKeys: {} },
  quoteBook: [],
  accountMaster: [],
  bondMaster: [],
};

const initialReducerState = {
  quoteBook: [],
  bondsBy: {
    bids: [],
    bondIdKeys: {},
  },
  accountMaster: [],
  bondMaster: [],
};

export const context = React.createContext<QuoteBookContext>(initialQuoteBookContext);

export const Provider = (props: { children: ReactNode }) => {
  const [state, dispatch] = React.useReducer(quoteBookReducer, initialReducerState);

  React.useEffect(() => {
    socket.on('accountMaster',
      (accounts: AccountMaster[]) => dispatch(actions.updateAccountMasterWith(accounts)));

    socket.on('bondMaster',
      (bonds: BondMaster[]) => dispatch(actions.updateBondMasterWith(bonds)));

    socket.on('quoteBook',
      (quoteBook: BondQuote[]) => dispatch(actions.processBondQuotes(quoteBook)));

      socket.on('quoteAction', (quoteAction: QuoteAction) => {
        console.log(quoteAction);
      });

    socket.emit('accountMaster.snapshot');
    socket.emit('bondMaster.snapshot');

    // socket.on('quoteAccepted', console.log);
    // socket.on('quoteRejected', console.log);
  }, []);

  const initialValue = {
    socket,
    ...state,
  }

  return (
    <context.Provider value={initialValue} {...props} />
  );
}

export default {
  context,
  Provider,
}
