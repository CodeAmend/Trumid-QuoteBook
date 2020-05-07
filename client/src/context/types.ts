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
  qty: number;
  price: number;
  client: string;
}

export type BondsByBondIdKey = {
  [key: string]: {
    bondName: string;
    bid: QuoteFigures[];
    offer: QuoteFigures[];
  }
}

export interface BestBidOffer {
  bondName: string;
  bondId: string;
  bid: QuoteFigures; 
  offer: QuoteFigures; 
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

export type ReducerState = {
  depthOfBook: DepthOfBook;
  accountMaster: AccountMaster[];
  bondMaster: BondMaster[];
}

export interface QuoteBookContext {
  socket: any;
  dispatch: any;
  depthOfBook: DepthOfBook;
  accountMaster: AccountMaster[];
  bondMaster: BondMaster[];
  selectedBond: string;
  setSelectedBond: (boindId: string) => void;
}

export type BondViewProps = {
  bid: QuoteFigures;
  offer: QuoteFigures;
}

export interface QuoteBookHooks {
  createQuote: (request: CreateQuote) => void;
  replaceQuote: (request: ReplaceQuote) => void;
  cancelQuote: () => void;
  selectedBond: string;
  setSelectedBond: (bondId: string) => void;
  depthOfBook: DepthOfBook;
  bestBidOffer: BestBidOffer[];
  selectedBondData: BondViewProps[];
}
