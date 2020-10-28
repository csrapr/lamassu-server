import { useQuery, useMutation } from '@apollo/react-hooks'
import { Box } from '@material-ui/core'
import gql from 'graphql-tag'
import * as R from 'ramda'
import React, { useState } from 'react'

import { Button } from 'src/components/buttons'
import Link from 'src/components/buttons/Link'
import TitleSection from 'src/components/layout/TitleSection'
import { Info3, Label3 } from 'src/components/typography'

import TokensTable from './TokensTable'
import Wizard from './Wizard'

const GET_TOKENS = gql`
  query getERC20Tokens {
    erc20tokens {
      id
      contractAddress
      coinName
      tickerSymbol
    }
  }
`

const ADD_ROW = gql`
  mutation AddERC20Token(
    $coinName: String!
    $tickerSymbol: String!
    $contractAddress: String!
  ) {
    addERC20Token(
      coinName: $coinName
      tickerSymbol: $tickerSymbol
      contractAddress: $contractAddress
    ) {
      coinName
      tickerSymbol
      contractAddress
    }
  }
`

// TODO
/* const DELETE_ROW = gql`
  mutation DeleteERC20Token($id: String!) {
    deleteERC20Token(id: $id) {
      coinName
      tickerSymbol
      contractAddress
    }
  }
` */

const ERC20Tokens = () => {
  const { data: getTokensResponse, loading } = useQuery(GET_TOKENS)
  const [showWizard, setShowWizard] = useState(false)
  const toggleShowWizard = () => setShowWizard(!showWizard)

  const [addEntry] = useMutation(ADD_ROW, {
    onError: () => console.error('Error while adding row'),
    refetchQueries: () => ['getERC20Tokens']
  })

  const handleDeleteEntry = id => {
    console.log('TODO: delete entry with id ', id)
  }

  const handleAddEntry = ({
    tokenName,
    customToken: { coinName, tickerSymbol, contractAddress }
  }) => {
    if (tokenName !== 'setupNew') {
      return
    }
    addEntry({ variables: { coinName, tickerSymbol, contractAddress } })
  }

  return (
    <>
      <TitleSection title="ERC-20 coin addition" />
      {!loading && R.not(R.isEmpty(getTokensResponse)) && (
        <TokensTable
          handleDeleteEntry={handleDeleteEntry}
          data={R.path(['erc20tokens'], getTokensResponse)}
        />
      )}
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
          <Wizard
            save={handleAddEntry}
            visible={showWizard}
            onClose={toggleShowWizard}
          />
        </Box>
      )}
    </>
  )
}

export default ERC20Tokens
