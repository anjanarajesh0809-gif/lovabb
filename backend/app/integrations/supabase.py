import logging
from supabase import create_client, Client
from app.core.config import settings

logger = logging.getLogger(__name__)

supabase_client: Client = None

try:
    if settings.SUPABASE_URL and settings.SUPABASE_ANON_KEY:
        # Create client. We handle potential creation errors gracefully.
        supabase_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)
        logger.info("Supabase client initialized successfully.")
    else:
        logger.warning("Supabase URL or Anon Key is missing. Supabase client remains uninitialized.")
except Exception as e:
    logger.error(f"Failed to initialize Supabase client: {e}")

def get_supabase_client() -> Client:
    """
    Helper to access Supabase client instance.
    """
    if supabase_client is None:
        raise RuntimeError("Supabase client is not initialized. Please verify configuration.")
    return supabase_client
