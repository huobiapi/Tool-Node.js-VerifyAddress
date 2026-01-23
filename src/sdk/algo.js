import nacl from 'tweetnacl'
import algosdk from 'algosdk'
import { isEmptySig } from '../utils/lib.js'

/**
 * Verify a address's signature
 * @param {string} message - The original predefined message
 * @param {string} address - A algo address, need transfer to public key
 * @param {string} signature - The message's signature (as returned by the sign() method). If a string is provided instead of a Buffer, it is assumed to be base64 encoded
 * @returns {boolean} - Indicates whether message's signature has been successfully verified
 */
export default function verify (message, address, signature) {
  if (isEmptySig(signature)) {
    return false
  } else {
    try {
      const publicKey = Buffer.from(algosdk.decodeAddress(address).publicKey).toString('base64')
      const messageHandler = Buffer.from(message, 'utf8')
      const signatureHandler = Buffer.from(signature, 'base64')
      const publicKeyHandler = Buffer.from(publicKey, 'base64')
      return nacl.sign.detached.verify(messageHandler, signatureHandler, publicKeyHandler)
    } catch (err) {
      return false
    }
  }
}
