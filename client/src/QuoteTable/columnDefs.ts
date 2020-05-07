import { priceFormat, qtyFormat } from '../context/utils';

const agQtyFormatter = ({ value }: { value: number }): string => value ? qtyFormat(value) : '';
const agPriceFormatter = ({ value }: { value: number }): string => value ? priceFormat(value) : '';

export const columnDefs = [
  { headerName: "Bond", field: "bondName" },
  { headerName: "Client", field: "offer.client" },
  { headerName: "qty", field: "offer.qty", valueFormatter: agQtyFormatter },
  { headerName: "Price", field: "offer.price", valueFormatter: agPriceFormatter },
  { headerName: "Price", field: "bid.price" },
  { headerName: "qty", field: "bid.price" },
  { headerName: "Client", field: "bid.client" },
];
