import TronWeb from 'tronweb';
import { isEmptySig } from '../utils/lib';

function verifySignature(msg, addr, sig) {
  return TronWeb.Trx.verifySignature(msg, addr, sig);
}

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
  if (isEmptySig(signature)) {
    return false;
  }

  let signedStr;

  const tail = signature.substring(128, 130);
  if(tail === '01')
    signedStr = signature.substring(0,128)+'1c';
  else if(tail === '00')
    signedStr = signature.substring(0,128)+'1b';
  else
    signedStr = signature;

  let verifyRes = verifySignature(Buffer.from(message).toString('hex'), address, signedStr);

  if (!verifyRes) {
    const hexStrWithout0x = TronWeb.toHex(message).replace(/^0x/, '');
    const byteArray = TronWeb.utils.code.hexStr2byteArray(hexStrWithout0x);
    const strHash= TronWeb.sha3(byteArray).replace(/^0x/, '');
    verifyRes = verifySignature(strHash, address, signedStr);
  }

  return verifyRes;
}
