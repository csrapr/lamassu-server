const db = require('./db')

// Get all blacklist rows from the DB "blacklist" table
const getBlacklist = () => {
  return db.any('select * from blacklist').then(res =>
    res.map(item => ({
      cryptoCode: item.crypto_code,
      address: item.address,
      createdByOperator: item.created_by_operator
    }))
  )
}

function blocked(address, cryptoCode) {
  const sql = `select * from blacklist where address = $1 and crypto_code = $2`
  return db.any(sql, [address, cryptoCode])
}

function addToUsedAddresses(address, cryptoCode) {
  // ETH reuses addresses
  if (cryptoCode === 'ETH') return Promise.resolve()

  const sql = `insert into blacklist(crypto_code, address, created_by_operator) values ($1, $2, 'f')`
  return db.oneOrNone(sql, [cryptoCode, address])
}

module.exports = { blocked, addToUsedAddresses, getBlacklist }
