import React from "react"
import { useQuotebook } from '../context/hooks';

import Table from '../Table';
import { columnDefs } from './columnDefs';

import { ViewWrapper, Header } from './styles';


const AllView = () => {
  const { bestBidOffer, setSelectedBond } = useQuotebook();
  console.log(bestBidOffer)

  if (!bestBidOffer.length) return null;

  const onRowClicked = ({ data }: any) => {
    setSelectedBond(data.bondId)
  }

  return(
    <ViewWrapper>
      <Header>
        <h1>All Bonds View</h1>
      </Header>
      <Table
        columnDefs={columnDefs}
        rowData={bestBidOffer}
        onRowClicked={onRowClicked}
      />
    </ViewWrapper>
  )
}

export default AllView;
