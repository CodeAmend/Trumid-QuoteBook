import React from "react"
import { CellClickedEvent } from 'ag-grid-community';

import { useQuotebook } from '../context/hooks';
import { columnDefs } from './columnDefs';
import { ViewWrapper, Header } from './styles';

import Table from '../Table';


const BondView = () => {
  const { depthOfBook, selectedBond, selectedBondData } = useQuotebook();

  const onCellClicked = ({ data, column }: CellClickedEvent) => {
    const colGroupName = column.getColId().split('.')[0];
    const { quoteId } = data[colGroupName];
    console.log(quoteId)
  }

  if (!selectedBond) {
    return null;
  }

  return(
    <ViewWrapper> 
      <Header>
        <h1>Bond View</h1>
        <p><strong>Name: </strong>{depthOfBook[selectedBond].bondName}</p>
      </Header>
      <Table
        // onGridReady={onGridReady}
        columnDefs={columnDefs}
        rowData={selectedBondData}
        onCellClicked={onCellClicked}
      />
    </ViewWrapper>
  )
}

export default BondView;
