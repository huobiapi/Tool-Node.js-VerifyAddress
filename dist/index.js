'use strict';

var fs = require('fs');
var lodash = require('lodash');
var sync = require('csv-parse/sync');
var btcMsgVerifier = require('btc-message-verifier');
var commander = require('commander');
var hash = require('ethereumjs-util/dist/hash');
var bytes = require('ethereumjs-util/dist/bytes');
var account = require('ethereumjs-util/dist/account');
var signature = require('ethereumjs-util/dist/signature');
var TronWeb = require('tronweb');

/**
 * Check signature is empty
 * NOTE: '-' indicates this is sub parent line
 * @param {string} sig - The original signature for check
 * @returns {boolean} - Indicates whether signature has empty
 */
const isEmptySig = (sig) => lodash.isEmpty(sig) || sig === '-';

/**
 * Initialization cli program with commander
 * NOTE: -p [--por_csv_filename] is required
 * @returns {string} - Indicates snapshot filename
 */
const initCli = () => {
  const program = new commander.Command();
  program
    .name(' proof-of-address')
    .description(`CLI to Proof of Reserves (PoR) for Address. Display individual and aggregated balance information.`)
    .requiredOption('-p, --por_csv_filename <csv file>', 'Required: the snapshot file is in the same directory as the tool')
    .parse();
  const { por_csv_filename: porCsvFilename } = program.opts();
  return porCsvFilename;
};

/**
 * Verify a address's signature
 * @param {string} message - The original predefined message
 * @param {string} address - A bitcoin address or a public key hash
 * @param {string} signature - The message's signature (as returned by the sign() method). If a string is provided instead of a Buffer, it is assumed to be base64 encoded
 * @returns {boolean} - Indicates whether message's signature has been successfully verified
 */
function verify$2(message, address, signature) {
  return isEmptySig(signature) ? false : btcMsgVerifier.verifyMessage(address, signature, message);
}

/**
 * Verify a address's signature
 * NOTE: ECDSA public key recovery from signature
 * @param {string} message - The original predefined message. Creates Keccak hash of a Buffer input
 * @param {string} address - A ethereum address
 * @param {string} signature - it's a signed message (EIP-191 or EIP-712) adding `27` at the end. Remove if needed.
 * @returns {boolean} - Indicates whether message's signature has been successfully verified
 */
function verify$1(message, address, signature$1) {
  if (isEmptySig(signature$1))
    return false;
  else {
    const messageHash = hash.keccak(Buffer.from(message));
    const signatureParameters = signature.fromRpcSig(signature$1);
    const pubKey = signature.ecrecover(messageHash, ...Object.values(signatureParameters));

    return address === bytes.bufferToHex(account.publicToAddress(pubKey));
  }
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
function verify(message, address, signature) {
  return isEmptySig(signature) ? false : TronWeb.Trx.verifySignature(Buffer.from(message).toString('hex'), address, signature);
}

/**
 * Route SDK support, Map coin to function
 * @param {string} chain - The coin to DETAIL_KEY_MAPPING value
 * @returns {function} - Indicates whether chain signature will be called
 */
const verifySwitch = (chain) => ({
  'BTC': verify$2,
  'ETH': verify$1,
  'TRX': verify,
})[chain];

const PLACEHOLDER = '???   ';
const SUPPORT_COIN_COUNT = 11;
const SUMMARY_LEAF = [4, 8, SUPPORT_COIN_COUNT - 1];
const SUMMARY_COLUMNS = ['coin', 'snapshot_height', 'balance'];
const DETAIL_COLUMNS = ['coin', 'address', 'snapshot_height', 'balance', 'message', 'signature'];
const PASSED = '\u001B[32m???\u001B[39m';
const FAILED = '\u001B[31m???\u001B[39m';
const DETAIL_KEY_MAPPING = {
  BTC: 'BTC',
  ETH: 'ETH',
  TRX: 'TRX',
  'HT-ETH': 'ETH',
  'ETH-Arbitrum': 'ETH',
  'ETH-Optimism': 'ETH',
  'USDT-Avalanche C-Chain': 'ETH',
  'USDT-TRC20': 'TRX',
  'USDT-ETH': 'ETH',
};

// Initialization cli program with commander
const porCsvFilename = initCli();

// Parse CSV snapshot, divide two parts[summary, detail]
const content = fs.readFileSync(`./${porCsvFilename}`);
const summaryRecords = sync.parse(content, { columns: SUMMARY_COLUMNS, from: 2, to_line: SUPPORT_COIN_COUNT + 1 });
const detailRecords = sync.parse(content, { columns: DETAIL_COLUMNS, from_line: SUPPORT_COIN_COUNT + 4 });

// Counter
let passed = 0;
let failed = 0;

// Render tree begin
console.log('.');
summaryRecords.forEach((summary, i) => {
  // Render summary node
  let prefix = '';
  let summaryLine = SUMMARY_LEAF.includes(i) ? '????????? ' : '????????? ';

  if (summary['coin'].indexOf('ALL') < 0) prefix = PLACEHOLDER;
  summaryLine = prefix + summaryLine;

  for (const [k, v] of Object.entries(summary)) {
    summaryLine += k === 'coin' ? `${v}  ` : `${k}: ${v}  `;
  }
  console.log(summaryLine);

  if (summary['snapshot_height'] === '-') return;

  // Render detail node
  const [summaryTitle] = summary['coin'].split('(');
  const detailRecordsFilter = lodash.filter(detailRecords, drf => (prefix ? drf['coin'] === summaryTitle : drf['coin'].indexOf(summaryTitle) === 0));

  detailRecordsFilter.forEach(({ coin, address, snapshot_height, balance, message, signature }, j) => {
    let prefixChild = (snapshot_height === '-' && balance === '-') ? PLACEHOLDER : '';

    console.log(`${prefixChild}${prefix}???   ????????? ${coin}`);
    console.log(`${prefixChild}${prefix}???   ???   ????????? address: ${address}  snapshot_height: ${snapshot_height}  balance: ${balance}`);

    if (signature !== '-') {
      console.log(`${prefixChild}${prefix}???   ???   ????????? signature: ${signature}`);

      const vRes = verifySwitch(DETAIL_KEY_MAPPING[coin])(message, address, signature);
      const result = vRes ? `verify result: ${PASSED}` : `verify result: ${FAILED}`;
      vRes ? passed += 1 : failed += 1 ;

      if (j === detailRecordsFilter.length - 1 && i === summaryRecords.length - 1)
        console.log(`${prefixChild}${prefix}????????? ????????? ????????? ${result}`);
      else
        console.log(`${prefixChild}${prefix}???   ???   ????????? ${result}`);
    }
  });
});

// Summary statistics
console.log(`#### Verify address finished, Total ${passed + failed} authorized addresses, ${passed} passed, ${failed} failed ####`);
