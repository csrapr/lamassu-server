const axios = require('axios')

const wallet = require('./wallet')

const getAddress = () => {
  return 'https://localhost:5777/'
}

const getWallet = (cryptoCode, settings) => {
  return wallet.fetchWallet(cryptoCode, settings).then(w => axios.post(getAddress(), w))
}

module.exports = { getWallet }
