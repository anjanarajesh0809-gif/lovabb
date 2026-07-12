from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user

router = APIRouter()

@router.post("/razorpay/create-order")
async def create_razorpay_order(current_user: dict = Depends(get_current_user)):
    return {"id": "order_placeholder", "amount": 0, "currency": "INR"}

@router.post("/razorpay/verify")
async def verify_payment(current_user: dict = Depends(get_current_user)):
    return {"status": "success", "message": "Payment verified placeholder"}

@router.post("/webhook")
async def payment_webhook():
    return {"status": "accepted"}
