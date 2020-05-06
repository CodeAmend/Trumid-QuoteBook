export type BondMaster = {
  id: string;
  name: string;
}

export type AccountMaster = {
  id: number;
  name: string;
}

export type QuoteAction = {
  action: "N" | "C" | "C";
  quote: BondQuote;
}


export type LookUpTables = {
  bonds: BondMaster[];
  accounts: AccountMaster[];
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

export interface CreateQuote {
  accountId: number;
  bondId: string;
  side: 'B' | 'S';
  price: number;
  qty: number;
  requestId: string;
}

export interface ReplaceQuote {
  price: number;
  qty: number;
  quoteId: string;
  requestId: string;
}

export interface QuoteAccepted {
  action: 'N' | 'U' | 'C';
  quote: BondQuote;
  requestId: string;
}

export interface QuoteRejected {
  errors: string[];
  requestId: string;
}

export interface CancelQuote {
  requestId: string;
  quoteId: string;
}

export interface IUseQuoteBook {
  lookupTables: LookUpTables;
  quoteBook: BondQuote[],
  bestBidBuy: BestBidBuy[];
  updateQuoteBook: () => void; 
  subscribeToQuotes: () => void;
  unsubscribeFromQuotes: () => void;
  createQuote: (request: CreateQuote) => void;
  replaceQuote: (request: ReplaceQuote) => void;
  cancelQuote: () => void;
}
