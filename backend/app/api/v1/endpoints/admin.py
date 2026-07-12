from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user

router = APIRouter()

# In Phase 2, an admin check dependency will be added here
@router.get("/dashboard")
async def dashboard_stats(current_user: dict = Depends(get_current_user)):
    return {"total_products": 0, "total_orders": 0, "revenue": 0}

@router.post("/products")
async def create_product(current_user: dict = Depends(get_current_user)):
    return {"message": "Product created"}

@router.put("/products/{product_id}")
async def update_product(product_id: str, current_user: dict = Depends(get_current_user)):
    return {"message": "Product updated", "id": product_id}

@router.delete("/products/{product_id}")
async def delete_product(product_id: str, current_user: dict = Depends(get_current_user)):
    return {"message": "Product deleted", "id": product_id}

@router.get("/orders")
async def get_all_orders(current_user: dict = Depends(get_current_user)):
    return {"orders": []}

@router.put("/orders/{order_id}")
async def update_order_status(order_id: str, current_user: dict = Depends(get_current_user)):
    return {"message": "Order status updated", "id": order_id}
