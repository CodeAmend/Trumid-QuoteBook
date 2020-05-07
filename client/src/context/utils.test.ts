import { DepthOfBookItem, QuoteFigures, DepthOfBook, ReducerState, BondQuote } from './types';
import { addNewQuoteToBook, updateQuoteOnBook, removeQuoteFromBook } from './utils';


enum Sides {
  BUY = "B",
  SELL = "S",
} 

type MockQuote = {
  side: Sides.BUY | Sides.SELL;
  bondId: "bond1" | "bond2";
  accountId: 0 | 1 | 2;
  price?: number;
  qty?: number;
}

const mockBondMaster = [
  { id: "bond1", name: "AAA" },
  { id: "bond2", name: "BBB" },
  { id: "bond3", name: "CCC" },
]

const mockAccountMaster = [
  { id: 0, name: "AB" },
  { id: 1, name: "XY" },
  { id: 2, name: "ZZ" },
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
  price: price || 10,
  qty: qty || 1000000,

  id: "abc",
  requestId: "0yr6l",
  sequence: 1,
  createdAt: "2020-05-07T03:26:22.572Z",
  updatedAt: "2020-05-07T03:26:24.062Z",
});

describe("addNewQuoteToBook", () => {
  let state: ReducerState;

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

describe("updateQuoteOnBook", () => {
  let state: ReducerState;

  const getQuoteMasterClientName = (quote: BondQuote) => {
    return state.accountMaster.find(am => am.id === quote.accountId);
  }
  
  const findClientNameInBond = (clientName: string, bond: DepthOfBookItem, typeName?: string) => {
    return bond[typeName || "bids"].find((b: QuoteFigures) => b.client === clientName);
  }

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
        accountId: 2,
        side: Sides.BUY,
        price: 10,
        qty: 1000000,
      });

      quote2 = getMockeQuote({
        bondId: "bond2",
        accountId: 1,
        side: Sides.BUY,
        price: 10,
        qty: 10000000,
      });
    });



    it("update does nothing when quote doesnt", () => {
      // Bond 2 only has bids and no offers
      const bond2 = mockDepthOfBook["bond2"];
      // QUOTE 1
      const quote1Client = getQuoteMasterClientName(quote1);
      
      const hasMatchingClient = findClientNameInBond(quote1Client?.name || '', bond2)
      expect(hasMatchingClient).toBeUndefined()

      // Prove nothing hapens during update
      const testDepthOfBook = updateQuoteOnBook(state, quote1);
      const testBond2 = testDepthOfBook['bond2'];
      expect(testBond2.bids).toEqual(bond2.bids);
    });

    it("update changes matching client", () => {
      const bond2 = mockDepthOfBook["bond2"];

      // Get master account client
      const quote2Client = getQuoteMasterClientName(quote2);
      expect(quote2Client).toBeTruthy();
      
      const matchingBondClient = findClientNameInBond(quote2Client?.name || '', bond2);
      expect(matchingBondClient).toBeTruthy()

      // Prove update hapens
      const testDepthOfBook = updateQuoteOnBook(state, quote2);
      const testBond2 = testDepthOfBook['bond2'];
      expect(testBond2.bids).not.toEqual(bond2.bids);
      
      const testBondMatchingClient = testDepthOfBook['bond2'].bids
        .find(b => b.client === quote2Client?.name)

      expect(testBondMatchingClient).toEqual({ client: 'XY', price: 10, qty: 10000000 })
    });

  });
});

describe("removeQuoteOnBook", () => {
  let state: ReducerState;

  const getQuoteMasterClientName = (quote: BondQuote) => {
    return state.accountMaster.find(am => am.id === quote.accountId);
  }
  
  const findClientNameInBond = (clientName: string, bond: DepthOfBookItem, typeName?: string) => {
    return bond[typeName || "bids"].find((b: QuoteFigures) => b.client === clientName);
  }

  beforeEach(() => {
    state = {
      accountMaster: mockAccountMaster,
      bondMaster: mockBondMaster,
      depthOfBook: getNewMockDepthOfBook(),
    }
  });

  describe("buy", () => {
    let mockDepthOfBook: DepthOfBook;

    beforeEach(() => {
      mockDepthOfBook = getNewMockDepthOfBook();
    });



    it("it removes bond with matching client", () => {
      let bondItem: QuoteFigures;
      const mockBond = mockDepthOfBook['bond2']
      const clientName = 'XY'

      bondItem = findClientNameInBond(clientName, mockBond)
      expect(bondItem).toBeTruthy;

      let findByClient = mockDepthOfBook['bond2'].bids.find(b => b.client === clientName);
      expect(findByClient).toBeTruthy();

      const testQuote = getMockeQuote({ bondId: 'bond2', accountId: 1, side: Sides.BUY })
      const testDepthOfBook = removeQuoteFromBook(state, testQuote);

      const updatedBids = testDepthOfBook['bond2'].bids;
      expect(updatedBids.length).toBe(1);

      findByClient = testDepthOfBook['bond2'].bids.find(b => b.client === clientName);
      expect(findByClient).toBeFalsy();

    });

  });
});

