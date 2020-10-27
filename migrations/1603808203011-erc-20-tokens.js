var db = require('./db')
const { v4: uuidv4 } = require('uuid')

exports.up = function (next) {
  var sql = [
    'drop table if exists erc_20_tokens',
    `create table erc_20_tokens (
      id uuid PRIMARY KEY,
      contract_address text NOT NULL,
      coin_name text NOT NULL,
      ticker_symbol text NOT NULL,
      created timestamptz NOT NULL default now()
    )`,
    `insert into erc_20_tokens (id, contract_address, coin_name, ticker_symbol) values
    ('${uuidv4()}', '0x0d8775f648430679a709e98d2b0cb6250d2887ef', 'Basic Attention Token', 'BAT'),
    ('${uuidv4()}', '0xe41d2489571d322189246dafa5ebde1f4699f498', '0x', 'ZRX'),
    ('${uuidv4()}', '0x6b175474e89094c44da98b954eedeac495271d0f', 'Maker', 'DAI'),
    ('${uuidv4()}', '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', 'USD Coin', 'USDC'),
    ('${uuidv4()}', '0x8e870d67f660d95d5be530380d0ec0bd388289e1', 'Paxos Standard', 'PAX'),
    ('${uuidv4()}', '0x0000000000085d4780B73119b644AE5ecd22b376', 'True USD', 'TUSD'),
    ('${uuidv4()}', '0xdac17f958d2ee523a2206206994597c13d831ec7', 'USD Tether', 'USDT')`
  ]
  db.multi(sql, next)
}

exports.down = function (next) {
  next()
}

// node bin/lamassu-migrate
