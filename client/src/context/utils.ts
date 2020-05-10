import {
  QuoteFigures,
  BondQuote,
  ReducerState,
  DepthOfBook,
  QuoteAccepted,
  UserQuote,
  BondMaster,
  BestBidOffer,
} from './types';

export const keyGen = () => Math.random().toString(36).substr(2,5);

export const priceFormat = (price: number): string => {
  return '$' + price;
}

export const qtyFormat = (qty: number): string => {
  return (qty/1000000).toFixed(2) + 'mm';
}

const sorter = (sortType: string) => (a: any, b: any) => {
  if (a[sortType] > b[sortType]) return 1;
  if (a[sortType] < b[sortType]) return 2;
  return -1;
}

export const byPrice = sorter('price');

export const createDepthOfBookTemplate = (bondMaster: BondMaster[]): DepthOfBook[] => {
  return bondMaster.reduce((acc: DepthOfBook[], bondItem: BondMaster) => {
    acc.push({
      bondId: bondItem.id,
      bondName: bondItem.name,
      bids: [],
      offers: [],
    });
    return acc;
  }, []);
}

export const reconcileQuotebook = (state: ReducerState, quotes: BondQuote[]): DepthOfBook[] => {
  const { depthOfBook } = state;

  quotes.forEach(quote => {
    addNewQuoteToBook(state, quote);
  });

  return depthOfBook;
}

export const reconcileWithMasters = (state: ReducerState, data: QuoteAccepted): UserQuote => {
  const { quote, requestId } = data;

  const bond = state.bondMaster.find(b => b.id === quote.bondId);
  const client = state.accountMaster.find(b => b.id === quote.accountId);

  if (!bond) {
    throw new Error(`Cannot find bond id: ${quote.bondId} in account master table`)
  }

  if (!client) {
    throw new Error(`Cannot find client id: ${quote.accountId} in account master table`)
  }

  return {
    bondId: bond.id,
    bondName: bond.name,
    clientName: client.name,
    side: quote.side,
    qty: quote.qty,
    price: quote.price,
    requestId,
    quoteId: quote.id,
  }
}

export const setPriceByHighest = (quote: BondQuote, currentBond: DepthOfBook, newFigure: QuoteFigures): void => {
  const { side } = quote;
  const { offers, bids } = currentBond;
  if (side === 'B') {
    if (offers.length > 1 && offers[0].price > quote.price) {
      const prev = offers[0];
      offers[0] = newFigure;
      offers.push(prev);
    } else {
      offers.push(newFigure);
    }
  } else { // Side === 'S'
    if (bids.length > 1 && bids[0].price > quote.price) {
      const prev = bids[0];
      bids[0] = newFigure;
      bids.push(prev);
    } else {
      bids.push(newFigure);
    }
  }
}

export const addNewQuoteToBook = (state: ReducerState, quote: BondQuote): DepthOfBook[] => {
  const { accountMaster, depthOfBook } = state;
  const { qty, price, bondId, accountId } = quote;
  const { name } = accountMaster[accountId];

  const bondIndex = state.bondMasterKeyBook[bondId];
  const currentBond = depthOfBook[bondIndex];

  currentBond.ready = true;

  const figures: QuoteFigures = { client: name, qty, price, quoteId: quote.id };

  setPriceByHighest(quote, currentBond, figures);
  return state.depthOfBook;
}

export const updateQuoteOnBook = (state: ReducerState, quote: BondQuote): DepthOfBook[] => {
  const { accountMaster, depthOfBook } = state;
  const { qty, price, bondId, accountId } = quote;
  const client = accountMaster[accountId].name;

  const bondIndex = state.bondMasterKeyBook[bondId];
  const currentBond: DepthOfBook = depthOfBook[bondIndex];

  const figures: QuoteFigures = { client, qty, price, quoteId: quote.id };

  setPriceByHighest(quote, currentBond, figures);
  return depthOfBook;
}

export const removeQuoteFromBook = (state: ReducerState, quote: BondQuote): DepthOfBook[] => {
  const { accountMaster, depthOfBook } = state;
  const { accountId, side, bondId } = quote;
  const clientName = accountMaster[accountId].name;

  const bondIndex = state.bondMasterKeyBook[bondId];
  const currentBond: DepthOfBook = depthOfBook[bondIndex];
  let { bids, offers } = currentBond;

  if (side === 'B') {
    currentBond.bids = bids.filter(bid => bid.client !== clientName);
  } else {
    currentBond.offers = offers.filter(offer => offer.client !== clientName);
  }
  return depthOfBook;
}

export const updateBondViewRowData = (state: ReducerState, selectedBond: string) => {
  const bondIndex = state.bondMasterKeyBook[selectedBond];
  const bondData = state.depthOfBook[bondIndex];
  const { bondName, bids, offers } = bondData;

  let rowData: any = [];

  const maxLength = Math.max(bids.length, offers.length);

  for (let bidIndex = 0; bidIndex < maxLength; bidIndex++) {
    const bid = bids[bidIndex];
    const offer = offers[bidIndex];


    // This is for agGrid to selectively update
    const agId = (bid?.quoteId || '') + (offer?.quoteId || '');

    rowData.push({
      bondId: selectedBond,
      bondName,
      agId,
      bid: bid && {
        client: bid.client,
        price: bid.price,
        qty: bid.qty,
      },
      offer: offer && {
        client: offer.client,
        price: offer.price,
        qty: offer.qty,
      },
    });
  }

  return rowData;
}
