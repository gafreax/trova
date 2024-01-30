import { Table } from 'console-table-printer'
import { ellipsys } from './text.js'

export const maxColumnLen = (objects) => {
    const longestString =  objects.reduce((a, c) => {
        return c?.description?.length - a > 0? c.description.length : a
    }, 0)
    return longestString > process.stdout.columns - 10 ? process.stdout.columns - 10 : longestString
}

export const buildTable = (objects) => {
    const maxDescriptionColumns = maxColumnLen(objects)
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
    return p
}
