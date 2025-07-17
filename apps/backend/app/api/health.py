from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..core.database import get_db
import redis
from ..core.config import settings

router = APIRouter()

@router.get("/health")
async def health_check():
    """Basic health check endpoint"""
    return {
        "status": "healthy",
        "service": "Swedish Property Mortgage Platform API",
        "version": "1.0.0"
    }

@router.get("/health/db")
async def database_health_check(db: Session = Depends(get_db)):
    """Database health check"""
    try:
        # Simple query to test database connection
        db.execute("SELECT 1")
        return {
            "status": "healthy",
            "database": "connected"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }

@router.get("/health/redis")
async def redis_health_check():
    """Redis health check"""
    try:
        r = redis.from_url(settings.REDIS_URL)
        r.ping()
        return {
            "status": "healthy",
            "redis": "connected"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "redis": "disconnected",
            "error": str(e)
        }
