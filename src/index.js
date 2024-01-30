#!/usr/bin/env node
import chalk from 'chalk'
import ora from 'ora'
import process from 'node:process'
import { program } from 'commander'
import { request } from 'undici'
import config from '../config.js'
import { buildTable } from './lib/table.js'


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
  const table = buildTable(objects)
  table.printTable()
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
