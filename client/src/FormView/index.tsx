import React from 'react';
import { CreateQuote } from '../context/types';

import { useQuotebook } from '../context/hooks';
import {EventType} from '@testing-library/react';
// import { priceFormat, qtyFormat } from '../context/utils';

type SelectItem = { value: string, label: string };

function FormView() {
  // const classes = useStyles();
  const {
    createQuote,
    accountMaster,
    bondMaster,
    selectedBond,
    setSelectedBond,
    depthOfBook
  } = useQuotebook();

  // Set up select items only 1 time;
  const bondSelectItems = React.useMemo(() => {
    let items: SelectItem[] = [];
    for (let [, { bondId, bondName }] of  Object.entries(depthOfBook)) {
      items.push({ value: bondId, label: bondName });
    }
    return items;
  }, [bondMaster.length, depthOfBook]);

  const accountSelectItems = React.useMemo(() => {
    return accountMaster.reduce((acc: SelectItem[], account) => {
      acc.push({ value: '' + account.id, label: account.name });
      return acc;
    }, []);
  }, [bondMaster.length, depthOfBook]);

  const [selectState, setSelectState] = React.useState<CreateQuote>({
    bondId: selectedBond,
    side: 'B',
    accountId: 0,
    price: 0,
    qty: 0,
  });

  const handleSelect =({ target }): void => {
    setSelectState(prev => ({
      ...prev,
      [target.name]: target.value,
    }));

    if (target.name === 'bondId') {
      setSelectedBond(target.value);
    }
  }


  const handleAddOrder = (): void => {
    const { bondId, side, accountId, price, qty } = selectState;
    createQuote({
      accountId: Number(accountId),
      bondId: bondId || bondSelectItems[0].value,
      side,
      price: Number(price),
      qty: Number(qty) * 1000000,
    });
  }

  const disabled: boolean = !(selectState.bondId && selectState.price > 0 && selectState.qty > 0);

  return(
    <form>
      
      {!!selectState.bondId && (
        <button
          disabled={disabled}
          type="button"
          style={{ marginRight: '1rem' }}
          onClick={handleAddOrder}
        >Add</button>
      )}

      <select name="bondId" value={selectState.bondId} onChange={handleSelect}>
      {!selectState.bondId && <option>Select a Bond</option>}
        {bondSelectItems.length && bondSelectItems.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      {!!selectState.bondId && (
        <>
        <select value={selectState.accountId} onChange={handleSelect}>
          {accountSelectItems.length && accountSelectItems.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <select value={selectState.side} onChange={handleSelect}>
          <option value="B">Bid</option>
          <option value="S">Offer</option>
        </select>
        
        <label htmlFor="qty">Qty (in millions):</label>
        <input onChange={handleSelect} value={selectState.qty} type="number" id="qty" name="qty" />

        <label htmlFor="price">Price: $</label>
        <input onChange={handleSelect} value={selectState.price} type="number" id="price" name="price" />
        </>
      )}
    </form>
  );
}

export default FormView;
