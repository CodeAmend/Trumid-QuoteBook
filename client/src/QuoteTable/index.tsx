import React from "react"
import { AgGridReact } from 'ag-grid-react';
import { useQuotebook } from '../context/hooks';
import { AgWraper } from './styles';
import { columnDefs } from './columnDefs';


const QuoteTable = () => {
  const { bestBidOffer } = useQuotebook();

  if (!bestBidOffer.length) return null;

  const onGridReady = (params: any) => {
    params.api.sizeColumnsToFit();
    console.log(params)
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
