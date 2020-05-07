import {
  QuoteFigures,
  BondQuote,
  ReducerState,
  DepthOfBook,
  BestBidOffer,
} from './types';


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


export const addNewQuoteToBook = (state: ReducerState, quote: BondQuote): DepthOfBook => {
  const { accountMaster, depthOfBook: book } = state;
  const { qty, price, bondId, accountId } = quote;
  const client = accountMaster[accountId].name;
  const item = book[bondId];
  const figures: QuoteFigures = { client, qty, price };

  if (quote.side === 'B') {
    item.bids.push(figures)
    item.bids = item.bids.sort(byPrice)
  } else { // Side === 'S'
    item.offers.push(figures);
  }
  return book;
}

export const updateQuoteOnBook = (state: ReducerState, quote: BondQuote): DepthOfBook => {
  const { accountMaster, depthOfBook } = state;
  const { qty, price, bondId, accountId } = quote;
  const client = accountMaster[accountId].name;
  const item = depthOfBook[bondId];

  const figures: QuoteFigures = { client, qty, price };

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

export const getBestBidsFromBondIdKeyValues = (depthOfBook: DepthOfBook): BestBidOffer[] => {
  const topBidOffers: BestBidOffer[] = [];

  for (let [, { bondName, bids, offers, bondId }] of Object.entries(depthOfBook)) {
    // TODO: find out if we should display a bond with no quotes
    if (bids.length || offers.length) {
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
