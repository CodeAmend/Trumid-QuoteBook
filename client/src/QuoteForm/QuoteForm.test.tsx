import React from 'react';
import {shallow} from "enzyme";
import QuoteForm from "./QuoteForm";

import { findByTestAttr } from '../testHelpers/testUtils';

test('renders QuoteForm', () => {
  const wrapper = shallow(<QuoteForm />);
  const quoteForm = findByTestAttr(wrapper, 'component-quoteform')
  expect(quoteForm.length).toBe(1);
});
