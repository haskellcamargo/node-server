# Node Demo Server

## Setup

- Clone this repository
- Run `npm install && npm build`
- Run `npm start`
- Profit!

## Development

- `npm build` to compile the sources to ES5
- `npm lint` to run `eslint` under `src/`
- `npm test` to run `mocha` tests over the server

Testing will also give the text output coverage via `nyc`.

## Configuring

Under `config/`, define your environment settings. Start the server
with `NODE_ENV=<profile>` set. There are `default` and `test` at the
moment.

## Stack

- **Node.JS** because: yes
- **MongoDB** because:
    - BSON has good interoperability with JS
    - Mongo is pretty good on indexing things
    - Querying statistic data in large indexed collections is pretty fast
    - Aggregations support (althought not used here)
- **Babel** because:
    - The compiler is very extensible and I write a lot of plugins for it
    - I can make JS less painful
- **Mocha + Chai** because:
    - **Jest** is one of the worst tools I've seen for testing (Mocha is love)
- **Eslint + eslint-config-rung**
    - Eslint with the set of configs we've built for Rung. No `let`, no `var`, no loops, no mutability, not that painful

However, although we've used `mongoose` is definitely not the way to go.
Sorry, people, everything is terrible.

