import { execSync } from 'child_process'
import { isEmpty } from 'lodash';
import { Command } from 'commander';

/**
 * Check signature is empty
 * NOTE: '-' indicates this is sub parent line
 * @param {string} sig - The original signature for check
 * @returns {boolean} - Indicates whether signature has empty
 */
export const isEmptySig = (sig) => isEmpty(sig) || sig === '-';

/**
 * Initialization cli program with commander
 * NOTE: -p [--por_csv_filename] is required
 * @returns {string} - Indicates snapshot filename
 */
export const initCli = () => {
  const program = new Command();
  program
    .name(' proof-of-address')
    .description(`CLI to Proof of Reserves (PoR) for Address. Display individual and aggregated balance information.`)
    .requiredOption('-p, --por_csv_filename <csv file>', 'Required: the snapshot file is in the same directory as the tool')
    .parse();
  const { por_csv_filename: porCsvFilename } = program.opts();
  return porCsvFilename;
}

/**
 * Get watershed line number
 * @param {*} csvFile
 * @returns {string} watershed line number
 */
export const getWatershed = (csvFile) => execSync(`awk '! NF { print NR; exit }' ${csvFile}`, { encoding: 'utf8' }).trim()
