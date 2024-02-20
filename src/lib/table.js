import { Table } from 'console-table-printer'

export const colLen = (objects) => {
    return objects.reduce((a, c) => {
        const { package: { name, version, links }} = c
        return { 
            nameMaxLen: name.length - a.nameMaxLen> 0 ? name.length : a.nameMaxLen,
            versionMaxLen: version.length - a.versionMaxLen > 0 ? version.length : a.versionMaxLen,
            linkMaxLen: links.npm.length - a.linkMaxLen > 0 ? links.npm.length : a.linkMaxLen,
        }
    }, {
        nameMaxLen: 0,
        versionMaxLen: 0,
        linkMaxLen: 0,
    })
    
}

export const buildTable = (objects) => {
    const { nameMaxLen, versionMaxLen, linkMaxLen } = colLen(objects)
    const maxDescriptionColumns = process.stdout.columns - nameMaxLen - versionMaxLen - 20 - linkMaxLen
    const p = new Table({
        title: 'Packages',
        sort: (row1, row2) => row2.score.final - row1.score.final,
        columns: [
            { name: 'version', title: 'Version', alignment: 'left', maxLen: versionMaxLen },
            { name: 'name', title: 'Name', alignment: 'left', color: 'magenta', maxLen: nameMaxLen },
            { name: 'description', title: 'Description', alignment: 'left', color: 'cyan', maxLen: maxDescriptionColumns},
            { name: 'link', title: 'Link', alignment: 'left', color: 'blue', maxLen: linkMaxLen },
            { name: 'score', title: 'Score', alignment: 'right', color: 'green' }, 
        ],
        disabledColumns: ['score'],
        rows: objects.map(({ package: { name, description, version, links }, score }) => ({ name, description, version, link: links.npm ?? '', score: score.final }))
    })
    return p
}
