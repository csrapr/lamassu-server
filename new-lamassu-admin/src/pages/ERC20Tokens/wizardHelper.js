import * as Yup from 'yup'

import SelectToken from './WizardComponents/SelectToken'

// const tokenNameType = Yup.string().required('Required')

const step1Schema = Yup.object().shape({
  tokenName: Yup.string(),
  customToken: Yup.object().shape({
    ethContractAddress: Yup.string(),
    coinName: Yup.string(),
    tickerSymbol: Yup.string()
  })
})

const step1 = {
  Component: SelectToken,
  initialValues: {
    tokenName: '',
    customToken: { coinName: '', tickerSymbol: '', contractAddress: '' }
  },
  schema: step1Schema
}

export { step1 }
