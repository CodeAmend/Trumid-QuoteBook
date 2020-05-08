import React from 'react';
import { CreateQuote, Action } from '../context/types';
import {
  createBondSelectItems,
  createAccountSelectItems,
  actionSelectItems,
  initialFormState,
} from './utils';

import { useQuotebook } from '../context/hooks';
// import { priceFormat, qtyFormat } from '../context/utils';


function FormView() {
  // const classes = useStyles();
  const {
    createQuote,
    accountMaster,
    bondMaster,
    selectedBond,
    setSelectedBond,
    depthOfBook,
  } = useQuotebook();

  const [formState, setFormState] = React.useState<CreateQuote & { action: Action }>(initialFormState);

  // Resets fields and select values
  React.useEffect(() => {
    setFormState({ ...initialFormState, bondId: selectedBond });
  }, [selectedBond]);


  // TODO: Fix this code smell. depthOfBook as a dependency should not be needed.
  // Bond SELECT setup
  const bondSelectItems = React.useMemo(
    () => createBondSelectItems(bondMaster), [bondMaster, depthOfBook]); 

  // Account SELECT setup
    const accountSelectItems = React.useMemo(
      () => createAccountSelectItems(accountMaster), [accountMaster, depthOfBook]);


  const handlFormChange =({ target }): void => {
    setFormState(prev => ({
      ...prev,
      [target.name]: target.value,
    }));

    if (target.name === 'bondId') {
      setSelectedBond(target.value);
    }
  }

  // For CRUD Actions
  const handleOrderType = (): void => {
    const { bondId, side, accountId, price, qty, action } = formState;
    switch (action) {
      case 'N':
        console.log(side)
        createQuote({
          accountId: Number(accountId),
          bondId: bondId || bondSelectItems[0].value,
          side,
          price: Number(price),
          qty: Number(qty) * 1000000,
        });
        break;
      case 'U':
        throw new Error('Not implemented');
      case 'C':
        throw new Error('Not implemented');
    }
  }

  const disabled: boolean = !(formState.bondId && formState.price > 0 && formState.qty > 0);

  return(
    <form>
      
      {!!formState.bondId && (
        <>
        <button
          disabled={disabled}
          type="button"
          style={{ marginRight: '1rem' }}
          onClick={handleOrderType}
        >Add</button>

        <select name="action" value={formState.action} onChange={handlFormChange}>
          {actionSelectItems.length && actionSelectItems.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        </>
      )}


      <select name="bondId" value={formState.bondId} onChange={handlFormChange}>
      {!formState.bondId && <option>Select a Bond</option>}
        {bondSelectItems.length && bondSelectItems.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      {!!formState.bondId && (
        <>
        <select value={formState.accountId} onChange={handlFormChange}>
          {accountSelectItems.length && accountSelectItems.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <select name="side" value={formState.side} onChange={handlFormChange}>
          <option value="B">Bid</option>
          <option value="S">Offer</option>
        </select>
        
        {formState.action !== 'C' && (
          <>
          <label htmlFor="qty">Qty (in millions):</label>
          <input onChange={handlFormChange} value={formState.qty} type="number" id="qty" name="qty" />

          <label htmlFor="price">Price: $</label>
          <input onChange={handlFormChange} value={formState.price} type="number" id="price" name="price" />
          </>
        )}
        </>
      )}

      {!!formState.bondId && (
        <button
          type="button"
          style={{ marginLeft: '1rem' }}
          onClick={() => setSelectedBond('')}
        >View All Bonds</button>
      )}
    </form>
  );
}

export default FormView;
