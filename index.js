import chalk from 'chalk'
import ora from 'ora'
import { request } from 'undici'

const config = {
  baseurl: 'https://registry.npmjs.org'
}

function ellipsys (text, len) {
  if (text.length <= len) {
    return text
  }
  const sub = text.substr(0, len)
  const lastSpace = sub.lastIndexOf(' ')
  const str = lastSpace ? sub.substr(0, lastSpace) : sub
  return `${str}...`
}

async function search (param) {
  let result = ''
  const ep = `${config.baseurl}/-/v1/search?text=${param}`
  const { body } = await request(ep)
  for await (const data of body) {
    if (data === undefined) {
      console.log(chalk.red('errore data = ' + data))
    }
    result += data
  }
  return JSON.parse(result)
}

async function start () {
  const spinner = ora('Loading...').start()

  spinner.stop()
  const { objects } = await search(process.argv[2])
  const table = []
  for (const object of objects) {
    const { name, description, version } = object?.package ?? { name: '', description: '', version: '' }
    table[name] = { description: ellipsys(description, 50), version }
  }

  console.table(table)
}

start()
