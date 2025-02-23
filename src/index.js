#!/usr/bin/env node
import chalk from 'chalk'
import ora from 'ora'
import { program } from 'commander'
import { request } from 'undici'

import packageJson from '../package.json' with { type: "json" }
import config from '../config.js'
import { buildTable } from './lib/table.js'

/**
 * @typedef {Object} options
 * @property {number} limit - limit the number of results
 * @property {string[]} fields - fields to show
 */

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
 * @param {Object} options - options for search
 */
async function trova (name, options) {
  const { objects } = await search(name)
  if (objects.length === 0) {
    console.log(chalk.red('No results found'))
    return false
  }
  const table = buildTable(objects, options)
  table.printTable()
  return true
}

async function start () {
  program
    .name('trova')
    .description('Search npm package across npm.org repos by term')
  .version(packageJson.version)
    .option('-l, --limit <number>', 'limit the number of results', 10)
    .option('-f, --fields [fields...]', 'fields to show', ['name', 'version', 'description', 'link'])
    .option('-x, --exclude-fields [fields...]', 'fields to exclude', ['score'])
    .argument('<name>', 'package to search')
    .action((name, options) => {
      if (name) {
        console.log(chalk.blue('Trova ' + name))
        trova(name, options)
      } else {
        console.log(chalk.red('No search term provided'))
      }
    })
  program.parse()

}

start()
