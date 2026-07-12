from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_categories():
    return {"categories": []}

@router.get("/{category_id}")
async def get_category(category_id: str):
    return {"id": category_id, "name": "Placeholder Category"}
