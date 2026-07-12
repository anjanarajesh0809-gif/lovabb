# db_er.md

## Database Platform

* Supabase (PostgreSQL)

## Tables

### users

Stores customer account information.

Fields:

* id (UUID, Primary Key)
* full_name
* email (Unique)
* phone_number
* password_hash
* preferred_language
* created_at
* updated_at

Indexes:

* email (unique)
* phone_number

---

### addresses

Stores customer shipping addresses.

Fields:

* id (UUID, Primary Key)
* user_id (Foreign Key → users.id)
* full_name
* phone_number
* address_line_1
* address_line_2
* city
* state
* postal_code
* country
* is_default
* created_at

Indexes:

* user_id

Relationship:

* One user can have multiple addresses.

---

### categories

Stores product categories.

Fields:

* id (UUID, Primary Key)
* name
* slug (Unique)
* created_at

Indexes:

* slug (unique)

Examples:

* New Born
* Girls Dresses
* Boys Wear
* Party Wear

---

### products

Stores product information.

Fields:

* id (UUID, Primary Key)
* category_id (Foreign Key → categories.id)
* name
* description
* price
* discount_price
* stock_quantity
* sku (Unique)
* featured
* active
* created_at
* updated_at

Indexes:

* category_id
* sku (unique)
* featured
* active

Relationship:

* One category contains many products.

---

### product_images

Stores product image URLs.

Fields:

* id (UUID, Primary Key)
* product_id (Foreign Key → products.id)
* image_url
* display_order

Indexes:

* product_id

Relationship:

* One product can have multiple images.

---

### product_sizes

Stores available sizes for products.

Fields:

* id (UUID, Primary Key)
* product_id (Foreign Key → products.id)
* size_label
* stock_quantity

Indexes:

* product_id
* size_label

Examples:

* 0-3 Months
* 3-6 Months
* 6-12 Months
* 1-2 Years

Relationship:

* One product can have multiple sizes.

---

### carts

Stores active shopping carts.

Fields:

* id (UUID, Primary Key)
* user_id (Foreign Key → users.id)
* created_at
* updated_at

Indexes:

* user_id

Relationship:

* One user has one active cart.

---

### cart_items

Stores products inside a cart.

Fields:

* id (UUID, Primary Key)
* cart_id (Foreign Key → carts.id)
* product_id (Foreign Key → products.id)
* product_size_id (Foreign Key → product_sizes.id)
* quantity

Indexes:

* cart_id
* product_id

Relationship:

* One cart contains many cart items.

---

### orders

Stores customer orders.

Fields:

* id (UUID, Primary Key)
* user_id (Foreign Key → users.id)
* address_id (Foreign Key → addresses.id)
* total_amount
* payment_status
* order_status
* razorpay_order_id
* razorpay_payment_id
* created_at
* updated_at

Indexes:

* user_id
* payment_status
* order_status
* razorpay_order_id

Examples:

* payment_status:

  * pending
  * paid
  * failed

* order_status:

  * placed
  * processing
  * shipped
  * delivered
  * cancelled

---

### order_items

Stores products purchased in an order.

Fields:

* id (UUID, Primary Key)
* order_id (Foreign Key → orders.id)
* product_id (Foreign Key → products.id)
* product_name_snapshot
* product_price_snapshot
* size_snapshot
* quantity

Indexes:

* order_id
* product_id

Relationship:

* One order contains many order items.

---

### translations

Stores multilingual content.

Fields:

* id (UUID, Primary Key)
* entity_type
* entity_id
* language_code
* translated_name
* translated_description

Indexes:

* entity_type
* entity_id
* language_code (unique with entity_id and entity_type)

Examples:

* en
* hi
* ml
* ta

This allows products and categories to be displayed in multiple Indian languages without changing the main product records.

---

## Relationship Summary

users
→ addresses
→ carts
→ orders

categories
→ products
→ product_images
→ product_sizes

carts
→ cart_items

orders
→ order_items

products
→ translations

categories
→ translations

---

## Supabase Notes

* Product images should be stored in Supabase Storage buckets.
* Row Level Security (RLS) should protect customer-specific tables.
* Public read access can be enabled for products and categories.
* Authenticated users can only access their own carts, addresses, and orders.
