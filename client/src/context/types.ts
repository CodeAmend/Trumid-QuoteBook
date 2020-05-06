export type BondMaster = {
  id: string;
  name: string;
}

export type AccountMaster = {
  id: number;
  name: string;
}

export type BondQuote = {
  accountId: number;
  bondId: string;
  createdAt: string;
  id: string;
  price: number;
  qty: number;
  sequence: number
  side: "S" | "B";
  updatedAt: string;
  reqId?: string;
}

export type QuoteAction = {
  action: "N" | "C" | "C";
  quote: BondQuote;
}


export type LookUpTables = {
  bonds: BondMaster[];
  accounts: AccountMaster[];
}

export interface IUseQuoteBook {
  lookupTables: LookUpTables;
  updateQuoteBook: () => void; 
  quoteBook: BondQuote[],
  bestBidBuy: BestBidBuy[];
}

export type BidBuy = {
  qty: string;
  price: string;
  client: string;
}
export interface BondsByName {
  [key: string]: {
    bid: BidBuy[];
    offer: BidBuy[];
  }
}

export interface BestBidBuy {
  bondName: string;
  bid: BidBuy; 
  offer: BidBuy; 
}
