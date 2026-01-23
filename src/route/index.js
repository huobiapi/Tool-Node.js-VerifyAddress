import verifyBtc from '../sdk/btc.js'
import verifyEvm from '../sdk/evm.js'
import verifyTrx from '../sdk/trx.js'
import verifyAlgo from '../sdk/algo.js'
import verifySol from '../sdk/sol.js'

/**
 * Route SDK support, Map coin to function
 * @param {string} chain - The coin to DETAIL_KEY_MAPPING value
 * @returns {function} - Indicates whether chain signature will be called
 */
export const verifySwitch = (chain) => ({
  BTC: verifyBtc,
  ETH: verifyEvm,
  TRX: verifyTrx,
  ALGO: verifyAlgo,
  SOL: verifySol
})[chain]
