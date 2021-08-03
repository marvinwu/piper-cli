cat test/input/html-to-text.json | bin/cli 'html-to-text' -p html -a text
cat test/input/nlp1.json | bin/cli compromise.topics.json -p text -a nlp
cat test/input/nlp1.json | bin/cli wink-nlp.entities.out -p text -a nlp
# {"html":"<h1>Hello World</h1>","text":"HELLO WORLD"}