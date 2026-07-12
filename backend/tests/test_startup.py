import sys
import os

# Add backend root to python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from app.main import app

def test_health_check():
    client = TestClient(app)
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "supabase_connected" in data
    assert "razorpay_connected" in data
    print("Health check endpoint test passed successfully!")

if __name__ == "__main__":
    test_health_check()
