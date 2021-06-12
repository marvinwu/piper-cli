const _ = require('lodash')
const flat = require('flat')
const voca = require('voca')
async function runner( data, functionName, param=[]) {
  const [packageName, funcName] = functionName.split('.')
  if (packageName === '_') {
    return _[funcName](data, ...param)
  }
 if (packageName === 'voca') {
    return voca[funcName](data, ...param)
  }  

 if (packageName === 'flat') {
    let arg = {
        safe: true,
        delimiter: '_'
    }
    if (param[0]) {
        arg = JSON.parse(param[0])
    }
    return flat(data, arg)
  }  

  throw new Error('unknonw function name')
}

async function runnerHelper (data, functionName, param= [], {pick,as}={}) {
    let input = _.cloneDeep(data)
    if (pick) {
        input = _.get(data,pick)
    }
    let result = await runner (input,functionName,param )
    if (as) {
        result = Object.assign({},data,{[as]:result})
    }
    return result
}

module.exports= {runner,runnerHelper}