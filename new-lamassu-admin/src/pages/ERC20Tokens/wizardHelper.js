import SelectToken from './WizardComponents/SelectToken'

const step1 = {
  Component: SelectToken,
  initialValues: {
    tokenName: '',
    customToken: { ethContractAddress: '', coinName: '', tickerSymbol: '' }
  }
}

export { step1 }
