# Cycle Logger

Logging util for cycle.js's requests and responses.
This package is small, and untested.

<img width="759" alt="2015-10-11 1 34 09" src="https://cloud.githubusercontent.com/assets/1506738/10412212/96cb82d8-6fb9-11e5-95fc-cdc56a381098.png">

## Install

`npm install -S cycle-logger`

## Usage

simply wrap your `main()` function with `logger()`
Currently, For response, only response that is observable are logged(except DOM).

```js
import Cycle from '@cycle/core'
import {makeDOMDriver} from '@cycle/dom';
import view from './views';
import model from './models';
import intent from './intent';
import logger from 'cycle-logger'

const main = (responses) => {
  let tree$ = view(model(intent(responses)))

  return {
    DOM: tree$,
    MARKDOWN: md$
  }
};

// wrapped!
Cycle.run(logger(main), {
  DOM: makeDOMDriver('#root')
});

// you can also pass options
Cycle.run(logger(main, {collapse: true}), {
  DOM: makeDOMDriver('#root')
});
```

## API

`cycle-logger` exposes single function for creating wrapped `main` function.

**createLogger(main: Function, options?: Object)**

### Options

#### logger (Object)

Implementation of the `console` API. Useful if you are using a custom, wrapped version of `console`.

Default: `window.console`

#### collapsed (boolean)

Returns true if the log group should be collapsed, false otherwise.

Default: `false`

#### timestamp (Boolean)

Print timestamp with each action

Default: `true`
