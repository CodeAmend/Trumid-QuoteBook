import React from "react"
import { CellClickedEvent } from 'ag-grid-community';

import { useQuotebook } from '../context/hooks';
import { columnDefs } from './columnDefs';
import { ViewWrapper, Header } from './styles';

import Table from '../Table';


const BondView = () => {
  const { depthOfBook, selectedBond, selectedBondData } = useQuotebook();

  if (!selectedBond) {
    return null;
  }

  const onCellClicked = ({ data, column }: CellClickedEvent) => {
    const colGroupName = column.getColId().split('.')[0];
    const { quoteId } = data[colGroupName];
    console.log(quoteId)
  }

  return(
    <ViewWrapper> 
      <Header>
        <h1>Bond View</h1>
        <p><strong>Name: </strong>{depthOfBook[selectedBond].bondName}</p>
      </Header>
      <Table
        columnDefs={columnDefs}
        rowData={selectedBondData}
        onCellClicked={onCellClicked}
      />
    </ViewWrapper>
  )
}

export default BondView;
