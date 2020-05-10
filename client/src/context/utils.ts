import {
  QuoteFigures,
  BondQuote,
  ReducerState,
  DepthOfBook,
  BestBidOffer,
  QuoteAccepted,
  UserQuote,
  BondMaster,
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

export const addNewQuoteToBook = (state: ReducerState, quote: BondQuote): DepthOfBook[] => {
  const { accountMaster, depthOfBook } = state;
  const { qty, price, side, bondId, accountId } = quote;
  const { name } = accountMaster[accountId];

  // MasterKeyBook, keps from iterating the depthOfBook array
  const bondIndex = state.bondMasterKeyBook[bondId];
  // Mutable bond
  const currentBond = depthOfBook[bondIndex];
  currentBond.ready = true;

  const figures: QuoteFigures = { client: name, qty, price, quoteId: quote.id };

  // TODO: Maybe a way to clean this up. 
  // Lots of weird code for performance
  if (side === 'B') {
    const currentIsBest = currentBond.bids.some(bid => bid.price > quote.price);
    if (currentIsBest && currentBond.bids.length > 1) {
      const prev = currentBond.bids[0];
      currentBond.bids[0] = figures;
      currentBond.bids.push(prev);
    } else {
      currentBond.bids.push(figures)
    }
  } else {
    const currentIsBest = currentBond.offers.some(offer => offer.price < quote.price);
    if (currentIsBest && currentBond.offers.length > 1) {
      const prev = currentBond.offers[0];
      currentBond.offers[0] = figures;
      currentBond.offers.push(prev);
    } else {
      currentBond.offers.push(figures)
    }
  }
  return state.depthOfBook;
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


export const updateQuoteOnBook = (state: ReducerState, quote: BondQuote): DepthOfBook[] => {
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

export const removeQuoteFromBook = (state: ReducerState, quote: BondQuote): DepthOfBook[] => {
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

// export const getBondsWithBestQuotes = (depthOfBook: DepthOfBook): BestBidOffer[] => {
//   const topBidOffers: BestBidOffer[] = [];

//   if (!Object.keys(depthOfBook).length) {
//     return [];
//   }

//   for (let [, { bondName, bids, offers, bondId }] of Object.entries(depthOfBook)) {
//     const showBondsWithoutData = true;
//     if (bids.length || offers.length || showBondsWithoutData) {
//       const bestBid: QuoteFigures = bids.sort(byPrice)[0];
//       const bestOffer: QuoteFigures = offers.sort(byPrice)[0];

//       topBidOffers.push({
//         bondName,
//         bondId,
//         bid: bestBid || null,
//         offer: bestOffer || null,
//       })
//     } 
//   }
//   return topBidOffers; 
// }

// export const getingSingleBondWithQuotes = (depthOfBook: DepthOfBook[], bondId: string): BestBidOffer[] => {
//   if (!bondId) return []; 

//   const { bondName, bids, offers, } = depthOfBook.find(book => book.bondId === bondId);
//   const maxLength = Math.max(bids.length, offers.length);

//   let bondData: BestBidOffer[] = [];
//   for (let i = 0; i < maxLength; i++) {
//     const bid = bids[i];
//     const offer = offers[i];
    
//     bondData.push({
//       bondId,
//       bondName,
//       bid: bid[0],
//       offer: offer[0],
//     });
//   }
//   return bondData;
// }

