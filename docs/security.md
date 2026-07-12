# security.md

## Security Approach

This project uses managed services where possible to reduce custom security work and lower the risk of implementation mistakes.

Core security components:

* Supabase Authentication for user accounts and session management.
* JWT-based authentication between frontend and backend APIs.
* Razorpay-hosted payment processing so card details never touch our servers.
* HTTPS enforced in deployment environments.

---

## Authentication Strategy

### Customer Authentication

* Email and password login using Supabase Auth.
* JWT access tokens used for authenticated API requests.
* Refresh tokens handled by Supabase session management.

### Admin Authentication

* Separate admin role flag attached to user accounts.
* Admin endpoints protected by role-based authorization checks.

---

## Authorization Rules

### Public Access

* Product catalog
* Product details
* Categories
* Language selection

### Logged-in Customer Access

* Cart
* Addresses
* Checkout
* Orders
* Order history

### Admin Access

* Product management
* Order management
* Dashboard statistics

---

## Data Requiring Protection

### High Priority

* User account information
* Password hashes
* Shipping addresses
* Order history
* Payment identifiers

### Medium Priority

* Product inventory
* Order status updates
* Admin actions

### Low Priority

* Public product information
* Categories
* Storefront content

---

## Supabase Row Level Security (RLS)

RLS policies should ensure:

* Users can only access their own carts.
* Users can only access their own addresses.
* Users can only access their own orders.
* Public users can only read active products and categories.
* Admin users can manage products and orders.

---

## Payment Security

* Payments handled through Razorpay Checkout.
* No card details stored in the application database.
* Payment signatures verified server-side before marking orders as paid.
* Razorpay webhook used to confirm payment status.

---

## API Security

* Protected routes require JWT authentication.
* Input validation performed using FastAPI Pydantic models.
* Request payloads validated before database operations.
* Server-side verification of product prices during checkout to prevent client-side manipulation.

---

## File Upload Security

For product image uploads:

* Restrict allowed file types to images only.
* Enforce file size limits.
* Store images in Supabase Storage buckets.
* Generate unique filenames to avoid collisions.

---

## Rate Limiting

Recommended protections:

* Login endpoint rate limiting.
* Registration endpoint rate limiting.
* Payment endpoint rate limiting.

For a demo deployment this can be implemented later if traffic increases.

---

## Logging and Monitoring

Track:

* Login attempts
* Failed payment verifications
* Admin product changes
* Order status changes
* API errors

For a demo project, basic application logs are sufficient.

---

## Deferred for V1

The following are intentionally postponed because this is a demo-scale project:

* Two-factor authentication (2FA)
* Fraud detection
* Device fingerprinting
* Advanced audit trails
* SIEM integration
* DDoS protection layers
* Automated security scanning pipelines
* Secrets rotation automation

---

## Deployment Security Checklist

* Enable HTTPS.
* Store API keys in environment variables.
* Never expose Razorpay secret keys in the frontend.
* Enable Supabase Row Level Security policies.
* Restrict CORS to approved frontend origins.
* Disable debug mode in production.
