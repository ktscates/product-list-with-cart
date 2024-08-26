[![Netlify Status](https://api.netlify.com/api/v1/badges/f0771ac2-e4de-408e-81cf-c87aa2b49fd0/deploy-status)](https://app.netlify.com/sites/ktscates-product-list-with-cart/deploys)
![Github actions](https://github.com/ktscates/product-list-with-cart/actions/workflows/node.js.yml/badge.svg)


# Product List with Cart

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Cart Management](#cart-management)
  - [Adding Products to Cart](#adding-products-to-cart)
  - [Removing Products from Cart](#removing-products-from-cart)
  - [Calculating Total](#calculating-total)
- [Live Link](#live-link)

## Introduction

This application is a product listing and cart system built with Angular. The app allows users to browse through a list of desserts, add them to a cart, and review their selected items before confirming an order. 

## Features

- Display a list of desserts with images, categories, names, and prices.
- Add products to the cart using the quantity selection.
- Remove products from the cart.
- View a summary of the cart with the total cost.
- Mobile-friendly modal for cart review and order confirmation.

## Technologies Used

- **Angular**
- **TailwindCSS**
- **RxJS**

## Getting Started

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ktscates/product-list-with-cart.git
   cd product-list-with-cart
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

### Running the App

    ```bash
    ng serve
    ```
    Open your browser and navigate to `http://localhost:4200/`.

## Cart Management

### Adding Products to Cart

Users can add products to the cart by clicking the "Add to Cart" button on each product card. The cart quantity is updated accordingly, and the user can see the updated items in the cart.

### Removing Products from the Cart

Products can be removed from the cart by clicking the delete icon next to each item in the cart. This updates the cart contents and recalculates the total cost.

### Calculating Total

The total cost of the cart is calculated dynamically based on the items added to the cart and their quantities. The total is displayed at the bottom of the cart.


## Live Link

You can access the deployed application at [Product List with Cart App](https://ktscates-product-list-with-cart.netlify.app/).

