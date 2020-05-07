import React from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

import { useQuotebook } from './hooks';


// const mockAccountMaster = [
//   {id: 0, name: "BHC"},
//   {id: 1, name: "QAJM"},
//   {id: 2, name: "XY"},
//   {id: 3, name: "BP"},
//   {id: 4, name: "UC"},
// ];


describe('QuoteBook Context', () => {
  // I do not want to instantiate useContext, so I mock a context;
  // React.useContext = jest.fn().mockReturnValue({ socket, accountMasterSnapshot: [] })

  // let hooks: IUseQuoteBook;
  // beforeEach(() => {
  //   hooks = useQuotebook();
  // });


  test('accountMasterSnapshot', () => {
    // expect(hooks.accountMasterSnapshot).toEqual([]);
  });

  // test('bondMasterSnapshot', async done => {
  //   const { bondMasterSnapshot } = useQuotebook();
  // });
  // test('quoteBookSnapshot', async done => {
  //   const { quoteBookSnapshot } = useQuotebook();
  // });
});
