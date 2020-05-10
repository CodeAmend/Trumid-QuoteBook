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
  const { latestBondId, getBookItemByBondId, setSelectedBond, depthOfBook } = useQuotebook();
  const gridApi = React.useRef<GridApi>();

   React.useEffect(() => {
     if (depthOfBook[0]) {
       const bookItem = getBookItemByBondId(latestBondId);
       gridApi.current?.applyTransaction({ update: depthOfBook })
     }
   }, [latestBondId]);
  

  const onGridReady = ({ api }: GridReadyEvent): void => {
    gridApi.current = api;
    api.setRowData(depthOfBook);
  }

  const onCellClicked = ({ data }: CellClickedEvent): void => {
    setSelectedBond(data.bondId)
  }

  return (
    <ViewWrapper>
      <Header>
        <h1>All Bond View</h1>
      </Header>

      {depthOfBook.length && (
        <Table
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          onCellClicked={onCellClicked}
        />
      )}
    </ViewWrapper>
  )
}

export default AllView;
