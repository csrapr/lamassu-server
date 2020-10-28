import * as R from 'ramda'
import * as Yup from 'yup'

// TODO
const tokenSchema = Yup.object().shape({
  exchange: Yup.string().required('Required')
})

const tokens = [
  {
    code: 'BAT',
    display: 'Basic Attention Token',
    contractAddress: '0x0d8775f648430679a709e98d2b0cb6250d2887ef'
  },
  {
    code: 'USDC',
    display: 'USD Coin',
    contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  }
]

const tokenElements = [
  {
    name: 'id',
    header: 'Ticker symbol',
    view: it =>
      R.compose(R.prop(['code']), R.find(R.propEq('code', it)))(tokens),
    width: 230,
    size: 'sm',
    editable: false
  },
  {
    name: 'id',
    header: 'ETH contract address',
    view: it => {
      console.log(it)
      return R.compose(
        R.prop(['contractAddress']),
        R.find(R.propEq('code', it))
      )(tokens)
    },
    width: 510,
    size: 'sm',
    editable: false,
    stripe: true
  },
  {
    name: 'id',
    header: 'Coin name',
    view: it =>
      R.compose(R.prop(['display']), R.find(R.propEq('code', it)))(tokens),
    width: 200,
    size: 'sm',
    editable: false
  }
]

export { tokens, tokenElements, tokenSchema }
