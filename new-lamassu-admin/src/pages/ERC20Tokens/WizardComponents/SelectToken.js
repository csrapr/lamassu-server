import { Box, makeStyles } from '@material-ui/core'
import { Field, useFormikContext } from 'formik'
import * as R from 'ramda'
import React from 'react'

import { RadioGroup, TextInput } from 'src/components/inputs/formik'
import { H4 } from 'src/components/typography'
import { spacer } from 'src/styling/variables'

const useStyles = makeStyles({
  radioLabel: {
    height: 40,
    padding: [[0, 10]]
  },
  radio: {
    padding: 4,
    margin: 4
  },
  radioGroup: {
    flexDirection: 'row'
  },
  customTokenWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: spacer * 8
  },
  customTokenField: {
    margin: 10,
    width: '100%'
  }
})

const SelectToken = () => {
  const classes = useStyles()
  const { values } = useFormikContext()

  const containsType = R.contains(values?.tokenName)

  const typeOptions = [
    { display: 'BAT', code: 'BAT' },
    { display: '0x', code: '0x' },
    { display: 'DAI', code: 'DAI' },
    { display: 'USDC', code: 'USDC' },
    { display: 'PAX', code: 'PAX' },
    { display: 'TUSD', code: 'TUSD' },
    { display: 'USDT', code: 'USDT' }
  ]

  const isCustomTokenEnabled = containsType(['setupNew'])

  return (
    <>
      <Box display="flex" alignItems="center">
        <H4>Select one of the tokens or add a custom one</H4>
      </Box>
      <Field
        component={RadioGroup}
        name="tokenName"
        options={typeOptions}
        labelClassName={classes.radioLabel}
        radioClassName={classes.radio}
        className={classes.radioGroup}
      />
      <Field
        component={RadioGroup}
        name="tokenName"
        options={[{ display: 'Setup new', code: 'setupNew' }]}
        labelClassName={classes.radioLabel}
        radioClassName={classes.radio}
        className={classes.radioGroup}
      />
      <div className={classes.customTokenWrapper}>
        {isCustomTokenEnabled && (
          <>
            <Field
              autoComplete={'off'}
              className={classes.customTokenField}
              component={TextInput}
              label="ETH contract address"
              size="lg"
              name="customToken.ethContractAddress"
            />
            <Field
              autoComplete={'off'}
              className={classes.customTokenField}
              component={TextInput}
              label="Coin name"
              size="lg"
              name="customToken.coinName"
            />
            <Field
              autoComplete={'off'}
              className={classes.customTokenField}
              component={TextInput}
              label="Ticker symbol"
              size="lg"
              name="customToken.tickerSymbol"
            />
          </>
        )}
      </div>
    </>
  )
}

export default SelectToken
