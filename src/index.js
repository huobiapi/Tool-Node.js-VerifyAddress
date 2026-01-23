import fs from 'fs'
import { filter } from 'lodash'
import { parse } from 'csv-parse/sync'
import { verifySwitch } from './route/index.js'
import { initCli, getWatershed } from './utils/lib.js'
import { PLACEHOLDER, SUMMARY_COLUMNS, DETAIL_COLUMNS, DETAIL_KEY_MAPPING, PASSED, FAILED } from './utils/constants.js'

// Initialization cli program with commander
const porCsvFilename = initCli()

// Parse CSV snapshot, divide two parts[summary, detail]
const content = fs.readFileSync(`./${porCsvFilename}`)
const watershed = getWatershed(`./${porCsvFilename}`)
const SUMMARY_LEAF = [4, 8, +watershed - 2]
const summaryRecords = parse(content, { columns: SUMMARY_COLUMNS, from: 2, to_line: +watershed - 1 })
const detailRecords = parse(content, { columns: DETAIL_COLUMNS, from_line: +watershed + 1 })

// Counter
let passed = 0
let failed = 0

// Render tree begin
console.log('.')
summaryRecords.forEach((summary, i) => {
  // Render summary node
  let prefix = ''
  let summaryLine = SUMMARY_LEAF.includes(i) ? '└── ' : '├── '

  if (summary.coin.indexOf('ALL') < 0) prefix = PLACEHOLDER
  summaryLine = prefix + summaryLine

  for (const [k, v] of Object.entries(summary)) {
    summaryLine += k === 'coin' ? `${v}  ` : `${k}: ${v}  `
  }
  console.log(summaryLine)

  if (summary.snapshot_height === '-') return

  // Render detail node
  const [summaryTitle] = summary.coin.split('(')
  const detailRecordsFilter = filter(detailRecords, drf => (prefix ? drf.coin === summaryTitle : drf.coin.indexOf(summaryTitle) === 0))

  detailRecordsFilter.forEach(({ coin, address, snapshot_height: snapshotHeight, balance, message, signature }, j) => {
    const prefixChild = (snapshotHeight === '-' && balance === '-') ? PLACEHOLDER : ''

    console.log(`${prefixChild}${prefix}│   ├── ${coin}`)
    console.log(`${prefixChild}${prefix}│   │   ├── address: ${address}  snapshot_height: ${snapshotHeight}  balance: ${balance}`)

    if (signature !== '-') {
      console.log(`${prefixChild}${prefix}│   │   ├── signature: ${signature}`)

      const vRes = verifySwitch(DETAIL_KEY_MAPPING[coin])(message, address, signature)
      const result = vRes ? `verify result: ${PASSED}` : `verify result: ${FAILED}`
      vRes ? passed += 1 : failed += 1

      if (j === detailRecordsFilter.length - 1 && i === summaryRecords.length - 1) { console.log(`${prefixChild}${prefix}└── └── └── ${result}`) } else { console.log(`${prefixChild}${prefix}│   │   └── ${result}`) }
    }
  })
})

// Summary statistics
console.log(`#### Verify address finished, Total ${passed + failed} authorized addresses, ${passed} passed, ${failed} failed ####`)
