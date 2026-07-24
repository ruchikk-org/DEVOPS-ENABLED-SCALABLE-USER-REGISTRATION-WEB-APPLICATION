from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.models.user import User
from app.routers import users as user_router

# Create database tables automatically
Base.metadata.create_all(bind=engine)

app = FastAPI()


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5175",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:4173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# User routes
app.include_router(user_router.router)


@app.get("/")
def root():
    return {
        "message": "API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "Application Running",
        "database": "Connected"
    }