import nacl from 'tweetnacl'
import base58 from 'bs58'
import { isEmptySig } from '../utils/lib';

/**
 * Verify a address's signature
 * @param {string} message - The original predefined message
 * @param {string} address - A algo address equal to public key
 * @param {string} signature - The message's signature (as returned by the sign() method). If a string is provided instead of a Buffer, it is assumed to be base64 encoded
 * @returns {boolean} - Indicates whether message's signature has been successfully verified
 */
export default function verify(message, address, signature) {
  if (isEmptySig(signature)) {
    return false;
  } else {
    try {
      const publicKey = address;
      const messageHandler = Buffer.from(message, 'utf8');
      const signatureHandler = Buffer.from(signature, 'base64');
      const publicKeyHandler = base58.decode(publicKey);
      return nacl.sign.detached.verify(messageHandler, signatureHandler, publicKeyHandler);
    } catch (err) {
      return false;
    }
  }
}
