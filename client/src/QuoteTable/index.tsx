import React from "react"
import { Table } from './styles';
import { BondsByBids } from '../context/types';
import { useQuotebook } from '../context/hooks';
import { getBestBidsFromBondIdKeyValues } from '../context/utils';

const QuoteTable = () => {
  const { depthOfBook } = useQuotebook();

  // TODO: TEMPORARY, most likely this will come from useQuoteHooks
  const bestBidOffer = getBestBidsFromBondIdKeyValues(depthOfBook);


  if (!bestBidOffer.length) return null;

  return(
    <Table>
      <thead>
        <tr>
          <th>Bond</th>
          <th>Client</th>
          <th>Qty</th>
          <th>Bid</th>
          <th>Offer</th>
          <th>Qty</th>
          <th>Client</th>
        </tr>
      </thead>
      <tbody>
        {bestBidOffer.map(({ bondName, bid, offer }: BondsByBids) => (
          <tr key={bondName}>
            <td>{bondName}</td>
            <td>{bid?.client}</td>
            <td>{bid?.qty}</td>
            <td>{bid?.price}</td>
            <td>{offer?.price}</td>
            <td>{offer?.qty}</td>
            <td>{offer?.client}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default QuoteTable;
