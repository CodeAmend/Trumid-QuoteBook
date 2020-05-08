export type Action = 'N' | 'U' | 'C';

export type Side = "S" | "B";

export type SelectItem = { value: string, label: string };

export type BondMaster = {
  id: string;
  name: string;
}

export type AccountMaster = {
  id: number;
  name: string;
}

export type QuoteAction = {
  action: Action;
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
  side: Side;
  updatedAt: string;
  reqId?: string;
}

export interface CreateQuote {
  accountId: number;
  bondId: string;
  side: Side;
  price: number;
  qty: number;
  requestId?: string;
}

export interface CancelQuote {
  requestId: string;
  quoteId: string;
}

export interface ReplaceQuote {
  price: number;
  qty: number;
  quoteId: string;
  requestId: string;
}

export interface QuoteAccepted {
  action: Action;
  quote: BondQuote;
  requestId: string;
}

export interface QuoteRejected {
  errors: string[];
  requestId: string;
}

export type QuoteFigures = {
  qty: number;
  price: number;
  client: string;
  quoteId: string;
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
  agId: string;
  bid: QuoteFigures; 
  offer: QuoteFigures; 
}

export type DepthOfBookItem = {
  bondId: string;
  bondName: string;
  ready?: boolean;
  agId: string;
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
  // bestBidOfferUpdate: BestBidOffer;
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
  bondMaster: BondMaster[];
  accountMaster: AccountMaster[];
  setSelectedBond: (bondId: string) => void;
  depthOfBook: DepthOfBook;
  bestBidOffer: BestBidOffer[];
  selectedBondData: BondViewProps[];
  // bestBidOfferUpdate: BestBidOffer;
}
