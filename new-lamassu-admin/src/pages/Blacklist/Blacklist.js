import { useQuery, useMutation } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import gql from 'graphql-tag'
import * as R from 'ramda'
import React, { useState, useEffect } from 'react'

import Sidebar from 'src/components/layout/Sidebar'
import { H1 } from 'src/components/typography'

import styles from './Blacklist.styles'
import BlacklistTable from './BlacklistTable'
// import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(styles)

const DELETE_ROW = gql`
  mutation DeleteBlacklistRow($cryptoCode: String, $address: String) {
    deleteBlacklistRow(cryptoCode: $cryptoCode, address: $address)
  }
`

const GET_BLACKLIST = gql`
  query getBlacklistData {
    blacklist {
      cryptoCode
      address
    }
    cryptoCurrencies {
      display
      code
    }
  }
`

const Blacklist = () => {
  const { data: blacklistResponse } = useQuery(GET_BLACKLIST)
  const classes = useStyles()
  const blacklistData = R.path(['blacklist'])(blacklistResponse) ?? []
  const groupByCode = R.groupBy(obj => obj.cryptoCode)
  const formattedData = groupByCode(blacklistData)
  const availableCurrencies =
    R.path(['cryptoCurrencies'], blacklistResponse) ?? []

  const [clickedItem, setClickedItem] = useState(
    R.path([0, 'code'], availableCurrencies)
  )

  useEffect(() => {
    setClickedItem(R.path([0, 'code'], availableCurrencies))
  }, [availableCurrencies])

  const onClickSidebarItem = e => {
    setClickedItem(e.code)
  }

  const [deleteEntry] = useMutation(DELETE_ROW, {
    onCompleted: () => console.log('deleted row! TODO'),
    onError: () => console.error('Error while deleting row'),
    refetchQueries: () => ['getBlacklistData']
  })

  const isSelected = it => {
    return clickedItem === it.code
  }

  return (
    <>
      <H1>{'Blacklisted addresses'}</H1>
      <Grid container className={classes.grid}>
        <Sidebar
          data={availableCurrencies}
          isSelected={isSelected}
          displayName={it => it.display}
          onClick={onClickSidebarItem}
        />
        <div className={classes.content}>
          <BlacklistTable
            data={formattedData}
            selectedCoin={clickedItem}
            deleteEntry={deleteEntry}
          />
        </div>
      </Grid>
    </>
  )
}

export default Blacklist
