import React, {ReactNode} from 'react';
import io from 'socket.io-client';
import { BondMaster, AccountMaster, LookUpTables } from './types'

const socket = io('http://localhost:3000');


interface ProviderProps {
  children: ReactNode;
}


interface IQuoteBookContext {
  socket: any;
  lookupTables: LookUpTables;
}


// TODO: find out why I have to declare a context with typescript when I want null???
export const context = React.createContext<IQuoteBookContext>({
  socket: null,
  lookupTables: { bonds: [], accounts: [] }
});


export const Provider = (props: ProviderProps) => {
  const [bondMaster, setBondMaster] = React.useState<BondMaster[]>([]);
  const [accountMaster, setAccountMaster] = React.useState<AccountMaster[]>([]);

  socket.on('bondMaster', setBondMaster);
  socket.on('accountMaster', setAccountMaster);

  socket.emit('accountMaster.snapshot')
  socket.emit('bondMaster.snapshot')

  const lookupTables: LookUpTables = { bonds: bondMaster, accounts: accountMaster };

  return (
    <context.Provider value={{ socket, lookupTables }} {...props} />
  );
}

export default {
  context,
  Provider,
}
