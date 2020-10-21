import { useQuery } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import gql from 'graphql-tag'
import * as R from 'ramda'
import React, { useState, useEffect } from 'react'

import Sidebar from 'src/components/layout/Sidebar'
import TitleSection from 'src/components/layout/TitleSection'

import styles from './Blacklist.styles'
import BlacklistTable from './BlacklistTable'
// import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(styles)

const GET_BLACKLIST = gql`
  {
    blacklist {
      createdByOperator
      cryptoCode
      address
    }
    cryptoCurrencies {
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
    R.path(['cryptoCurrencies'])(blacklistResponse) ?? []

  const [clickedItem, setClickedItem] = useState(
    R.path([0, 'code'], availableCurrencies)
  )

  useEffect(() => {
    setClickedItem(R.path([0, 'code'], availableCurrencies))
  }, [availableCurrencies])

  const onClickSidebarItem = e => {
    setClickedItem(e.code)
  }

  const isSelected = it => {
    return clickedItem === it.code
  }

  return (
    <>
      <TitleSection title="Blacklisted addresses" />
      <Grid container className={classes.grid}>
        <Sidebar
          data={availableCurrencies}
          isSelected={isSelected}
          displayName={it => it.code}
          onClick={onClickSidebarItem}
        />
        <div className={classes.content}>
          <BlacklistTable data={formattedData} selectedCoin={clickedItem} />
        </div>
      </Grid>
    </>
  )
}

export default Blacklist
