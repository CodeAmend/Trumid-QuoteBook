import {
  QuoteFigures,
  BondQuote,
  ReducerState,
  DepthOfBook,
} from './types';


// TODO: These mutate objects, should they?
export const addNewQuoteToBook = (state: ReducerState, quote: BondQuote): DepthOfBook => {
  const { accountMaster, depthOfBook: book } = state;
  const { qty, price, bondId, accountId } = quote;
  const client = accountMaster[accountId].name;
  const item = book[bondId];
  const figures: QuoteFigures = { client, qty: qtyFormat(qty), price: priceFormat(price) };

  if (quote.side === 'B') {
    item.bids.push(figures)
    item.bids = item.bids.sort(byPrice)
  } else { // Side === 'S'
    item.offers.push(figures);
  }
  return book;
}

export const updateQuoteOnBook = (state: ReducerState, quote: BondQuote): DepthOfBook => {
  const { accountMaster, depthOfBook: book } = state;
  const { qty, price, bondId, accountId } = quote;
  const client = accountMaster[accountId].name;
  const item = book[bondId];

  const figures: QuoteFigures = { client, qty: qtyFormat(qty), price: priceFormat(price) };

  if (quote.side === 'B') {
    item.bids.map(bid => bid.client === client ? figures : bid);
    item.bids = item.bids.sort(byPrice)
  } else { // Side === 'S'
    item.offers.map(bid => bid.client === client ? figures : bid);
    item.offers = item.offers.sort(byPrice)
  }
  return book;
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
}

export const priceFormat = (price: number): string => {
  return '$' + price;
}

export const qtyFormat = (qty: number): string => {
  return '' + qty;
}

const sorter = (sortType: string) => (a: any, b: any) => {
  if (a[sortType] > b[sortType]) return 1;
  if (a[sortType] < b[sortType]) return 2;
  return -1;
}

export const byPrice = sorter('price');



// export const getBestBidsFromBondIdKeyValues = (bondIdKeyValues: BondsByBondIdKey): BondsByBids[] => {
//   const topBidOffers: BondsByBids[] = [];

//   for (let [bondId, { bondName, bid, offer }] of Object.entries(bondIdKeyValues)) {
//     const bestBid: QuoteFigures = bid.sort(byPrice)[0];
//     const bestOffer: QuoteFigures = offer.sort(byPrice)[0];
//     topBidOffers.push({
//       bondName,
//       bondId,
//       bid: bestBid || null,
//       offer: bestOffer || null,
//     })
//   }
//   return topBidOffers; 
// }


// export const combineSnapshotsToBondIdKeyValues = (props: SnapshotProps): BondsByBondIdKey => {
//   const { quoteBook, accountMaster, bondMaster } = props;

//   const reducedBondsByBondIdKey = quoteBook.reduce((acc: BondsByBondIdKey, item: BondQuote) => {
//     const { qty, price, bondId } = item;

//     const matchingAccount = accountMaster.find(account => account.id === item.accountId);

//     // TODO: convert to lookup map object key
//     const matchingBond = bondMaster.find(bond => bond.id === bondId);


//     if (!matchingAccount) {
//       throw new Error(`No account matching accountId ${item.accountId}`)
//     }

//     if (!matchingBond) {
//       throw new Error(`No account matching bondId ${bondId}`)
//     }
    
//     // Chreate new KEY value of bondId and bondName, bid, offer
//     if (!acc[bondId]) {
//       acc[bondId] = {
//         bondName: matchingBond.name,
//         bid: [],
//         offer: [],
//       };
//     } 

//     const bidBuyItem = {
//       qty: qtyFormat(qty),
//       price: priceFormat(price),
//       client: matchingAccount.name
//     }

//     if (item.side === 'B') {
//      acc[bondId].offer.push(bidBuyItem);
//     }

//     if (item.side === 'S') {
//      acc[bondId].bid.push(bidBuyItem);
//     } 

//     return acc;
//   }, {});

//   return reducedBondsByBondIdKey;
// }
