import React from "react"
import { AgGridReact } from 'ag-grid-react';
// import { Table } from './styles';
// import { BestBidOffer } from '../context/types';
import { useQuotebook } from '../context/hooks';
import styled from 'styled-components';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

const AgWraper = styled.section`
  width: 1400px;
  height: 100vh;
`;

const QuoteTable = () => {
  const { bestBidOffer } = useQuotebook();

  if (!bestBidOffer.length) return null;

  const columnDefs = [
    { headerName: "Bond", field: "bondName" },
    { headerName: "Client", field: "offer.client" },
    { headerName: "qty", field: "offer.qty" },
    { headerName: "Price", field: "offer.price" },
    { headerName: "Price", field: "bid.price" },
    { headerName: "qty", field: "bid.price" },
    { headerName: "Client", field: "bid.client" },
  ];

  const onGridReady = (params: any) => {
    params.api.sizeColumnsToFit();
  }

  return(
    <AgWraper className="ag-theme-balham-dark">
      <AgGridReact
          columnDefs={columnDefs}
          rowData={bestBidOffer}
          onGridReady={onGridReady}
      />
    </AgWraper>
  )
}

export default QuoteTable;
