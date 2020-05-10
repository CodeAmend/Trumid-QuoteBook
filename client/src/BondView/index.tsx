import React from "react"

import { useQuotebook } from '../context/hooks';
import { columnDefs } from './columnDefs';
import { ViewWrapper, Header } from './styles';

import Table from '../Table';


const BondView = () => {
  const { depthOfBook, selectedBond } = useQuotebook();

  if (!selectedBond) {
    return null;
  }

  return(
    <ViewWrapper> 
      <Header>
        <h1>Bond View</h1>
      </Header>
    </ViewWrapper>
  )
}

export default BondView;
        // <p><strong>Name: </strong>{depthOfBook[selectedBond].bondName}</p>
      // <Table
      //   columnDefs={columnDefs}
      //   rowData={selectedBondData}
      // />
