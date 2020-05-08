import React from "react"
import { GridSizeChangedEvent } from 'ag-grid-community';
import { DepthOfBookItem } from '../context/types';
import { AgGridReact } from 'ag-grid-react';
import { AgWraper } from './styles';


type TableProps = {
  onCellClicked?: (params: any) => void;
  columnDefs: any;
  rowData: any;
}

const Table = (props: TableProps) => {

  // TODO: what type is this!?
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

  const getRowNodeId = ({ bondId }: DepthOfBookItem) => {
    return bondId;
  }

  return(
    <AgWraper className="ag-theme-balham-dark">
      <AgGridReact
        {...props}
        // immutableData={true}
        // getRowNodeId={getRowNodeId}
        onGridSizeChanged={onGridSizeChanged}
        suppressScrollOnNewData={true}
      />
    </AgWraper>
  )
}

export default Table;
