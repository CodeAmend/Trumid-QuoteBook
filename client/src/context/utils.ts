import {
  QuoteFigures,
  BondQuote,
  ReducerState,
  DepthOfBook,
  BestBidOffer,
  QuoteAccepted,
  UserQuote,
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
  }
}

export const addNewQuoteToBook = (state: ReducerState, quote: BondQuote): DepthOfBook => {
  const { accountMaster, depthOfBook: book } = state;
  const { qty, price, bondId, accountId } = quote;
  const { name } = accountMaster[accountId];

  const item = book[bondId];
  const figures: QuoteFigures = { client: name, qty, price, quoteId: quote.id };

  if (quote.side === 'B') {
    item.bids.push(figures)
    item.bids = item.bids.sort(byPrice)
  } else { // Side === 'S'
    item.offers.push(figures);
  }

  // TODO: figure a better way to not hack this
  // I currently need this because I need to see when this was updated the first time.
  item.ready = true;
  return book;
}

export const updateQuoteOnBook = (state: ReducerState, quote: BondQuote): DepthOfBook => {
  const { accountMaster, depthOfBook } = state;
  const { qty, price, bondId, accountId } = quote;
  const client = accountMaster[accountId].name;
  const item = depthOfBook[bondId];

  const figures: QuoteFigures = { client, qty, price, quoteId: quote.id };

  // TODO: Refactor this messy code!!!
  if (quote.side === 'B') {
    item.bids = item.bids.map(bid => bid.client === client ? figures : bid);
  } else { // Side === 'S'
    item.offers = item.offers.map(bid => bid.client === client ? figures : bid);
    item.offers = item.offers.sort(byPrice)
  }
  return depthOfBook;
}

export const removeQuoteFromBook = (state: ReducerState, quote: BondQuote) => {
  const { accountMaster, depthOfBook } = state;
  const { accountId, side, bondId } = quote;
  const clientName = accountMaster[accountId].name;

  const item = depthOfBook[bondId];
  if (side === 'B') {
    item.bids = item.bids.filter(bid => bid.client !== clientName);
  } else {
    item.offers = item.offers.filter(offer => offer.client !== clientName);
  }
  return depthOfBook;
}

export const getBondsWithBestQuotes = (depthOfBook: DepthOfBook): BestBidOffer[] => {
  const topBidOffers: BestBidOffer[] = [];

  if (!Object.keys(depthOfBook).length) {
    return [];
  }

  for (let [, { bondName, bids, offers, bondId }] of Object.entries(depthOfBook)) {
    const showBondsWithoutData = true;
    if (bids.length || offers.length || showBondsWithoutData) {
      const bestBid: QuoteFigures = bids.sort(byPrice)[0];
      const bestOffer: QuoteFigures = offers.sort(byPrice)[0];

      topBidOffers.push({
        bondName,
        bondId,
        bid: bestBid || null,
        offer: bestOffer || null,
      })
    } 
  }
  return topBidOffers; 
}

export const getingSingleBondWithQuotes = (depthOfBook: DepthOfBook, bondId: string): BestBidOffer[] => {
  if (!bondId) return []; 

  const { bondName, bids, offers, } = depthOfBook[bondId];
  const maxLength = Math.max(bids.length, offers.length);

  let bondData: BestBidOffer[] = [];
  for (let i = 0; i < maxLength; i++) {
    const bid = bids[i];
    const offer = offers[i];
    
    bondData.push({
      bondId,
      bondName,
      bid,
      offer,
    });
  }
  return bondData;
}
