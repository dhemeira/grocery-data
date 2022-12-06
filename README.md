# Grocery Data

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

An app that keeps track of shopping lists, prices, past purchases and more!

[Made with Nuxt 3](https://nuxt.com/docs/getting-started/introduction)

## Setup

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Commit

```bash
npm run commit
```

## Todo

- [ ] Create Kanban table
- [ ] Create auth
  - [ ] Make auth required to use app
- [ ] Create full CRUD
  - [x] create purchase
  - [x] get purchases
  - [x] get active purchase
  - [x] update product price
  - [x] get producttypes
  - [x] create producttype
  - [ ] update producttype (name)
  - [ ] get all prices of producttype in ascending order
  - [ ] create product
  - [ ] update product
  - [ ] delete purchase (soft)
  - [ ] delete producttype (soft)
  - [ ] when creating new finished purchase, update product relations from active purchases to finished for bought products
- [ ] Create functioning UI
- [ ] Apply design to UI

## Future plans

- [ ] Extend to multiple users with their own purchases

