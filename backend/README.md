# Shuttu E-commerce Backend - Phase 1

This repository contains the backend service for Shuttu Baby Dresses E-commerce, built with FastAPI.

## Folder Structure

```text
/backend
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/      # API resource endpoints
│   │       └── router.py       # Main API router compiling v1 endpoints
│   ├── core/
│   │   ├── config.py           # Settings and configuration loader
│   │   ├── security.py         # JWT and password hashing utilities
│   │   └── dependencies.py     # FastAPI dependencies (e.g. auth validation)
│   ├── models/                 # Database models (empty for Phase 2)
│   ├── schemas/                # Request and response validation schemas
│   ├── services/               # Business logic layers
│   ├── repositories/           # Database access layers
│   ├── integrations/
│   │   ├── supabase.py         # Supabase client initializer
│   │   └── razorpay.py         # Razorpay client initializer
│   ├── middleware/             # Custom middleware (CORS, logging)
│   └── main.py                 # App entrypoint and healthcheck
├── tests/                      # Test suites
├── .env                        # Environment configurations (local only)
├── .env.example                # Example configuration reference
└── requirements.txt            # Project dependencies list
```

## Setup & Running locally

### Prerequisites
- Python 3.11+

### Installation
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv .venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```powershell
     .venv\Scripts\Activate.ps1
     ```
   - On macOS/Linux:
     ```bash
     source .venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Copy environmental variables:
   ```bash
   cp .env.example .env
   ```

### Running the API Server
Start the dev server using uvicorn:
```bash
uvicorn app.main:app --reload --port 8000
```

Access the API documentation at:
- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
- ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

Health check endpoint: [http://localhost:8000/health](http://localhost:8000/health)
