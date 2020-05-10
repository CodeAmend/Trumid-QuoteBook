import { priceFormat, qtyFormat } from '../context/utils';

const agQtyFormatter = ({ value }: { value: number }): string => value ? qtyFormat(value) : '';
const agPriceFormatter = ({ value }: { value: number }): string => value ? priceFormat(value) : '';

const getWith = (sideName: string, key: string) => ({ data }: any) => {
  return data && data[sideName][0] && data[sideName][0][key];
}

console.log(getWith('offer', 'client')({ hi: 9 }) && 1)

export const columnDefs = [
  {
    headerName: "Bond",
    field: "bondName",
    width: 100,
  },

  {
    headerName: "Client",
    // field: "offer.client",
    valueGetter: getWith('offers', 'client'),
    width: 50,
  },

  {
    headerName: "qty",
    valueGetter: getWith('offers', 'qty'),
    valueFormatter: agQtyFormatter,
    width: 50,
  },

  {
    headerName: "Price",
    valueGetter: getWith('offers', 'price'),
    valueFormatter: agPriceFormatter,
    width: 50,
  },

  {
    headerName: "Price",
    field: "bid.price",
    valueGetter: getWith('bids', 'price'),
    valueFormatter: agPriceFormatter,
    width: 50,
  },

  {
    headerName: "qty",
    field: "bid.qty",
    valueGetter: getWith('bids', 'qty'),
    width: 50,
    valueFormatter: agQtyFormatter,
  },

  {
    headerName: "Client",
    field: "bid.client",
    valueGetter: getWith('bids', 'client'),
    width: 50
  },
];
