from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from recognition.detector import recognize_face

router = APIRouter()

@router.post("/validate")
async def validate_face(image: UploadFile = File(...)):
    contents = await image.read()
    result = recognize_face(contents)
    return JSONResponse(content=result)