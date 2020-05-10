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
import { quoteBookReducer } from './reducer';
const socket = io('http://localhost:3000');


// TODO: find out why I have to declare a context with typescript when I want null???
const initialQuoteBookContext = {
  socket: null,
  dispatch: null,
  depthOfBook: {},
  accountMaster: [],
  bondMaster: [],
  selectedBond: '',
  setSelectedBond: () => {},
  latestBondId: '',
  userQuotes: [],
  setUserQuotes: () => {},
};

const initialReducerState = {
  depthOfBook: {},
  accountMaster: [],
  bondMaster: [],
  latestBondId: '',
};

export const context = React.createContext<QuoteBookContext>(initialQuoteBookContext);


export const Provider = (props: { children: ReactNode }) => {
  const [quoteBook, setQuoteBook] = React.useState<BondQuote[]>([]);
  const [userQuotes, setUserQuotes] = React.useState<UserQuote[]>([])
  const [reducerState, dispatch] = React.useReducer(quoteBookReducer, initialReducerState);

  const { accountMaster, bondMaster } = reducerState;
  const [selectedBond, setSelectedBond] = React.useState<string>('')

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

    // TODO: !!! Connot reach outside scope socket `this`;
    socket.on('quoteAccepted', (quoteAccepted: QuoteAccepted) => {
      const { action, requestId } = quoteAccepted;
      const newUserQuote = reconcileWithMasters(reducerState, quoteAccepted);

      if (action === 'N') {
        console.log("N", newUserQuote)
        setUserQuotes(userQuotes.concat(newUserQuote));
        // TODO: Dispatch toast message
      }

      if (action === 'U') {
        console.log("U", newUserQuote)
        setUserQuotes(prev => prev.map(uq => {
          if (uq.requestId === requestId) {
            return newUserQuote;
          }
          return uq;
        }));
      }

      if (action === 'C') {
        setUserQuotes(prev => prev.filter(uq => uq.requestId === requestId));
        // TODO: Dispatch toast message
      }
    });
    // socket.on('quoteRejected', console.log);

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
    }
  }, [quoteBook]);


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
