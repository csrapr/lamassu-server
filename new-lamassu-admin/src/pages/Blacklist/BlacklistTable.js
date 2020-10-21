import * as R from 'ramda'
import React from 'react'

import TitleSection from 'src/components/layout/TitleSection'
import DataTable from 'src/components/tables/DataTable'
import CopyToClipboard from 'src/pages/Transactions/CopyToClipboard'
import { formatCryptoAddress } from 'src/utils/coin'

const formatAddress = (cryptoCode = '', address = '') =>
  formatCryptoAddress(cryptoCode, address).replace(/(.{5})/g, '$1 ')

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
      header: 'Addresses',
      width: 380,
      textAlign: 'center',
      size: 'sm',
      view: it => (
        <CopyToClipboard>
          {formatAddress(R.path(['cryptoCode'])(it), R.path(['address'])(it))}
        </CopyToClipboard>
      )
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

  return (
    <>
      <TitleSection title={`${selectedCoin} blacklisted addresses`} />
      <DataTable elements={elements} data={dataToShow} />
    </>
  )
}

export default BlacklistTable
