import React from "react"
import { CellClickedEvent, GridReadyEvent } from 'ag-grid-community';
import { useQuotebook } from '../context/hooks';
import { DepthOfBookItem } from '../context/types';

import Table from '../Table';
import { ViewWrapper, Header } from './styles';

import { columnDefs } from './columnDefs';



const AllView = () => {
  const { selectedBond, setSelectedBond, bestBidOffer } = useQuotebook();

  if (selectedBond)  {
    return null;
  };

  const onCellClicked = ({ data }: CellClickedEvent) => {
    setSelectedBond(data.bondId)
  }

  // const applyTransactionAsync = { update: [recentBondUpdate]}

  // TODO: set 
  const onGridReady = ({ api }: GridReadyEvent) => {
    api.setRowData(bestBidOffer);
  }

  const getRowNodeId = ({ agId }: DepthOfBookItem) => {
    return agId;
  }

  return (
    <ViewWrapper>
      <Header>
        <h1>All Bond View</h1>
      </Header>
      <Table
        onGridReady={onGridReady}
        // applyTransactionAsync={applyTransactionAsync}
        getRowNodeId={getRowNodeId}
        columnDefs={columnDefs}
        onCellClicked={onCellClicked}
      />
    </ViewWrapper>
  )
}

export default AllView;
