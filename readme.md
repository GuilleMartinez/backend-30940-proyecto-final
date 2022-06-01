# E-commerce API - Backend Course - Coderhouse

## About this project 

Simple API to do CRUD operations on products and carts.


## Storage

You can choose between 5 methods for save your information.
1. File System
2. MariaDB - `localhost` (ecommerce DB is required before initialization)
3. SQLite3 - `localhost`
4. MongoDB - `localhost`
5. Firestore (Replace firebase.config.json file content with your credentials).

# API Endpoints

## Products

<details>
<summary>List all products</summary>

* URL: `/api/products`
* Method: `GET`
* Response: `200 (OK)`

JSON with products array.

```json
{
  "products": [
    {
      "id": "1652273047326",
      "timestamp": "2022-05-11T12:44:07.326Z",
      "name": "random product",
      "description": "description for a random product",
      "stock": 5,
      "price": 150,
      "code": "coder30940",
      "photo": ""
    }
  ]
}
```
</details>

<details>
    <summary>Add new product</summary>

* URL: `/api/products`
* Method: `POST`
* Response: `201 (Created)`
* Error: `400 (Bad request)`

### Required Fields

| Field       | Type   |
| ----------- | ------ |
| name        | string |
| description | string |
| photo       | string |
| code        | string |
| stock       | number |
| price       | number |

JSON with added product

```json
{
  "added": {
    "id": "1652273047326",
    "timestamp": "2022-05-11T12:44:07.326Z",
    "name": "random product",
    "description": "description for a random product",
    "stock": 5,
    "price": 150,
    "code": "coder30940",
    "photo": ""
  }
}
```
</details>


<details>
    <summary>Update a product</summary>

* URL: `/api/products/{product_id}`
* Method: `PUT`
* Response: `204 (No content)`
* Error: `404 (Not found)`

### Required Fields

| Field       | Type   |
| ----------- | ------ |
| name        | string |
| description | string |
| photo       | string |
| code        | string |
| stock       | number |
| price       | number |

</details>


<details>
    <summary>Remove a product</summary>

* URL: `/api/products/{product_id}`
* Method: `DELETE`
* Response: `204 (No content)`
* Error: `404 (Not found)`

</details>

## Carts

<details>
    <summary>Create a new cart</summary>

* URL: `/api/cart/`
* Method: `POST`
* Response: `201 (Created)`

JSON with cart ID
```json
{
  "cart": "1652273568738"
}
```
</details>

<details>
    <summary>Remove a cart</summary>

* URL: `/api/cart/{cart_id}`
* Method: `DELETE`
* Response: `204 (No content)`
* Error: `404 (Not Found)`
</details>


<details>
    <summary>List all products from cart</summary>

* URL: `/api/cart/{cart_id}/products`
* Method: `GET`
* Response: `200 (OK)`
* Error: `404 (Not Found)`

JSON with products array
```json
{
  "products": [
    {
      "id": "1652273047326",
      "timestamp": "2022-05-11T12:44:07.326Z",
      "name": "random product",
      "description": "description for a random product",
      "stock": 5,
      "price": 150,
      "code": "coder30940",
      "photo": ""
    }
  ]
}
```
</details>

<details>
    <summary>Add a new product into cart</summary>

* URL: `/api/cart/{cart_id}/products/{product_id}`
* Method: `POST`
* Response: `204 (No content)`
* Error: `404 (Not Found)`
  
</details>

<details>
    <summary>Remove a product from cart</summary>

* URL: `/api/cart/{cart_id}/products/{product_id}`
* Method: `DELETE`
* Response: `204 (No content)`
* Error: `404 (Not Found)`
</details>
