const base58Validator = require('./validators').base58Validator

const base58Opts = {
  bufferLength: 21,
  mainNetPrefix: [[0x4c], [0x10]],
  testNetPrefix: [[0x8c], [0x13]]
}

function validate(network, address) {
  if (!network) throw new Error('No network supplied.')
  if (!address) throw new Error('No address supplied.')
  if (base58Validator(network, address, base58Opts)) return true
  return false
}

export default validate
