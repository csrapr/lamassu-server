import * as R from 'ramda'
import React from 'react'

import DataTable from 'src/components/tables/DataTable'

const BlacklistTable = ({ data, selectedCoin }) => {
  const elements = [
    {
      header: 'Cryptocode',
      width: 180,
      textAlign: 'center',
      size: 'sm',
      view: R.path(['cryptoCode'])
    },
    {
      header: 'Address',
      width: 380,
      textAlign: 'center',
      size: 'sm',
      view: R.path(['address'])
    },
    {
      header: 'Created by Operator',
      width: 180,
      textAlign: 'center',
      size: 'sm',
      view: it => (it.createdByOperator ? 'Yes' : 'No')
    }
  ]

  const dataToShow = selectedCoin ? data[selectedCoin] : data[R.keys(data)[0]]

  return <DataTable elements={elements} data={dataToShow} />
}

export default BlacklistTable
