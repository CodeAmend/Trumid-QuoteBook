import React from 'react';
import { CreateQuote } from '../context/types';

import { useQuotebook } from '../context/hooks';
// import { priceFormat, qtyFormat } from '../context/utils';

type SelectItem = { value: string, label: string };

type Action = { action: 'N' | 'U' | 'C' }

const initialFormState: CreateQuote & Action = {
  bondId: '',
  side: 'B',
  accountId: 0,
  price: 0,
  qty: 0,
  action: 'N',
}

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

  const actionSelectItems = [
    { value: 'N', label: 'New' },
    { value: 'U', label: 'Update' },
    { value: 'C', label: 'Cancel' },
  ];

  const [formState, setFormState] = React.useState<CreateQuote & Action>(initialFormState);

  React.useEffect(() => {
    if (!selectedBond) {
      setFormState(initialFormState);
    }

  }, [selectedBond]);

  const handlFormChange =({ target }): void => {
    setFormState(prev => ({
      ...prev,
      [target.name]: target.value,
    }));

    if (target.name === 'bondId') {
      setSelectedBond(target.value);
    }
  }


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
        throw 'Not implemented';
      case 'C':
        throw 'Not implemented';
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

        <select value={formState.side} onChange={handlFormChange}>
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
