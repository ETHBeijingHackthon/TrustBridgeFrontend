import { ethers } from 'ethers'
import { address as tbAddress, abi as tbAbi } from './abis/trustBridge'

export const geneTrustBridgeContract = (signer) =>
  new ethers.Contract(tbAddress, tbAbi, signer)
