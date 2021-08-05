const _ = require('lodash')
const flat = require('flat')
const voca = require('voca')
const { convert } = require('html-to-text')
// const nlp = require('compromise')
const winkNLP = require('wink-nlp')
const model = require('wink-eng-lite-model')
const nlp = winkNLP(model)
const compromise = require('compromise')

function arrayToObject(array = []) {
  if (array.length === 0) {
    return {}
  }
  return array.reduce((output, current) => Object.assign(output, current), {})
}

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

  if (packageName === 'compromise') {
    const [tmp, ...funcNameArray] = functionName.split('.')
    let result = compromise(data)
    for (const func of funcNameArray) {
      result = result[func]()
    }
    return result
  }

  if (packageName === 'array-to-object') {
    return arrayToObject(data)
  }

  if (packageName === 'wink-nlp') {
    const [tmp, ...funcNameArray] = functionName.split('.')
    let result = nlp.readDoc(data)
    for (const func of funcNameArray) {
      result = result[func]()
    }
    return result
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
  try {
    const parsedInput = JSON.parse(input)
    if (typeof parsedInput === 'object') {
      input = parsedInput
    }
  } catch (error) {}

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
