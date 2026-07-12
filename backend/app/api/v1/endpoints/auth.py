from fastapi import APIRouter, Depends, HTTPException, status
from app.core.security import create_access_token
from app.core.dependencies import get_current_user

router = APIRouter()

@router.post("/register")
async def register():
    return {"message": "Register endpoint placeholder"}

@router.post("/login")
async def login():
    # Return placeholder tokens
    access_token = create_access_token(subject="user@example.com")
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {"email": "user@example.com", "full_name": "Test User"}
    }

@router.post("/logout")
async def logout(current_user: dict = Depends(get_current_user)):
    return {"message": "Logout successful"}

@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return current_user
