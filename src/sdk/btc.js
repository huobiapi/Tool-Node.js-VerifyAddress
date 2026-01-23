import btcMsgVerifier from 'btc-message-verifier'
import { isEmptySig } from '../utils/lib.js'

/**
 * Verify a address's signature
 * @param {string} message - The original predefined message
 * @param {string} address - A bitcoin address or a public key hash
 * @param {string} signature - The message's signature (as returned by the sign() method). If a string is provided instead of a Buffer, it is assumed to be base64 encoded
 * @returns {boolean} - Indicates whether message's signature has been successfully verified
 */
export default function verify (message, address, signature) {
  if (isEmptySig(signature)) {
    return false
  } else {
    try {
      return btcMsgVerifier.verifyMessage(address, signature, message)
    } catch (err) {
      return false
    }
  }
}
