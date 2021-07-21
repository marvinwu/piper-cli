const _ = require('lodash')
const flat = require('flat')
const voca = require('voca')
const { convert } = require('html-to-text')

async function runner(data, functionName, param = []) {
  let arg = {}
  const [packageName, funcName] = functionName.split('.')
  if (packageName === '_') {
    return _[funcName](data, ...param)
  }

  if (packageName === 'html-to-text') {
    if (param[0]) {
      arg = JSON.parse(param[0])
    }
    return convert(data, arg)
  }

  if (packageName === 'flat') {
    arg = {
      safe: true,
      delimiter: '_'
    }
    if (param[0]) {
      arg = JSON.parse(param[0])
    }
    return flat(data, arg)
  }

  throw new Error(`unknonw function name ${packageName}`)
}

async function runnerHelper(data, functionName, param = [], { pick, as } = {}) {
  let input = _.cloneDeep(data)
  if (pick) {
    input = _.get(data, pick)
  }
  let result = await runner(input, functionName, param)
  if (as) {
    result = Object.assign({}, data, { [as]: result })
  }
  return result
}

function escaperSQL(data = {}) {
  let escapedData = {}
  for (const [key, value] of Object.entries(data)) {
    escapedData[key] = value
    if (value) {
      escapedData[key] = value.replace("'", "''")
    }
  }
  return escapedData
}
async function renderSQL(data, query, { dbConn } = {}) {
  return dbConn.all(_.template(query)(escaperSQL(data)))
}

async function renderSQLHelper(data, query, { dbConn, as } = {}) {
  const result = await renderSQL(data, query, { dbConn })
  return Object.assign({}, data, { [as]: result })
}
module.exports = {
  runner,
  runnerHelper,
  renderSQL,
  renderSQLHelper,
  escaperSQL
}
