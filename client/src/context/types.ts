export type Action = 'N' | 'U' | 'C';

export type Side = "S" | "B";

export type SelectItem = { value: string, label: string };

export type BondMaster = {
  id: string;
  name: string;
}

export type BondMasterKeyBook = {
  [key: string]: number;
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
  requestId: string;
}

export interface CreateQuote {
  accountId: number;
  bondId: string;
  side: Side;
  price: number;
  qty: number;
  requestId?: string;
  action?: Action;
}

export interface CancelQuote {
  requestId: string;
  quoteId: string;
}

export interface ReplaceQuote {
  price: number;
  qty: number;
  quoteId: string;
  requestId?: string;
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

export interface BestBidOffer {
  bondName: string;
  bondId: string;
  bid: QuoteFigures; 
  offer: QuoteFigures; 
}

export type DepthOfBook = {
  bondId: string;
  bondName: string;
  ready?: boolean;
  bids: QuoteFigures[];
  offers: QuoteFigures[];
}

export type UserQuote = {
  bondId: string;
  quoteId: string;
  bondName: string;
  clientName: string;
  requestId: string;
  side: string;
  qty: number;
  price: number;
}

export type BondViewData = any;

export type ReducerState = {
  depthOfBook: DepthOfBook[];
  accountMaster: AccountMaster[];
  bondMaster: BondMaster[];
  bondMasterKeyBook: BondMasterKeyBook;
  bondViewData: BondViewData[];
}

export type QuoteBookContext = {
  socket: any;
  dispatch: any;
  selectedBond: string;
  setSelectedBond: (boindId: string) => void;
  depthOfBook: DepthOfBook[];
  accountMaster: AccountMaster[];
  bondMasterKeyBook: BondMasterKeyBook;
  bondMaster: BondMaster[];
  latestBondId: string;
  userQuotes: UserQuote[];
  bondViewData: BondViewData[];
  // TODO: what to do about React.useEffect setters for typescript
  setUserQuotes: any;
}

export interface QuoteBookHooks {
  createQuote: (request: CreateQuote) => void;
  replaceQuote: (request: ReplaceQuote) => void;
  cancelQuote: (requestId: string) => void;
  selectedBond: string;
  bondMaster: BondMaster[];
  accountMaster: AccountMaster[];
  setSelectedBond: (bondId: string) => void;
  depthOfBook: DepthOfBook[];
  latestBondId: string;
  userQuotes: UserQuote[];
  getBookItemByBondId: (bondId: string) => DepthOfBook;
  bondMasterKeyBook: BondMasterKeyBook;
  bondViewData: BondViewData[];
  initBondView: () => void;
  selectedBondName: string;
}

