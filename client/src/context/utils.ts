import { IBestBidBuy, BondQuote, LookUpTables } from './types';


export const processBestBidBuy = (quotes: BondQuote[], tables: LookUpTables): IBestBidBuy => {

  const bestBidBuy = quotes.reduce((acc: any, item: BondQuote) => {

    // accountId and bondId filter
    const accountMatch = tables.accounts.find(account => account.id === item.accountId);
    const bondMatch = tables.bonds.find(bond => bond.id === item.bondId);

    if (!accountMatch) throw `No account matching accountId ${item.accountId}`
    if (!bondMatch) throw `No account matching bondId ${item.bondId}`

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

  return bestBidBuy;
}
