from fastapi import FastAPI
from routes.access import router as access_router

app = FastAPI()

app.include_router(access_router, prefix="/api")