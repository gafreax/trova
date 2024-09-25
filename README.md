# TROVA

A simple command-line utility for searching and displaying package information.

### Usage

```bash
npx @gafreax/trova <search_term>
```

Replace `<search_term>` with the term you want to search for.

#### Example
We will search for the `autocannon` package and display a summary of its information in a table format.

```bash
npx @gafreax/trova autocannon
```

Output:
```bash
Trova autocannon
                                                                        Packages                                                                         
┌───────────────┬──────────────────────────┬───────────────────────────────────────────────────────┬────────────────────────────────────────────────────┐
│ Version       │ Name                     │ Description                                           │ Link                                               │
├───────────────┼──────────────────────────┼───────────────────────────────────────────────────────┼────────────────────────────────────────────────────┤
│ 7.15.0        │ autocannon               │ Fast HTTP benchmarking tool written in Node.js        │ https://www.npmjs.com/package/autocannon           │
│ 2.3.5         │ autocannon-ui            │ A Web user interface for autocannon                   │ https://www.npmjs.com/package/autocannon-ui        │
│ 3.0.0         │ @naturalcycles/bench-lib │ Benchmarking library, based on Benchmark.js and       │ https://www.npmjs.com/                             │
│               │                          │ Autocannon                                            │                                                    │
│ 7.12.5        │ @types/autocannon        │ TypeScript definitions for autocannon                 │ https://www.npmjs.com/                             │
│ 1.1.0         │ autocannon-reporter      │ A tool for creating html reports for autocannon       │ https://www.npmjs.com/package/autocannon-reporter  │
│ 1.0.1         │ autocannon-app           │ A web ui of autocannon                                │ https://www.npmjs.com/package/autocannon-app       │
│ 4.7.0-alpha.0 │ @homura/autocannon       │ Fast HTTP benchmarking tool written in Node.js        │ https://www.npmjs.com/                             │
│ 1.2.0         │ autocannon-cig           │ Fast HTTP benchmarking tool written in Node.js        │ https://www.npmjs.com/package/autocannon-cig       │
│ 7.8.5         │ @cooperhsiung/autocannon │ Fast HTTP benchmarking tool written in Node.js        │ https://www.npmjs.com/                             │
│ 0.0.2         │ yucheng                  │ autocannon -c 100 -d 5 https://app.konnect.chat/      │ https://www.npmjs.com/package/yucheng              │
│ 0.4.0         │ autocannon-compare       │ Compare two autocannon runs Edit                      │ https://www.npmjs.com/package/autocannon-compare   │
│ 0.0.1         │ autocannon-storage       │ A utility for storing and sorting autocannon results  │ https://www.npmjs.com/package/autocannon-storage   │
│ 0.1.0         │ autocannon-ci            │ run your benchmarks as part of your dev flow, for     │ https://www.npmjs.com/package/autocannon-ci        │
│               │                          │ Node.js                                               │                                                    │
└───────────────┴──────────────────────────┴───────────────────────────────────────────────────────┴────────────────────────────────────────────────────┘
```

### Table Format

The table format will include the following columns:

* Version
* Package name
* Description
* Link

## License

Copyright 2024 Gabriele Fontana <gafreax@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

