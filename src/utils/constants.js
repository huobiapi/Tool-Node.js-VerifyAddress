export const PLACEHOLDER = 'â   ';
export const SUPPORT_COIN_COUNT = 11;
export const SUMMARY_LEAF = [4, 8, SUPPORT_COIN_COUNT - 1];
export const SUMMARY_COLUMNS = ['coin', 'snapshot_height', 'balance'];
export const DETAIL_COLUMNS = ['coin', 'address', 'snapshot_height', 'balance', 'message', 'signature'];
export const PASSED = '\u001B[32mâ\u001B[39m';
export const FAILED = '\u001B[31mâ\u001B[39m';
export const DETAIL_KEY_MAPPING = {
  BTC: 'BTC',
  ETH: 'ETH',
  TRX: 'TRX',
  'HT-ETH': 'ETH',
  'ETH-Arbitrum': 'ETH',
  'ETH-Optimism': 'ETH',
  'USDT-Avalanche C-Chain': 'ETH',
  'USDT-TRC20': 'TRX',
  'USDT-ETH': 'ETH',
}
