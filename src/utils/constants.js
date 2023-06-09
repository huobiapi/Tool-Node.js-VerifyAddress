export const PLACEHOLDER = '│   ';
export const SUPPORT_COIN_COUNT = 14;
export const SUMMARY_LEAF = [4, 8, SUPPORT_COIN_COUNT - 1];
export const SUMMARY_COLUMNS = ['coin', 'snapshot_height', 'balance'];
export const DETAIL_COLUMNS = ['coin', 'address', 'snapshot_height', 'balance', 'message', 'signature'];
export const PASSED = '\u001B[32m✓\u001B[39m';
export const FAILED = '\u001B[31m✕\u001B[39m';
export const DETAIL_KEY_MAPPING = {
  BTC: 'BTC',
  ETH: 'ETH',
  TRX: 'TRX',
  BETH: 'ETH',
  'HT-ETH': 'ETH',
  'ETH-Arbitrum': 'ETH',
  'ETH-Optimism': 'ETH',
  'USDT-Avalanche C-Chain': 'ETH',
  'USDT-TRC20': 'TRX',
  'USDT-ETH': 'ETH',
  'USDT-BTTC': 'ETH',
  'USDT-ALGO': 'ALGO',
  'ETH-BTTC': 'ETH',
  'BETH-Heco': 'ETH',
}
