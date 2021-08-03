cat test/input/html-to-text.json | bin/cli 'html-to-text' -p html -a text
cat test/input/nlp1.json | bin/cli compromise.topics.json -p text -a nlp
cat test/input/nlp1.json | bin/cli wink-nlp.entities.out -p text -a nlp
echo "{\"test\":[\"hello\",\"world\"]}" | ./bin/cli  _.join $'\n' -p test -a test2
echo "{\"title\":\"hello:world \"}" | ./bin/cli  _.split : -p title
cat test/input/array_to_object.json | jq -c '.[]' | bin/cli array-to-object -p quick_look
cat test/input/array_to_object.json | jq -c '.[]' | bin/cli _.keyBy quick_look_title  -p quick_look 
# {"html":"<h1>Hello World</h1>","text":"HELLO WORLD"}