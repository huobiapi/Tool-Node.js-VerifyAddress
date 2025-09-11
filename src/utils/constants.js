export const PLACEHOLDER = '│   ';
export const SUMMARY_COLUMNS = ['coin', 'snapshot_height', 'balance'];
export const DETAIL_COLUMNS = ['coin', 'address', 'snapshot_height', 'balance', 'message', 'signature'];
export const PASSED = '\u001B[32m✓\u001B[39m';
export const FAILED = '\u001B[31m✕\u001B[39m';
export const DETAIL_KEY_MAPPING = {
  BTC: 'BTC',
  'USDT-Omni': 'BTC',

  ETH: 'ETH',
  BETH: 'ETH',
  'HT-ETH': 'ETH',
  'ETH-Arbitrum': 'ETH',
  'ETH-Optimism': 'ETH',
  'USDT-Avalanche C-Chain': 'ETH',
  'USDT-ETH': 'ETH',
  'USDT-BTTC': 'ETH',
  'ETH-BTTC': 'ETH',
  'BETH-Heco': 'ETH',
  'stETH': 'ETH',
  'baseETH': 'ETH',
  'USDT-aEthUSDT': 'ETH',
  'HTX-ERC20': 'ETH',
  'aETH': 'ETH',
  'TRX-ERC20': 'ETH',
  'BBTC-ERC20': 'ETH',
  'WBTC-ERC20': 'ETH',
  'WLFI': 'ETH',

  TRX: 'TRX',
  'USDT-TRC20': 'TRX',
  'BTC-TRC20': 'TRX',
  'stUSDT-TRC20': 'TRX',
  'HTX-TRC20': 'TRX',
  'jsTRX': 'TRX',
  'jUSDT-TRC20': 'TRX',

  SOL: 'SOL',
  'USDT-SOL': 'SOL',
  'TRX-sol': 'SOL',

  XRP: 'XRP',

  DOGE: 'DOGE',

  'USDT-ALGO': 'ALGO',
}
