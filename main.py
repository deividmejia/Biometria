from fastapi import FastAPI
from routes.access import router as access_router
from routes.empleados import router as empleados_router
app.include_router(empleados_router)


app = FastAPI(
    title="API de Reconocimiento Facial",
    description="Sistema de control de accesos con reconocimiento facial",
    version="1.0.0"
)


# Incluir el router de reconocimiento facial
app.include_router(access_router)