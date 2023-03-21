const lib = require('./src/index')

const walletAddress = '' // your wallet address
const privateKey = '' // your wallet address's private key
const network = 'goerli'
const contractAddressV2 = '0xA62e89461E7dbdA432d827fe43667293F83FebDB'
const contractAddressV4 = '0xB26A80f1B7bCD4C1D6542a747F87a4501849337b'
const tokenId = 0

lib.getCanClaim({
  network,
  privateKey,
  contractAddress: contractAddressV2,
  tokenId,
  walletAddress
}).then(result => console.log('getCanClaim contract V2', result))

lib.getCanClaim({
  network,
  privateKey,
  contractAddress: contractAddressV4,
  tokenId,
  walletAddress
}).then(result => console.log('getCanClaim contract V4', result))