import React from "react"
import {
  GridApi,
  CellClickedEvent,
  GridReadyEvent,
} from 'ag-grid-community';
import { useQuotebook } from '../context/hooks';
import { columnDefs } from './columnDefs';

import Table from '../Table';
import { ViewWrapper, Header } from './styles';



const AllView = () => {
  const { selectedBond, setSelectedBond, latestBondId, bestBidOffer } = useQuotebook();
  const gridApi = React.useRef<GridApi>();

  const onGridReady = ({ api }: GridReadyEvent): void => {
    gridApi.current = api;
    api.setRowData(bestBidOffer);
  }

  const onCellClicked = ({ data }: CellClickedEvent): void => {
    setSelectedBond(data.bondId)
  }

  const checkIfShouldUpdate = () => {
    const latestRow = bestBidOffer.find(b => b.bondId === latestBondId);
    if (latestRow) {
      gridApi.current?.applyTransactionAsync({ update: [latestRow]});
    }
  }

  // Watch for latest bondId and call for update
  React.useEffect(checkIfShouldUpdate, [latestBondId]);

  // If we make sure we have at least one update,
  // bestBidOffer will already be populated, so okay to render
  if (selectedBond || !latestBondId)  {
    return null;
  };

  return (
    <ViewWrapper>
      <Header>
        <h1>All Bond View</h1>
      </Header>
      
      <Table
        onGridReady={onGridReady}
        columnDefs={columnDefs}
        onCellClicked={onCellClicked}
      />
    </ViewWrapper>
  )
}

export default AllView;
