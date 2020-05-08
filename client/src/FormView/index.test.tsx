import React from 'react';
import {shallow, ShallowWrapper } from "enzyme";
import QuoteForm from ".";

import { findByTestAttr } from '../testHelpers/testUtils';


describe('QuoteForm form', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<QuoteForm />);
  });

  test('renders QuoteForm without error', () => {
    const quoteForm = findByTestAttr(wrapper, 'component-quoteform')
    expect(quoteForm.length).toBe(1);
  });
  
  describe('form field renders', () => {
    test('bondId', () => {
      const bondIdField = findByTestAttr(wrapper, 'input-bondid')
      expect(bondIdField.length).toBe(1);
    });

    test('accountId', () => {
      const accountIdField = findByTestAttr(wrapper, 'input-accountid')
      expect(accountIdField.length).toBe(1);
    });

    test('side', () => {
      const sideField = findByTestAttr(wrapper, 'input-side')
      expect(sideField.length).toBe(1);
    });

    test('qty', () => {
      const qtyField = findByTestAttr(wrapper, 'input-qty')
      expect(qtyField.length).toBe(1);
    });

    test('price', () => {
      const priceField = findByTestAttr(wrapper, 'input-price')
      expect(priceField.length).toBe(1);
    });
  });
});
