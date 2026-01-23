#!/usr/bin/env zx
/* eslint-env node */
/* global $ */

const targets = [
  'bun-darwin-arm64',
  'bun-darwin-x64',
  'bun-linux-x64',
  'bun-linux-arm64',
  'bun-windows-x64'
]

for (const target of targets) {
  const isWin = target.includes('windows')
  const outfile = `${target}${isWin ? '.exe' : ''}`

  console.log(`\n📦 Building for ${target} -> ${outfile}`)
  await $`bun build --compile --target=${target} dist/index.js --outfile=${outfile}`
}
