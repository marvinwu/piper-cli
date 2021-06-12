const {runner,runnerHelper} = require('../lib/index')


test('basic execultor', async () => {
    const data = 'hello_world'
    const result = await runner(data, '_.split', ['_'])
    console.log(result)
    expect(result).toEqual( [ 'hello', 'world' ])
})


test('basic helper pick', async () => {
    const data = {test: 'hello_world'}
    const result = await runnerHelper(data, '_.split', ['_'], {pick: 'test'})
    expect(result).toEqual( [ 'hello', 'world' ])
})


test('basic helper pick as', async () => {
    const data = {test: 'hello_world'}
    const result = await runnerHelper(data, '_.split', ['_'], {pick: 'test', as: 'test2'})
    expect(result).toEqual( {"test": "hello_world", "test2": ["hello", "world"]})
})
