import React from "react"
import { AgGridReact } from 'ag-grid-react';
import { AgWraper } from './styles';


type TableProps = {
  onCellClicked?: (params: any) => void;
  columnDefs: any;
  rowData: any;
}

const Table = (props: TableProps) => {

  // TODO: what type is this!?
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
