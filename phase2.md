# Backend Phase 2 — Database Setup

## Important Rule

The existing frontend inside:

```text
/frontend
```

must not be modified, moved, or restructured.

Only backend files inside:

```text
/backend
```

should be created or updated.

---

## Database Strategy

Database platform:

* Supabase PostgreSQL

Because this is a demo project using Supabase, use SQL migration files stored in:

```text
/backend/database/migrations
```

rather than introducing heavy migration frameworks.

---

## Backend Database Structure

Create:

```text
/backend
└── database
    ├── migrations
    │   └── 001_initial_schema.sql
    │
    └── seeds
        └── demo_products.sql
```

---

## Models To Implement

Inside:

```text
/backend/app/models
```

create the following models:

```text
user.py
address.py
category.py
product.py
product_image.py
product_size.py
cart.py
cart_item.py
order.py
order_item.py
translation.py
```

Models should mirror the database schema defined in `db_er.md`.

---

## Core Relationships

### User

has many:

* Addresses
* Orders

has one:

* Active Cart

---

### Category

has many:

* Products

---

### Product

belongs to:

* Category

has many:

* Product Images
* Product Sizes
* Order Items

---

### Cart

belongs to:

* User

contains many:

* Cart Items

---

### Order

belongs to:

* User
* Address

contains many:

* Order Items

---

## Initial SQL Migration

### users

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT,
    password_hash TEXT NOT NULL,
    preferred_language TEXT DEFAULT 'en',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

### categories

```sql
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

### products

```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES categories(id),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    discount_price NUMERIC(10,2),
    stock_quantity INTEGER DEFAULT 0,
    sku TEXT UNIQUE NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

### product_images

```sql
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);
```

---

### product_sizes

```sql
CREATE TABLE product_sizes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    size_label TEXT NOT NULL,
    stock_quantity INTEGER DEFAULT 0
);
```

---

### carts

```sql
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

### cart_items

```sql
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    product_size_id UUID REFERENCES product_sizes(id),
    quantity INTEGER NOT NULL
);
```

---

### addresses

```sql
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    address_line_1 TEXT NOT NULL,
    address_line_2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT DEFAULT 'India',
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

### orders

```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    address_id UUID REFERENCES addresses(id),
    total_amount NUMERIC(10,2) NOT NULL,
    payment_status TEXT DEFAULT 'pending',
    order_status TEXT DEFAULT 'placed',
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

### order_items

```sql
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    product_name_snapshot TEXT NOT NULL,
    product_price_snapshot NUMERIC(10,2) NOT NULL,
    size_snapshot TEXT,
    quantity INTEGER NOT NULL
);
```

---

### translations

```sql
CREATE TABLE translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    language_code TEXT NOT NULL,
    translated_name TEXT,
    translated_description TEXT,
    UNIQUE(entity_type, entity_id, language_code)
);
```

---

## Recommended Indexes

Create indexes for:

```text
users.email
categories.slug
products.category_id
products.sku
products.featured
orders.user_id
orders.payment_status
orders.order_status
translations.language_code
```

---

## Row Level Security Policies

Enable RLS for:

* users
* addresses
* carts
* cart_items
* orders
* order_items

Rules:

* Users can only access their own data.
* Admin users can access all records.
* Products and categories remain publicly readable.

---

## Seed Data

Create a demo dataset containing:

* 5 categories
* 20 products
* Product images
* Size variants
* English translations
* Hindi translations
* Malayalam translations

This allows the frontend to demonstrate browsing, filtering, and language switching immediately.

---

## Completion Criteria

After Phase 2 the backend should have:

* Complete database schema.
* Supabase tables created.
* RLS policies enabled.
* Demo data loaded.
* Product catalog ready for frontend consumption.
