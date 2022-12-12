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
    - [ ] (user, admin) addToList
    - [ ] (admin) createProduct
    - [ ] (admin) finishList
    - [ ] (user, admin) getActivePurchase
    - [ ] (user, admin) getProducts
    - [ ] (admin) getPurchases
    - [ ] (admin) updatePrice
    - [ ] (admin) updateProductAmount
    - [ ] (admin) updateProductName
    - [ ] (admin) removeFromList
    - [ ] (admin) getProductPrices
    - [ ] (admin) deletePurchase
    - [ ] (admin) deleteProduct
    - [ ] (admin) getProductPrices
    - [ ] (admin) getMostBoughtProduct
    - [ ] (admin) getOnePurchase

- [ ] Create full CRUD

  - [x] addToList
  - [x] createProduct
  - [x] finishList
  - [x] getActivePurchase
  - [x] getProducts
  - [x] getPurchases
  - [x] updatePrice
  - [x] updateProductAmount
  - [x] updateProductName
  - [ ] removeFromList
  - [ ] getProductPrices - get all prices of producttype in ascending order
  - [ ] deletePurchase (soft ha kell)
  - [ ] deleteProduct (soft ha kell)
  - [ ] getProductPrices
  - [ ] getMostBoughtProduct
  - [ ] getOnePurchase

- [ ] Create functioning UI

- [ ] Apply design to UI

## Future plans

- [ ] Extend to multiple users with their own purchases
- [ ] Rewrite database and API to make it less of a mess

