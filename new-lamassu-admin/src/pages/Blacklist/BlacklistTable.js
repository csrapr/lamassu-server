import * as R from 'ramda'
import React from 'react'

import { IconButton } from 'src/components/buttons'
import DataTable from 'src/components/tables/DataTable'
import { H4, Label1 } from 'src/components/typography'
import CopyToClipboard from 'src/pages/Transactions/CopyToClipboard'
import { ReactComponent as DeleteIcon } from 'src/styling/icons/action/delete/enabled.svg'

const BlacklistTable = ({ data, selectedCoin, deleteEntry }) => {
  const onDelete = (cryptoCode, address) => {
    deleteEntry({ variables: { cryptoCode, address } })
  }

  const elements = [
    {
      name: 'address',
      header: <Label1 style={{ color: 'white' }}>{'Addresses'}</Label1>,
      width: 600,
      textAlign: 'left',
      size: 'sm',
      view: it => <CopyToClipboard>{R.path(['address'], it)}</CopyToClipboard>
    },
    {
      name: 'deleteButton',
      header: <Label1 style={{ color: 'white' }}>{'Delete'}</Label1>,
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
      <H4>{`${selectedCoin} blacklisted addresses`}</H4>
      <DataTable data={dataToShow} elements={elements} name="blacklistTable" />
    </>
  )
}

export default BlacklistTable
