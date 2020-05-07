export type BondMaster = {
  id: string;
  name: string;
}

export type AccountMaster = {
  id: number;
  name: string;
}

export type QuoteAction = {
  action: "N" | "C" | "U";
  quote: BondQuote;
}

export type SnapshotProps = {
  quoteBook: BondQuote[];
  accountMaster: AccountMaster[];
  bondMaster: BondMaster[];
}

export interface BondQuote {
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

export type QuoteFigures = {
  qty: string;
  price: string;
  client: string;
}

export type BondsByBondIdKey = {
  [key: string]: {
    bondName: string;
    bid: QuoteFigures[];
    offer: QuoteFigures[];
  }
}

export interface BondsByBids {
  bondName: string;
  bondId: string;
  bid: QuoteFigures; 
  offer: QuoteFigures; 
}

export interface QuoteBookHooks {
  createQuote: (request: CreateQuote) => void;
  replaceQuote: (request: ReplaceQuote) => void;
  cancelQuote: () => void;
  depthOfBook: DepthOfBook;
}

export type DepthOfBookItem = {
  bondId: string;
  bondName: string;
  bids: QuoteFigures[];
  offers: QuoteFigures[];
}

export type DepthOfBook = {
  [key: string]: DepthOfBookItem;
}

export interface QuoteBook {
  [key: string]: {
    bondName: string;
    bid: QuoteFigures[];
    offer: QuoteFigures[];
  }
}

export type ReducerState = {
  depthOfBook: DepthOfBook;
  accountMaster: AccountMaster[];
  bondMaster: BondMaster[];
}
