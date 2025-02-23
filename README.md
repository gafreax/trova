# TROVA

A simple command-line utility for searching and displaying package information.

## Installation
You can simply use `npx` to run the utility without installing it.
Otherwise, you can install it globally using npm with the following command:

```bash
npm i -g @gafreax/trova
```

If you download the source code and want to run the utility from the project directory, you can use the following command:

```bash
npm start -- <name> [options]
```


### Usage

```bash
Usage: trova [options] <name>

Search npm package across npm.org repos by term

Arguments:
  name                              package to search

Options:
  -V, --version                     output the version number
  -l, --limit <number>              limit the number of results (default: 10)
  -f, --fields [fields...]          fields to show (default: ["name","version","description","link"])
  -x, --exclude-fields [fields...]  fields to exclude (default: ["score"])
  -h, --help                        display help for command
```

### Table Format

The table format will include by default the following columns:

* Version
* Package name
* Description
* Link

#### Example
We will search for the `autocannon` package and display a summary of its information in a table format, limit the results to 3 and exclude the `score` field and the `link` field.

```bash
$ npx trova autocannon -l 3 -x link -x score            # using npx
$ npm start -- autocannon -l 3 -x link -x score         # using npm inside the project
$ trova autocannon -l 3 -x link -x score                # using the global installation (npm i -g @gafreax/trova)
```

#### Output:
```bash

Trova autocannon
                                             Packages
┌───────────────┬────────────────────────────┬────────────────────────────────────────────────────┐
│ Version       │ Name                       │ Description                                        │
├───────────────┼────────────────────────────┼────────────────────────────────────────────────────┤
│ 8.0.0         │ autocannon                 │ Fast HTTP benchmarking tool written in Node.js     │
│ 7.12.6        │ @types/autocannon          │ TypeScript definitions for autocannon              │
│ 0.4.0         │ autocannon-compare         │ Compare two autocannon runs Edit                   │
│ 1.1.0         │ autocannon-reporter        │ A tool for creating html reports for autocannon    │
└───────────────┴────────────────────────────┴────────────────────────────────────────────────────┘

```

## npm

https://www.npmjs.com/package/@gafreax/trova?activeTab=readme

## License

Copyright 2025 Gabriele Fontana <gafreax@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

