import * as R from 'ramda'
import React, { useState } from 'react'

import Modal from 'src/components/Modal'
import { Link } from 'src/components/buttons'
import { TextInput } from 'src/components/inputs'

const BlackListModal = ({ showModal, toggleModal, selectedCoin }) => {
  const modalTitleStyle = {
    lineHeight: '120%',
    color: '#1b2559',
    fontSize: 14,
    fontFamily: 'Mont',
    fontWeight: 900
  }

  const [addressField, setAddressField] = useState('')

  const handleChange = event => {
    setAddressField(event.target.value)
  }

  const handleAddToBlacklist = e => {
    console.log(e)
    console.log(addressField)
  }

  return (
    <>
      {showModal && (
        <Modal
          width={676}
          height={200}
          handleClose={toggleModal}
          open={true}
          title={
            <div style={modalTitleStyle}>
              {selectedCoin.display
                ? `Blacklist ${R.toLower(selectedCoin.display)} address`
                : ''}
            </div>
          }>
          <TextInput
            label="Paste new address to blacklist here"
            name="address-to-block-input"
            autoFocus
            id="address-to-block-input"
            type="text"
            size="sm"
            fullWidth
            InputLabelProps={{ shrink: true }}
            placeholder="ex: 0x309abbd2f85ead2fcbb5323e963550c88c8a569aca4e088e9020a03fd04bf4bd"
            onChange={handleChange}
            value={addressField}
          />
          <div
            style={{
              marginTop: '60px',
              marginLeft: '490px'
            }}>
            <Link onClick={handleAddToBlacklist}>Blacklist address</Link>
          </div>
        </Modal>
      )}
    </>
  )
}

export default BlackListModal
