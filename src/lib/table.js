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

export const getColumns = (options, lens) => {
  const { nameMaxLen, versionMaxLen, linkMaxLen, maxDescriptionColumns } = lens
  return [
    { name: 'version', title: 'Version', alignment: 'left', maxLen: versionMaxLen },
    { name: 'name', title: 'Name', alignment: 'left', color: 'magenta', maxLen: nameMaxLen },
    { name: 'description', title: 'Description', alignment: 'left', color: 'cyan', maxLen: maxDescriptionColumns},
    { name: 'link', title: 'Link', alignment: 'left', color: 'blue', maxLen: linkMaxLen },
    { name: 'score', title: 'Score', alignment: 'right', color: 'green' }, 
  ]
}

export const getRows = (objects, options) => {
  return objects.map( ({ package: { name, description, version, links }, score }) => {
    const builtName = buildName(name)
    const builtLinks = buildLinks(links.npm)
    return {
      name: builtName,
      description: description,
      version: version,
      link: builtLinks,
      score: score.final
    }
  })
}

export const filterColumn = (column, excludeFields, fields) => {
  if (!fields.includes(column)) return true
  if (excludeFields.includes(column)) return true
  return false
}

export const buildTable = (objects, options) => {
  const { excludeFields:x, fields:f, limit } = options
  const { nameMaxLen, versionMaxLen, linkMaxLen } = colLen(objects)
  const maxDescriptionColumns = process.stdout.columns - nameMaxLen - versionMaxLen - 20 - linkMaxLen
  const columns = getColumns(options, { nameMaxLen, versionMaxLen, linkMaxLen, maxDescriptionColumns })
  const rows = getRows(objects, options).reduce((a, c, i) => { if (i <= limit) a.push(c); return a }, [])
  const disabledColumns = columns
    .filter( c => filterColumn(c.name, x, f))
    .map( c => c.name)
  const p = new Table({
    title: 'Packages',
    sort: (row1, row2) => row2.score.final - row1.score.final,
    columns,
    disabledColumns,
    rows
  })
  return p
}
