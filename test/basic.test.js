const {
  runner,
  runnerHelper,
  renderSQL,
  renderSQLHelper
} = require('../lib/index')
const Database = require('sqlite-async')

test('basic execultor', async () => {
  const data = 'hello_world'
  const result = await runner(data, '_.split', ['_'])
  console.log(result)
  expect(result).toEqual(['hello', 'world'])
})

test('basic compromise', async () => {
  const data = `the opera about richard nixon visiting china`
  const result = await runner(data, 'compromise.topics.json')
  expect(result).toEqual([
    {
      text: 'richard nixon',
      terms: [
        {
          text: 'richard',
          tags: [
            'MaleName',
            'FirstName',
            'Person',
            'ProperNoun',
            'Singular',
            'Noun'
          ],
          pre: '',
          post: ' '
        },
        {
          text: 'nixon',
          tags: ['LastName', 'Person', 'ProperNoun', 'Singular', 'Noun'],
          pre: '',
          post: ' '
        }
      ]
    },
    {
      text: 'china',
      terms: [
        {
          text: 'china',
          tags: ['Country', 'Place', 'ProperNoun', 'Singular', 'Noun'],
          pre: '',
          post: ''
        }
      ]
    }
  ])
  //   expect(result).toEqual(['hello', 'world'])
})

test('basic wink-nlp', async () => {
  const data = `At 4:18 p.m. on July 20, 1969, a voice crackled from the speakers at NASA's Mission Control in Houston. He said simply, "the Eagle has landed." They spent nearly 21 hours on the lunar surface. Twenty percent of the world's population watched humans walk on the Moon for the first time. The space-mission was televised live in 33 countries. To know more, visit https://tinyurl.com/y85owr2u`
  const result = await runner(data, 'wink-nlp.entities.out')
  console.log(result)
  expect(result).toEqual([
    '4:18 p.m.',
    'July 20, 1969',
    'nearly 21 hours',
    'Twenty percent',
    'first',
    '33',
    'https://tinyurl.com/y85owr2u'
  ])
})

test('basic helper pick', async () => {
  const data = { test: 'hello_world' }
  const result = await runnerHelper(data, '_.split', ['_'], { pick: 'test' })
  expect(result).toEqual(['hello', 'world'])
})

test('basic helper pick as', async () => {
  const data = { test: 'hello_world' }
  const result = await runnerHelper(data, '_.split', ['_'], {
    pick: 'test',
    as: 'test2'
  })
  expect(result).toEqual({ test: 'hello_world', test2: ['hello', 'world'] })
})

test('basic helper pick empty', async () => {
  const data = { test: 'hello_world' }
  const result = await runnerHelper(data, '_.split', ['_'], {
    pick: 'test2',
    as: 'test3'
  })
  expect(result).toEqual({ test: 'hello_world', test3: [''] })
})

test('composeSql', async () => {
  const dbConn = await Database.open('test/input/hello.db')
  const query = `select * from hello_world where genus like '<%= genus %>'`
  const result = await renderSQL({ genus: 'adenia' }, query, { dbConn })
  expect(result.length).toEqual(2)
})

test('composeSql-with-quote', async () => {
  const dbConn = await Database.open('test/input/hello.db')
  const query = `select * from hello_world where title like '%<%= genus %>%'`
  const result = await renderSQL({ genus: "'fairy" }, query, { dbConn })
  expect(result.length).toEqual(2)
})

test('renderSQLHelper', async () => {
  const dbConn = await Database.open('test/input/hello.db')
  const query = `select * from hello_world where genus like '<%= genus %>'`
  const result = await renderSQLHelper({ genus: 'adenia' }, query, {
    dbConn,
    as: 'query_result'
  })
})

test('composeSql', async () => {
  const dbConn = await Database.open('test/input/hello.db')
  const query = `select * from hello_world where genus like '<%= genus %>'`
  const result = await renderSQL({ genus: null }, query, { dbConn })
  expect(result.length).toEqual(0)
})
