import React from 'react';
import {
  BidBuy,
  BondsByBondIdKey,
  BondQuote,
  BondsByBids,
  QuoteBookPayload,
} from './types';


const priceFormat = (price: number): string => {
  return '$' + price;
}

const qtyFormat = (qty: number): string => {
  return '' + qty;
}

const sorter = (sortType: string) => (a: any, b: any) => {
  if (a[sortType] > b[sortType]) return 1;
  if (a[sortType] < b[sortType]) return 2;
  return -1;
}
const byPrice = sorter('price');



export const getBestBidsFromReducedBonds = (bondIdKeyValues: BondsByBondIdKey): BondsByBids[] => {
  const topBidOffers: BondsByBids[] = [];

  for (let [bondId, { bondName, bid, offer }] of Object.entries(bondIdKeyValues)) {
    const bestBid: BidBuy = bid.sort(byPrice)[0];
    const bestOffer: BidBuy = offer.sort(byPrice)[0];
    topBidOffers.push({
      bondName,
      bondId,
      bid: bestBid || null,
      offer: bestOffer || null,
    })
  }
  return topBidOffers; 
}


export const reduceBondQuotes = (props: QuoteBookPayload): BondsByBondIdKey => {
  const { quotes, accountMaster, bondMaster } = props;

  const reducedBondsByBondIdKey = quotes.reduce((acc: BondsByBondIdKey, item: BondQuote) => {
    const { qty, price, bondId } = item;

    const matchingAccount = accountMaster.find(account => account.id === item.accountId);
    const matchingBond = bondMaster.find(bond => bond.id === bondId);

    if (!matchingAccount) throw new Error(`No account matching accountId ${item.accountId}`)
    if (!matchingBond) throw new Error(`No account matching bondId ${bondId}`)

    // Chreate new KEY value of bondId and bondName, bid, offer
    if (!acc[bondId]) acc[bondId] = {
      bondName: matchingBond.name,
      bid: [],
      offer: [],
    };

    const bidBuyItem = {
      qty: qtyFormat(qty),
      price: priceFormat(price),
      client: matchingAccount.name
    }
    if (item.side === 'B') acc[bondId].offer.push(bidBuyItem);
    if (item.side === 'S') acc[bondId].bid.push(bidBuyItem);

    return acc;
  }, {});

  return reducedBondsByBondIdKey;
}

// Trick to make like componentDidMount, no lint error for missing dependency
export const useMountEffect = (func: () => void) => React.useEffect(func, []);

