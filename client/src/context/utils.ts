import {
  BidBuy,
  BondsByName,
  BestBidBuy,
  BondQuote,
  LookUpTables,
} from './types';


const sorter = (sortType: string) => (a: any, b: any) => {
  if (a[sortType] > b[sortType]) return 1;
  if (a[sortType] < b[sortType]) return 2;
  return -1;
}
const byPrice = sorter('price');


export const getBestBidsFromReducedBonds = (bondsByName: BondsByName): BestBidBuy[] => {
  const topBidOffers: BestBidBuy[] = [];

  for (let [bondName, { bid, offer }] of Object.entries(bondsByName)) {
    const bestBid: BidBuy = bid.sort(byPrice)[0];
    const bestOffer: BidBuy = offer.sort(byPrice)[0];
    topBidOffers.push({
      bondName,
      bid: bestBid || null,
      offer: bestOffer || null,
    })
  }
  return topBidOffers; 
}

export const reduceBondQuotes = (quotes: BondQuote[], tables: LookUpTables): BondsByName => {
  const bondsByName = quotes.reduce((acc: any, item: BondQuote) => {

    // accountId and bondId filter
    const accountMatch = tables.accounts.find(account => account.id === item.accountId);
    const bondMatch = tables.bonds.find(bond => bond.id === item.bondId);

    if (!accountMatch) throw new Error(`No account matching accountId ${item.accountId}`)
    if (!bondMatch) throw new Error(`No account matching bondId ${item.bondId}`)

    // Initial object with Bond name keys 
    if (!acc[bondMatch.name]) acc[bondMatch.name] = { bid: [], offer: [] };

    // Bid and Sell fields are the same for both
    const { qty, price } = item;
    const bidBuyItem = { qty, price, client: accountMatch.name }

    // Separete buy and sell and use previous field bidBuyItem
    // Offer and Bid
    if (item.side === 'B') acc[bondMatch.name].offer.push(bidBuyItem);
    if (item.side === 'S') acc[bondMatch.name].bid.push(bidBuyItem);

    return acc;
  }, {});

  return bondsByName;
}
