import { makeStyles } from '@material-ui/core/styles'
import * as R from 'ramda'
import React, { useState } from 'react'

import Modal from 'src/components/Modal'
import { Link } from 'src/components/buttons'
import { TextInput } from 'src/components/inputs'
import coinValidator from 'src/utils/coins/coinValidator'

import styles from './Blacklist.styles'
const useStyles = makeStyles(styles)

const BlackListModal = ({
  showModal,
  toggleModal,
  selectedCoin,
  addToBlacklist
}) => {
  const classes = useStyles()

  const [addressField, setAddressField] = useState('')
  const [invalidAddress, setInvalidAddress] = useState(false)

  const handleChange = event => {
    if (event.target.value === '') {
      setInvalidAddress(false)
    }
    setAddressField(event.target.value)
  }

  const handleAddToBlacklist = () => {
    // textfield newline is a "\n"
    const addressesToAdd = R.map(R.trim, addressField.split('\n'))
    const badAddresses = []
    // for each address in the new array...
    addressesToAdd.forEach(address => {
      // checks if address isnt just a bunch of spaces, and validates that address
      if (
        address.trim() !== '' &&
        coinValidator[selectedCoin.code](address.trim())
      ) {
        // if valid, adds to blacklist
        addToBlacklist(selectedCoin.code, address.trim())
      } else if (address !== '') {
        // if not valid and not "", adds to bad address list
        badAddresses.push(address)
      }
    })
    if (badAddresses.length > 0) {
      // if 1 or more bad address in list, change textfield to red color
      setInvalidAddress(true)
      // revert the split by "\n" operation, then set address field as having only the bad addresses
      setAddressField(badAddresses.join('\n'))
    } else {
      // close the modal if everything OK
      handleClose()
    }
  }

  const handleClose = () => {
    setAddressField('')
    setInvalidAddress(false)
    toggleModal()
  }

  const placeholderAddress = {
    BTC: '1ADwinnimZKGgQ3dpyfoUZvJh4p1UWSSpD',
    ETH: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    LTC: 'LPKvbjwV1Kaksktzkr7TMK3FQtQEEe6Wqa',
    DASH: 'XqQ7gU8eM76rEfey726cJpT2RGKyJyBrcn',
    ZEC: 't1KGyyv24eL354C9gjveBGEe8Xz9UoPKvHR',
    BCH: 'qrd6za97wm03lfyg82w0c9vqgc727rhemg5yd9k3dm'
  }

  coinValidator.BTC('HELLO?')

  return (
    <>
      {showModal && (
        <Modal
          closeOnBackdropClick={true}
          width={676}
          height={200}
          handleClose={handleClose}
          open={true}
          title={
            <div className={classes.modalTitle}>
              {selectedCoin.display
                ? `Blacklist ${R.toLower(selectedCoin.display)} address`
                : ''}
            </div>
          }>
          <TextInput
            multiline
            error={invalidAddress}
            label="Paste new address to blacklist here"
            name="address-to-block-input"
            autoFocus
            id="address-to-block-input"
            type="text"
            size="sm"
            fullWidth
            InputLabelProps={{ shrink: true }}
            placeholder={`ex: ${placeholderAddress[selectedCoin.code]}`} // "ex: 0x309abbd2f85ead2fcbb5323e963550c88c8a569aca4e088e9020a03fd04bf4bd"
            onChange={handleChange}
            value={addressField}
          />
          <div className={classes.bottomRight}>
            <Link onClick={handleAddToBlacklist}>Blacklist address</Link>
          </div>
        </Modal>
      )}
    </>
  )
}

export default BlackListModal
