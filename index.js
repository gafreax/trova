import chalk from 'chalk'
import ora from 'ora'
import process from 'node:process'
import { Table } from 'console-table-printer'
import { program } from 'commander'
import { request } from 'undici'
import config from './config.js'

/**
 * Truncate length with three dots suffix or the original string if its short
 * @param {string} text text on wich operate
 * @param {numeric} len the max len that text could be
 * @returns text truncated length with three dots suffix or the original string if its short
 */
function ellipsys (text, len) {
  if (text.length <= len) {
    return text
  }
  const sub = text.substring(0, len)
  const lastSpace = sub.lastIndexOf(' ')
  const str = lastSpace ? sub.substring(0, lastSpace) : sub
  return `${str}...`
}

/**
 * Search npm package across npm.org repos by term
 * @param {string} param string to search for
 * @returns {object} The json result
 */
async function search (param) {
  let result = ''
  const ep = `${config.baseurl}/-/v1/search?text=${param}`
  const spinner = ora(`Searching for package ${param}...`).start()
  const { body } = await request(ep)
  for await (const data of body) {
    if (data === undefined) {
      console.log(chalk.red('errore data = ' + data))
    }
    result += data
  }
  spinner.stop()
  return JSON.parse(result)
}

/**
 * Start command trova
 * @param {string} name of packet to search for
 */
async function trova (name) {
  const { objects } = await search(name)
  if (objects.length === 0) {
    console.log(chalk.red('No results found'))
    return false
  }
  const maxDescriptionColumns = process.stdout.columns - 10 - objects.reduce((a, c) => c > a ? c : a, 0)
  const p = new Table({
    title: 'Packages',
    sort: (row1, row2) => row2.score - row1.score,
    columns: [
      { name: 'name', title: 'Name', alignment: 'left', color: 'purple' },
      { name: 'description', title: 'Description', alignment: 'left', color: 'cyan', printer: (value) => ellipsys(value, maxDescriptionColumns) },
      { name: 'version', title: 'Version', alignment: 'left' },
      { name: 'score' }
    ],
    disabledColumns: ['score'],
    rows: objects.map(({ package: { name, description, version, score } }) => ({ name, description, version, score }))
  })
  p.printTable()
  return true
}

async function start () {
  program
    .name('trova')
    .description('Search npm package across npm.org repos by term')
    .version(process.env.npm_package_version)
  program
    .argument('<name>', 'package to search')
  program.parse()
  console.log(chalk.green('Trova ' + program.args[0]))
  if (program.args[0]) {
    await trova(program.args[0])
  } else {
    console.log(chalk.red('No search term provided'))
  }
}

start()
