import {describe, expect, test} from '@jest/globals';
import verifyBtc from '../src/sdk/btc';
import verifyEvm from '../src/sdk/evm';
import verifyTrx from '../src/sdk/trx';

describe('Proof BTC Address', () => {

  test('verify passed', () => {
    const message = 'hello world';
    const address = '18PSDdUnpRaQyqCo6rzAfDaWJj18VQKauD';
    const signature = 'IJ2cjHiAxVT0bqCOAOWj6huftQC4OjzG2xOCQibkzfEIVqYqnRREvQ742ptSk6zP/mfDV24A0MnFxMnsmzzRCbk=';
    expect(verifyBtc(message, address, signature)).toBe(true);
  });

  test('verify failed', () => {
    const message = 'HelloWorld';
    const address = '18PSDdUnpRaQyqCo6rzAfDaWJj18VQKauD';
    const signature = 'IJ2cjHiAxVT0bqCOAOWj6huftQC4OjzG2xOCQibkzfEIVqYqnRREvQ742ptSk6zP/mfDV24A0MnFxMnsmzzRCbk=';
    expect(verifyBtc(message, address, signature)).toBe(false);
  });

});

describe('Proof EVM Address', () => {

  test('verify passed', () => {
    const message = 'hello world';
    const address = '0x1e4fbf1eaf2d5030fdebd91f27a09812072d880b';
    const signature = '0x7dc337aec74f1a61da4717e6866d07cccb9a863d63c05aecf03aece4f4b43a9732e30c457483d0beade71b888df2d19424797423cd4a278d6d4dbdb749f807c400';
    expect(verifyEvm(message, address, signature)).toBe(true);
  });

  test('verify failed', () => {
    const message = 'HelloWorld';
    const address = '0x1e4fbf1eaf2d5030fdebd91f27a09812072d880b';
    const signature = '0x7dc337aec74f1a61da4717e6866d07cccb9a863d63c05aecf03aece4f4b43a9732e30c457483d0beade71b888df2d19424797423cd4a278d6d4dbdb749f807c400';
    expect(verifyEvm(message, address, signature)).toBe(false);
  });

});


describe('Proof TRX Address', () => {

  test('verify passed', () => {
    const message = 'hello world';
    const address = 'TLjemq2t6tFCMApBSJNs2eHVRBkMbYuzU8';
    const signature = '6fc3b702edbc3995a2d380ce7babecea2a7aac1687616d14badb84fd1337edd62ebbf3001d38dd221921c1b849b9571217d32385cbb57e545015501c4b525d4e1b';
    expect(verifyTrx(message, address, signature)).toBe(true);
  });

  test('verify failed', () => {
    const message = 'HelloWorld';
    const address = 'TLjemq2t6tFCMApBSJNs2eHVRBkMbYuzU8';
    const signature = '6fc3b702edbc3995a2d380ce7babecea2a7aac1687616d14badb84fd1337edd62ebbf3001d38dd221921c1b849b9571217d32385cbb57e545015501c4b525d4e1b';
    expect(verifyTrx(message, address, signature)).toBe(false);
  });

});

