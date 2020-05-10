import React from "react"
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { GridSizeChangedEvent } from 'ag-grid-community';
import { DepthOfBook } from '../context/types';

import { AgWraper } from './styles';


const Table = (props: AgGridReactProps) => {
  const onGridSizeChanged = (params: GridSizeChangedEvent) => {
    var gridWidth = document.getElementById('grid-wrapper')?.offsetWidth || 0;
    const columnsToShow: any = [];
    const columnsToHide: any = [];
    let totalColsWidth = 0;
    const allColumns = params.columnApi.getAllColumns();
    for (let i = 0; i < allColumns.length; i++) {
      const column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.getColId());
      } else {
        columnsToShow.push(column.getColId());
      }
    }
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.api.sizeColumnsToFit();
  }

  const getRowNodeId = (params: DepthOfBook): string => {
    return params.bondId;
  }

  return(
    <AgWraper className="ag-theme-balham-dark">
      <AgGridReact
        {...props}
        // immutableData={true}
        getRowNodeId={getRowNodeId}
        onGridSizeChanged={onGridSizeChanged}
        suppressScrollOnNewData={true}
      />
    </AgWraper>
  )
}

export default Table;
