import React from "react"
import {
  GridApi,
  CellClickedEvent,
  GridReadyEvent,
} from 'ag-grid-community';
import { DepthOfBook } from '../context/types';
import { useQuotebook } from '../context/hooks';
import { columnDefs } from './columnDefs';

import Table from '../Table';
import { ViewWrapper, Header } from './styles';


const AllView = () => {
  const { selectedBond, latestBondId, getBookItemByBondId, setSelectedBond, depthOfBook } = useQuotebook();
  const gridApi = React.useRef<GridApi>();

  React.useEffect(() => {
    if (depthOfBook[0]) {
      const bookItem = getBookItemByBondId(latestBondId);
      gridApi.current?.applyTransaction({ update: [bookItem] })
    }
  }, [latestBondId]);

  if (selectedBond) {
    return null;
  }

  const onGridReady = ({ api }: GridReadyEvent): void => {
    gridApi.current = api;
    api.setRowData(depthOfBook);
  }

  const onCellClicked = ({ data }: CellClickedEvent): void => {
    setSelectedBond(data.bondId)
  }

  const getRowNodeId = (params: DepthOfBook): string => {
    return params.bondId;
  }


  return (
    <ViewWrapper>
      <Header>
        <h1>All Bond View</h1>
      </Header>

      {depthOfBook.length && (
        <Table
          getRowNodeId={getRowNodeId}
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          onCellClicked={onCellClicked}
        />
      )}
    </ViewWrapper>
  )
}

export default AllView;
