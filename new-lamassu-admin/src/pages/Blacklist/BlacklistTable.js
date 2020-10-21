import * as R from 'ramda'
import React from 'react'

import { IconButton } from 'src/components/buttons'
import TitleSection from 'src/components/layout/TitleSection'
import DataTable from 'src/components/tables/DataTable'
import CopyToClipboard from 'src/pages/Transactions/CopyToClipboard'
import { ReactComponent as DeleteIcon } from 'src/styling/icons/action/delete/enabled.svg'

const BlacklistTable = ({ data, selectedCoin, deleteEntry }) => {
  const onDelete = (cryptoCode, address) => {
    deleteEntry({ variables: { cryptoCode, address } })
  }

  const elements = [
    {
      name: 'address',
      header: 'Addresses',
      width: 600,
      textAlign: 'left',
      size: 'sm',
      view: it => <CopyToClipboard>{R.path(['address'], it)}</CopyToClipboard>
    },
    {
      name: 'deleteButton',
      header: 'Delete',
      width: 100,
      textAlign: 'center',
      size: 'sm',
      view: it => (
        <IconButton
          onClick={() =>
            onDelete(R.path(['cryptoCode'], it), R.path(['address'], it))
          }>
          <DeleteIcon />
        </IconButton>
      )
    }
  ]

  const dataToShow = selectedCoin ? data[selectedCoin] : data[R.keys(data)[0]]
  return (
    <>
      <TitleSection title={`${selectedCoin} blacklisted addresses`} />
      <DataTable data={dataToShow} elements={elements} name="blacklistTable" />
    </>
  )
}

export default BlacklistTable
