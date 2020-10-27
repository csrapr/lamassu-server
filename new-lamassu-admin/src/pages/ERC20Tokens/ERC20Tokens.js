import { useQuery } from '@apollo/react-hooks'
import { Box } from '@material-ui/core'
import gql from 'graphql-tag'
import * as R from 'ramda'
import React, { useState } from 'react'

import { Button } from 'src/components/buttons'
import Link from 'src/components/buttons/Link'
import TitleSection from 'src/components/layout/TitleSection'
import { Info3, Label3 } from 'src/components/typography'

import Wizard from './Wizard'

const GET_TOKENS = gql`
  query getERC20Tokens {
    erc20tokens {
      contractAddress
      coinName
      tickerSymbol
    }
  }
`

const ERC20Tokens = () => {
  const { data: getTokensResponse, loading } = useQuery(GET_TOKENS)
  const [showWizard, setShowWizard] = useState(false)
  const toggleShowWizard = () => setShowWizard(!showWizard)

  console.log(loading, getTokensResponse)

  return (
    <>
      <TitleSection title="ERC-20 coin addition" />
      {!loading && R.isEmpty(getTokensResponse) && (
        <Box display="flex" alignItems="center" flexDirection="column" mt={15}>
          <Info3>
            It seems there are no active compliance triggers on your network
          </Info3>
          <Label3 style={{ margin: 0 }}>
            Please read our{' '}
            <a href="https://support.lamassu.is/hc/en-us">
              <Link>Support Article</Link>
            </a>{' '}
            on ERC-20 coin addition before adding one.
          </Label3>
          <Button onClick={() => setShowWizard(true)} style={{ marginTop: 65 }}>
            Add first token
          </Button>
          <Wizard visible={showWizard} onClose={toggleShowWizard}></Wizard>
        </Box>
      )}
    </>
  )
}

export default ERC20Tokens
