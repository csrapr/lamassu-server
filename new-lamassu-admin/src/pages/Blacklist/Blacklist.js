import { useQuery, useMutation } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import gql from 'graphql-tag'
import * as R from 'ramda'
import React, { useState, useEffect } from 'react'

import Modal from 'src/components/Modal'
import { Link } from 'src/components/buttons'
import Sidebar from 'src/components/layout/Sidebar'
import TitleSection from 'src/components/layout/TitleSection'
// import { P } from 'src/components/typography'

import styles from './Blacklist.styles'
import BlacklistTable from './BlacklistTable'

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

const SAVE_CONFIG = gql`
  mutation Save($config: JSONObject) {
    saveConfig(config: $config)
  }
`

const GET_INFO = gql`
  query getData {
    config
  }
`

const Blacklist = () => {
  const { data: blacklistResponse } = useQuery(GET_BLACKLIST)
  const { data: configData } = useQuery(GET_INFO)
  const classes = useStyles()
  const blacklistData = R.path(['blacklist'])(blacklistResponse) ?? []
  const groupByCode = R.groupBy(obj => obj.cryptoCode)
  const formattedData = groupByCode(blacklistData)
  const availableCurrencies =
    R.path(['cryptoCurrencies'], blacklistResponse) ?? []

  const [clickedItem, setClickedItem] = useState({})
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setClickedItem({
      code: R.path([0, 'code'], availableCurrencies),
      display: R.path([0, 'display'], availableCurrencies)
    })
  }, [availableCurrencies])

  const onClickSidebarItem = e => {
    setClickedItem({ code: e.code, display: e.display })
  }

  const [deleteEntry] = useMutation(DELETE_ROW, {
    onCompleted: () => console.log('deleted row! TODO'),
    onError: () => console.error('Error while deleting row'),
    refetchQueries: () => ['getBlacklistData']
  })

  const [saveConfig] = useMutation(SAVE_CONFIG, {
    refetchQueries: () => ['getData']
  })

  const isSelected = it => {
    return clickedItem.code === it.code
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      <TitleSection title="Blacklisted addresses">
        <Link onClick={toggleModal}>Blacklist new addresses</Link>
      </TitleSection>
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
            saveConfig={saveConfig}
            configData={configData}
          />
        </div>
      </Grid>
      {showModal && (
        <Modal
          handleClose={toggleModal}
          open={true}
          title="New compliance trigger"></Modal>
      )}
    </>
  )
}

export default Blacklist