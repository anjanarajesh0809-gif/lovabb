from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_products():
    return {"products": []}

@router.get("/{product_id}")
async def get_product(product_id: str):
    return {"id": product_id, "name": "Placeholder Product"}

@router.get("/featured")
async def get_featured():
    return {"products": []}

@router.get("/search")
async def search_products(q: str):
    return {"query": q, "products": []}
