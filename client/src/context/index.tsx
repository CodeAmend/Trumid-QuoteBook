import React, {ReactNode} from 'react';
import io from 'socket.io-client';
import {
  QuoteBookContext,
  BondQuote,
  BondMaster,
  QuoteAction,
  QuoteAccepted,
  AccountMaster,
  UserQuote,
} from './types'

import { reconcileWithMasters } from './utils';
import { actions } from './actions';
import { quoteBookReducer, initialReducerState } from './reducer';
const socket = io('http://localhost:3000');


// TODO: find out why I have to declare a context with typescript when I want null???
const initialQuoteBookContext = {
  socket: null,
  dispatch: null,
  depthOfBook: [],
  accountMaster: [],
  bondMaster: [],
  selectedBond: '',
  setSelectedBond: () => {},
  latestBondId: '',
  userQuotes: [],
  setUserQuotes: () => {},
  bondMasterKeyBook: {},
};

export const context = React.createContext<QuoteBookContext>(initialQuoteBookContext);


export const Provider = (props: { children: ReactNode }) => {
  const [quoteBook, setQuoteBook] = React.useState<BondQuote[]>([]);
  const [userQuotes, setUserQuotes] = React.useState<UserQuote[]>([]);
  const [reducerState, dispatch] = React.useReducer(quoteBookReducer, initialReducerState);

  const { accountMaster, bondMaster } = reducerState;
  const [selectedBond, setSelectedBond] = React.useState<string>('')

  // INIT Master Tables
  React.useEffect(() => {
    socket.on('accountMaster', (data: AccountMaster[]) => {
      dispatch(actions.initializeAccountMasterWith(data));
    })
    socket.on('bondMaster', (data: BondMaster[]) => {
      dispatch(actions.initializeBondsMasterWith(data));
    })
    socket.emit('accountMaster.snapshot')
    socket.emit('bondMaster.snapshot')
  }, [])


  // INIT BondMaster and emit QuoteBook
  React.useEffect(() => {
    if (accountMaster.length && bondMaster.length) {
      socket.on('quoteBook', setQuoteBook);

      // Setup blank Bond Master Table
      dispatch(actions.initializeDepthOfBookWith(bondMaster));

      // Get actual data
      socket.emit('quoteBook.snapshot');
    }
  }, [accountMaster.length, bondMaster.length, bondMaster]);


  // INIT subscription after quoteBook is filled
  React.useEffect(() => {
    if (quoteBook.length) {
      // Reconcile BondMaster && QuoteBook
      dispatch(actions.reconcileQuotebookWith(quoteBook));

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

      socket.on('quoteAccepted', (quoteAccepted: QuoteAccepted) => {
        const { action, requestId } = quoteAccepted;
        const newUserQuote = reconcileWithMasters(reducerState, quoteAccepted);
        if (action === 'N') {
          // TODO: Dispatch toast message
          console.log("N", newUserQuote)
          setUserQuotes(userQuotes.concat(newUserQuote));
        }

        if (action === 'U') {
          // TODO: Dispatch toast message
          console.log("U", newUserQuote)
          setUserQuotes(prev => prev.map(uq => {
            if (uq.requestId === requestId) {
              return newUserQuote;
            }
            return uq;
          }));
        }

        if (action === 'C') {
          console.log("cancelling...", quoteAccepted)
          // TODO: Dispatch toast message
          setUserQuotes(prev => prev.filter(uq => uq.requestId === requestId));
        }
      });

      // INIT Subscribtion
      socket.emit('quoteBook.subscribe');
    }
  }, [quoteBook.length, quoteBook]);


  const otherState = {
    selectedBond,
    setSelectedBond,
    userQuotes,
    setUserQuotes,
  }

  return (
    <context.Provider value={{ socket, ...reducerState, ...otherState, dispatch }} {...props} />
  );
}

export default {
  context,
  Provider,
}
