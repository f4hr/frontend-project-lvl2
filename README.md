# Gendiff

[![CI](https://github.com/f4hr/frontend-project-lvl2/actions/workflows/main.yml/badge.svg)](https://github.com/f4hr/frontend-project-lvl2/actions/workflows/main.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/bbe4f5c2bd08fc9e2ceb/maintainability)](https://codeclimate.com/github/f4hr/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/bbe4f5c2bd08fc9e2ceb/test_coverage)](https://codeclimate.com/github/f4hr/frontend-project-lvl2/test_coverage)

### Hexlet tests and linter status:
[![Actions Status](https://github.com/f4hr/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/f4hr/frontend-project-lvl2/actions)

## Options and flat JSON

> \__fixtures__/json/flat1.json

```json
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```

> \__fixtures__/json/flat2.json

```json
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```
[![asciicast](https://asciinema.org/a/9pUWJtPxXaaNGnCmtECoDQuom.svg)](https://asciinema.org/a/9pUWJtPxXaaNGnCmtECoDQuom)

## Flat YAML

> \__fixtures__/yaml/flat1.json

```yaml
host: hexlet.io
timeout: 50
proxy: 123.234.53.22
follow: false
```

> \__fixtures__/yaml/flat2.json

```yaml
timeout: 20
verbose: true
host: hexlet.io
```
[![asciicast](https://asciinema.org/a/YuYSUpU8REhvkvSfWf4Ra0tzo.svg)](https://asciinema.org/a/YuYSUpU8REhvkvSfWf4Ra0tzo)

## Recursive JSON and YAML

> \__fixtures__/json/tree1.json

```json
{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
}
```

> \__fixtures__/yaml/tree1.yml

```yaml
common:
  follow: false
  setting1: Value 1
  setting3: null
  setting4: blah blah
  setting5:
    key5: value5
  setting6:
    key: value
    ops: vops
    doge:
      wow: so much
group1:
  foo: bar
  baz: bars
  nest: str
group3:
  deep:
    id:
      number: 45
  fee: 100500
```
[![asciicast](https://asciinema.org/a/s2mYpOKjrKrB4ZFAUBdG2FnrO.svg)](https://asciinema.org/a/s2mYpOKjrKrB4ZFAUBdG2FnrO)
