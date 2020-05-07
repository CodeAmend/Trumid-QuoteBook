import { DepthOfBook, ReducerState, BondQuote } from './types';
import { addNewQuoteToBook } from './utils';


enum Sides {
  BUY = "B",
  SELL = "S",
} 

type MockQuote = {
  side: Sides.BUY | Sides.SELL;
  price: number;
  qty: number;
  bondId: "bond1" | "bond2";
  accountId: 0 | 1;
}

const mockBondMaster = [
  { id: "bond1", name: "AAA" },
  { id: "bond2", name: "BBB" },
  { id: "bond3", name: "CCC" },
]

const mockAccountMaster = [
  { id: 0, name: "AB" },
  { id: 1, name: "XY" },
]

const getNewMockDepthOfBook = () => JSON.parse(JSON.stringify(({
  "bond1":{
    bondId:"bond1",
    bondName:"CCC",
    bids:[],
    offers:[],
  },
  "bond2": {
    bondId:"bond2",
    bondName:"AAA",
    bids: [
      { client: "AB", price: "10.25", qty: "1000000" },
      { client: "XY", price: "20.75", qty: "2000000" },
  ],offers:[]},

  "bond3": {
    bondId:"bond3",
    bondName:"BBB",
    bids:[],
    offers: [
      { client: "AB", price: "10.25", qty: "1000000" },
      { client: "XY", price: "20.75", qty: "2000000" },
    ],
  },
})));


export const getMockeQuote = ({ bondId, accountId, side, price, qty }: MockQuote) => ({
  bondId,
  accountId,
  side,
  price,
  qty,

  id: "abc",
  requestId: "0yr6l",
  sequence: 1,
  createdAt: "2020-05-07T03:26:22.572Z",
  updatedAt: "2020-05-07T03:26:24.062Z",
});

describe("Add Bid/Offer to depthBook", () => {
  let state: ReducerState;
  let quote1: BondQuote;

  beforeEach(() => {
    state = {
      accountMaster: mockAccountMaster,
      bondMaster: mockBondMaster,
      depthOfBook: getNewMockDepthOfBook(),
    }


  });

  describe("buy", () => {
    let mockDepthOfBook: DepthOfBook;
    let testDepthOfBook: DepthOfBook;
    let quote1: BondQuote;
    let quote2: BondQuote;

    beforeEach(() => {
      // BUY
      mockDepthOfBook = getNewMockDepthOfBook();
      quote1 = getMockeQuote({
        bondId: "bond1",
        accountId: 0,
        side: Sides.BUY,
        price: 10,
        qty: 1000000,
      });

      quote2 = getMockeQuote({
        bondId: "bond2",
        accountId: 1,
        side: Sides.BUY,
        price: 10,
        qty: 1000000,
      });
    });

    it("adds new", () => {
      const bond1 = mockDepthOfBook["bond1"];
      expect(bond1.bids.length).toBe(0)

      testDepthOfBook = addNewQuoteToBook(state, quote1);
      const testBond1 = testDepthOfBook["bond1"];
      expect(testBond1.bids.length).toBe(1)
    });

    it("adds new quote to non empty offer length", () => {
      const bond1 = mockDepthOfBook["bond1"];
      expect(bond1.bids.length).toBe(0)

      // Add two different bonds with different clients
      testDepthOfBook = addNewQuoteToBook(state, quote1);
      testDepthOfBook = addNewQuoteToBook(state, quote2);
      const testBond1 = testDepthOfBook["bond1"];
      expect(testBond1.bids.length).toBe(1)
    });

    // Add two different bonds with SAME clients
    it("combines existing client bond", () => {})
  });

  describe("sell", () => {
    let mockDepthOfBook: DepthOfBook;
    let testDepthOfBook: DepthOfBook;
    let quote1: BondQuote;
    let quote2: BondQuote;

    beforeEach(() => {
      // BUY
      mockDepthOfBook = getNewMockDepthOfBook();
      quote1 = getMockeQuote({
        bondId: "bond1",
        accountId: 0,
        side: Sides.SELL,
        price: 10,
        qty: 1000000,
      });

      quote2 = getMockeQuote({
        bondId: "bond2",
        accountId: 1,
        side: Sides.SELL,
        price: 10,
        qty: 1000000,
      });
    });

    it("adds new", () => {
      const bond1 = mockDepthOfBook["bond1"];
      expect(bond1.offers.length).toBe(0)

      testDepthOfBook = addNewQuoteToBook(state, quote1);
      const testBond1 = testDepthOfBook["bond1"];
      expect(testBond1.offers.length).toBe(1)
    });

    it("adds new quote to non empty offer length", () => {
      const bond1 = mockDepthOfBook["bond1"];
      expect(bond1.offers.length).toBe(0)

      // Add two different bonds with different clients
      testDepthOfBook = addNewQuoteToBook(state, quote1);
      testDepthOfBook = addNewQuoteToBook(state, quote2);
      const testBond1 = testDepthOfBook["bond1"];
      expect(testBond1.offers.length).toBe(1)
    });

    // Add two different bonds with SAME clients
    it("combines existing client bond", () => {})
  });
});
