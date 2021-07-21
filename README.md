## purpose

a simple cli wrapper to process ndjson using well known packages such as
lodash,voca and others

## example

### Lodash

- using lodash keyBy function to process an nested array

[Lodash](https://lodash.com/)

```bash
echo "{\"title\":\"hello:world \",\"testArray\":[\"1\",\"2\"],\"testNested\":[{\"title\":\"hello\",\"content\":\"hellooooooo\"},{\"title\":\"world\",\"content\":\"random test\"}]}" | ./bin/cli  _.keyBy title -p testNested -a keyed_testNested | jq
{
  "title": "hello:world ",
  "testArray": [
    "1",
    "2"
  ],
  "testNested": [
    {
      "title": "hello",
      "content": "hellooooooo"
    },
    {
      "title": "world",
      "content": "random test"
    }
  ],
  "keyed_testNested": {
    "hello": {
      "title": "hello",
      "content": "hellooooooo"
    },
    "world": {
      "title": "world",
      "content": "random test"
    }
  }
}
```

- use lodash split by function

```bash
echo "{\"title\":\"hello:world \"}" | ./bin/cli  _.split : -p title
```

- use lodash join by function, join array by newline

```bash
echo "{\"test\":[\"hello\",\"world\"]}" | ./bin/cli  _.join $'\n' -p test -a test2
{"test":["hello","world"],"test2":"hello\nworld"}
```

- flatten

[flat - npm](https://www.npmjs.com/package/flat)

==can pass json paramter to flat function==

```
cat test/input/test3.json
 {"some":"thing"}
 {"foo":17,"bar":false,"quux":true}
 {"may":{"include":"nested","objects":["and","arrays"]}}


cat test/input/test3.json |  ./bin/cli  flat '{"safe":true,"delimiter":"!"}'
{"some":"thing"}
{"foo":17,"bar":false,"quux":true}
{"may!include":"nested","may!objects":["and","arrays"]}
```

### html to text

```
cat test/input/html-to-text.json | bin/cli 'html-to-text' -p html -a text
#{"html":"<h1>Hello World</h1>","text":"HELLO WORLD"}
```

## compose SQL

```bash
 echo '{"genus": "adenia"}' | ./bin/cli compose -a 'hello' --db test/input/hello.db "select * from hello_world where genus like '<%= genus %>'" --key test
```
