const EventEmitter = require('events')
const { ThirdwebSDK, getRpcUrl, } = require('@thirdweb-dev/sdk')
const ethers = require('ethers')

const lib = new EventEmitter()

lib.getCanClaim = async ({privateKey, network, contractAddress, tokenId, walletAddress}) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!privateKey) throw new Error('PRIVATE_KEY_UNDEFINED')

      if (!contractAddress) throw new Error('CONTRACT_ADDRESS_UNDEFINED')

      if (!tokenId && tokenId !== 0) throw new Error('TOKEN_ID_UNDEFINED')

      if (!walletAddress) throw new Error('WALLET_ADDRESS_UNDEFINED')

      const sdk = new ThirdwebSDK(
        new ethers.Wallet(
          privateKey,
          ethers.getDefaultProvider(getRpcUrl(network))
        )
      )

      const contractType = await sdk.resolveContractType(contractAddress)
      const contract = await sdk.getContract(contractAddress, contractType)

      let canClaim
      switch (contractType) {
        case 'edition-drop':
          canClaim = await contract.erc1155.claimConditions.canClaim(tokenId, 1, walletAddress)
          break
        default:
          throw new Error('CONTRACT_TYPE_IS_NOT_SUPPORTED')
      }

      resolve({
        network,
        contractAddress,
        tokenId,
        walletAddress,
        canClaim
      })
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = lib
