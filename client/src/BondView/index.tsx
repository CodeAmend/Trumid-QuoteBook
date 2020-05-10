import React from "react"
import { GridApi, GridReadyEvent } from 'ag-grid-community';

import { useQuotebook } from '../context/hooks';
import { columnDefs } from './columnDefs';
import { ViewWrapper, Header } from './styles';

import Table from '../Table';


const BondView = () => {
  const { initBondView, selectedBond, bondViewData } = useQuotebook();
  const gridApi = React.useRef<GridApi>();

  React.useEffect(() => {
    if (bondViewData.length && gridApi.current) {
      gridApi.current?.setRowData(bondViewData);
    }
  }, [bondViewData, gridApi.current])

  const onGridReady = ({ api }: GridReadyEvent): void => {
    gridApi.current = api;
    initBondView();
    api.setRowData(bondViewData);
  }

  const getRowNodeId = ({ agId }) => {
    return agId;
  }

  if (!selectedBond || !bondViewData.length) {
    return null;
  }

  return(
    <ViewWrapper> 
      <Header>
        <h1>Bond View</h1>
      </Header>
      <p><strong>Name: </strong>BOND</p>
      <Table
        getRowNodeId={getRowNodeId}
        onGridReady={onGridReady}
        columnDefs={columnDefs}
      />
    </ViewWrapper>
  )
}

export default BondView;
