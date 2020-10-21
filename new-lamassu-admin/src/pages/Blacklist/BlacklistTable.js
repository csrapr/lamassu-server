import { Box } from '@material-ui/core'
import * as R from 'ramda'
import React from 'react'

import Tooltip from 'src/components/Tooltip'
import { IconButton } from 'src/components/buttons'
import { Switch } from 'src/components/inputs'
import DataTable from 'src/components/tables/DataTable'
import { H4, Label1, Label2, P } from 'src/components/typography'
import CopyToClipboard from 'src/pages/Transactions/CopyToClipboard'
import { ReactComponent as DeleteIcon } from 'src/styling/icons/action/delete/enabled.svg'
import { fromNamespace, toNamespace } from 'src/utils/config'

const BlacklistTable = ({
  data,
  selectedCoin,
  deleteEntry,
  saveConfig,
  configData
}) => {
  const onDelete = (cryptoCode, address) => {
    deleteEntry({ variables: { cryptoCode, address } })
  }

  const complianceConfig =
    configData?.config && fromNamespace('compliance')(configData.config)
  const rejectAddressReuse = complianceConfig?.rejectAddressReuse ?? false
  const addressReuseSave = rawConfig => {
    const config = toNamespace('compliance')(rawConfig)
    return saveConfig({ variables: { config } })
  }

  const headingStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  }

  const elements = [
    {
      name: 'address',
      header: <Label1 style={{ color: 'white' }}>{'Addresses'}</Label1>,
      width: 800,
      textAlign: 'left',
      size: 'sm',
      view: it => (
        <div style={{ marginLeft: '8px' }}>
          <CopyToClipboard>{R.path(['address'], it)}</CopyToClipboard>
        </div>
      )
    },
    {
      name: 'deleteButton',
      header: <Label1 style={{ color: 'white' }}>{'Delete'}</Label1>,
      width: 130,
      textAlign: 'center',
      size: 'sm',
      view: it => (
        <IconButton
          style={{ paddingLeft: '13px' }}
          onClick={() =>
            onDelete(R.path(['cryptoCode'], it), R.path(['address'], it))
          }>
          <DeleteIcon />
        </IconButton>
      )
    }
  ]
  const dataToShow = selectedCoin
    ? data[selectedCoin.code]
    : data[R.keys(data)[0]]

  return (
    <>
      <H4 style={headingStyles}>
        {selectedCoin.display
          ? `${selectedCoin.display} blacklisted addresses`
          : ''}{' '}
        <Box display="flex" alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="end"
            mr="-5px">
            <P>Reject reused addresses</P>
            <Switch
              checked={rejectAddressReuse}
              onChange={event => {
                addressReuseSave({ rejectAddressReuse: event.target.checked })
              }}
              value={rejectAddressReuse}
            />
            <Label2>{rejectAddressReuse ? 'On' : 'Off'}</Label2>
            <Tooltip width={304}>
              <P>
                The "Reject reused addresses" option means that all addresses
                that are used once will be automatically rejected if there's an
                attempt to use them again on a new transaction.
              </P>
            </Tooltip>
          </Box>
        </Box>
      </H4>
      <DataTable data={dataToShow} elements={elements} name="blacklistTable" />
    </>
  )
}

export default BlacklistTable
