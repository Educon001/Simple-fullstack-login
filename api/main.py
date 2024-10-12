from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from infrastructure.db import init_db
from routes.routes import router

app = FastAPI(
    title="Login API",
    description="Login API with FastAPI",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.on_event("startup")
async def on_startup():
    init_db()
