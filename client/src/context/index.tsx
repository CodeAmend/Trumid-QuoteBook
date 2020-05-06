import React, {ReactNode} from 'react';
import useSocket from 'use-socket.io-client';
import { BondMaster, BondQuote, AccountMaster } from './types'
import { useMountEffect } from  './utils';
// import { processBondQuotes } from './actions';
// import { quoteBookReducer } from './reducer';


interface QuoteBookContext {
  socket: any;
  // bondsBy: BondsBy;
  quoteBook: BondQuote[];
  accountMaster: AccountMaster[],
  bondMaster: BondMaster[],
}
// TODO: find out why I have to declare a context with typescript when I want null???
const initialQuoteBookContext = {
  socket: null,
  lookupTables: { bonds: [], accounts: [] },
  // bondsBy: { bids: [] , nameKeys: {} },
  quoteBook: [],
  accountMaster: [],
  bondMaster: [],
};

// const initialBondsBy = { bids: [], nameKeys: {} };


export const context = React.createContext<QuoteBookContext>(initialQuoteBookContext);

export const Provider = (props: { children: ReactNode }) => {
  const [socket] = useSocket('http://localhost:3000');
  const [bondMaster, setBondMaster] = React.useState<BondMaster[]>([]);
  const [accountMaster, setAccountMaster] = React.useState<AccountMaster[]>([]);
  const [quoteBook, setQuoteBook] = React.useState<BondQuote[]>([])

  // const [bondsBy, dispatchBondsBy] = React.useReducer(quoteBookReducer, initialBondsBy);
  
  useMountEffect(() => {
    socket.on('quoteBook', setQuoteBook);
    socket.on('bondMaster', setBondMaster);
    socket.on('accountMaster', setAccountMaster);
    socket.emit('bondMaster.snapshot');
    socket.emit('accountMaster.snapshot');

    // TODO reducer for these
    socket.on('quoteAction', console.log);
    socket.on('quoteAccepted', console.log);
    socket.on('quoteRejected', console.log);
  });

  // useMountEffect(() => {
  //   socket.on('quoteBook', (quotes: BondQuote[]) => {
  //     dispatchBondsBy(processBondQuotes({ quotes, accountMaster, bondMaster }));
  //   });
  // });

  const initialValue = {
    socket,
    // bondsBy,
    quoteBook,
    accountMaster,
    bondMaster,
  }

  return (
    <context.Provider value={initialValue} {...props} />
  );
}

export default {
  context,
  Provider,
}
