import React from "react"
import { CellClickedEvent } from 'ag-grid-community';
import { useQuotebook } from '../context/hooks';

import Table from '../Table';
import { columnDefs } from './columnDefs';

import { ViewWrapper, Header } from './styles';


const AllView = () => {
  const { selectedBond, bestBidOffer, setSelectedBond } = useQuotebook();

  if (selectedBond)  {
    return null;
  };

  const onCellClicked = ({ data }: CellClickedEvent) => {
    setSelectedBond(data.bondId)
  }

  return (
    <ViewWrapper>
      <Header>
        <h1>All Bond View</h1>
      </Header>
      <Table
        columnDefs={columnDefs}
        rowData={bestBidOffer}
        onCellClicked={onCellClicked}
      />
    </ViewWrapper>
  )
}

export default AllView;
