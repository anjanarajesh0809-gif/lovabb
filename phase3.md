# Backend Phase 3 — Connect Backend + Frontend

## Critical Rule

The frontend already exists inside:

```text
/frontend
```

Do not modify, move, rename, regenerate, or restructure anything in the frontend folder.

The backend should be implemented entirely within:

```text
/backend
```

The only frontend change allowed is updating environment variables that point to the backend API URL.

---

## API Route Structure

Create the following route files:

```text
/backend/app/api/v1/endpoints

auth.py
categories.py
products.py
cart.py
addresses.py
orders.py
payments.py
languages.py
admin.py
health.py
```

Register all routers in:

```text
/backend/app/api/v1/router.py
```

Expose them through:

```text
/api/v1
```

---

## Implement API Endpoints

### Authentication

Implement:

* POST `/auth/register`
* POST `/auth/login`
* POST `/auth/logout`
* GET `/auth/me`

Use:

* Supabase Auth
* JWT validation
* Role-based access for admins

---

### Categories

Implement:

* GET `/categories`
* GET `/categories/{id}`

Public access.

---

### Products

Implement:

* GET `/products`
* GET `/products/{id}`
* GET `/products/featured`
* GET `/products/search`

Supported filters:

* category
* price range
* size
* featured
* search
* sorting
* language

Pagination required.

---

### Cart

Implement:

* GET `/cart`
* POST `/cart/items`
* PUT `/cart/items/{id}`
* DELETE `/cart/items/{id}`
* DELETE `/cart`

Authenticated users only.

---

### Addresses

Implement:

* GET `/addresses`
* POST `/addresses`
* PUT `/addresses/{id}`
* DELETE `/addresses/{id}`

Authenticated users only.

---

### Orders

Implement:

* POST `/orders`
* GET `/orders`
* GET `/orders/{id}`

When creating an order:

* Validate stock availability.
* Snapshot product names and prices.
* Calculate totals server-side.
* Create Razorpay order.

---

### Payments

Implement:

* POST `/payments/razorpay/create-order`
* POST `/payments/razorpay/verify`
* POST `/payments/webhook`

Payment verification must happen server-side only.

Never trust payment information coming from the frontend.

---

### Languages

Implement:

* GET `/languages`
* POST `/language/select`

Supported initial languages:

* English
* Hindi
* Malayalam

---

### Admin APIs

Protected by admin role.

Implement:

* GET `/admin/dashboard`
* POST `/admin/products`
* PUT `/admin/products/{id}`
* DELETE `/admin/products/{id}`
* GET `/admin/orders`
* PUT `/admin/orders/{id}`

---

## CORS Configuration

Configure FastAPI CORS middleware.

Allow:

```text
http://localhost:3000
https://your-frontend-domain.com
```

Allow:

* GET
* POST
* PUT
* DELETE
* OPTIONS

Allow credentials.

Restrict all other origins.

---

## Frontend Environment Variables

Frontend environment variables:

```text
/frontend/.env

VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_RAZORPAY_KEY_ID=
```

The frontend should never contain:

* Razorpay secret key
* Supabase service role key
* Backend JWT secret

---

## Backend Environment Variables

```text
/backend/.env

SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

JWT_SECRET_KEY=

FRONTEND_URL=http://localhost:3000
```

---

## Example End-to-End Flow

Customer opens product listing.

1. Frontend requests:

```http
GET /api/v1/products
```

2. Backend fetches products from Supabase.

3. Customer adds a product to cart.

```http
POST /api/v1/cart/items
```

4. Customer proceeds to checkout.

```http
POST /api/v1/orders
```

5. Backend creates Razorpay order.

6. Frontend launches Razorpay checkout.

7. Customer completes payment.

8. Frontend sends payment verification request.

```http
POST /api/v1/payments/razorpay/verify
```

9. Backend verifies signature with Razorpay.

10. Backend updates:

* payment_status = paid
* order_status = placed

11. Frontend redirects to order success page.

---

## Health Endpoint

Create:

```http
GET /health
```

Response:

```json
{
  "status": "healthy"
}
```

This should be used by deployment platforms and monitoring tools.

---

## Completion Criteria

The backend is considered complete when:

* Frontend can browse products.
* Users can register and login.
* Cart operations work.
* Checkout works.
* Razorpay payments work.
* Orders are stored.
* Multi-language product browsing works.
* Admin can manage products and orders.
* Existing frontend remains untouched.
