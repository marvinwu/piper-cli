
## avaliable commands


```

> piper-cli --help

Usage: piper-cli [options] [command]

Options:
  -h, --help               display help for command

Commands:
  flatten [options]
    Usage: piper-cli flatten [options]
    Options:
      -d, --delimiter [delimiter]  delimiter, default _, optional
      -s, --safe                   will not flatten arrays
      -h, --help                   display help for command

  keys # get the avaliable keys from a collections
  keyBy [options] <key>
    Usage: piper-cli keyBy [options] <key>
    Options:
      -p, --pickBy <pick_by>]  pick property to key by
      -rm, --removeOriginal    remove picked property, optinal
      -h, --help               display help for command
  split <key> <delimiter>
  join <key> [delimiter]


```