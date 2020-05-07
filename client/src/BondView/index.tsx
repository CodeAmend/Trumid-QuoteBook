import React from "react"
import { useQuotebook } from '../context/hooks';
import { columnDefs } from './columnDefs';
import Table from '../Table';
import { ViewWrapper, Header } from './styles';


const BondView = () => {
  const { selectedBond, setSelectedBond, selectedBondData } = useQuotebook();

  return(
    <ViewWrapper>
      <Header>
        <h1>{selectedBond}</h1>
        <button onClick={() => setSelectedBond('')}>Go Back</button>

      </Header>
      <Table columnDefs={columnDefs} rowData={selectedBondData} />
    </ViewWrapper>
  )
}

export default BondView;
