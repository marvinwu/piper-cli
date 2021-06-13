const {runner,runnerHelper,renderSQL,renderSQLHelper} = require('../lib/index')
const Database = require('sqlite-async')


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


test('basic helper pick empty', async () => {
    const data = {test: 'hello_world'}
    const result = await runnerHelper(data, '_.split', ['_'], {pick: 'test2', as: 'test3'})
    expect(result).toEqual( { test: 'hello_world', test3: [ '' ] })
})


test('composeSql', async () => {
    const dbConn = await Database.open('test/input/hello.db')
    const query = `select * from hello_world where genus like '<%= genus %>'`
    const result = await renderSQL({genus: 'adenia'},query, {dbConn} )
    expect(result.length).toEqual(2)
})


test('composeSql-with-quote', async () => {
    const dbConn = await Database.open('test/input/hello.db')
    const query = `select * from hello_world where title like '%<%= genus %>%'`
    const result = await renderSQL({genus: "'fairy"},query, {dbConn} )
    expect(result.length).toEqual(2)
})

test('renderSQLHelper', async () => {
    const dbConn = await Database.open('test/input/hello.db')
    const query = `select * from hello_world where genus like '<%= genus %>'`
    const result = await renderSQLHelper({genus: 'adenia'},query, {dbConn, as:'query_result'} )
})

