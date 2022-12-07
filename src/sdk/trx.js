import TronWeb from 'tronweb';
import { isEmptySig } from '../utils/lib';

/**
 * Verify a address's signature
 * NOTE: In the old version of the Java SDK, special processing is required for the last two digits of the signature tail when its signed
 * NOTE: see https://developers.tron.network/reference/verifymessage#example
 * @param {string} message - The original predefined message. Creates hex hash of a Buffer input
 * @param {string} address - A tron address
 * @param {string} signature - it's a signed message. see NOTE
 * @returns {boolean} - Indicates whether message's signature has been successfully verified
 */
export default function verify(message, address, signature) {
  return isEmptySig(signature) ? false : TronWeb.Trx.verifySignature(Buffer.from(message).toString('hex'), address, signature);
}
