const _ = require('lodash')

async function runner( data, functionName, param=[]) {
  const [packageName, funcName] = functionName.split('.')
  if (packageName === '_') {
    return _[funcName](data, ...param)
  }
  throw new Error('unknonw function name')
}

async function runnerHelper (data, functionName, param= [], {pick,as}={}) {
    let input = _.cloneDeep(data)
    if (pick) {
        input = _.get(data,'test')
    }
    let result = await runner (input,functionName,param )
    if (as) {
        result = Object.assign({},data,{[as]:result})
    }
    return result
}

module.exports= {runner,runnerHelper}