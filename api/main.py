from fastapi import FastAPI
from infrastructure.db import init_db
from routes.routes import router

app = FastAPI(
    title="Login API",
    description="Login API with FastAPI",
    version="1.0"
)


app.include_router(router)


@app.on_event("startup")
async def on_startup():
    init_db()
