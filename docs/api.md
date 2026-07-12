# api.md

## Base URL

```text
/api/v1
```

---

## Authentication

Authentication is handled using Supabase Auth with JWT tokens.

Authorization levels:

* Public
* Logged-in User
* Admin

---

## Authentication Endpoints

### Register User

```http
POST /auth/register
```

Access:

* Public

Request Body:

```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Login User

```http
POST /auth/login
```

Access:

* Public

Request Body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Returns:

* Access token
* Refresh token
* User profile

---

### Logout User

```http
POST /auth/logout
```

Access:

* Logged-in User

---

### Get Current User

```http
GET /auth/me
```

Access:

* Logged-in User

---

## Category Endpoints

### List Categories

```http
GET /categories
```

Access:

* Public

---

### Get Category Details

```http
GET /categories/{category_id}
```

Access:

* Public

---

## Product Endpoints

### Get Products

```http
GET /products
```

Access:

* Public

Supported Query Parameters:

```text
?page=
&limit=
&category=
&search=
&min_price=
&max_price=
&size=
&sort=
&featured=
&language=
```

Example:

```http
GET /products?category=girls-dresses&sort=price_asc
```

---

### Get Product Details

```http
GET /products/{product_id}
```

Access:

* Public

---

### Get Featured Products

```http
GET /products/featured
```

Access:

* Public

---

### Search Products

```http
GET /products/search?q=baby dress
```

Access:

* Public

---

## Cart Endpoints

### Get Cart

```http
GET /cart
```

Access:

* Logged-in User

---

### Add Item to Cart

```http
POST /cart/items
```

Access:

* Logged-in User

Request Body:

```json
{
  "product_id": "uuid",
  "product_size_id": "uuid",
  "quantity": 2
}
```

---

### Update Cart Item

```http
PUT /cart/items/{cart_item_id}
```

Access:

* Logged-in User

---

### Remove Cart Item

```http
DELETE /cart/items/{cart_item_id}
```

Access:

* Logged-in User

---

### Clear Cart

```http
DELETE /cart
```

Access:

* Logged-in User

---

## Address Endpoints

### Get Addresses

```http
GET /addresses
```

Access:

* Logged-in User

---

### Add Address

```http
POST /addresses
```

Access:

* Logged-in User

---

### Update Address

```http
PUT /addresses/{address_id}
```

Access:

* Logged-in User

---

### Delete Address

```http
DELETE /addresses/{address_id}
```

Access:

* Logged-in User

---

## Order Endpoints

### Create Order

```http
POST /orders
```

Access:

* Logged-in User

Purpose:

* Creates an order from the active cart.

---

### Get User Orders

```http
GET /orders
```

Access:

* Logged-in User

---

### Get Order Details

```http
GET /orders/{order_id}
```

Access:

* Logged-in User

---

## Razorpay Payment Endpoints

### Create Razorpay Order

```http
POST /payments/razorpay/create-order
```

Access:

* Logged-in User

Returns:

* Razorpay order ID
* Amount
* Currency

---

### Verify Payment

```http
POST /payments/razorpay/verify
```

Access:

* Logged-in User

Request Body:

```json
{
  "razorpay_order_id": "order_xxxxx",
  "razorpay_payment_id": "payment_xxxxx",
  "razorpay_signature": "signature"
}
```

---

### Payment Webhook

```http
POST /payments/webhook
```

Access:

* Razorpay Server Only

Purpose:

* Updates payment status after successful payment.

---

## Translation Endpoints

### Get Supported Languages

```http
GET /languages
```

Access:

* Public

---

### Change Active Language

```http
POST /language/select
```

Access:

* Public

Request Body:

```json
{
  "language_code": "hi"
}
```

---

## Admin Endpoints

### Dashboard Statistics

```http
GET /admin/dashboard
```

Access:

* Admin

Returns:

* Total products
* Total orders
* Revenue summary

---

### Product Management

Create Product

```http
POST /admin/products
```

Update Product

```http
PUT /admin/products/{product_id}
```

Delete Product

```http
DELETE /admin/products/{product_id}
```

---

### Order Management

Get All Orders

```http
GET /admin/orders
```

Update Order Status

```http
PUT /admin/orders/{order_id}
```

---

## Health Check Endpoint

```http
GET /health
```

Access:

* Public

Response:

```json
{
  "status": "healthy"
}
```
