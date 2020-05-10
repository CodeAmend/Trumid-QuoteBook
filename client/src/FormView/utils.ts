import { AccountMaster, BondMaster, SelectItem, CreateQuote, Action } from '../context/types';


export const createAccountSelectItems = (accountMaster: AccountMaster[]) => {
  return accountMaster.reduce((acc: SelectItem[], account) => {
    acc.push({ value: '' + account.id, label: account.name });
    return acc;
  }, []);
}

export const createBondSelectItems = (bondMaster: BondMaster[]) => {
  return bondMaster.reduce((acc: SelectItem[], account) => {
    acc.push({ value: '' + account.id, label: account.name });
    return acc;
  }, []);
}

export const actionSelectItems = [
  { value: 'N', label: 'New' },
  { value: 'U', label: 'Update' },
  { value: 'C', label: 'Cancel' },
];

export const initialFormState: CreateQuote & { action: Action } = {
  bondId: '',
  side: 'B',
  accountId: 0,
  price: 1,
  qty: 1,
  action: 'N',
}

