from fastapi import FastAPI

app = FastAPI(
    title="DevOps User Registration API",
    description="Backend API for User Registration System",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to DevOps User Registration API"
    }