import { Table } from 'console-table-printer'
export const MAXCOL = 50

export const colLen = (objects) => {
    return objects.reduce((a, c) => {
        const { package: { name, version, links }} = c
        const nameLen = name.length > MAXCOL ? MAXCOL : name.length
        const versionLen = version.length > MAXCOL ? MAXCOL : version.length
        const linkLen = links.npm.length > MAXCOL ? MAXCOL : links.npm.length
        return { 
            nameMaxLen: nameLen - a.nameMaxLen > 0 ? nameLen : a.nameMaxLen,
            versionMaxLen: versionLen - a.versionMaxLen > 0 ? versionLen : a.versionMaxLen,
            linkMaxLen: linkLen - a.linkMaxLen > 0 ? linkLen : a.linkMaxLen,
        }
    }, {
        nameMaxLen: 0,
        versionMaxLen: 0,
        linkMaxLen: 0,
    })
    
}

export const buildLinks = link => link.length > MAXCOL ?  "https://www.npmjs.com/" : link

export const buildName = name => name.length > MAXCOL ? name.substring(0, name.search(/[^a-z]i/)) : name

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
        rows: objects.map(({ package: { name, description, version, links }, score }) => ({ name: buildName(name), description, version, link: buildLinks(links.npm), score: score.final }))
    })
    return p
}
