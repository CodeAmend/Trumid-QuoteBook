import { mockDepthOfBook, mockAccountMaster } from './mocks';


// TODO: This was supposed to save time, but they are too complex and require a lot of specific mock data to be setup.

const mockReplaceQuote = {
  accountId: 0,
  bondId: "onBidBond",
  createdAt: "2020-05-07T03:26:22.572Z",
  id: "01e5aa41e92f7ce542e4cf686b9f4c7869d56f79",
  price: 10,
  qty: 1000000,
  requestId: "0yr6l",
  sequence: 1,
  side: "B",
  updatedAt: "2020-05-07T03:26:24.062Z",
}

describe("updateQuoteOnBook", () => {
  it("it updates the same client", () => {
    const state = {
      accountMaster: mockAccountMaster,
      depthBook: mockDepthOfBook,
      bondMaster: [],
    }

  });
  it("", () => { });
});
