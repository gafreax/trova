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
  try {
    const { body } = await request(ep)
    for await (const data of body) {
      if (data === undefined) {
        // This condition is unlikely with undici, but kept for safety
        console.log(chalk.red('Warning: received undefined data chunk'))
      }
      result += data
    }
    spinner.succeed(`Search complete for ${param}`) // Use succeed on success
    return JSON.parse(result)
  } catch (error) {
     spinner.fail(`Search failed for ${param}: ${error.message}`) // Use fail on error
     // Re-throw or handle error appropriately
     // Depending on the desired behavior, you might want to return an empty object or throw
     // For now, let's return an empty structure so `trova` can handle it
     return { objects: [] };
  }
}

/**
 * Start command trova
 * @param {string} name of packet to search for
 * @param {Object} options - options for search
 */
async function trova (name, options) {
  const { objects } = await search(name)

  // --- Refined Check ---
  // Filter for results where the package name actually includes the search term
  const relevantResults = objects && objects.filter(obj =>
    obj.package && obj.package.name && obj.package.name.toLowerCase().includes(name.toLowerCase())
  );

  if (!relevantResults || relevantResults.length === 0) {
    console.log(chalk.red(`❌ No relevant results found for query: ${name}`))
    // Optional: Log if the original search returned *something*, but nothing relevant
    if (objects && objects.length > 0) {
        console.log(chalk.yellow(`   (Note: The API returned ${objects.length} loosely related package(s).)`));
    }
    return false // Exit the function early
  }
  // --- End of Refined Check ---

  // Build the table *only* with the relevant results
  const table = buildTable(relevantResults, options)
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
    .action(async (name, options) => { // Make action async to await trova
      if (name) {
        console.log(chalk.blue('Trova ' + name))
        await trova(name, options) // Await the async trova function
      } else {
        console.log(chalk.red('No search term provided'))
        program.help(); // Show help if no argument provided
      }
    })

  // Add error handling for async operations during parsing/action
  try {
      await program.parseAsync(process.argv);
  } catch (error) {
      console.error(chalk.red(`An unexpected error occurred: ${error.message}`));
      process.exit(1); // Exit with error code
  }
}

start()
