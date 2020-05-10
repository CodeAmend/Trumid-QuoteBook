import React from 'react';
import { CreateQuote, Action } from '../context/types';
import {
  createBondSelectItems,
  createAccountSelectItems,
  actionSelectItems,
  initialFormState,
} from './utils';

import { useQuotebook } from '../context/hooks';

import UserQuoteTable from './UserQuoteTable';
import { Form } from './styles';


function FormView() {
  // const classes = useStyles();
  const {
    createQuote,
    accountMaster,
    bondMaster,
    selectedBond,
    setSelectedBond,
    depthOfBook,
    userQuotes,
    initBondView,
  } = useQuotebook();

  const [formState, setFormState] = React.useState<CreateQuote & { action: Action }>(initialFormState);

  React.useEffect(() => {
    setFormState({
      ...initialFormState,
      bondId: selectedBond,
    });
    initBondView();
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
    <React.Fragment>

    <Form>
      <select name="bondId" value={formState.bondId} onChange={handlFormChange}>
      {!formState.bondId && <option>Select a Bond</option>}
        {bondSelectItems.length && bondSelectItems.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      {!!formState.bondId && (
        <button
          type="button"
          style={{ marginLeft: '1rem' }}
          onClick={() => setSelectedBond('')}
        >View All Bonds</button>
      )}
    </Form>

    {selectedBond && (
      <Form>
        <table>
          <thead>
            <tr>
              <td></td>
              <td>Transaction</td>
              <td>Client</td>
              <td>Type</td>
              <td>Price</td>
              <td>Qty</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>
              <button
                disabled={disabled}
                type="button"
                style={{ marginRight: '1rem' }}
                onClick={handleOrderType}
              >Add</button>
            </td>
            <td>
              <select name="action" value={formState.action} onChange={handlFormChange}>
                {actionSelectItems.length && actionSelectItems.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </td>
            <td>
              <select value={formState.accountId} onChange={handlFormChange}>
                {accountSelectItems.length && accountSelectItems.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </td>
            <td>
              <select name="side" value={formState.side} onChange={handlFormChange}>
                <option value="B">Bid</option>
                <option value="S">Offer</option>
              </select>
            </td>
            <td>
              <label htmlFor="qty">Qty (in millions):</label>
              <input
                onChange={handlFormChange}
                value={formState.qty}
                type="number"
                id="qty"
                name="qty"
              />
            </td>
            <td>
              <label htmlFor="price">Price: $</label>
              <input
                onChange={handlFormChange}
                value={formState.price}
                type="number"
                id="price"
                name="price"
              />
            </td>

            </tr>
          </tbody>
        </table>

      </Form>
    )}
      

    {userQuotes.length > 0 && <UserQuoteTable />}

    </React.Fragment>
  );
}

export default FormView;
