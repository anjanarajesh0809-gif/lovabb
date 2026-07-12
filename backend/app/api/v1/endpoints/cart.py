from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user

router = APIRouter()

@router.get("/")
async def get_cart(current_user: dict = Depends(get_current_user)):
    return {"cart": {"items": []}}

@router.post("/items")
async def add_item_to_cart(current_user: dict = Depends(get_current_user)):
    return {"message": "Item added to cart"}

@router.put("/items/{cart_item_id}")
async def update_cart_item(cart_item_id: str, current_user: dict = Depends(get_current_user)):
    return {"message": "Cart item updated", "id": cart_item_id}

@router.delete("/items/{cart_item_id}")
async def remove_cart_item(cart_item_id: str, current_user: dict = Depends(get_current_user)):
    return {"message": "Cart item removed", "id": cart_item_id}

@router.delete("/")
async def clear_cart(current_user: dict = Depends(get_current_user)):
    return {"message": "Cart cleared"}
