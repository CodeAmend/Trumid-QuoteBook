import React, {ReactNode} from 'react';
import io from 'socket.io-client';
import { BondQuote, BondMaster, QuoteAction, AccountMaster, DepthOfBook } from './types'

import { actions } from './actions';
import { quoteBookReducer } from './reducer';
const socket = io('http://localhost:3000');


interface QuoteBookContext {
  socket: any;
  dispatch: any;
  depthOfBook: DepthOfBook;
  accountMaster: AccountMaster[];
  bondMaster: BondMaster[];
}

// TODO: find out why I have to declare a context with typescript when I want null???
const initialQuoteBookContext = {
  socket: null,
  dispatch: null,
  depthOfBook: {},
  accountMaster: [],
  bondMaster: [],
};

const initialReducerState = {
  depthOfBook: {},
  accountMaster: [],
  bondMaster: [],
};

export const context = React.createContext<QuoteBookContext>(initialQuoteBookContext);

export const Provider = (props: { children: ReactNode }) => {
  const [quoteBook, setQuoteBook] = React.useState<BondQuote[]>([]);
  const [state, dispatch] = React.useReducer(quoteBookReducer, initialReducerState);
  const { accountMaster, bondMaster } = state;

  React.useEffect(() => {
    socket.on('quoteBook', setQuoteBook);

    socket.on('accountMaster', (data: AccountMaster[]) => {
      dispatch(actions.initializeAccountMasterWith(data));
    })

    socket.on('bondMaster', (data: BondMaster[]) => {
      dispatch(actions.initializeBondsMasterWith(data));
    })

    socket.on('quoteAction', ({ action, quote }: QuoteAction) => {
      if (action === 'N') {
        dispatch(actions.createQuoteWith(quote));
      }

      if (action === 'U') {
        dispatch(actions.updateQuoteWith(quote));
      }

      if (action === 'C') {
        dispatch(actions.cancelQuoteWith(quote));
      }
    });

    socket.emit('accountMaster.snapshot')
    socket.emit('bondMaster.snapshot')
  }, []);

  // After Master Tables Loaded 
  React.useEffect(() => {
    if (accountMaster.length && bondMaster.length) {
      dispatch(actions.initializeDepthOfBookWith(bondMaster));
      socket.emit('quoteBook.snapshot');
    }
  }, [accountMaster, bondMaster]);

  // After quotebook is reconciled to depthOfBook
  React.useEffect(() => {
    if (quoteBook.length) {
      dispatch(actions.reconcileQuotebookWith(quoteBook));
      socket.emit('quoteBook.subscribe');
      setTimeout(() => {
        socket.emit('quoteBook.unsubscribe');
      }, 10 * 1000)
    }
  }, [quoteBook]);

  return (
    <context.Provider value={{ socket, ...state, dispatch }} {...props} />
  );
}

export default {
  context,
  Provider,
}
