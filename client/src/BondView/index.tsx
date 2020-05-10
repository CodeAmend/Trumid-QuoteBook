import React from "react"
import { GridApi, GridReadyEvent } from 'ag-grid-community';
// import { DepthOfBook } from '../context/types';

import { useQuotebook } from '../context/hooks';
import { columnDefs } from './columnDefs';
import { ViewWrapper, Header } from './styles';

import Table from '../Table';


const BondView = () => {
  const { depthOfBook, selectedBond, bondMasterKeyBook } = useQuotebook();
  const gridApi = React.useRef<GridApi>();

  const getRowData = (): any => {
    const bondIndex = bondMasterKeyBook[selectedBond];
    const bondData = depthOfBook[bondIndex];
    const { bondId, bondName, bids, offers } = bondData;

    let rowData: any = [];

    const maxLength = Math.max(bids.length, offers.length);

    for (let bidIndex = 0; bidIndex < maxLength; bidIndex++) {
      const bid = bids[bidIndex];
      const offer = offers[bidIndex];
      rowData.push({
        bondId,
        bondName,
        bid: bid && {
          client: bid.client,
          price: bid.price,
          qty: bid.qty,
        },
        offer: offer && {
          client: offer.client,
          price: offer.price,
          qty: offer.qty,
        },
      });
    }

    console.log(rowData)

    return rowData;
  }

  React.useEffect(() => {
    if (selectedBond && gridApi.current) {
      console.log(gridApi.current)
      gridApi.current?.setRowData(getRowData());
    }
  }, [selectedBond, gridApi.current])

  const onGridReady = ({ api }: GridReadyEvent): void => {
    gridApi.current = api;
    api.setRowData(depthOfBook);
  }


  if (!selectedBond) {
    return null;
  }

  return(
    <ViewWrapper> 
      <Header>
        <h1>Bond View</h1>
      </Header>
      <p><strong>Name: </strong>BOND</p>
      <Table
        onGridReady={onGridReady}
        columnDefs={columnDefs}
      />
    </ViewWrapper>
  )
}

export default BondView;
