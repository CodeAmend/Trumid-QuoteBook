import React, {ReactNode} from 'react';
import io from 'socket.io-client';
import { BondMaster, BondQuote, AccountMaster, LookUpTables } from './types'

const socket = io('http://localhost:3000');


interface ProviderProps { children: ReactNode;
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

export const useMountEffect = (func: () => void) => React.useEffect(func, []);

export const Provider = (props: ProviderProps) => {
  const [quoteBook, setQuoteBook] = React.useState<BondQuote[]>([]);
  const [bondMaster, setBondMaster] = React.useState<BondMaster[]>([]);
  const [accountMaster, setAccountMaster] = React.useState<AccountMaster[]>([]);

  useMountEffect(() => {
    socket.on('bondMaster', setBondMaster);
    socket.emit('bondMaster.snapshot');
  });

  useMountEffect(() => {
    socket.on('accountMaster', setAccountMaster);
    socket.emit('accountMaster.snapshot');
  });

  useMountEffect(() => {
    socket.on('quoteBook', setQuoteBook);
  });

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
