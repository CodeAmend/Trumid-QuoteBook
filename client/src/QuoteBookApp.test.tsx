import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from './testHelpers/testUtils'

import QuoteBookApp from './QuoteBookApp';


test('renders learn react link', () => {
  const wrapper = shallow(<QuoteBookApp />);
  const quoteBookApp = findByTestAttr(wrapper, 'component-quotebookapp');
  expect(quoteBookApp.length).toBe(1);
});
