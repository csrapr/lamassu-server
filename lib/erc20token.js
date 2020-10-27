const db = require('./db')
const { v4: uuidv4 } = require('uuid')

// Get all blacklist rows from the DB "blacklist" table
const getERC20Tokens = () => {
  return db.any('select * from erc_20_tokens').then(res =>
    res.map(item => ({
      id: item.id,
      contractAddress: item.contract_address,
      coinName: item.coin_name,
      tickerSymbol: item.ticker_symbol
    }))
  )
}

const addERC20Token = (contractAddress, coinName, tickerSymbol) => {
  return db
    .any(
      'insert into erc_20_tokens(id, contract_address, coin_name, ticker_symbol) values($1, $2, $3, $4);',
      [uuidv4(), contractAddress, coinName, tickerSymbol]
    )
    .then(() => {
      return { contractAddress, coinName, tickerSymbol }
    })
}

const deleteERC20Token = id => {
  return db.none('delete from erc_20_tokens where id = $1;', [id])
}

module.exports = {
  getERC20Tokens,
  addERC20Token,
  deleteERC20Token
}
