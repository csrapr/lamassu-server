const base58Validator = require('./validators').base58Validator

const base58Opts = {
  bufferLength: 22,
  mainNetPrefix: [
    [0x1c, 0xb8], // t1
    [0x1c, 0xbd] // t3
  ],
  testNetPrefix: [
    [0x1c, 0xba], // t2
    [0x1d, 0x25] // tm
  ]
}

function validate(network, address) {
  if (!network) throw new Error('No network supplied.')
  if (!address) throw new Error('No address supplied.')
  return base58Validator(network, address, base58Opts)
}

export default validate
