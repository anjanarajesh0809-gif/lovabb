import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    SUPABASE_URL: str = Field(default="")
    SUPABASE_ANON_KEY: str = Field(default="")
    SUPABASE_SERVICE_ROLE_KEY: str = Field(default="")
    
    RAZORPAY_KEY_ID: str = Field(default="")
    RAZORPAY_KEY_SECRET: str = Field(default="")
    
    JWT_SECRET_KEY: str = Field(default="change_me_in_production_jwt_secret_key_123456789")
    
    FRONTEND_URL: str = Field(default="http://localhost:5173")
    API_V1_PREFIX: str = "/api/v1"

    # SettingsConfigDict specifies env file configuration.
    # Note: It reads .env file from the current working directory.
    # We allow extra field to ignore other environment variables.
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
