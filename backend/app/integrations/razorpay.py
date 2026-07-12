import logging
import razorpay
from app.core.config import settings

logger = logging.getLogger(__name__)

razorpay_client = None

try:
    if settings.RAZORPAY_KEY_ID and settings.RAZORPAY_KEY_SECRET:
        razorpay_client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        logger.info("Razorpay client initialized successfully.")
    else:
        logger.warning("Razorpay credentials are missing. Razorpay client remains uninitialized.")
except Exception as e:
    logger.error(f"Failed to initialize Razorpay client: {e}")

def get_razorpay_client() -> razorpay.Client:
    """
    Helper to access Razorpay client instance.
    """
    if razorpay_client is None:
        raise RuntimeError("Razorpay client is not initialized. Please verify credentials.")
    return razorpay_client
