import verifyBtc from "../sdk/btc";
import verifyEvm from "../sdk/evm";
import verifyTrx from "../sdk/trx";
import verifyAlgo from "../sdk/algo";

/**
 * Route SDK support, Map coin to function
 * @param {string} chain - The coin to DETAIL_KEY_MAPPING value
 * @returns {function} - Indicates whether chain signature will be called
 */
export const verifySwitch = (chain) => ({
  'BTC': verifyBtc,
  'ETH': verifyEvm,
  'TRX': verifyTrx,
  'ALGO': verifyAlgo,
})[chain];
