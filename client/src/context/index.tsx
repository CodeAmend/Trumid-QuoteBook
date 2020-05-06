import React, {ReactNode} from 'react';
import io from 'socket.io-client';
import { BondMaster, BondsByBondIdKey, BondQuote, AccountMaster } from './types'

import actions from './actions';
import { quoteBookReducer } from './reducer';
const socket = io('http://localhost:3000');


interface QuoteBookContext {
  socket: any;
  bondsByBondId: BondsByBondIdKey;
}

// TODO: find out why I have to declare a context with typescript when I want null???
const initialQuoteBookContext = {
  socket: null,
  bondsByBondId: {},
};

const initialReducerState = {
};

export const context = React.createContext<QuoteBookContext>(initialQuoteBookContext);

export const Provider = (props: { children: ReactNode }) => {

  const [quoteBook, setQuoteBook] = React.useState<BondQuote[]>([]);
  const [accountMaster, setAccountMaster] = React.useState<AccountMaster[]>([]);
  const [bondMaster, setBondMaster] = React.useState<BondMaster[]>([]);

  const [state, dispatch] = React.useReducer(quoteBookReducer, initialReducerState);

  // Initialize socketOn and emit initial snapshots
  React.useEffect(() => {
    // socket.on('quoteAction', ({ action, quote }: QuoteAction) => {
    //   if (action === 'N') dispatchCrud(actions.createQuoteWith(quote));
    //   if (action === 'U') dispatchCrud(actions.updateQuoteWith(quote));
    //   if (action === 'C') dispatchCrud(actions.cancelQuoteWith(quote));
    // });

    // socket.on('quoteAccepted', console.log);
    // socket.on('quoteRejected', console.log);

    socket.on('accountMaster', setAccountMaster);
    socket.on('bondMaster', setBondMaster);
    socket.on('quoteBook', setQuoteBook);

    socket.emit('accountMaster.snapshot')
    socket.emit('bondMaster.snapshot')
  }, [])

  // Listen for finished master snapshots and emit quotebook
  React.useEffect(() => {
    if (accountMaster.length && bondMaster.length) {
      socket.emit('quoteBook.snapshot');
    }
  }, [accountMaster, bondMaster]);

  React.useEffect(() => {
    if (quoteBook.length) {
      dispatch(actions.convertAndMarrySnapshotsToBondIdKeysWith({
        quoteBook,
        accountMaster,
        bondMaster
      }));
    }
  }, [quoteBook]);

  // React.useEffect(() => {
  //   });
  // }, []);

  return (
    <context.Provider value={{ socket, ...state }} {...props} />
  );
}

export default {
  context,
  Provider,
}
