import React, {ReactNode} from 'react';
import io from 'socket.io-client';
import { BondMaster, BondQuote, AccountMaster, LookUpTables } from './types'

const socket = io('http://localhost:3000');


interface ProviderProps {
  children: ReactNode;
}

interface QuoteBookContext {
  socket: any;
  lookupTables: LookUpTables;
  quoteBook: BondQuote[];
}
const initialQuoteBookContext = {
  socket: null,
  lookupTables: { bonds: [], accounts: [] },
  quoteBook: [],
};


// TODO: find out why I have to declare a context with typescript when I want null???
export const context = React.createContext<QuoteBookContext>(initialQuoteBookContext);


export const Provider = (props: ProviderProps) => {
  const [quoteBook, setQuoteBook] = React.useState<BondQuote[]>([]);
  const [bondMaster, setBondMaster] = React.useState<BondMaster[]>([]);
  const [accountMaster, setAccountMaster] = React.useState<AccountMaster[]>([]);

  React.useEffect(() => {
    if (!bondMaster.length) {
      socket.on('bondMaster', setBondMaster);
      socket.emit('bondMaster.snapshot');
    }

    if (!accountMaster.length) {
      socket.on('accountMaster', setAccountMaster);
      socket.emit('accountMaster.snapshot');
    } 

    socket.on('quoteBook', setQuoteBook);

  }, [accountMaster, bondMaster])

  const lookupTables: LookUpTables = { bonds: bondMaster, accounts: accountMaster };

  const initialValue = {
    socket,
    quoteBook,
    lookupTables,
  }

  return (
    <context.Provider value={initialValue} {...props} />
  );
}

export default {
  context,
  Provider,
}
