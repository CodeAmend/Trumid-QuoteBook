import { priceFormat, qtyFormat } from '../context/utils';

const agQtyFormatter = ({ value }: { value: number }): string => value ? qtyFormat(value) : '';
const agPriceFormatter = ({ value }: { value: number }): string => value ? priceFormat(value) : '';




// TODO: might be able to handle `bestBidOffer` here instead of hook!!!
export const defaultColumnDefs = {
}

export const columnDefs = [
  {
    headerName: "Client",
    field: "offer.client",
    width: 50,
  },

  {
    headerName: "qty",
    field: "offer.qty",
    valueFormatter: agQtyFormatter,
    width: 50,
  },

  {
    headerName: "Price",
    field: "offer.price",
    valueFormatter: agPriceFormatter,
    width: 50,
  },

  {
    headerName: "Price",
    field: "bid.price",
    valueFormatter: agPriceFormatter,
    width: 50,
  },

  {
    headerName: "qty",
    field: "bid.qty",
    width: 50,
    valueFormatter: agQtyFormatter,
  },

  {
    headerName: "Client",
    field: "bid.client",
    width: 50
  },
];

