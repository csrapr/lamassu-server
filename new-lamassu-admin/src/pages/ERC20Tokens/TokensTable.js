import { makeStyles } from '@material-ui/core/styles'
import * as R from 'ramda'
import React from 'react'

import { IconButton } from 'src/components/buttons'
import DataTable from 'src/components/tables/DataTable'
import { Label1 } from 'src/components/typography'
import { ReactComponent as DeleteIcon } from 'src/styling/icons/action/delete/enabled.svg'

import styles from './ERC20Tokens.styles'

const useStyles = makeStyles(styles)

const TokensTable = ({ data, handleDeleteEntry }) => {
  const classes = useStyles()

  const elements = [
    {
      name: 'coinName',
      header: <Label1 className={classes.white}>{'Coin Name'}</Label1>,
      width: 300,
      textAlign: 'left',
      size: 'sm',
      view: it => (
        <div className={classes.addressRow}>{R.path(['coinName'], it)}</div>
      )
    },
    {
      name: 'tickerSymbol',
      header: <Label1 className={classes.white}>{'Ticker Symbol'}</Label1>,
      width: 200,
      textAlign: 'left',
      size: 'sm',
      view: it => (
        <div className={classes.addressRow}>{R.path(['tickerSymbol'], it)}</div>
      )
    },
    {
      name: 'contractAddress',
      header: (
        <Label1 className={classes.white}>{'ETH Contract Address'}</Label1>
      ),
      width: 600,
      textAlign: 'left',
      size: 'sm',
      view: it => <div>{R.path(['contractAddress'], it)}</div>
    },
    {
      name: 'deleteButton',
      header: <Label1 className={classes.white}>{'Delete'}</Label1>,
      width: 100,
      textAlign: 'center',
      size: 'sm',
      view: it => (
        <IconButton
          className={classes.deleteButton}
          onClick={() => handleDeleteEntry(R.path(['id'], it))}>
          <DeleteIcon />
        </IconButton>
      )
    }
  ]

  return (
    <>
      <DataTable data={data} elements={elements} name="ercTokensTable" />
    </>
  )
}

export default TokensTable
