import { Box } from '@material-ui/core'
import React, { useState } from 'react'

import { Button } from 'src/components/buttons'
import Link from 'src/components/buttons/Link'
import TitleSection from 'src/components/layout/TitleSection'
import { Info3, Label3 } from 'src/components/typography'

import Wizard from './Wizard'

const ERC20Tokens = () => {
  const [showWizard, setShowWizard] = useState(true)
  const toggleShowWizard = () => setShowWizard(!showWizard)

  return (
    <>
      <TitleSection title="Hello from ERC Tokens page" />
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
    </>
  )
}

export default ERC20Tokens
