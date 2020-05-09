import React from "react"
import {
  GridApi,
  CellClickedEvent,
  GridReadyEvent,
} from 'ag-grid-community';
import { useQuotebook } from '../context/hooks';
import { DepthOfBookItem } from '../context/types';
import { columnDefs } from './columnDefs';

import Table from '../Table';
import { ViewWrapper, Header } from './styles';



const AllView = () => {
  const { selectedBond, setSelectedBond, latestBondId, bestBidOffer } = useQuotebook();
  const gridApi = React.useRef<GridApi>();

  // TODO: set 
  const onGridReady = ({ api }: GridReadyEvent): void => {
    gridApi.current = api;
    api.setRowData(bestBidOffer);
  }

  const getRowNodeId = (params: DepthOfBookItem): string => {
    return params.bondId;
  }

  const updateLatestRowChange = (): void => {
    const latestRow = bestBidOffer.find(b => b.bondId === latestBondId);
    if (latestRow) {
      gridApi.current?.applyTransactionAsync({ update: [latestRow]});
    }
  }

  const onCellClicked = ({ data }: CellClickedEvent): void => {
    setSelectedBond(data.bondId)
  }

  // Watch for latest bondId and call for update
  React.useEffect(updateLatestRowChange, [latestBondId]);


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
        getRowNodeId={getRowNodeId}
        columnDefs={columnDefs}
        onCellClicked={onCellClicked}
      />
    </ViewWrapper>
  )
}

export default AllView;
