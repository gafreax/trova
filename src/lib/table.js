import { Table } from 'console-table-printer'

export const colLen = (objects) => {
    return objects.reduce((a, c) => {
        const { package: { name, version }} = c
        return { 
            nameMaxLen: name.length - a.nameMaxLen> 0 ? name.length : a.nameMaxLen,
            versionMaxLen: version.length - a.versionMaxLen > 0 ? version.length : a.versionMaxLen
        }
    }, {
        nameMaxLen: 0,
        versionMaxLen: 0,
    })
    
}

export const buildTable = (objects) => {
    const { nameMaxLen, versionMaxLen } = colLen(objects)
    const maxDescriptionColumns = process.stdout.columns - nameMaxLen - versionMaxLen - 12
    const p = new Table({
        title: 'Packages',
        sort: (row1, row2) => row2.score - row1.score,
        columns: [
            { name: 'name', title: 'Name', alignment: 'left', color: 'magenta', maxLen: nameMaxLen },
            { name: 'description', title: 'Description', alignment: 'left', color: 'cyan', maxLen: maxDescriptionColumns},
            { name: 'version', title: 'Version', alignment: 'left', maxLen: versionMaxLen },
            { name: 'score' }
        ],
        disabledColumns: ['score'],
        rows: objects.map(({ package: { name, description, version, score } }) => ({ name, description, version, score }))
    })
    return p
}
