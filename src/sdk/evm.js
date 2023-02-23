import Web3 from 'web3';
import { keccak } from 'ethereumjs-util/dist/hash';
import { bufferToHex } from 'ethereumjs-util/dist/bytes';
import { publicToAddress } from 'ethereumjs-util/dist/account';
import { fromRpcSig, ecrecover } from 'ethereumjs-util/dist/signature';
import { isEmptySig } from '../utils/lib';

/**
 * Verify a address's signature
 * NOTE: ECDSA public key recovery from signature
 * @param {string} message - The original predefined message. Creates Keccak hash of a Buffer input
 * @param {string} address - A ethereum address
 * @param {string} signature - it's a signed message (EIP-191 or EIP-712) adding `27` at the end. Remove if needed.
 * @returns {boolean} - Indicates whether message's signature has been successfully verified
 */
export default function verify(message, address, signature) {
  if (isEmptySig(signature))
    return false;
  else {
    try {
      const messageHash = keccak(Buffer.from(message));
      const signatureParameters = fromRpcSig(signature);
      const pubKey = ecrecover(messageHash, ...Object.values(signatureParameters));

      if (!(address === bufferToHex(publicToAddress(pubKey)))) {
        const web3 = new Web3();
        const expectedAddress = web3.eth.accounts.recover(message, signature);
        return address.toLowerCase() === expectedAddress.toLowerCase();
      }

      return true;
    } catch (err) {
      return false;
    }
  }
}
