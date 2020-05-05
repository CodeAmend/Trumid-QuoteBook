export type BondAction = "N" | "C" | "C";

export type BondMaster = {
  id: number;
  name: string;
}

export type AccountMaster = {
  id: string;
  name: string;
}

export type LookUpTables = {
  bonds: BondMaster[];
  accounts: AccountMaster[];
}

export type BondQuote = {
  accountId: number;
  bondId: string;
  createdAt: string;
  id: string;
  price: number;
  reqId: string;
  qty: number;
  sequence: number
  side: "S" | "B";
  updatedAt: string;
}

export interface QuoteAction {
  action: BondAction;
  quote: BondQuote;
}

export interface IUseQuoteBook {
  lookupTables: LookUpTables;
  updateQuoteBook: () => void; 
  quoteBook: BondQuote[],
}
