import React from "react"
import { AgGridReact } from 'ag-grid-react';
import { useQuotebook } from '../context/hooks';
import { AgWraper } from './styles';
import { defaultColumnDefs, columnDefs } from './columnDefs';


const QuoteTable = () => {
  const { bestBidOffer } = useQuotebook();

  if (!bestBidOffer.length) return null;

  const onGridReady = (params: any) => {
    params.api.sizeColumnsToFit();
  }

  const onGridSizeChanged = (params: any) => {
    var gridWidth = document.getElementById('grid-wrapper')?.offsetWidth || 0;
    const columnsToShow: any = [];
    const columnsToHide: any = [];
    let totalColsWidth = 0;
    const allColumns = params.columnApi.getAllColumns();
    for (let i = 0; i < allColumns.length; i++) {
      const column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.api.sizeColumnsToFit();
  }

  return(
    <AgWraper className="ag-theme-balham-dark">
      <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColumnDefs}
          rowData={bestBidOffer}
          onGridReady={onGridReady}
          onGridSizeChanged={onGridSizeChanged}

      />
    </AgWraper>
  )
}

export default QuoteTable;
