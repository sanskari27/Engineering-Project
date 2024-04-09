from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from .controllers import model_prediction

router = APIRouter()


@router.get("/status")
async def status():
    return {"success": True}


class FeaturesRow(BaseModel):
    n: float
    p: float
    k: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

    def to_list(self):
        return [
            self.n,
            self.p,
            self.k,
            self.temperature,
            self.humidity,
            self.ph,
            self.rainfall,
        ]


class Row(FeaturesRow):
    label: str

    def to_list(self):
        return [
            self.n,
            self.p,
            self.k,
            self.temperature,
            self.humidity,
            self.ph,
            self.rainfall,
            self.label,
        ]


@router.post("/predict")
async def predict(values: FeaturesRow):
    predicted = model_prediction.predict(values.to_list())
    return {
        "success": True,
        "predicted": predicted,
    }


@router.post("/add-to-dataset")
async def update_dataset(values: Row):
    success = model_prediction.update_dataset(values.to_list())
    return {
        "success": success,
    }
