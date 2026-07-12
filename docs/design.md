# design.md

## Visual Style

* Soft, clean, and friendly appearance suitable for a baby clothing brand.
* Use rounded cards, generous spacing, and large product images.
* Mobile-first responsive design since many customers in India shop using phones.
* Simple navigation with minimal distractions to prioritize product discovery.

## Brand Tone

* Warm
* Trustworthy
* Family-friendly
* Modern and premium without feeling expensive

## Suggested Color Direction

* Soft pastel colors such as pink, sky blue, mint green, cream, and lavender.
* White backgrounds to keep products visually prominent.
* Subtle shadows and rounded corners for a welcoming look.

## Key Screens

### 1. Home Page

Purpose: Introduce the store and drive customers toward browsing products.

Components:

* Navigation bar
* Language selector
* Hero banner
* Featured categories
* New arrivals section
* Popular products section
* Promotional banner
* Footer

### 2. Product Listing Page

Purpose: Make browsing fast and enjoyable.

Components:

* Search bar
* Category filters
* Price filters
* Size filters
* Sort options
* Product grid with image, name, price, and quick add to cart

### 3. Product Detail Page

Purpose: Help customers make purchase decisions.

Components:

* Product image gallery
* Product name
* Price
* Available sizes
* Description
* Quantity selector
* Add to cart button
* Related products section

### 4. Shopping Cart Page

Purpose: Review selected items before checkout.

Components:

* Cart items list
* Quantity controls
* Remove item action
* Price breakdown
* Continue shopping button
* Proceed to checkout button

### 5. Checkout Page

Purpose: Complete the purchase with minimal friction.

Components:

* Customer information form
* Shipping address form
* Order summary
* Razorpay payment option
* Place order button

### 6. Order Success Page

Purpose: Confirm successful purchase.

Components:

* Order confirmation message
* Order summary
* Payment confirmation
* Continue shopping button

### 7. User Orders Page

Purpose: Allow customers to view previous purchases.

Components:

* Order list
* Order status
* Order details view

## Admin Screens (Demo Scope)

### Admin Dashboard

* Total products count
* Total orders count
* Revenue summary

### Product Management

* Create product
* Edit product
* Delete product
* Upload product images

### Order Management

* View orders
* Update order status

## Core User Flow

Home Page
→ Product Listing
→ Product Detail
→ Add to Cart
→ Cart
→ Checkout
→ Razorpay Payment
→ Order Success

Returning Customer Flow:

Home Page
→ Browse Products
→ Cart
→ Checkout
→ Payment
→ Order Success

Admin Flow:

Admin Login
→ Dashboard
→ Manage Products
→ Manage Orders

## Multi-language Flow

* Language selector available in the navigation bar.
* Selected language persists across page navigation.
* Product metadata supports multiple languages where available.
