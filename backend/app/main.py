import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router
from app.integrations.supabase import supabase_client
from app.integrations.razorpay import razorpay_client

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Shuttu Baby Dresses Ecommerce Backend",
    description="Backend API for Shuttu built with FastAPI",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(api_router, prefix=settings.API_V1_PREFIX)

@app.on_event("startup")
async def startup_event():
    logger.info("Initializing Shuttu Backend service...")
    
    # Log status of Supabase connection
    if supabase_client is not None:
        logger.info("Supabase connection configuration loaded.")
    else:
        logger.warning("Supabase is not configured. Some endpoints will fail.")
        
    # Log status of Razorpay connection
    if razorpay_client is not None:
        logger.info("Razorpay connection configuration loaded.")
    else:
        logger.warning("Razorpay is not configured. Payment endpoints will fail.")

@app.get("/health", tags=["health"])
async def health_check():
    """
    General service health check endpoint.
    """
    return {
        "status": "healthy",
        "supabase_connected": supabase_client is not None,
        "razorpay_connected": razorpay_client is not None
    }
