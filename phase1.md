# Backend Phase 1 — Folder Structure

## Important Rule

The frontend already exists inside:

```text
/frontend
```

Do not modify, move, rename, or restructure anything inside the frontend folder.

The backend must be built alongside it inside:

```text
/backend
```

---

## Project Structure

```text
/backend
│
├── app
│   ├── api
│   │   └── v1
│   │       ├── endpoints
│   │       └── router.py
│   │
│   ├── core
│   │   ├── config.py
│   │   ├── security.py
│   │   └── dependencies.py
│   │
│   ├── models
│   │
│   ├── schemas
│   │
│   ├── services
│   │
│   ├── repositories
│   │
│   ├── integrations
│   │   ├── supabase.py
│   │   └── razorpay.py
│   │
│   ├── middleware
│   │
│   ├── utils
│   │
│   └── main.py
│
├── tests
│
├── .env
├── .env.example
├── requirements.txt
├── README.md
└── pyproject.toml
```

---

## Folder Responsibilities

### app/api/v1/endpoints

Contains all API route files grouped by resource:

Examples:

```text
auth.py
products.py
categories.py
cart.py
orders.py
payments.py
admin.py
```

---

### app/core

Contains application-wide configuration.

Files:

* `config.py`

  * Environment variables
  * Supabase configuration
  * Razorpay credentials

* `security.py`

  * JWT helpers
  * Authentication utilities

* `dependencies.py`

  * Shared FastAPI dependencies

---

### app/models

Contains database models and ORM definitions.

This remains empty until Phase 2.

---

### app/schemas

Contains Pydantic request and response models.

Examples:

```text
product.py
order.py
cart.py
user.py
payment.py
```

---

### app/services

Contains business logic.

Examples:

```text
product_service.py
payment_service.py
order_service.py
cart_service.py
```

Routes should remain thin and delegate logic to services.

---

### app/repositories

Responsible for database access operations.

Examples:

```text
product_repository.py
order_repository.py
user_repository.py
```

This keeps database logic separate from business logic.

---

### app/integrations

Contains third-party service clients.

Files:

* `supabase.py`
* `razorpay.py`

---

### app/middleware

Application middleware such as:

* CORS
* Request logging
* Exception handling

---

### app/utils

Shared helper utilities.

Examples:

```text
currency.py
pagination.py
translations.py
```

---

### app/main.py

FastAPI application entrypoint.

Responsibilities:

* Create FastAPI app.
* Register routers.
* Configure middleware.
* Configure startup events.

---

## Environment Variables

The `.env.example` file should contain:

```text
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

JWT_SECRET_KEY=

FRONTEND_URL=
API_V1_PREFIX=/api/v1
```

---

## Dependencies

Initial dependencies should include:

```text
fastapi
uvicorn
python-dotenv
supabase
pydantic
pydantic-settings
python-jose
passlib
bcrypt
python-multipart
razorpay
httpx
```

Database migration tooling is intentionally omitted at this stage because Supabase manages the underlying PostgreSQL infrastructure and this is a demo-scale project.

---

## Initial Goal of This Phase

After Phase 1 is complete the backend should be able to:

* Start successfully.
* Load environment variables.
* Connect to Supabase.
* Connect to Razorpay.
* Expose a health check endpoint.
* Be ready for database models in Phase 2.
